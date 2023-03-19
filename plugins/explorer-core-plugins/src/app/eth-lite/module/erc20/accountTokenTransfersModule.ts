
import { IModuleDef } from "plugin-api/IModuleDef";
import { IAccountContext } from "app/shared/context/IAccountContext";
import { accountContextType } from "app/shared/context/accountContextType";
import { IAccountTokenTransfers } from "app/eth-lite/data/erc20/ITokenTypes";
import { ITranslation } from "plugin-api/ITranslation";
import { ILogger } from "plugin-api/ILogger";
import { AccountTokenTransfers } from "app/eth-lite/module/erc20/AccountTokenTransfers";

export interface IAccountTokenTransfersProps {
    accountHash: string;
    tokens: IAccountTokenTransfers;
    translation: ITranslation;
    locale: string;
    logger: ILogger;
}

export const accountTokenTransfersModule: () => IModuleDef<IAccountTokenTransfersProps, IAccountContext> =
() => ({
    contextType: accountContextType,

    dataAdapters: [{
        ref: "adapter://aleth.io/lite/account/transfers"
    }],

    getContentComponent: async () => AccountTokenTransfers,
    getContentProps(data) {
        let { asyncData, context, locale, translation, logger } = data;

        let tokens = asyncData.get("adapter://aleth.io/lite/account/transfers")!.data as IAccountTokenTransfers;

        let props: IAccountTokenTransfersProps = {
            accountHash: context.accountHash,
            tokens,
            locale,
            logger,
            translation
        };
        return props;
    }
});
