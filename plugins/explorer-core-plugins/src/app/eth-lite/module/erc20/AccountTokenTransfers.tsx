
import * as React from "react";
import { Label } from "@alethio/ui/lib/data/Label";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { observer } from "mobx-react";
import { ValueBox } from "@alethio/ui/lib/layout/content/box/ValueBox";
import { AddressHashBox } from "@alethio/explorer-ui/lib/box/account/AddressHashBox";
import { BlockNumberBox } from "@alethio/explorer-ui/lib/box/block/BlockNumberBox";
import { TxHashBox } from "@alethio/explorer-ui/lib/box/tx/TxHashBox";
import { IAccountTokenTransfersProps } from "app/eth-lite/module/erc20/accountTokenTransfersModule";
import { Link } from "plugin-api/component/Link";

const nohex =  (a: string) => `${a.replace(/^0x/, "")}`;
const hex =  (a: string) => `0x${nohex(a)}`;

@observer
export class AccountTokenTransfers extends React.Component<IAccountTokenTransfersProps> {
    render() {
        let { tokens: result, accountHash } = this.props;
        const tokens = result.tokens;
        const account = hex(accountHash).toLowerCase();

        // calculate the total

        return tokens.length > 0 ?
            <>
                {tokens.map(token => (
                <div key={`${token.details.address}`}>
                    <LayoutRow minWidth={660} >
                        <LayoutRowItem>
                            <Label>Token transfers</Label>
                            <Link to={`page://aleth.io/lite/token?accountHash=${token.details.address}`}>
                                <ValueBox>{token.details.symbol}</ValueBox>
                            </Link>
                            <Label>Name</Label>
                            <ValueBox>{token.details.name}</ValueBox>
                        </LayoutRowItem>
                    </LayoutRow>
                    {token.events.map(event => (
                        <LayoutRow minWidth={660}
                            key={`${event.blockNumber}-${event.logIndex}`}>
                            <LayoutRowItem>
                                <Label>---</Label>
                                <BlockNumberBox>{event.blockNumber}</BlockNumberBox>
                                <Label>{event.logIndex}</Label>
                            </LayoutRowItem>
                            { account !== event.from.toLowerCase() && <LayoutRowItem>
                                <Label>From</Label>
                                <AddressHashBox>{event.from}</AddressHashBox>
                            </LayoutRowItem> }
                            { account !== event.to.toLowerCase() && <LayoutRowItem>
                                <Label>To</Label>
                                <AddressHashBox>{event.to}</AddressHashBox>
                            </LayoutRowItem> }
                            <LayoutRowItem>
                                <Label>Value</Label>
                                <ValueBox>{event.value.toString(10)}</ValueBox>
                                <Label>Tx</Label>
                                <TxHashBox>{event.transactionHash}</TxHashBox>
                            </LayoutRowItem>
                        </LayoutRow>
                    ))}
                    <LayoutRow minWidth={660}>
                        <LayoutRowItem>
                            <Label>===</Label>
                            <Label>On chain balance</Label>
                            <ValueBox>{token.balance.toString(10)}</ValueBox>
                            <Label>Total balance calculated</Label>
                            <ValueBox>{token.calculatedBalance.toString(10)}</ValueBox>
                        </LayoutRowItem>
                    </LayoutRow>
                </div>
                ) )}

        </>
        : <></>;
    }
}
