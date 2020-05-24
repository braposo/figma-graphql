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
import { Project, ProjectRoot } from "./projects-resolver";

@ObjectType()
export class Team {
    @Field(() => ID)
    id: string;

    name: string;

    projects: ProjectRoot[];
}

interface TeamRoot {
    id: string;
    cacheTTL?: number;
}

@Resolver(() => Team)
export class TeamResolver implements ResolverInterface<Team> {
    @Query(() => Team)
    team(@Arg("id") id: string, @Arg("cacheTTL", { nullable: true }) cacheTTL?: number): TeamRoot {
        return { id, cacheTTL };
    }

    @FieldResolver(() => String)
    async name(@Root() team: TeamRoot, @Ctx() ctx: AppContext): Promise<Team["name"]> {
        const { name } = await ctx.dataSources.figmaAPI.getTeamDetails(team.id, team.cacheTTL);

        return name;
    }

    @FieldResolver(() => [Project])
    async projects(
        @Root() team: TeamRoot,
        @Ctx() ctx: AppContext,
        @Arg("name", { nullable: true }) name?: string
    ): Promise<Team["projects"]> {
        const { projects } = await ctx.dataSources.figmaAPI.getTeamDetails(team.id, team.cacheTTL);

        return filterNodes(projects, { name }).map(({ id }) => ({ id }));
    }
}
