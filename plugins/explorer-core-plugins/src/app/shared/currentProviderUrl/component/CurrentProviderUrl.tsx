import * as React from "react";
import { ITranslation } from "plugin-api/ITranslation";
import { SubTitle } from "app/shared/page/dashboard/SubTitle";

export interface ICurrentProviderUrlProps {
    translation: ITranslation;
    url: string;
    locale: string;
}

export class CurrentProviderUrl extends React.Component<ICurrentProviderUrlProps> {
    render() {
        let { translation: tr } = this.props;

        return (
            <SubTitle>{tr.get("dashboardView.currentProvider")} <i>{ this.props.url }</i></SubTitle>
        );
    }
}
