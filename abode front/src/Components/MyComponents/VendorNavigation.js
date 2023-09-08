import { Button } from "@mui/material";
import { fontWeight } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux"
import { getData,postData,serverURL } from "../Api/ServerServices"

export default function VendorNavigation(props)
{   var navigate=useNavigate()


    const handleSave=async()=>{
      var body=props.data
        if(body.opr=="ADD_VENDOR_PICTURE"){

            var picture=body.pictures
          

            var getFiles=picture.files
            

            var formData=new FormData()
            formData.append('mobileno',body.mobileno)
            formData.append('oldpicture',picture.oldpicture)
            getFiles.map((item,index)=>{
                formData.append('picture'+index,item)
            })
            var result=await postData('vendors/update_vendor_properties_pictures',formData,true)
            if(result.status)
        {
          navigate('/vendorsplashscreen')
        }
        else
        {
          alert('fail')
        }
        }
        else
        {
      var body=props.data
      var result=await postData("vendors/update_vendor_properties",body)
      if(result.status)
      {
      alert('success')
      navigate('/vendorsplashscreen')
      }
      else
      {
        alert('fail')
      }
    }
    }



    return(
         <div style={{margin:"10px 30px 10px 30px",alignItems:"center", display:'flex',flexDirection:'row',display:'flex',flexGrow:1}}>
            <div style={{textAlign:'center',width:'20%',padding:5,background:'#F7F6F2',borderRadius:5, fontWeight:'bold'}}>
        {props.vendorName}
        </div>

        <div style={{flexDirection:'row',width:'80%',justifyContent:'flex-end',display:'flex',padding:2}}>
            <div style={{padding:10}} >
          <Button style={{textTransform:'capitalize',background:"#F7F6F2",color:'#000',fontSize:14,fontWeight:'bold',borderRadius:5}} 
          onClick={()=>navigate('/help')}>
            help
          </Button>
          </div>
          <div style={{padding:10}}>
          <Button style={{textTransform:'capitalize',background:"#F7F6F2",color:'#000',fontSize:14,fontWeight:'bold',borderRadius:5}} 
          onClick={()=>handleSave()}>
            Save & Exit          
            </Button>
            </div>
        </div>
        </div>
    )
}