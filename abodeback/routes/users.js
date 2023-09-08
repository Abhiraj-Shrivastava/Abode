var express = require('express');
var router = express.Router();
var pool=require('./pool')

/* GET users listing. */
router.get('/all_vendor_property', function(req, res, next) {
  pool.query("select * from  ", function (error, result) {
    if (error) {
        console.log(error)
        return res.status(500).json({ data:[]})
    }
    else {

        return res.status(200).json({ data: result })
    }
})
});

router.post('/displayallcities', function (req, res, next) {
    console.log(req.body)
    if(req.body.stateid)
    {
        var q="select C.*,(select S.statename from states S where S.stateid=C.stateid) as statename from cities C where  C.stateid="+req.body.stateid+" "    
    }
    else
    {var q="select C.*,(select S.statename from states S where S.stateid=C.stateid) as statename from cities C where C.cityname like '%"+req.body.state_city+"%'"

    }
    console.log(q)
    pool.query(q,function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ status: false, error: error })
        }
        else {
            return res.status(200).json({ data: result })
        }
    })
});
router.post('/search_property_by_id', function (req, res, next) {

    pool.query("select V.*,(select S.subpropertyname from propertysubtype S where S.subpropertyid=V.subpropertyid) as propertysubtype,(select N.firstname from vendors N where N.mobileno=V.mobileno) as vendorfirstname,(select N.lastname from vendors N where N.mobileno=V.mobileno) as vendorlastname from vendorproperties V where vendorpropertyid=?",[req.body.vpid], function (error, result) {
        if (error) {
            return res.status(500).json({ status: false, error: error })
        }
        else {
            return res.status(200).json({ data: result })
        }
    })
});



router.post('/displayallproperties', function (req, res, next) {
    console.log(req.body)
    var q="select P.* from vendorproperties P where P.address like '%"+req.body.cityname+"%'"
    console.log(q)
    pool.query(q, function (error, result) {
        if (error) {
            return res.status(500).json({ status: false, error: error })
        }
        else {
            return res.status(200).json({ data: result })
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
