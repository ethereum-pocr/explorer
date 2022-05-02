// tslint:disable:no-string-literal
import { ITxLiteByAccount } from "./ITxLiteByAccount";
import { BigNumber } from "app/util/BigNumber";

export class TxLiteByAccountReader {
    read(data: any) {
        let tx: ITxLiteByAccount = {
            hash: data["txHash"],
            from: data["from"],
            to: data["to"],
            value: new BigNumber(data["value"]),
            gasUsed: new BigNumber(data["txGasUsed"]),
            gasPrice: new BigNumber(data["txGasPrice"]),
            /**
             * msgStatus can be "0x1" for success, "0x0" for failure (error), or undefined for txs older than
             * byzantium hardfork (where this was introduced)
             */
            success: data["msgStatus"] ? (data["msgStatus"] === "0x1") : void 0,
            block: {
                id: Number(data["includedInBlock"]),
                creationTime: Number(data["blockCreationTime"])
            },
            txIndex: Number(data["txIndex"])
        };

        return tx;
    }
}
