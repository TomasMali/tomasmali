

const express = require('express');
const router = express.Router();


const multer = require('multer')




var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/Volumes/Tomas - Server1/upload')
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    //Only doesnt store the file but doesnt give an error  
    if (file.mimetype === 'image/jpeg' || file.mimetype === "image/png") {
        cb(null, true)
    }

    else {
        // Gives an error and doesnt store the file
        cb(null, false)
    }
}

// upload path
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})

router.post('/', upload.single('myImage'), (req, res) => {
    let userData = req.body
    console.log(req.file)
    res.status(200).send(req.file)
})



router.post('/files', upload.array('myImages'), (req, res, next) => {

    console.log(req.file)
    res.status(200).send(req.file)
})



module.exports = router;