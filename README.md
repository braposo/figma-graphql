<p align="center">
  <a href="http://figma-graphql.party">
    <img width="150" src="./assets/logo.svg">
  </a>
</p>

<h1 align="center">
figma-graphql
</h1>

<div align="center">

The reimagined [Figma API](https://www.figma.com/developers) (super)powered by GraphQL

[![Build Status][build-badge]][travis] [![Code Coverage][coverage-badge]][coverage] ![Prettier format][prettier-badge] [![PRs Welcome][prs-badge]][prs] [![MIT License][license-badge]][license]

</div>

## Quick start

[![Open figma-graphql][codesandbox-badge]][codesandbox]

1. Open figma-graphql [sandbox][codesandbox] and fork it

2. Add your [Figma API Token](https://www.figma.com/developers/docs#access-tokens) as `FIGMA_TOKEN` in the [codesandbox secret keys](https://codesandbox.io/docs/secrets)

3. Have fun!

## Query examples

Here are some examples of what you can do with the Figma GraphQL API.

### Get a file's contents

```gql
{
    file(id: "KViUntEBJqK4gWfiwft5NObl") {
        name
        thumbnailUrl
        lastModified
        pages {
            name
            id
            type
            frames {
                id
                name
                clipsContent
                blendMode
                position {
                    x
                    y
                }
                size {
                    width
                    height
                }
                elements(type: "TEXT") {
                    name
                    type
                    characters
                    position {
                        x
                        y
                    }
                    size {
                        width
                        height
                    }
                    style {
                        fontSize
                        fontFamily
                        fontWeight
                        letterSpacing
                    }
                    strokes {
                        type
                    }
                    fill {
                        r
                        g
                        b
                        a
                    }
                }
            }
        }
    }
}
```

### Get just the image of a Node a file or the whole file

To get the whole file don't pass any more parameters.

```gql
{
    image(id: "KViUntEBJqK4gWfiwft5NObl") {
        images
    }
}
```

To get the image of node pass the id of that node as a parameter

```gql
{
    image(id: "KViUntEBJqK4gWfiwft5NObl", params: { ids: "16:19" }) {
        images
    }
}
```

### Get comments on a file

```gql
{
    comments(id: "KViUntEBJqK4gWfiwft5NObl") {
        id
        file_key
        parent_id
        user {
            img_url
            handle
        }
        created_at
        resolved_at
        message
        client_meta {
            node_offset {
                x
                y
            }
        }
    }
}
```

### Post a comment to a file

```gql
mutation {
    addComment(
        id: "KViUntEBJqK4gWfiwft5NObl"
        message: "Test from server"
    ) {
        id
        message
    }
}
```

You can also pass the coordinates where the comment should be placed as a parameter

```gql
mutation {
    addComment(
        id: "KViUntEBJqK4gWfiwft5NObl"
        message: "Test from server"
        params: { x: "12", y: "12" }
    ) {
        id
        message
    }
}
```

### Get all projects for a team

```gql
{
    projects(id: "484668844937890483") {
        id
        name
    }
}
```

### Get all files for a project

```gql
{
    projectFiles(project: "420878") {
        key
        name
        thumbnail_url
        last_modified
    }
}
```

## Developing

1.  Clone this repo
2.  Run `yarn install` to install all dependencies
3.  Run `FIGMA_TOKEN={YOUR_PERSONAL_FIGMA_TOKEN} yarn run dev`
4.  The Figma GraphQL playground should be available at `http://localhost:3001/`

## Figma file

This isn't really necessary but [here's the base Figma file](https://www.figma.com/file/KViUntEBJqK4gWfiwft5NObl/Style-guide) that is being used during development.

It should work with any file so can use your own Figma files and just replace `file(id: "KViUntEBJqK4gWfiwft5NObl")` with the id of the file you want to query.

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
