
import * as React from "react";
import { Label } from "@alethio/ui/lib/data/Label";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { observer } from "mobx-react";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { ITokenTransfersProps } from "app/eth-lite/module/erc20/tokenTransfersModule";
import { AddressHashBox } from "@alethio/explorer-ui/lib/box/account/AddressHashBox";
import { BlockNumberBox } from "@alethio/explorer-ui/lib/box/block/BlockNumberBox";
import { TxHashBox } from "@alethio/explorer-ui/lib/box/tx/TxHashBox";
import { SubTitle } from "app/shared/page/dashboard/SubTitle";

@observer
export class TokenTransfers extends React.Component<ITokenTransfersProps> {
    render() {
        let { events } = this.props;

        return events.length > 0 ?
            <>
                <SubTitle>Transfers:</SubTitle>
                {events.map(event => (
                    <LayoutRow minWidth={660} key={`${event.blockNumber}-${event.logIndex}`}>
                        <LayoutRowItem>
                            <BlockNumberBox>{event.blockNumber}</BlockNumberBox>
                            <Label>{event.logIndex}</Label>
                            <Label>From</Label>
                            <AddressHashBox>{event.from}</AddressHashBox>
                            <Label>To</Label>
                            <AddressHashBox>{event.to}</AddressHashBox>
                            <Label>Value</Label>
                            <ValueBox>{event.value.toString(10)}</ValueBox>
                            <Label>Tx</Label>
                            <TxHashBox>{event.transactionHash}</TxHashBox>
                        </LayoutRowItem>
                    </LayoutRow>
                ))}
        </>
        : <SubTitle>No transfer on the token!</SubTitle>;
    }
}
