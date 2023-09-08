import { Button,Divider } from "@mui/material";
import { fontWeight } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { postData } from "../Api/ServerServices";

export default function PrevNext(props)
{
    var navigate=useNavigate()
  

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
        
        navigate(props.nextUrl)
        }
        else
        {
          alert('fail')
        }
        }
        else
        {
        var body=props.data
        alert(JSON.stringify(body))
        var result=await postData("vendors/update_vendor_properties",body)
        if(result.status)
        {
        
        navigate(props.nextUrl)
        }
        else
        {
          alert('fail')
        }
      }
    }
    var navigate=useNavigate()
    return(
        <div>
            <Divider/>
         <div style={{margin:"10px 30px 10px 30px",flexDirection:'row',display:'flex',justifyContent:'space-between',}}>
            <div>
                <Button onClick={()=>navigate(props.backUrl)} style={{textTransform:'capitalize',background:'#000',color:'#FFF'}} variant='contained'>Back</Button>
            </div>
            <div >
                <Button onClick={()=>handleSave()} style={{textTransform:'capitalize',background:'#000',color:'#FFF'}} variant='contained'>Next</Button>
            </div>
        </div>
        </div>
    )
}