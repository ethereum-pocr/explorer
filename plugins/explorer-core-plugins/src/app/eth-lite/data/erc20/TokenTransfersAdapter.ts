import { IDataAdapter } from "plugin-api/IDataAdapter";
import { isAddress } from "web3-utils";
import { LatestBlockWatcher } from "app/shared/adapter/block/LatestBlockWatcher";
import { Web3DataSource } from "app/eth-lite/Web3DataSource";
import { ITokenFilter, ITokenTransferEvents } from "app/eth-lite/data/erc20/ITokenTypes";
import { ITokenPageContext, tokenContextType } from "app/eth-lite/page/tokenPage";

export class TokenTransfersAdapter implements IDataAdapter<ITokenPageContext, ITokenTransferEvents> {
    contextType = tokenContextType;

    constructor(private dataSource: Web3DataSource ) {

    }

    async load(filter: ITokenPageContext) {
        let _filter: ITokenFilter = {token: filter.accountHash, owner: filter.owner};

        if (_filter.token && !isAddress(_filter.token)) {
            // Invalid account address
            return void 0;
        }
        if (_filter.owner && !isAddress(_filter.owner)) {
            // Invalid account address
            return void 0;
        }

        if (!_filter.owner && !_filter.token) {
            // Not enough filter
            return void 0;
        }

        return await this.dataSource.stores.tokenDetailsApi.fetchTransfers(_filter);
    }

    createWatcher() {
        return new LatestBlockWatcher(this.dataSource.stores.blockStateStore, 60 * 5);
    }
}
