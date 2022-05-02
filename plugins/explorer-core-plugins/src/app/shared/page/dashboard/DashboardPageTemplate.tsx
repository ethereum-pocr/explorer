import * as React from "react";
import { Container } from "@alethio/ui/lib/layout/Container";
import { Content } from "@alethio/ui/lib/layout/Content";
import { IPageTemplateProps } from "plugin-api/IPageDef";
import styled from "@alethio/explorer-ui/lib/styled-components";
import { DashboardPageSlotType } from "./dashboardPage";
import { DashboardContentCenter } from "app/shared/page/dashboard/DashboardContentCenter";
import { Title } from "app/shared/page/dashboard/Title";
import { SubTitle } from "app/shared/page/dashboard/SubTitle";

const GithubLink = styled.a`
	color: ${({ theme }) => theme.colors.base.accent.color};
    opacity: 1;
    transition: opacity linear 100ms;
    text-decoration: none;

    &:hover {
        opacity: 0.8;
    }

    &:visited {
        color: ${({ theme }) => theme.colors.base.accent.color};
    }
`;

/** Mobile padding wrapper */
const ModuleWrapper = styled.div`
    padding: 0 8px;
`;

export interface IDashboardPageTemplateProps extends IPageTemplateProps<DashboardPageSlotType> {

}

export class DashboardPageTemplate extends React.Component<IDashboardPageTemplateProps> {

    render() {
        let { translation: tr, slots } = this.props;

        let [preGitHubLink, postGitHubLink] = tr.get("dashboardView.subTitle").split("{gitHubLink}");
        let hasGitHubLink = !!postGitHubLink;

        return (
            <Container>
                <Content>
                    <DashboardContentCenter>
                        <Title>{tr.get("dashboardView.title")}</Title>
                        <SubTitle><span dangerouslySetInnerHTML={{ __html: preGitHubLink }} />
                            {hasGitHubLink && <>
                                <GithubLink href="https://github.com/Alethio/ethereum-lite-explorer"
                                    target="_blank"
                                >GitHub</GithubLink>
                                <span dangerouslySetInnerHTML={{ __html: postGitHubLink }} />
                            </>}
                        </SubTitle>
                        <ModuleWrapper>
                            {slots[DashboardPageSlotType.Content]}
                        </ModuleWrapper>
                    </DashboardContentCenter>
                </Content>
            </Container>
        );
    }
}
