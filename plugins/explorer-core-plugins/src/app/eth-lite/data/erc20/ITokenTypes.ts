import { BigNumber } from "app/util/BigNumber";

export interface ITokenDetails {
    address: string;
    name?: string;
    symbol?: string;
    /** Assumed to be 0 if missing */
    decimals: number;
    /** integer including decimals */
    totalSupply?: BigNumber;
}

export interface ITokenFilter {
    token?: string;
    owner?: string;
}

export const tokenFilterContextType = {
    token: "string",
    owner: "string"
} as const;

export interface ITokenTransferEvent {
    blockNumber: number;
    logIndex: number;
    transactionHash: string;
    token: string;
    event: string;
    from: string;
    to: string;
    value: BigNumber;
}

export interface ITokenTransferEvents {
    events: ITokenTransferEvent[];
    filter: ITokenFilter;
}

export interface IAccountTokenTransfers {
    tokens: {
        details: ITokenDetails;
        events: ITokenTransferEvent[];
        balance: BigNumber;
        calculatedBalance: BigNumber;
    }[];
    filter: ITokenFilter;
}
