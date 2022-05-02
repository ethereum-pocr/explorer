import React from "react";
import { IModuleDef } from "plugin-api/IModuleDef";
import { IPropagationChartItem } from "app/eth-extended/module/dashboard/charts/data/IPropagationChartItem";
import { IEthNodesInfo } from "app/eth-extended/module/dashboard/charts/data/IEthNodesInfo";
import { IPropagationProps, Propagation } from "./component/Propagation";

export const propagationChartModule: (ethstatsUrl?: string) => IModuleDef<IPropagationProps, void> =
(ethstatsUrl) => ({
    contextType: {},

    dataAdapters: [{
        ref: "adapter://aleth.io/propagationInfo"
    }, {
        ref: "adapter://aleth.io/ethNodesInfo"
    }],

    getContentComponent() {
        return Promise.resolve(Propagation);
    },

    getContentProps(data) {
        let { translation, locale, asyncData } = data;

        let propagationItems = asyncData.get("adapter://aleth.io/propagationInfo")!.data as (
            IPropagationChartItem[] | undefined);
        let ethNodesInfo = asyncData.get("adapter://aleth.io/ethNodesInfo")!.data as IEthNodesInfo;

        if (!ethstatsUrl) {
            throw new Error(`Propagation chart module requires "ethstatsUrl" config`);
        }

        let props: IPropagationProps = {
            translation,
            locale,
            ethstatsUrl,
            propagationItems,
            ethNodesInfo
        };
        return props;
    },

    getHelpComponent: () => ({ translation }) => <div dangerouslySetInnerHTML={{
        __html: translation.get("dashboardView.help.propagationChart").replace(/%s/, ethstatsUrl || "about:blank")
    }} />
});
