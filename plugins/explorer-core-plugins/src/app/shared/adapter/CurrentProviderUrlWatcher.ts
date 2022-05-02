import { ObservableWatcher } from "plugin-api/watcher/ObservableWatcher";
import { Web3DataSource } from "app/eth-lite/Web3DataSource";

export class CurrentProviderUrlWatcher extends ObservableWatcher {
    constructor(private dataSource: Web3DataSource, throttleSeconds = 0) {
        super(() => this.dataSource.providerUrl, throttleSeconds);
    }
}
