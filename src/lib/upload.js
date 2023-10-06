const multer = require('multer')

const storageImage = multer.memoryStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/images/'); // Here './uploads/images/' is the path where the images will be saved. Make sure this directory exists.
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname); // This gives a unique name to each file.
    },
});

const uploadImage = multer({ storage: storageImage }).single('avatar')

module.exports ={
    uploadImage,
}