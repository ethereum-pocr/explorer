import { IModuleDef } from "plugin-api/IModuleDef";
import { IBlockContext } from "app/shared/context/IBlockContext";
import { AlethioAdapterType } from "app/shared/adapter/AlethioAdapterType";
import { ICurrentProviderUrlProps, CurrentProviderUrl } from "./component/CurrentProviderUrl";
import { blockContextType } from "app/shared/context/blockContextType";

export const currentProviderUrlModule: IModuleDef<ICurrentProviderUrlProps, IBlockContext> = {
    contextType: blockContextType,

    dataAdapters: [{
        ref: AlethioAdapterType.CurrentProviderUrl
    }],

    getContentComponent() {
        return Promise.resolve(CurrentProviderUrl);
    },

    getContentProps(data) {
        let { translation, locale, asyncData } = data;

        let nodeUrl = asyncData.get(AlethioAdapterType.CurrentProviderUrl)!.data as string;

        let props: ICurrentProviderUrlProps = {
            translation,
            locale,
            url: nodeUrl
        };
        return props;
    },
    getHelpComponent: () => ({ translation }) => translation.get("dashboardView.help.latestBlockInfo") as any
};
