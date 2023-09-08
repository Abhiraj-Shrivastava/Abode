var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require("./multer")
var fs= require('fs')

/* GET home page. */
router.post('/addnewcity', upload.any(), function (req, res, next) {
    var temp={}
    var i=0
    req.files.map((item,index)=>{
        temp[i]=item.filename
        i++
     })
    console.log(req.body)
    pool.query("insert into cities(stateid,cityname,picture)values(?,?,?)", [req.body.stateid, req.body.cityname, JSON.stringify(temp)], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ status: false, error: error })
        }
        else {
            return res.status(200).json({ status: true })
        }
    })
});

router.get('/displayallcities', function (req, res, next) {
    console.log(req.body)
    pool.query("select C.*,(select S.statename from states S where S.stateid=C.stateid)as statename from cities C", function (error, result) {
        if (error) {
            return res.status(500).json({ status: false, error: error })
        }
        else {
            return res.status(200).json({ data: result })
        }
    })
});
router.post('/fetchallcities', function (req, res, next) {
    console.log(JSON.stringify(req.body))
    pool.query("select * from cities where stateid=?  ",[req.body.stateid], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ status: false, error: error })
        }
        else {

            return res.status(200).json({ data: result })
        }
    })
});
router.post('/updatecity', function (req, res, next) {
    console.log(req.body)
    pool.query("update cities set cityname=?,stateid=? where cityid=?", [req.body.cityname, req.body.stateid,req.body.cityid], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ status: false, error: error })
        }
        else {
            return res.status(200).json({ status: true })
        }
    })
});
router.post('/updatecitypicture',upload.single('picture'), function (req, res, next) {
    console.log(req.body)
    console.log(req.file)
    pool.query("update cities set picture=? where cityid=?", [req.ufilename,req.body.cityid], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ status: false, error: error })
        }
        else {
            fs.unlinkSync('d:/abodebackend/public/images/'+req.body.oldpicture)
            return res.status(200).json({ status: true })
        }
    })
});

router.post('/deletecity', function (req, res, next) {
    console.log(req.body)
    pool.query("delete from cities where cityid=?", [req.body.cityid], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ status: false, error: error })
        }
        else {
            return res.status(200).json({ status: true })
        }
    })
});


router.post('/addnewstates',upload.single('picture'), function (req, res, next) {
    console.log(req.body)
    pool.query("insert into states(statename,picture)values(?,?)", [req.body.statename, req.ufilename], function (error, result) {
        if (error) {
            return res.status(500).json({ status: false, error: error })
        }
        else {
            return res.status(200).json({ status: true })
        }
    })
});
router.post('/updatestatepicture',upload.single('picture'), function (req, res, next) {
    console.log(req.body)
    console.log(req.file)
    pool.query("update states set picture=? where stateid=?", [req.ufilename,req.body.stateid], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ status: false, error: error })
        }
        else {
            
             fs.unlinkSync('d:/abodebackend/public/images/'+req.body.oldpicture)
            return res.status(200).json({ status: true })
        }
    })
});

router.post('/updatestate', function (req, res, next) {
    console.log(req.body)
    pool.query("update states set statename=? where stateid=?", [req.body.statename, req.body.stateid], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ status: false, error: error })
        }
        else {
            return res.status(200).json({ status: true })
        }
    })
});

router.post('/deletestate', function (req, res, next) {
    console.log(req.body)
    pool.query("delete from states where stateid=?", [req.body.stateid], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ status: false, error: error })
        }
        else {
            return res.status(200).json({ status: true })
        }
    })
});

router.get('/displayallstates', function (req, res, next) {
    console.log(req.body)
    pool.query("select * from states", function (error, result) {
        if (error) {
            return res.status(500).json({ status: false, error: error })
        }
        else {
            return res.status(200).json({ data: result })
        }
    })
});

module.exports = router;