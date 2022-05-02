import * as React from "react";
import { LayoutRow } from "@alethio/ui/lib/layout/content/LayoutRow";
import { LayoutRowItem } from "@alethio/ui/lib/layout/content/LayoutRowItem";
import { Label } from "@alethio/ui/lib/data/Label";
import { AccountBalance } from "app/eth-extended/data/account/balance/AccountBalance";
import { ITranslation } from "plugin-api/ITranslation";
import { ITotalBalance } from "app/eth-extended/data/account/balance/ITotalBalance";
import { EthBalanceDetails } from "./EthBalanceDetails";
import { AllTokensBalanceDetails } from "./AllTokensBalanceDetails";
import { LoadStatus } from "plugin-api/LoadStatus";
import { SpinnerRegular } from "@alethio/ui/lib/fx/SpinnerRegular";
import { ErrorIconHint } from "app/shared/component/ErrorIconHint";
import { observer } from "mobx-react";
import { observable, action } from "mobx";
import { Fade } from "@alethio/ui/lib/fx/Fade";
import { TokenBalanceGrid } from "app/eth-extended/module/account/balance/component/TokenBalanceGrid";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { ResponsiveContainer } from "@alethio/ui/lib/layout/responsive/ResponsiveContainer";
import { IAsyncData } from "plugin-api/IAsyncData";

const BalanceSectionRoot = styled<{accountHasTokens: boolean}, "div">("div")`
    @media ${props => props.theme.mediaQueries.breakPoints.smallerThanStandardView} {
        display: ${(props) => props.accountHasTokens ? "block" : "none"};
    }
`;

interface IBalanceSectionGridProps {
    usdPricesEnabled: boolean;
}

const BalanceSectionGrid = styled<IBalanceSectionGridProps, "div">("div")`
    display: grid;
    grid-template-columns: repeat(${ props => props.usdPricesEnabled ? 5 : 1 }, auto);

    @media ${props => props.theme.mediaQueries.breakPoints.smallerThanStandardView} {
        grid-template-columns: repeat(3, auto);
    }
`;

const BalanceGridRoot = styled.div`
    max-width: 100vw;
    overflow-y: auto;
`;

export interface IBalanceSectionProps {
    historicalBalance: IAsyncData<AccountBalance>;
    totalBalance: ITotalBalance | undefined;
    translation: ITranslation;
    locale: string;
    ethSymbol: string;
    usdPricesEnabled: boolean;
}

@observer
export class BalanceSection extends React.Component<IBalanceSectionProps> {
    @observable
    private tokenBalanceExpanded: boolean;

    render() {
        let { translation: tr, locale, historicalBalance, totalBalance, ethSymbol, usdPricesEnabled } = this.props;

        return (
            <BalanceSectionRoot accountHasTokens={historicalBalance.isLoaded() && historicalBalance.data.hasTokens()}>
                {/* The value 540 is the same value as the hide of the row first label when
                `ignoreFirstLabel` is used. TODO: Replace this with the future implementation of Layout
                that will move labels and info on separate lines when viewport is too small */}
                <ResponsiveContainer behavior="show" forScreenWidth={{lowerThan: 540}}>
                    <LayoutRow>
                        <LayoutRowItem>
                            <Label>{tr.get("accountView.content.balance.label")}</Label>
                        </LayoutRowItem>
                    </LayoutRow>
                </ResponsiveContainer>
                <LayoutRow responsive={{ignoreFirstLabel: "forLowRes"}}>
                    <LayoutRowItem autoHeight>
                        <Label>{tr.get("accountView.content.balance.label")}</Label>
                        { historicalBalance.isLoaded() && totalBalance ?
                        <BalanceGridRoot>
                            <BalanceSectionGrid usdPricesEnabled={usdPricesEnabled}>
                                <EthBalanceDetails
                                    ethBalance={historicalBalance.data.getEthBalance()}
                                    totalBalance={totalBalance}
                                    locale={locale}
                                    ethSymbol={ethSymbol}
                                    usdPricesEnabled={usdPricesEnabled}
                                />
                                { historicalBalance.data.hasTokens() ?
                                    <AllTokensBalanceDetails
                                        tokenAggregatedBalance={historicalBalance.data.aggregateTokenBalance()}
                                        totalTokenTypes={historicalBalance.data.getTokenTypeCount()}
                                        totalBalance={totalBalance}
                                        expanded={this.tokenBalanceExpanded}
                                        onToggleExpand={this.toggleTokenBalanceContent}
                                        locale={locale}
                                        translation={tr}
                                        usdPricesEnabled={usdPricesEnabled}
                                    />
                                : null }
                            </BalanceSectionGrid>
                        </BalanceGridRoot>
                        : (
                            historicalBalance.loadStatus === LoadStatus.Loading ?
                            <SpinnerRegular /> : <ErrorIconHint translation={tr} />
                        ) }
                    </LayoutRowItem>
                </LayoutRow>
                { this.tokenBalanceExpanded && historicalBalance.isLoaded() && totalBalance ?
                <Fade duration={.2} delay={.2}>
                    <BalanceGridRoot>
                        <TokenBalanceGrid
                            tokenBalances={historicalBalance.data.getAllTokenBalances()}
                            translation={tr}
                            locale={locale}
                            usdPricesEnabled={usdPricesEnabled}
                        />
                    </BalanceGridRoot>
                </Fade>
                : null }
            </BalanceSectionRoot>
        );
    }

    @action
    private toggleTokenBalanceContent = () => {
        this.tokenBalanceExpanded = !this.tokenBalanceExpanded;
    }
}
