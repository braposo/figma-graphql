import {
    Client,
    FileImageParams,
    PostCommentParams,
    FileImageResponse,
    CommentsResponse,
    TeamProjectsResponse,
    ProjectFilesResponse,
    FileParams,
    Node,
    FileResponse,
} from "figma-js";
import { config } from "dotenv";
import { processNodes, groupNodes } from "./nodes";

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

type CustomFileResponse = {
    fileId: string;
    name: string;
    lastModified: string;
    thumbnailUrl: string;
    version: string;
    children: any;
    shortcuts: Record<string, Node[]>;
};

type FigmaResponse =
    | CustomFileResponse
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

type Values<O extends object> = O[keyof O];

type FigmaFunction =
    | ((id: string) => ReturnType<Values<typeof mapTypeToFunction>>)
    | ((
          id: string,
          params?: FileParams | FileImageParams | PostCommentParams
      ) => ReturnType<Values<typeof mapTypeToFunctionWithParams>>);

// Initialise cache
const cache = new Map();

function buildCustomFileReponse(data: FileResponse, id: string): CustomFileResponse {
    const { name, lastModified, thumbnailUrl, version, document, styles } = data;

    const [processedNodes, processedShortcuts] = processNodes(document, styles, id);

    return {
        fileId: id,
        name,
        lastModified,
        thumbnailUrl,
        version,
        children: processedNodes[0].children,
        shortcuts: groupNodes(processedShortcuts),
    };
}

async function getFigma<T extends FigmaResponse>({
    requestType,
    id,
    params,
    noCache = false,
}: FigmaOptions): Promise<T> {
    const key = `${id}_${requestType}`;

    if (noCache === false && params === undefined && cache.has(key)) {
        // eslint-disable-next-line no-console
        console.log("returning from cache", key);
        return cache.get(key);
    }
    // eslint-disable-next-line no-console
    console.log("fetching", key);

    const fn: FigmaFunction =
        params === undefined
            ? mapTypeToFunction[requestType]
            : mapTypeToFunctionWithParams[requestType];

    try {
        const { data } = await fn(id, { ...params });

        // We just need to parse the response if it's for a file, otherwise we return the raw data
        const processedData =
            "document" in data && requestType === RequestType.File
                ? buildCustomFileReponse(data, id)
                : data;

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

export const loadFile = (id: string, noCache: boolean = false): Promise<CustomFileResponse> =>
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
