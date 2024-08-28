import {Video, CreateVideoInputModel, UpdateVideoInputModel} from './model/h01/video'

import {checkCreate, checkUpdate} from './check-body'

import express, {Request} from 'express'
export const app = express()
app.use(express.json())
const port = 3000

export const db: Video[] = []
export var lastId = 0

app.get('/', (req: any, res: any) => {
	res.send("Hometask 1")
})

app.delete('/hometask_01/api/testing/all-data', (req: any, res: any) => {
	while (db.length > 0) db.pop()
	lastId = 0
	res.sendStatus(204)
})

app.get('/hometask_01/api/videos', (req: any, res: any) => {
	res.status(200).json(db)
})


app.post('/hometask_01/api/videos', (req: Request<any, any, CreateVideoInputModel>, res: any) => {
    let body: CreateVideoInputModel = req.body
    const errors = checkCreate(body)
    if (errors.errorsMessages.length > 0) {
        res.status(400).json(errors)
        return
    }
    lastId = lastId + 1
    let video: Video = {
		id: lastId,
		...body,
		canBeDownloaded: false,
		createdAt: (new Date()).toISOString(),
        publicationDate: (new Date(Date.now() + 1000*86400)).toISOString()
    }
    db.push(video)
    res.status(201).json(video)
})

app.get('/hometask_01/api/videos/:id', (req: Request, res: any) => {
	let id = +(req.params.id)
	let video = db.find(v => v.id == id)
	if (video) res.status(200).json(video)
	else res.sendStatus(404)
})

app.put('/hometask_01/api/videos/:id', (req: Request<any, any, UpdateVideoInputModel>, res: any) => {
	let body: UpdateVideoInputModel = req.body
    const errors = checkUpdate(body)
    if (errors.errorsMessages.length > 0) {
        res.status(400).json(errors)
        return
    }
	let id = +(req.params.id)
	let index = db.findIndex(v => v.id == id)
	if (index != -1) {
		db[index] = {
			id: db[index].id,
			createdAt: db[index].createdAt,
			...body,
			canBeDownloaded: body.canBeDownloaded || false
		}
		res.sendStatus(204)
	}
	else res.sendStatus(404)
})

app.delete('/hometask_01/api/videos/:id', (req: any, res: any) => {
	let id = +(req.params.id)
	let index = db.findIndex(v => v.id == id)
	if (index != -1) {
		db.splice(index, 1)
		res.sendStatus(204)
	}
	else res.sendStatus(404)
})

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})