import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract";

import { Web3EthApi } from "app/eth-lite/data/Web3EthApi";
import { ITokenDetails } from "app/eth-lite/data/erc20/ITokenDetails";
import { ERC20Abi } from "app/eth-lite/data/erc20/ERC20Abi";

export class TokenDetailsApi {
    private abi: AbiItem[];
    constructor(
        private web3EthApi: Web3EthApi
    ) {
        this.abi = ERC20Abi;
    }

    async fetch(tokenAddress: string): Promise<ITokenDetails> {
        let address = `0x${tokenAddress.replace(/^0x/, "")}`
        let accountCode = await this.web3EthApi.getAddressCode(address);

        if (!accountCode) {
            throw new Error(`No contract code found for token "${tokenAddress}"`);
        }

        const token = new Contract(this.web3EthApi.getWeb3Provider(), this.abi);
        token.address = address;
        try { // the calls could generate an execption if the undelying smart contract does not really support ERC20 calls
            const details: ITokenDetails = {
                name: await token.methods.name().call(),
                symbol: await token.methods.symbol().call(),
                decimals: await token.methods.decimals().call(),
                totalSupply: await token.methods.totalSupply().call(),
            }
            return details;
        } catch (error) {
            return {name: undefined, symbol: undefined, decimals:0, totalSupply: undefined};
        }
    }
}
