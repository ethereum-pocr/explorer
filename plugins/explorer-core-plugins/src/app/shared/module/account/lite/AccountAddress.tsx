import * as React from "react";
import { Label } from "@alethio/ui/lib/data/Label";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { AddressHashBox } from "@alethio/explorer-ui/lib/box/account/AddressHashBox";
import { ITranslation } from "plugin-api/ITranslation";
import { ILogger } from "plugin-api/ILogger";
import { observer } from "mobx-react";

export interface IAccountAddressProps {
    accountHash: string;
    translation: ITranslation;
    locale: string;
    logger: ILogger;
}

@observer
export class AccountAddress extends React.Component<IAccountAddressProps> {
    render() {
        let { translation: tr } = this.props;

        return <>
            <LayoutRow minWidth={660}>
                <LayoutRowItem>
                    <Label>{tr.get("accountView.content.accountHash.label")}</Label>
                    <AddressHashBox>
                        {this.props.accountHash}
                    </AddressHashBox>
                </LayoutRowItem>
            </LayoutRow>
        </>;
    }
}
