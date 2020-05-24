import { RESTDataSource, RequestOptions, Request } from "apollo-datasource-rest";
import {
    TeamProjectsResponse,
    ProjectFilesResponse,
    FileResponse,
    CommentsResponse,
} from "figma-js";
import { processFile, ProcessedFile } from "figma-transformer";

type CacheOptions = {
    cacheOptions?: { ttl?: number };
};

type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };

export class FigmaAPI extends RESTDataSource {
    // Cache results for 10 minutes by default
    getCacheOptions = (ttl: number = 600): CacheOptions =>
        ttl === 0 ? {} : { cacheOptions: { ttl } };

    memoizedFetches = new Map<string, Promise<ProcessedFile>>();

    constructor() {
        super();
        this.baseURL = "https://api.figma.com/v1/";
    }

    willSendRequest(request: RequestOptions): void {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        request.headers.set("X-Figma-Token", this.context.token);
    }

    cacheKeyFor(request: Request): string {
        return request.url;
    }

    async getTeamDetails(
        teamId: string,
        cacheTTL?: number
    ): Promise<DeepWriteable<TeamProjectsResponse>> {
        return this.get(`teams/${teamId}/projects`, {}, this.getCacheOptions(cacheTTL));
    }

    async getProjectDetails(
        projectId: string,
        cacheTTL?: number
    ): Promise<DeepWriteable<ProjectFilesResponse>> {
        return this.get(`projects/${projectId}/files`, {}, this.getCacheOptions(cacheTTL));
    }

    async getFileDetails(fileId: string, cacheTTL?: number): Promise<ProcessedFile> {
        // Check if we already have a pending request
        let filePromise = this.memoizedFetches.get(fileId);
        if (filePromise) {
            return filePromise;
        }

        // Wrap file get request and resolve the promise with the processed file
        // We do this to avoid having to process the file multiple
        filePromise = new Promise((resolve, reject) => {
            this.get<FileResponse>(`files/${fileId}`, {}, this.getCacheOptions(cacheTTL))
                .then((file) => resolve(processFile(file, fileId)))
                .catch((reason) => {
                    reject(reason);
                });
        });

        // Store promise
        this.memoizedFetches.set(fileId, filePromise);

        return filePromise;
    }

    async getComments(fileId: string, cacheTTL?: number): Promise<DeepWriteable<CommentsResponse>> {
        return this.get(`files/${fileId}/comments`, {}, this.getCacheOptions(cacheTTL));
    }
}
