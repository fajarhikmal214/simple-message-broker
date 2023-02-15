import fs from 'fs'
import multer from 'multer'

class UploadFile {
    private upload

    constructor() {
        const storage = multer.diskStorage({
            destination: (_req, _file, cb) => {
                const path = `./tmp/uploads/`
                fs.mkdirSync(path, { recursive: true })
                cb(null, path)
            },
            filename: (_req, file, cb) => {
                cb(null, Date.now() + '-' + file.originalname)
            },
        })

        this.upload = multer({ storage: storage })
    }

    public Single(fileName: string) {
        return this.upload.single(fileName)
    }
}

export default UploadFile
