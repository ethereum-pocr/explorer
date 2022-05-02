interface IConfigData {
    /** Customizable ETH symbol (e.g. GöETH) */
    ethSymbol?: string;

    apiBasePath: string;
}

export class EthMementoPluginConfig {
    private data: IConfigData;

    fromJson(data: IConfigData) {
        this.data = data;
        return this;
    }

    getEthSymbol() {
        return this.data.ethSymbol || "ETH";
    }

    /**
     * Url for account / tx api endpoint (replace %s with account hash)
     */
    getAccountTxApiUrlMask() {
        return this.data.apiBasePath + "/account/%s/txs";
    }

    /**
     * URL for block api endpoint (replace %d with blockId)
     */
    getBlockApiUrlMask() {
        return this.data.apiBasePath + "/block/%d";
    }

    /**
     * URL for block value api endpoint (replace %d, %d with range start,end)
     */
    getBlockValueApiUrlMask() {
        return this.data.apiBasePath + "/block-range/%d/%d";
    }

    /**
     * URL for tx api endpoint (replace %s with tx hash)
     */
    getTxApiUrlMask() {
        return this.data.apiBasePath + "/tx/%s";
    }

    /**
     * URL for tx event logs api endpoint (replace %s with tx hash)
     */
    getTxLogEventsApiUrlMask() {
        return this.data.apiBasePath + "/tx/%s/log-entries";
    }

    /**
     * URL for uncle api endpoint (replace %s with uncleHash)
     */
    getUncleApiUrlMask() {
        return this.data.apiBasePath + "/uncle/%s";
    }

    /**
     * URL for search api endpoint (replace %s with 64 characters hash)
     */
    getSearchApiUrlMask() {
        return this.data.apiBasePath + "/search/%s";
    }

    /**
     * URL for account code api endpoint (replace %s with account address)
     */
    getAccountCodeApiUrlMask() {
        return this.data.apiBasePath + "/account/%s/code";
    }

    /**
     * URL for account balance api endpoint (replace %s with account address)
     */
    getAccountBalanceApiUrlMask() {
        return this.data.apiBasePath + "/account/%s/balance";
    }
}
