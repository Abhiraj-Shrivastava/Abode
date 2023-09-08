import React,{useState} from "react";
import { Avatar } from "@mui/material";


export default function PlusMinus(props){

const [value,setValue]=useState(props.value || 1)
const handlePlus=()=>{
 var c=value
 c=c+1
 setValue(c)
props.onChange(c)

}

const handleMinus=()=>{
var c=value
c=c-1
if(c>=1)
setValue(c)
props.onChange(c)
    
}

    return(
        <div style={{alignItems:'center',display:'flex',flexDirection:'row',justifyContent:'center'}}>
             <Avatar onClick={()=>handleMinus()} style={{background:'#000'}}>-</Avatar>
             <div style={{fontWeight:'bold',fontSize:18,marginRight:10,marginLeft:10}}>{value}</div>
             <Avatar onClick={()=>handlePlus()}  style={{background:'#000'}}>+</Avatar>
            
        </div>
    )

}