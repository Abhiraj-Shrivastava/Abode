var multer = require('multer');
const {uuid}= require('uuidv4');

var serverpath = multer.diskStorage({

    destination: (req, file, path) => {
        path(null, "public/images");
    },
    filename: (req, file, path) => {
        var ext=file.originalname.substring(file.originalname.lastIndexOf("."))
        req['ufilename']=uuid()+ext
       
        path(null, req.ufilename);
        
    },
});

var upload = multer({ storage: serverpath });
module.exports = upload;