
import { IModuleDef } from "plugin-api/IModuleDef";
import { ITranslation } from "plugin-api/ITranslation";
import { ILogger } from "plugin-api/ILogger";
import { ITokenFilter,
         ITokenTransferEvent,
         ITokenTransferEvents,
         tokenFilterContextType } from "app/eth-lite/data/erc20/ITokenTypes";
import { TokenTransfers } from "app/eth-lite/module/erc20/TokenTransfers";

export interface ITokenTransfersProps {
    filter: ITokenFilter;
    events: ITokenTransferEvent[];
    translation: ITranslation;
    locale: string;
    logger: ILogger;
}

export const tokenTransfersModule: () => IModuleDef<ITokenTransfersProps, ITokenFilter> =
() => ({
    contextType: tokenFilterContextType,

    dataAdapters: [{
        ref: "adapter://aleth.io/lite/token/transfers"
    }],

    getContentComponent: async () => TokenTransfers,
    getContentProps(data) {
        let { asyncData, locale, translation, logger } = data;

        let eventsAndFilter = asyncData.get("adapter://aleth.io/lite/token/transfers")!.data as ITokenTransferEvents;

        let props: ITokenTransfersProps = {
            filter: eventsAndFilter.filter,
            events: eventsAndFilter.events,
            locale,
            logger,
            translation
        };
        return props;
    }
});
