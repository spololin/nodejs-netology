const fs = require("fs");
const path = require("path");
const multer = require("multer");
const filePath = "public/books";
const dirname = path.join(path.dirname(__filename), "../", filePath);

if (!fs.existsSync(dirname)) {    
    fs.mkdirSync(dirname, { recursive: true }, (err) => {
        if (err) throw new Error(err);
    })
}

const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, filePath);
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

module.exports = multer({storage});