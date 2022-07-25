const multer = require('multer');
const path = require('path');


function uploadfiles(filename, file){
    let storage = multer.diskStorage({
        destination: `./upload/${filename}`,
        filename: (req, file, cb) =>{
            return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
        }
    })

    let upload = multer({ storage: storage });

    if(filename == 'avatar'){
        upload.single('avatar')
    }
    if(filename == 'profile'){
        upload.single('profile')
    }
}


module.exports.uploadfiles = uploadfiles;