import { IDataAdapter } from "plugin-api/IDataAdapter";
import { isAddress } from "web3-utils";
import { LatestBlockWatcher } from "app/shared/adapter/block/LatestBlockWatcher";
import { accountContextType } from "app/shared/context/accountContextType";
import { IAccountContext } from "app/shared/context/IAccountContext";
import { Web3DataSource } from "app/eth-lite/Web3DataSource";
import { IAccountTokenTransfers, ITokenTransferEvent } from "app/eth-lite/data/erc20/ITokenTypes";
import { BigNumber } from "app/util/BigNumber";

interface ILocalTokenData {
    token: string;
    events: ITokenTransferEvent[];
}

const nohex =  (a: string) => `${a.replace(/^0x/, "")}`;
const hex =  (a: string) => `0x${nohex(a)}`;

export class AccountTokenTransfersAdapter implements IDataAdapter<IAccountContext, IAccountTokenTransfers> {
    contextType = accountContextType;

    constructor(private dataSource: Web3DataSource ) {

    }

    async load({ accountHash }: IAccountContext) {
        if (accountHash.length !== 40) {
            // Invalid account address
            return void 0;
        }

        if (!isAddress(accountHash)) {
            return void 0;
        }
        const account = hex(accountHash);
        const allEvents = await this.dataSource.stores.tokenDetailsApi.fetchTransfers({owner: accountHash});
        const tokens: ILocalTokenData[] = allEvents.events.reduce<ILocalTokenData[]>( (arr, ev) => {
            let foundIndex = arr.findIndex(t => t.token === ev.token);
            if (foundIndex === -1) {
                foundIndex = arr.length;
                arr.push({ token: ev.token, events: [] });
            }
            arr[foundIndex].events.push(ev);
            return arr;
        }, []);
        const details = await Promise.all(tokens.map(
            t => this.dataSource.stores.tokenDetailsApi.fetchDetails(t.token))
            );
        const balances = await Promise.all(tokens.map(
            t => this.dataSource.stores.tokenDetailsApi.fetchTokenBalance(t.token, accountHash))
            );
        const result: IAccountTokenTransfers = {
            filter: allEvents.filter,
            tokens: details.map( (t, i) => ({
                details: t,
                events: tokens[i].events,
                balance: balances[i],
                calculatedBalance: new BigNumber(0)
            }) )
        };
        result.tokens.forEach( t => {
            for (const ev of t.events) {
                if ( account === ev.from ) { t.calculatedBalance = t.calculatedBalance.minus(ev.value); }
                if ( account === ev.to ) { t.calculatedBalance = t.calculatedBalance.plus(ev.value); }
            }
        });
        return result;
    }

    createWatcher() {
        return new LatestBlockWatcher(this.dataSource.stores.blockStateStore, 60 * 5);
    }
}
