import { TeamResolver } from "./teams-resolver";
import { ProjectResolver } from "./projects-resolver";
import { FileResolver } from "./files-resolver";

export default [TeamResolver, ProjectResolver, FileResolver] as const;
