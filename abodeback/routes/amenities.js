var express = require('express');
var router = express.Router();
var pool=require('./pool');
var fs=require('fs')
var upload = require("./multer");

/* GET home page. */
router.post('/addnewamenities', function(req, res, next) {
    console.log(req.body)
   
pool.query("insert into amenities set ?",[req.body],function(error,result){
    if(error){
        console.log(error)
        return res.status(500).json({status:false,error:error})
    }
    else
    {
        return res.status(200).json({status:true})
    }
})
});

router.post('/updateamenities', function(req, res, next) {
    console.log(req.body)
   
pool.query("update amenities set amenities=? where amenitiesid=?",[req.body.amenities,req.body.amenitiesid],function(error,result){
    if(error){
        console.log(error)
        return res.status(500).json({status:false,error:error})
    }
    else
    {
        return res.status(200).json({status:true})
    }
})
});

router.post('/deleteamenities', function (req, res, next) {
    console.log(req.body)
    pool.query("delete from amenities where amenitiesid=?", [req.body.amenitiesid], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ status: false, error: error })
        }
        else {
            return res.status(200).json({ status: true })
        }
    })
});

router.get('/displayallamenities', function(req, res, next) {
   
pool.query("select * from amenities",function(error,result){
    if(error){console.log(error)
        return res.status(500).json({status:false,error:error})
    }
    else
    {
        console.log(result)
        return res.status(200).json({data: result})
    }
})
});


router.post('/addnewamenitiesoption', upload.single('icon'), function(req, res, next) {
    console.log(req.body)
   
pool.query("insert into amenitiesoptions(amenitiesid,optionname,icon)values(?,?,?)",[req.body.amenitiesid,req.body.optionname,req.ufilename],function(error,result){
    if(error){
        console.log(error)
        return res.status(500).json({status:false,error:error})
    }
    else
    {
        return res.status(200).json({status:true})
    }
})
});

router.get('/displayallamenitiesoptions', function(req, res, next) {
    console.log(req.body)
   
pool.query("select O.*,(select A.amenities from amenities A where A.amenitiesid=O.amenitiesid)as amenities from amenitiesoptions O",function(error,result){
    if (error) {
        console.log(error)
        return res.status(500).json({ status: false, error: error })
    }
    else {
        return res.status(200).json({ data: result })
    }
})
});

router.get('/displayallamenities_vendor', function(req, res, next) {
    console.log(req.body)
   
pool.query("select O.*,(select A.amenities from amenities A where A.amenitiesid=O.amenitiesid)as amenities,GROUP_CONCAT(JSON_OBJECT('optionname',O.optionname,'optionid',O.optionsid,'icon',O.icon)) as optionlist from amenitiesoptions O group by O.amenitiesid",function(error,result){
    if (error) {
        console.log(error)
        return res.status(500).json({ status: false, error: error })
    }
    else {
        return res.status(200).json({ data: result })
    }
})
});


router.post('/updateamenitiesoptions', function(req, res, next) {
    console.log(req.body)
   
pool.query("update amenitiesoptions set amenitiesid=?,optionname=? where optionsid=?",[req.body.amenitiesid,req.body.optionname,req.body.optionsid],function(error,result){
    if(error){
        console.log(error)
        return res.status(500).json({status:false,error:error})
    }
    else
    {
        return res.status(200).json({status:true})
    }
})
});
router.post('/updateoptionicon',upload.single('icon'), function (req, res, next) {
    console.log(req.body)
    console.log(req.file)
    pool.query("update amenitiesoptions set icon=? where optionsid=?", [req.ufilename,req.body.optionsid], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ status: false, error: error })
        }
        else {
            fs.unlinkSync('d:/abodebackend/public/images/'+req.body.oldicon)
            return res.status(200).json({ status: true })
        }
    })
});
 

router.post('/deleteamenitiesoptions', function (req, res, next) {
    console.log(req.body)
    pool.query("delete from amenitiesoptions where optionsid=?", [req.body.optionsid], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ status: false, error: error })
        }
        else {
            return res.status(200).json({ status: true })
        }
    })
});





module.exports=router;