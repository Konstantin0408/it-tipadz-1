"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCreate = checkCreate;
const resol_1 = require("./model/h01/resol");
function checkCreate(body) {
    var errors = {
        errorsMessages: []
    };
    if (body.title.length > 40)
        errors.errorsMessages.push({
            message: "Maximum length is 40",
            field: "title"
        });
    if (body.author.length > 20)
        errors.errorsMessages.push({
            message: "Maximum length is 20",
            field: "author"
        });
    if (!Array.isArray(body.availableResolutions) || body.availableResolutions
        .find(p => !resol_1.Resolutions[p]))
        errors.errorsMessages.push({
            message: "One of the resolutions is invaild",
            field: "availableResolutions"
        });
    return errors;
}
