import React from "react";
import { ErrorBox } from "@alethio/ui/lib/ErrorBox";
import { IPageDef, IPageTemplateProps } from "plugin-api/IPageDef";
import { Container } from "@alethio/ui/lib/layout/Container";
import { Sidebar } from "@alethio/ui/lib/layout/sidebar/Sidebar";
import { SidebarPageTitle } from "@alethio/ui/lib/layout/sidebar/SidebarPageTitle";
import { Content } from "@alethio/ui/lib/layout/Content";
import { LogoContainer } from "@alethio/ui/lib/layout/sidebar/LogoContainer";
import { Logo } from "app/eth-common/page/block/component/Logo";

export interface ITokenPageContext {
    accountHash: string;
    owner?: string;
}

export enum TokenPageSlotType {
    Top = "top",
    Transfer = "transfer"
}

export const tokenContextType = {
    accountHash: "string",
    owner: "string"
} as const;

const nohex =  (a: string) => `${a.replace(/^0x/, "")}`;
const hex =  (a: string) => `0x${nohex(a)}`;

export const tokenPage: IPageDef<TokenPageSlotType, ITokenPageContext> = {
    contextType: tokenContextType,
    paths: {
        "/token/:address": params => ({
            accountHash: nohex(params.address), owner: undefined
        })
    },
    buildCanonicalUrl: ({ accountHash }) => `/token/${hex(accountHash)}`,
    hasSidebar: true,
    getPageTemplate: () => TokenPageTemplate,
    getErrorPlaceholder(data) {
        let { translation } = data;

        return <ErrorBox>
            <span dangerouslySetInnerHTML={{__html: translation.get("tokenView.content.noData.text") }} />
        </ErrorBox>;
    }
};

export interface ITokenTemplateProps extends IPageTemplateProps<TokenPageSlotType> {

}

export class TokenPageTemplate extends React.Component<ITokenTemplateProps> {
    render() {
        let { translation: tr } = this.props;
        let { slots } = this.props;

        return (
            <Container>
                <Sidebar sticky>
                    <SidebarPageTitle>{ tr.get("tokenView.sidebar.title") }</SidebarPageTitle>
                    <LogoContainer>
                        <Logo>{tr.get("tokenView.sidebar.logo")}</Logo>
                    </LogoContainer>
                </Sidebar>
                <Content>
                    { slots && slots[TokenPageSlotType.Top] }
                    { slots && slots[TokenPageSlotType.Transfer] }
                </Content>
            </Container>
        );
    }
}
