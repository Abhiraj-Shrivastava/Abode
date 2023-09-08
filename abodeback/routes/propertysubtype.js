var express = require('express');
var router = express.Router();
var pool =require('./pool');

router.post('/addnewsubproperty',function(req,res){
  pool.query('insert into propertysubtype(propertyid,subpropertyname,description) values(?,?,?)',[req.body.propertyid,req.body.subpropertyname,req.body.description],function(error,result){
      if(error){
         return res.status(500).json({status:false,error:error})
      }
      else{
        return  res.status(200).json({status:true})
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


router.get('/displayallsubproperty',function(req,res){
    pool.query('select SP.*,(select PT.propertytype from typesofproperties PT where PT.propertyid=SP.propertyid) as propertytype from propertysubtype SP',[req.body],function(error,result){
        if(error){
           return res.status(500).json({status:false,error:error})
        }
        else{
          return  res.status(200).json({data:result})
        }
    })
})
   
router.post('/deletesubproperty',function(req,res){
    pool.query('delete from propertysubtype where subpropertyid=?',[req.body.subpropertyid],function(error,result){
        if(error){
           return res.status(500).json({status:false,error:error})
        }
        else{
          return  res.status(200).json({status:true})
        }
    })
  })
  
router.post('/updatesubproperty',function(req,res){
    pool.query('update propertysubtype set propertyid=?, subpropertyname=? ,description=? where subpropertyid=?',[req.body.propertyid,req.body.subpropertyname,req.body.description,req.body.subpropertyid],function(error,result){
        if(error){
          return res.status(500).json({status:false,error:error})
        }
        else{
          return  res.status(200).json({status:true,data:result})
        }
    })
  })

module.exports=router
