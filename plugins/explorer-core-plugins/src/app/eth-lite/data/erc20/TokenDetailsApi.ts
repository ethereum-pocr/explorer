import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract";

import { Web3EthApi } from "app/eth-lite/data/Web3EthApi";
import { ITokenDetails, ITokenFilter, ITokenTransferEvents } from "app/eth-lite/data/erc20/ITokenTypes";
import { ERC20Abi } from "app/eth-lite/data/erc20/ERC20Abi";

const nohex =  (a: string) => `${a.replace(/^0x/, "")}`;
const hex =  (a: string) => `0x${nohex(a)}`;

export class TokenDetailsApi {
    private abi: AbiItem[];
    constructor(
        private web3EthApi: Web3EthApi
    ) {
        this.abi = ERC20Abi;
    }

    async fetchDetails(tokenAddress: string): Promise<ITokenDetails> {
        let address = hex(tokenAddress);
        let accountCode = await this.web3EthApi.getAddressCode(address);

        if (!accountCode) {
            throw new Error(`No contract code found for token "${tokenAddress}"`);
        }

        const token = new Contract(this.web3EthApi.getWeb3Provider(), this.abi);
        token.address = address;
        try {
        // the calls could generate an execption if the undelying smart contract does not really support ERC20 calls
            const details: ITokenDetails = {
                name: await token.methods.name().call(),
                symbol: await token.methods.symbol().call(),
                decimals: await token.methods.decimals().call(),
                totalSupply: await token.methods.totalSupply().call()
            };

            return details;
        } catch (error) {
            return {name: undefined, symbol: undefined, decimals: 0, totalSupply: undefined};
        }
    }

    async fetchTransfers(filter: ITokenFilter): Promise<ITokenTransferEvents> {
        const token = new Contract(this.web3EthApi.getWeb3Provider(), this.abi);
        if (filter.token) { token.address = hex(filter.token); }
        let queryFilter1: any;
        let queryFilter2: any;
        if (filter.owner) {
            queryFilter1 = {from : hex(filter.owner) };
            queryFilter2 = {  to : hex(filter.owner) };
        }

        try {
            let logs1 = await token.getPastEvents("Transfer", {fromBlock: 0, filter: queryFilter1});
            let logs2 = queryFilter2 ? await token.getPastEvents("Transfer", {fromBlock: 0, filter: queryFilter2}) : [];
            // merge the 2 series
            // remove from logs2 those that exists in logs1
            logs2 = logs2.filter(e2 =>
                logs1.findIndex(e1 => e1.blockHash === e2.blockHash && e1.logIndex === e2.logIndex) === -1);
            const logs = logs1.concat(logs2).sort((e1, e2) => {
                if (e1.blockNumber === e2.blockNumber) { return e1.logIndex - e2.logIndex; }
                return e1.blockNumber - e2.blockNumber;
            });

            return {
                filter,
                events: logs.map(l => ({
                    blockNumber: l.blockNumber,
                    logIndex: l.logIndex,
                    transactionHash: l.transactionHash,
                    token: l.address,
                    event: l.event,
                    from: l.returnValues.from,
                    to: l.returnValues.to,
                    value: l.returnValues.value
                }))
            };
        } catch (error) {
            return {
                filter,
                events: []
            };
        }
    }
}
