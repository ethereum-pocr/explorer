import { IModuleDef } from "plugin-api/IModuleDef";
import { IAccountContext } from "app/shared/context/IAccountContext";
import { accountContextType } from "app/shared/context/accountContextType";
import { AccountAddress, IAccountAddressProps } from "app/shared/module/account/lite/AccountAddress";

export const accountAddressModule: () => IModuleDef<IAccountAddressProps, IAccountContext> =
() => ({
    contextType: accountContextType,

    dataAdapters: [],

    getContentComponent: async () => AccountAddress,
    getContentProps(data) {
        let { context, locale, translation, logger } = data;

        let props: IAccountAddressProps = {
            accountHash: context.accountHash,
            locale,
            logger,
            translation
        };
        return props;
    }
});
