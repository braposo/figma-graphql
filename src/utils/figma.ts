import {
    Client,
    FileImageParams,
    PostCommentParams,
    FileImageResponse,
    CommentsResponse,
    TeamProjectsResponse,
    ProjectFilesResponse,
    FileParams,
    Comment,
    FileResponse,
} from "figma-js";
import { config } from "dotenv";
import { processFile, ProcessedFile } from "figma-transformer";

config();

// Setup types
enum RequestType {
    File,
    Comments,
    Images,
    Projects,
    ProjectFiles,
    PostComment,
}

type FigmaOptions = {
    requestType: RequestType;
    id: string;
    params?: FileParams | FileImageParams | PostCommentParams;
    noCache?: boolean;
};

type FigmaResponse =
    | FileResponse
    | ProcessedFile
    | FileImageResponse
    | Comment
    | CommentsResponse
    | TeamProjectsResponse
    | ProjectFilesResponse;

// Initialise FigmaJS Client and import all necessary functions
const client = Client({
    personalAccessToken: process.env.FIGMA_TOKEN,
});

const { file, fileImages, comments, postComment, teamProjects, projectFiles } = client;

const mapTypeToFunctionWithParams = {
    [RequestType.File]: file,
    [RequestType.Images]: fileImages,
    [RequestType.PostComment]: postComment,
};

const mapTypeToFunction = {
    [RequestType.File]: file,
    [RequestType.Comments]: comments,
    [RequestType.Projects]: teamProjects,
    [RequestType.ProjectFiles]: projectFiles,
};

type Values<O extends Record<string, unknown>> = O[keyof O];

type FigmaFunction =
    | ((id: string) => ReturnType<Values<typeof mapTypeToFunction>>)
    | ((
          id: string,
          params?: FileParams | FileImageParams | PostCommentParams
      ) => ReturnType<Values<typeof mapTypeToFunctionWithParams>>);

// Initialise cache
const cache = new Map<string, FigmaResponse>();

async function getFigma<T extends FigmaResponse>({
    requestType,
    id,
    params,
    noCache = false,
}: FigmaOptions): Promise<T> {
    const key = `${id}_${requestType}`;

    if (noCache === false && params === undefined && cache.has(key)) {
        if (process.env.NODE_ENV === "development") {
            // eslint-disable-next-line no-console
            console.log("returning from cache", key);
        }

        const cachedFile = cache.get(key) as T;

        if (cachedFile !== undefined) {
            return cachedFile;
        }
    }

    if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.log("fetching", key);
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const fn: FigmaFunction =
        params === undefined
            ? mapTypeToFunction[requestType]
            : mapTypeToFunctionWithParams[requestType];

    try {
        const { data } = await fn(id, { ...params });

        // We just need to parse the response if it's for a file, otherwise we return the raw data
        const processedData =
            "document" in data && requestType === RequestType.File ? processFile(data, id) : data;

        // Only store data that doesn't change depending on the params
        // We store it even if noCache is true so we can update the cache
        if (params === undefined) {
            cache.set(key, processedData);
        }

        return processedData as T;
    } catch (e) {
        throw new Error(e);
    }
}

export const loadFile = (id: string, noCache: boolean = false): Promise<ProcessedFile> =>
    getFigma({ requestType: RequestType.File, id, noCache });

export const loadComments = (id: string, noCache: boolean = false): Promise<CommentsResponse> =>
    getFigma({ requestType: RequestType.Comments, id, noCache });

export const loadImages = (id: string, params: FileImageParams): Promise<FileImageResponse> =>
    getFigma({ requestType: RequestType.Images, id, params });

export const loadTeamProjects = (
    id: string,
    noCache: boolean = false
): Promise<TeamProjectsResponse> => getFigma({ requestType: RequestType.Projects, id, noCache });

export const loadProjectFiles = (
    id: string,
    noCache: boolean = false
): Promise<ProjectFilesResponse> =>
    getFigma({ requestType: RequestType.ProjectFiles, id, noCache });

export const createComment = (id: string, params: PostCommentParams): Promise<Comment> =>
    getFigma({ requestType: RequestType.PostComment, id, params });
