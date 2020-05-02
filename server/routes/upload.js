 

const express = require('express');
const router = express.Router();


const multer = require('multer')

const path = require("path");
const fs = require("fs");


const mac_img = "/Users/tomas/Desktop/uploads/Images"
const mac_fol = "/Users/tomas/Desktop/uploads/Files"
const rasp_img = "/External/uploads/Images"
const rasp_fol = "/External/uploads/Files"

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, rasp_img)
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname)
    }
})
var storageFiles = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, rasp_fol)
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

const fileFilterFile = (req, file, cb) => {

    //Only doesnt store the file but doesnt give an error  
    if (file.mimetype !== 'image/jpeg' || file.mimetype !== "image/png") {
        cb(null, true)
    }

    else {
        // Gives an error and doesnt store the file
        cb(null, false)
    }
}

// upload path
const uploadImages = multer({
    storage: storage,
    fileFilter: fileFilter
})
const uploadFiles = multer({
    storage: storageFiles,
    fileFilter: fileFilterFile
})


/*
router.post('/', upload.single('myImage'), (req, res) => {
    let userData = req.body
    console.log(req.file)
    res.status(200).send(req.file)
})
*/


router.post('/files', uploadFiles.array('myFiles'), (req, res, next) => {

    console.log("Sono in Files" + req.file)
    res.status(200).send(req.file)
})

router.post('/images', uploadImages.array('myImages'), (req, res, next) => {

    console.log("Sono in Images" + req.file)
    res.status(200).send(req.file)
})



router.get("/getme", (req, res) => {
    console.log("***** " + path)
    res.sendFile("/Users/tomas/Desktop/uploads/Images/cio.JPG");
  });

  router.use('/images', express.static(path.join("/Users/tomas/Desktop/uploads/", 'Images/cio.JPG')));


//   
router.get('/test', (req, res) => {
    let specialEvents = [
      {
        "_id": "1",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(specialEvents)
  })




module.exports = router;