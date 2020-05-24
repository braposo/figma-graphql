module.exports = {
    title: "figma-graphql",
    tagline: "The human-friendly Figma API",
    url: "https://figma-graphql.com",
    baseUrl: "/",
    favicon: "img/favicon.ico",
    organizationName: "braposo",
    projectName: "figma-graphql",
    themeConfig: {
        navbar: {
            title: "figma-graphql",
            logo: {
                alt: "figma-graphql logo",
                src: "img/logo.svg",
            },
            links: [
                {
                    to: "docs/introduction",
                    activeBasePath: "docs",
                    label: "Docs",
                    position: "left",
                },
                {
                    href: "/playground",
                    label: "Playground",
                    position: "left",
                },
                {
                    href: "https://github.com/braposo/figma-graphql/tree/v2",
                    label: "GitHub",
                    position: "right",
                },
            ],
        },
        footer: {
            style: "dark",
            copyright: `Copyright © ${new Date().getFullYear()} figma-graphql. Built with Docusaurus.`,
        },
        announcementBar: {
            id: "supportus",
            content:
                '⚠ This is a <em>work in progress</em> for the upcoming v2 release. For the stable release, please visit <a target="_blank" rel="noopener noreferrer" href="https://figma-graphql.party">the v1 website</a>. ⚠',
        },
        prism: {
            theme: require("prism-react-renderer/themes/palenight"),
            darkTheme: require("prism-react-renderer/themes/palenight"),
        },
    },
    presets: [
        [
            "@docusaurus/preset-classic",
            {
                docs: {
                    path: "docs/content",
                    sidebarPath: require.resolve("./docs/config/sidebars.js"),
                    editUrl: "https://github.com/braposo/figma-graphql/edit/master/",
                },
                pages: {
                    path: "docs/pages",
                },
                theme: {
                    customCss: require.resolve("./docs/config/custom.css"),
                },
            },
        ],
    ],
};
