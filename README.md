<p align="center">
  <a href="http://figma-graphql.party">
    <img width="150" src="./static/img/logo.svg" />
  </a>
</p>

<h1 align="center">
figma-graphql
</h1>

<div align="center">

The reimagined [Figma API](https://www.figma.com/developers) (super)powered by GraphQL

[![Build Status][build-badge]][travis] [![Greenkeeper badge][greenkeeper-badge]][greenkeeper] [![Code Coverage][coverage-badge]][coverage] [![Known Vulnerabilities][snyk-badge]][snyk] [![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors) [![PRs Welcome][prs-badge]][prs] <br/> ![Prettier format][prettier-badge] [![Commitizen friendly][commitizen-badge]][commitizen] [![semantic-release][semantic-badge]][semantic] [![MIT License][license-badge]][license]

</div>

## Quick start

[![Open figma-graphql][codesandbox-badge]][codesandbox]

1. Open figma-graphql [sandbox][codesandbox] and fork it

2. Add your [Figma API Token](https://www.figma.com/developers/docs#access-tokens) as `FIGMA_TOKEN` in the [codesandbox secret keys](https://codesandbox.io/docs/secrets)

3. Try your first query!

```gql
{
    file(id: "cLp23bR627jcuNSoBGkhL04E") {
        name
    }
}
```

## Documentation

Please read the [full documentation][website] for additional examples and best practices.

## Developing

1.  Clone this repo
2.  Run `yarn install` to install all dependencies
3.  Run `FIGMA_TOKEN={YOUR_PERSONAL_FIGMA_TOKEN} yarn run dev` or add it to an `.env` file
4.  The Figma GraphQL playground should be available at `http://localhost:3001/`

## Figma file

This isn't really necessary but [here's the base Figma file](https://www.figma.com/file/cLp23bR627jcuNSoBGkhL04E/Style-guide) that is being used during development.

It should work with any file so can use your own Figma files and just replace `file(id: "cLp23bR627jcuNSoBGkhL04E")` with the id of the file you want to query.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://bernardoraposo.com"><img src="https://avatars2.githubusercontent.com/u/38172?v=4" width="100px;" alt=""/><br /><sub><b>Bernardo Raposo</b></sub></a><br /><a href="#question-braposo" title="Answering Questions">💬</a> <a href="https://github.com/braposo/figma-graphql/commits?author=braposo" title="Code">💻</a> <a href="https://github.com/braposo/figma-graphql/commits?author=braposo" title="Documentation">📖</a> <a href="#design-braposo" title="Design">🎨</a> <a href="#ideas-braposo" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/braposo/figma-graphql/pulls?q=is%3Apr+reviewed-by%3Abraposo" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/braposo/figma-graphql/commits?author=braposo" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://iamsaravieira.com"><img src="https://avatars0.githubusercontent.com/u/1051509?v=4" width="100px;" alt=""/><br /><sub><b>Sara Vieira</b></sub></a><br /><a href="https://github.com/braposo/figma-graphql/commits?author=SaraVieira" title="Code">💻</a> <a href="https://github.com/braposo/figma-graphql/commits?author=SaraVieira" title="Documentation">📖</a> <a href="https://github.com/braposo/figma-graphql/pulls?q=is%3Apr+reviewed-by%3ASaraVieira" title="Reviewed Pull Requests">👀</a></td>
    <td align="center"><a href="http://okonet.ru"><img src="https://avatars3.githubusercontent.com/u/11071?v=4" width="100px;" alt=""/><br /><sub><b>Andrey Okonetchnikov</b></sub></a><br /><a href="https://github.com/braposo/figma-graphql/commits?author=okonet" title="Documentation">📖</a> <a href="https://github.com/braposo/figma-graphql/commits?author=okonet" title="Code">💻</a></td>
    <td align="center"><a href="https://souporserious.com"><img src="https://avatars1.githubusercontent.com/u/2762082?v=4" width="100px;" alt=""/><br /><sub><b>Travis Arnold</b></sub></a><br /><a href="https://github.com/braposo/figma-graphql/commits?author=souporserious" title="Documentation">📖</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

[license-badge]: https://img.shields.io/npm/l/figma-graphql.svg?style=flat-square
[license]: https://github.com/braposo/figma-graphql/blob/master/LICENSE
[prs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square
[prs]: http://makeapullrequest.com
[codesandbox-badge]: https://codesandbox.io/static/img/play-codesandbox.svg
[codesandbox]: https://codesandbox.io/s/github/braposo/figma-graphql/
[prettier-badge]: https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square
[build-badge]: https://img.shields.io/travis/com/braposo/figma-graphql.svg?style=flat-square
[travis]: https://travis-ci.com/braposo/figma-graphql
[coverage-badge]: https://img.shields.io/codecov/c/github/braposo/figma-graphql.svg?style=flat-square
[coverage]: https://codecov.io/github/braposo/figma-graphql
[snyk-badge]: https://snyk.io/test/github/braposo/figma-graphql/badge.svg?style=flat-square
[snyk]: https://snyk.io/test/github/braposo/figma-graphql
[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square
[commitizen]: http://commitizen.github.io/cz-cli/
[semantic-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic]: https://github.com/semantic-release/semantic-release
[greenkeeper-badge]: https://badges.greenkeeper.io/braposo/figma-graphql.svg?style=flat-square
[greenkeeper]: https://greenkeeper.io/
[website]: https://figma-graphql.party
