import { TxType } from "app/shared/data/tx/TxType";
import { ITxDetailsBase } from "app/shared/data/tx/details/ITxDetailsBase";
import { TxStatus } from "app/shared/data/tx/TxStatus";
import { IDecodedPayload } from "app/shared/data/payload/IDecodedPayload";
import { BigNumber } from "app/util/BigNumber";

/**
 * Data for consolidated txs, coming from db / api
 */
export interface ITxDetailsFull extends ITxDetailsBase {
    status: TxStatus.Consolidated;
    type: TxType;
    gasUsed: BigNumber;
    cumulativeGasUsed: BigNumber;
    error: string | undefined;
    block: {
        id: number;
        creationTime: number;
    };
    txIndex: number;
    firstSeenAt?: number;
    contractMsgCount: number;
    tokenTransferCount: number;
    decodedPayload: IDecodedPayload | undefined;
    logEventsCount: number;
}
