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
import { filterNodes } from "../utils/nodes";
import { AppContext } from "../main";
import { File, FileRoot } from "./files-resolver";

@ObjectType()
export class Project {
    @Field(() => ID)
    id: string;

    name: string;

    files: FileRoot[];
}

export interface ProjectRoot {
    id: string;
}

@Resolver(() => Project)
export class ProjectResolver implements ResolverInterface<Project> {
    @Query(() => Project)
    project(@Arg("id") id: string): ProjectRoot {
        return { id };
    }

    @FieldResolver(() => String)
    async name(@Root() project: ProjectRoot, @Ctx() ctx: AppContext): Promise<Project["name"]> {
        const { name } = await ctx.dataSources.figmaAPI.getProjectDetails(project.id);

        return name;
    }

    @FieldResolver(() => [File])
    async files(
        @Root() project: ProjectRoot,
        @Ctx() ctx: AppContext,
        @Arg("name", { nullable: true }) name?: string
    ): Promise<Project["files"]> {
        const { files } = await ctx.dataSources.figmaAPI.getProjectDetails(project.id);

        return filterNodes(files, { name }).map(({ key }) => ({ id: key, name }));
    }
}
