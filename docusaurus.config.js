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
                    to: "docs/home",
                    activeBasePath: "docs",
                    label: "Docs",
                    position: "left",
                },
                {
                    href: "https://github.com/braposo/figma-graphql",
                    label: "GitHub",
                    position: "right",
                },
            ],
        },
        footer: {
            style: "dark",
            copyright: `Copyright © ${new Date().getFullYear()} figma-graphql. Built with Docusaurus.`,
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
