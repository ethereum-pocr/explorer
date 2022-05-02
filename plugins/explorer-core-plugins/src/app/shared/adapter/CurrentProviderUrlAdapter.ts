import { IDataAdapter } from "plugin-api/IDataAdapter";
import { Web3DataSource } from "app/eth-lite/Web3DataSource";
import { CurrentProviderUrlWatcher } from "./CurrentProviderUrlWatcher";

export class CurrentProviderUrlAdapter implements IDataAdapter<void, string> {
    contextType = {};

    constructor(private dataSource: Web3DataSource) {

    }

    async load(context: void) {
        return this.dataSource.providerUrl;
    }

    createWatcher(context: void) {
        return new CurrentProviderUrlWatcher(this.dataSource);
    }
}
