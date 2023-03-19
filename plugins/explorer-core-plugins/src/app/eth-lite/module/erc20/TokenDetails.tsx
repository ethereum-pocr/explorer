
import * as React from "react";
import { Label } from "@alethio/ui/lib/data/Label";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { observer } from "mobx-react";
import { ITokenDetailsProps } from "app/eth-lite/module/erc20/tokenDetailsModule";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";

@observer
export class TokenDetails extends React.Component<ITokenDetailsProps> {
    render() {
        let { tokenDetails: token } = this.props;
console.log("Token details", token);

        return token.symbol? <>
            <LayoutRow minWidth={660}>
                <LayoutRowItem>
                    <Label>Token</Label>
                    <ValueBox>{token.symbol}</ValueBox>
                </LayoutRowItem>
                <LayoutRowItem>
                    <Label>Name</Label>
                    <ValueBox>{token.name}</ValueBox>
                </LayoutRowItem>
            </LayoutRow>
            <LayoutRow minWidth={660}>
                <LayoutRowItem>
                    <Label>Token supply</Label>
                    <ValueBox>{token.totalSupply?token.totalSupply.toString(10):""}</ValueBox>
                </LayoutRowItem>
                <LayoutRowItem>
                    <Label>Decimals</Label>
                    <ValueBox>{token.decimals}</ValueBox>
                </LayoutRowItem>
            </LayoutRow>
        </> : <></>; // empty if no token
    }
}
