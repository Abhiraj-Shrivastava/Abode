import { Button,Divider } from "@mui/material";
import { fontWeight } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { postData } from "../Api/ServerServices";

export default function Finish(props)
{
    var navigate=useNavigate()
  

   
 
    
    var navigate=useNavigate()
    return(
        <div>
            <Divider/>
         <div style={{margin:"10px 30px 10px 30px",flexDirection:'row',display:'flex',justifyContent:'space-between',}}>
            <div>
                <Button onClick={()=>navigate(props.backUrl)} style={{textTransform:'capitalize',background:'#000',color:'#FFF'}} variant='contained'>Back</Button>
            </div>
            <div >
                <Button onClick={()=>navigate(props.nextUrl)} style={{textTransform:'capitalize',background:'#000',color:'#FFF'}} variant='contained'>Finish</Button>
            </div>
        </div>
        </div>
    )
}