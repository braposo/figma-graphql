import React from "react";
import classnames from "classnames";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./styles.module.css";

function Home() {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;
    return (
        <Layout title={siteConfig.tagline} description={siteConfig.tagline}>
            <header className={classnames("hero", styles.heroBanner)}>
                <div className="container">
                    <div className="row">
                        <div className="col col--6">
                            <h1 className="hero__title">{siteConfig.tagline}</h1>
                            <p className="hero__subtitle">
                                Get everything you need from your design files without even opening
                                them.
                            </p>
                            <div className={styles.buttons}>
                                <Link
                                    className={classnames(
                                        "button button--primary button--lg",
                                        styles.getStarted
                                    )}
                                    to={useBaseUrl("docs/introduction")}
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>
                        <div className={classnames("col col--6", styles.code)}>
                            <img
                                alt="figma-graphql code example"
                                src={useBaseUrl("img/code.svg")}
                            />
                        </div>
                    </div>
                </div>
            </header>
        </Layout>
    );
}

export default Home;
