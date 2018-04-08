# figma-graphql

This is a **very experimental** GraphQL connector for the new [Figma Web API](https://www.figma.com/developers)

## How to use this?

There's a live version of this at [https://figma-graphql.now.sh/](<https://figma-graphql.now.sh/?query=%7B%0A%20%20%20%20file(id%3A%20%22KViUntEBJqK4gWfiwft5NObl%22)%20%7B%0A%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20thumbnailUrl%0A%20%20%20%20%20%20%20%20lastModified%0A%20%20%20%20%20%20%20%20pages%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%20%20%20%20type%0A%20%20%20%20%20%20%20%20%20%20%20%20frames%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20clipsContent%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20blendMode%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20elements(type%3A%20%22TEXT%22)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20name%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20type%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20characters%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20fill%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20r%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20g%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20b%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20a%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%7D>)

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
        elements(type: "TEXT") {
          name
          type
          characters
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
