import {
    Resolver,
    Query,
    Arg,
    FieldResolver,
    Root,
    ResolverInterface,
    Ctx,
    ObjectType,
    Field,
    ID,
} from "type-graphql";
import { AppContext } from "../main";

@ObjectType()
export class File {
    @Field(() => ID)
    id: string;

    name: string;

    lastModified: Date;

    thumbnailUrl: string;

    version: string;

    //         # Get images for the file
    //         exports(params: ImageParams): [ExportResult]

    //         # Get comments for the file
    //         comments: [Comment]
}

export type FileRoot = {
    id: string;
};

@Resolver(() => File)
export class FileResolver implements ResolverInterface<File> {
    @Query(() => File)
    file(@Arg("id") id: string): FileRoot {
        return { id };
    }

    @FieldResolver(() => String)
    async name(@Root() file: FileRoot, @Ctx() ctx: AppContext): Promise<File["name"]> {
        const { name } = await ctx.dataSources.figmaAPI.getFileDetails(file.id);

        return name;
    }

    @FieldResolver(() => Date)
    async lastModified(
        @Root() file: FileRoot,
        @Ctx() ctx: AppContext
    ): Promise<File["lastModified"]> {
        const { lastModified } = await ctx.dataSources.figmaAPI.getFileDetails(file.id);

        return new Date(lastModified);
    }

    @FieldResolver(() => String)
    async thumbnailUrl(
        @Root() file: FileRoot,
        @Ctx() ctx: AppContext
    ): Promise<File["thumbnailUrl"]> {
        const { thumbnailUrl } = await ctx.dataSources.figmaAPI.getFileDetails(file.id);

        return thumbnailUrl;
    }

    @FieldResolver(() => String)
    async version(@Root() file: FileRoot, @Ctx() ctx: AppContext): Promise<File["version"]> {
        const { version } = await ctx.dataSources.figmaAPI.getFileDetails(file.id);

        return version;
    }
}
