import { APIErrorResult } from './model/errors'
import {CreateVideoInputModel, UpdateVideoInputModel} from './model/h01/video'
import {Resolutions} from './model/h01/resol'

export function checkCreate(body: CreateVideoInputModel) {
    var errors: APIErrorResult = {
        errorsMessages: []
    }

    if (body.title === undefined) errors.errorsMessages.push({
        message: "Property missing",
        field: "title"
    })
    else if (typeof body.title != "string") errors.errorsMessages.push({
        message: "Must be string",
        field: "title"
    })
    else if (body.title.length > 40) errors.errorsMessages.push({
        message: "Maximum length is 40",
        field: "title"
    })

    if (body.author === undefined) errors.errorsMessages.push({
        message: "Property missing",
        field: "author"
    })
    else if (typeof body.author != "string") errors.errorsMessages.push({
        message: "Must be string",
        field: "author"
    })
    else if (body.author.length > 20) errors.errorsMessages.push({
        message: "Maximum length is 20",
        field: "author"
    })

    if (body.availableResolutions === undefined) errors.errorsMessages.push({
        message: "Property missing",
        field: "availableResolutions"
    })
    else if (!Array.isArray(body.availableResolutions)) errors.errorsMessages.push({
        message: "Must be array",
        field: "availableResolutions"
    })
    else if(body.availableResolutions.find(p => !Resolutions[p])) errors.errorsMessages.push({
        message: "One of the resolutions is invaild", 
        field: "availableResolutions"
    })
    else if (body.availableResolutions.length == 0) errors.errorsMessages.push({
        message: "At least one resolution has to be added", 
        field: "availableResolutions"
    })

    return errors
}

export function checkUpdate(body: UpdateVideoInputModel) {
    var errors: APIErrorResult = checkCreate(body)

    if (body.canBeDownloaded !== undefined && typeof body.canBeDownloaded != "boolean") errors.errorsMessages.push({
        message: "Must be boolean", 
        field: "canBeDownloaded"
    })

    if (body.minAgeRestriction !== undefined) {
        if (typeof body.minAgeRestriction != "number") errors.errorsMessages.push({
            message: "Must be number", 
            field: "minAgeRestriction"
        })
        else if (body.minAgeRestriction > 18 || body.minAgeRestriction < 1) errors.errorsMessages.push({
            message: "Age restriction must be between 1 and 18", 
            field: "minAgeRestriction"
        })
    }

    if (body.publicationDate !== undefined) {
        if (typeof body.publicationDate != "string") errors.errorsMessages.push({
            message: "Must be string",
            field: "publicationDate"
        })
        else if (isNaN(new Date(body.publicationDate).getTime())) errors.errorsMessages.push({
            message: "Invalid datetime", 
            field: "publicationDate"
        })
    }

    return errors
}