import {Resolutions} from './resol'

export type Video = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction?: number,
    createdAt: string,
    publicationDate: string,
    availableResolutions?: Resolutions[]
}

export type UpdateVideoInputModel = {
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction?: number,
    publicationDate: string,
    availableResolutions?: Resolutions[]
}

export type CreateVideoInputModel = {
    title: string,
    author: string,
    availableResolutions?: Resolutions[]
}