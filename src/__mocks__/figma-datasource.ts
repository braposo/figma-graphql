import { TeamProjectsResponse, ProjectFilesResponse } from "figma-js";
import { RESTDataSource } from "apollo-datasource-rest";
import { ProcessedFile } from "figma-transformer";

export class FigmaAPI extends RESTDataSource {
    getTeamDetails = jest.fn(
        () =>
            new Promise<TeamProjectsResponse>((resolve) =>
                resolve({
                    name: "Team Name",
                    projects: [
                        { id: "project-1", name: "Project 1" },
                        { id: "project-2", name: "Project 2" },
                        { id: "project-3", name: "Project 3" },
                    ],
                })
            )
    );

    getProjectDetails = jest.fn(
        () =>
            new Promise<ProjectFilesResponse>((resolve) =>
                resolve({
                    name: "Project 1",
                    files: [
                        {
                            key: "file-1",
                            name: "File 1",
                            thumbnail_url: "url_1",
                            last_modified: "2019-08-22T22:40:27Z",
                        },
                        {
                            key: "file-2",
                            name: "File 2",
                            thumbnail_url: "url_2",
                            last_modified: "2020-04-12T14:23:59Z",
                        },
                        {
                            key: "file-3",
                            name: "File 3",
                            thumbnail_url: "url_3",
                            last_modified: "2019-05-06T18:02:49Z",
                        },
                    ],
                })
            )
    );

    getFileDetails = jest.fn(
        () =>
            new Promise<Partial<ProcessedFile>>((resolve) =>
                resolve({
                    fileId: "file-1",
                    name: "File 1",
                    thumbnailUrl: "url_1",
                    lastModified: "2019-05-06T18:02:49Z",
                    version: "version 1",
                })
            )
    );
}
