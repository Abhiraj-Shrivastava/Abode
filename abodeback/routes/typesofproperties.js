var express = require('express');
var router = express.Router();
var pool =require('./pool');
var upload =require('./multer')

router.post('/addnewproperty',upload.single('propertyicon'),function(req,res){
  pool.query('insert into typesofproperties (propertyid,propertytype,propertyicon) values(?,?,?)',[req.body.propertyid,req.body.propertytype,req.ufilename],function(error,result){
      if(error){
         return res.status(500).json({status:false,error:error})
      }
      else{
        return  res.status(200).json({status:true})
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

router.post('/updateproperty',function(req,res){
  pool.query('update typesofproperties set propertytype=? where propertyid=? ',[req.body.propertytype,req.body.propertyid],function(error,result){
      if(error){
         return res.status(500).json({status:false,error:error})
      }
      else{
        return  res.status(200).json({status:true})
      }
  })
})

router.post('/updatepropertyicon',upload.single('propertyicon'), function(req, res, next) {
  pool.query('update typesofproperties set propertyicon=? where propertyid=?',[req.file.originalname,req.body.propertyid],function(error,result){
      if(error){
         return res.status(500).json({status:false,error:error})
      }
      else{
        return  res.status(200).json({status:true})
      }
  })
});

router.post('/deleteproperty',function(req,res){
  pool.query('delete from typesofproperties where propertyid=?',[req.body.propertyid],function(error,result){
      if(error){
         return res.status(500).json({status:false,error:error})
      }
      else{
        return  res.status(200).json({status:true})
      }
  })
})

module.exports=router