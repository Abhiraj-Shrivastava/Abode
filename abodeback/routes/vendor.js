var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload = require("./multer")

/* GET home page. */
router.post('/addnewvendors', function(req, res, next) {
    console.log(req.body)
    req.body.dob=req.body.dob.split("T")[0]
pool.query("insert into vendors(emailid,mobileno,firstname,lastname,dob)values(?,?,?,?,?)",[req.body.emailid,req.body.mobilenumber,req.body.firstname,req.body.lastname,req.body.dob],function(error,result){
    if(error){
        console.log(error)
        return res.status(500).json({status:false,error:error})
    }
    else
    {
        pool.query("insert into vendorproperties( emailid, mobileno, propertyid, subpropertyid, propertystatus, address, placeoffer, amenities, pictures, placedescription, title, price, offerprice)values(?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.emailid,req.body.mobilenumber,null,null,null,null,null,null,null,null,null,null,null],function(error,result){

        })
        return res.status(200).json({status:true})
    }
})
});

router.post('/updatevendor', function(req, res, next) {
    console.log(req.body)
    req.body.dob=req.body.dob.split("T")[0]
pool.query("update vendors set firstname=?,lastname=?,dob=? where mobileno=? and emailid=?",[req.body.firstname,req.body.lastname,req.body.dob,req.body.mobilenumber,req.body.emailid],function(error,result){
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

router.post('/deletevendor', function (req, res, next) {
    console.log(req.body)
    pool.query("delete from vendors where emailid=? and mobileno=?", [req.body.emailid,req.body.mobilenumber], function (error, result) {
        if (error) {
            console.log(error)
            return res.status(500).json({ status: false, error: error })
        }
        else {
            return res.status(200).json({ status: true })
        }
    })
});

router.get('/displayallvendors', function(req, res, next) {
    console.log(req.body)
pool.query("select * from vendors",function(error,result){
    if(error){console.log(error)
        return res.status(500).json({status:false,error:error})
    }
    else
    {
        return res.status(200).json({data:result})
    }
})
});

router.post('/search_vendor_mobileno', function(req, res, next) {
pool.query("select * from vendors where mobileno=?",req.body.mobileno,function(error,result){
 if(error)
 {console.log(error)
    res.status(500).json({status:false})
 }  
 else{
   if(result.length==0)
   {
    res.status(200).json({status:false})

   }
   else{
    res.status(200).json({status:true,data:result[0]})
   }
 } 
})
});

//vendor by mobile no./emailid

router.post('/search_vendor_property', function(req, res, next) {
    pool.query("select * from vendorproperties where mobileno=?",req.body.mobileno,function(error,result){
     if(error)
     {console.log(error)
        res.status(500).json({status:false})
     }  
     else{
       if(result.length==0)
       {
        res.status(200).json({status:false})
    
       }
       else{
        res.status(200).json({status:true,data:result[0]})
       }
     } 
    })
    });


router.post('/update_vendor_properties',function(req,res,next){

    var option=req.body.opr

    switch(option)
    {
        case 'ADD_VENDOR_PROPERTIES':
    pool.query("update vendorproperties set propertyid=? where mobileno=?",[req.body.propertyid,req.body.mobileno],function(error,result){


        if(error)
        {
            return res.status(500).json({status:false})
        }
        else
        {
            return res.status(200).json({status:true})
        }
    })
    break;

    case 'ADD_VENDOR_SUBPROPERTIES':
    pool.query("update vendorproperties set subpropertyid=? where mobileno=?",[req.body.subpropertyid,req.body.mobileno],function(error,result){


        if(error)
        {
            return res.status(500).json({status:false})
        }
        else
        {
            return res.status(200).json({status:true})
        }
    })

    break;
    case 'ADD_VENDOR_PROPERTYSTATUS':
        console.log(req.body)
    pool.query("update vendorproperties set propertystatus=? where mobileno=?",[req.body.propertystatus,req.body.mobileno],function(error,result){


        if(error)
        {console.log(error)
            return res.status(500).json({status:false})
        }
        else
        {
            return res.status(200).json({status:true})
        }
    })

    break;

    case 'ADD_VENDOR_ADDRESS':
        console.log(req.body.address)
    pool.query("update vendorproperties set address=? where mobileno=?",[req.body.address,req.body.mobileno],function(error,result){


        if(error)
        {console.log(error)
            return res.status(500).json({status:false})
        }
        else
        {
            return res.status(200).json({status:true})
        }
    })

    break;

    
    case 'ADD_VENDOR_PLACEOFFER':
        console.log(req.body)
    pool.query("update vendorproperties set placeoffer=? where mobileno=?",[req.body.placeoffer,req.body.mobileno],function(error,result){


        if(error)
        {console.log(error)
            return res.status(500).json({status:false})
        }
        else
        {
            return res.status(200).json({status:true})
        }
    })

    break;

    case 'ADD_VENDOR_AMENITIES':
        console.log(req.body)
    pool.query("update vendorproperties set amenities=? where mobileno=?",[req.body.amenities,req.body.mobileno],function(error,result){


        if(error)
        {console.log(error)
            return res.status(500).json({status:false})
        }
        else
        {
            return res.status(200).json({status:true})
        }
    })

    break;

    case 'ADD_TITLE_DATA':
        console.log(req.body)
    pool.query("update vendorproperties set placedescription=?,title=?,price=?,offerprice=?,status=? where mobileno=?",[req.body.description,req.body.title,req.body.price,req.body.offerprice,req.body.status,req.body.mobileno],function(error,result){


        if(error)
        {console.log(error)
            return res.status(500).json({status:false})
        }
        else
        {
            return res.status(200).json({status:true})
        }
    })

    break;
    
}

})    

router.post("/update_vendor_properties_pictures",upload.any(),function(req,res,next){
    var temp={}
    var i=0
    console.log(JSON.stringify(req.body.oldpicture))
    var oldpicture=JSON.parse(req.body.oldpicture)
    
    req.files.map((item,index)=>{
       temp[i]=item.filename
       i++
    })
    console.log("temp1:",temp)
    if(Object.keys(oldpicture).length>0)
    {
        Object.values(oldpicture).map((item,index)=>{
            temp[i]=item
            i++
        })
    }
    pool.query("update vendorproperties set pictures=? where mobileno=?",[JSON.stringify(temp),req.body.mobileno],function(error,result){
        if(error)
        {console.log(error)
            return res.status(500).json({status:false})
        }
        else
        {
            return res.status(200).json({status:true})
        }   
    })
})
router.get('/displayallproperties',function(req,res){
    pool.query('select * from typesofproperties',[req.body],function(error,result){
        if(error){
           return res.status(500).json({status:false,error:error})
        }
        else{
          return  res.status(200).json({status:true,data:result})
        }
    })
  })

router.post('/subproperty_by_propertyid',function(req,res){
    pool.query('select SP.*,(select PT.propertytype from typesofproperties PT where PT.propertyid=SP.propertyid) as propertytype from propertysubtype SP where SP.propertyid=?',[req.body.propertyid],function(error,result){
      if(error){
         return res.status(500).json({status:false,error:error})
      }
      else{
        return  res.status(200).json({data:result})
      }
  })
  })
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
module.exports=router;