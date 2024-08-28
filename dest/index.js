"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.lastId = exports.db = exports.app = void 0;
const check_body_1 = require("./check-body");
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
const port = 3000;
exports.db = [];
exports.lastId = 0;
exports.app.get('/', (req, res) => {
    res.send("Hometask 1");
});
exports.app.delete('/hometask_01/api/testing/all-data', (req, res) => {
    while (exports.db.length > 0)
        exports.db.pop();
    exports.lastId = 0;
    res.sendStatus(204);
});
exports.app.get('/hometask_01/api/videos', (req, res) => {
    res.status(200).json(exports.db);
});
exports.app.post('/hometask_01/api/videos', (req, res) => {
    let body = req.body;
    const errors = (0, check_body_1.checkCreate)(body);
    if (errors.errorsMessages.length > 0) {
        res.status(400).json(errors);
        return;
    }
    exports.lastId = exports.lastId + 1;
    let video = Object.assign(Object.assign({ id: exports.lastId }, body), { canBeDownloaded: false, createdAt: (new Date()).toISOString(), publicationDate: (new Date(Date.now() + 1000 * 86400)).toISOString() });
    exports.db.push(video);
    res.status(201).json(video);
});
exports.app.get('/hometask_01/api/videos/:id', (req, res) => {
    let id = +(req.params.id);
    let video = exports.db.find(v => v.id == id);
    if (video)
        res.status(200).json(video);
    else
        res.sendStatus(404);
});
exports.app.put('/hometask_01/api/videos/:id', (req, res) => {
    let body = req.body;
    const errors = (0, check_body_1.checkUpdate)(body);
    if (errors.errorsMessages.length > 0) {
        res.status(400).json(errors);
        return;
    }
    let id = +(req.params.id);
    let index = exports.db.findIndex(v => v.id == id);
    if (index != -1) {
        exports.db[index] = Object.assign(Object.assign({ id: exports.db[index].id, createdAt: exports.db[index].createdAt }, body), { canBeDownloaded: body.canBeDownloaded || false });
        res.sendStatus(204);
    }
    else
        res.sendStatus(404);
});
exports.app.delete('/hometask_01/api/videos/:id', (req, res) => {
    let id = +(req.params.id);
    let index = exports.db.findIndex(v => v.id == id);
    if (index != -1) {
        exports.db.splice(index, 1);
        res.sendStatus(204);
    }
    else
        res.sendStatus(404);
});
exports.app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
