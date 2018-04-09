# figma-graphql

This is a **very experimental** GraphQL connector for the new [Figma Web API](https://www.figma.com/developers)

## How to use this?

There's a live version of this at [https://graphqlbin.com/v2/j2LQcn](https://graphqlbin.com/v2/j2LQcn)

If you want to play with it then:

1.  Clone this repo
2.  Run `yarn install`
3.  Run `yarn run dev`
4.  Go to `http://localhost:3001/` and have fun!

## Query examples

This is still in the very beginning but there's already a few useful things we can get from this API.

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

## Figma file

This isn't really necessary but [here's the base Figma file](https://www.figma.com/file/KViUntEBJqK4gWfiwft5NObl/Style-guide) that is being used during development.

It should work with any file so can use your own Figma files and just replace `file(id: "KViUntEBJqK4gWfiwft5NObl")` with the id of the file you want to query.
