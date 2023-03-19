
import { IModuleDef } from "plugin-api/IModuleDef";
import { IAccountContext } from "app/shared/context/IAccountContext";
import { accountContextType } from "app/shared/context/accountContextType";
import { ITokenDetails } from "app/eth-lite/data/erc20/ITokenTypes";
import { ITranslation } from "plugin-api/ITranslation";
import { ILogger } from "plugin-api/ILogger";
import { TokenDetails } from "app/eth-lite/module/erc20/TokenDetails";

export interface ITokenDetailsProps {
    tokenHash: string;
    tokenDetails: ITokenDetails;
    translation: ITranslation;
    locale: string;
    logger: ILogger;
}

export const tokenDetailsModule: () => IModuleDef<ITokenDetailsProps, IAccountContext> =
() => ({
    contextType: accountContextType,

    dataAdapters: [{
        ref: "adapter://aleth.io/lite/token/details"
    }],

    getContentComponent: async () => TokenDetails,
    getContentProps(data) {
        let { asyncData, context, locale, translation, logger } = data;

        let tokenDetails = asyncData.get("adapter://aleth.io/lite/token/details")!.data as ITokenDetails;

        let props: ITokenDetailsProps = {
            tokenHash: context.accountHash,
            tokenDetails,
            locale,
            logger,
            translation
        };
        return props;
    }
});
