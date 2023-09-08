import axios from "axios";
export const serverURL='http://localhost:4000'

export const postData=async(url,body,isFile=false)=>{
    try{
        const headers={
            headers:{
                "content-type":isFile?"multipart/form-data":"application/json",
                //"authorization":localStorage.getItem("token")||null    
            }
        }
var response= await axios.post(`${serverURL}/${url}`,body,headers)
console.log(body)
var result=await response.data
return (result)
    }
    catch(error)
    {
        return(false)
    }
}

export const getData=async(url,body,isFile=false)=>{
    try{
        const headers={
            headers:{
                "content-type":isFile?"multipart/form-data":"application/json",
                //"authorization":localStorage.getItem("token")||null    
            }
        }
var response= await axios.get(`${serverURL}/${url}`,body,headers)
var result=await response.data
return (result)
    }
    catch(error)
    {
        return(false)
    }
}

