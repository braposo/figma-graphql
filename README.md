# figma-graphql

This is a **very experimental** GraphQL connector for the new [Figma Web API](https://www.figma.com/developers)

## How to use this?

There's a live version of this at [https://www.graphqlbin.com/v2/lOM4TX](https://www.graphqlbin.com/v2/lOM4TX)

If you want to play with it then:

1.  Clone this repo
2.  Run `yarn install`
3.  Run `yarn run dev`
4.  Go to `http://localhost:3001/` and have fun!

## Query example

This is still in the very beginning but there's already a few useful things we can get from the files.

Here's an example of what you can do at this point:

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

## Figma file

This isn't really necessary but [here's the base Figma file](https://www.figma.com/file/KViUntEBJqK4gWfiwft5NObl/Style-guide) that is being used during development.

It should work with any file so can use your own Figma files and just replace `file(id: "KViUntEBJqK4gWfiwft5NObl")` with the id of the file you want to query.
