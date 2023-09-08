import React,{useEffect,useState} from "react"
import { DropzoneArea,DropzoneAreaBase } from "material-ui-dropzone"
import { Grid } from "@mui/material"
import { useStyles } from "./UploadVendorPictureCss"
import { Button } from "@mui/material"
import { useSelector,useDispatch } from "react-redux"
import PrevNext from "../MyComponents/PrevNext"
import { Delete } from "@mui/icons-material"
import VendorNavigation from "../MyComponents/VendorNavigation"
import { postData, serverURL } from "../Api/ServerServices"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
export default function UploadVendorPicture(props)
{ 
    var theme=useTheme()
  const matches=useMediaQuery(theme.breakpoints.up('md')) 
    const classes=useStyles()
    const dispatch=useDispatch()

    var vendorData=useSelector(state=>state.vendor)
    var vendor=Object.values(vendorData)[0]
    var vendorDBData=useSelector(state=>state.vendorDBData)
    var vendorDB=Object.values(vendorDBData)[0]
    var pictures={}
    const setPicture=()=>{
    if(vendorDB.pictures!=null)
    {
        pictures=JSON.parse(vendorDB.pictures)
        setTempPicture({...pictures})
        setCount(Object.keys(pictures).length)
        dispatch({type:'ADD_PICTURES',payload:[vendor.mobileno,pictures]})
    }
    }
    

    

    useEffect(function(){
        setPicture()
    
    },[])
    const [getFiles,setFiles]=useState([])
    const [tempPicture,setTempPicture]=useState({})
    const [count,setCount]=useState(0)

    var picturesData=useSelector(state=>state.pictures)
    var pictureDB=Object.values(picturesData)[0]
   

    const handleDelete=(index)=>{
        var P=tempPicture
        delete P[index]
        setTempPicture({...P})
        setCount(Object.keys(P).length)
        dispatch({type:'ADD_PICTURES',payload:[vendor.mobileno,P]})

    }

  const  handleFiles=(files)=>{

       setFiles(files)

    }
    
const showPicture=()=>{
    return Object.values(tempPicture).map((item,index)=>{
        return (
            <div style={{padding:5,display:'flex',justifyContent:'center',border:'2px solid #000',margin:5,borderRadius:8,display:'flex',position:'relative',width:110}}>
                <div >
                    <Delete onClick={()=>handleDelete(index)} style={{display:'flex',position:'absolute',zIndex:2,top:0,left:10}} />
                </div>
                
                <img style={{borderRadius:15}} src={`${serverURL}/images/${item}`} width='100' />
            </div>
        )
    })
    
}


    

return(
<div className={classes.container} >

{matches?<div className={classes.gradient} >

<p style={{marginLeft:20}}>
Next,Let's add some photos <br/> of your place
</p>

</div>:<></>}
<div style={{display:'flex',flexDirection:'column',marginLeft:10,width:matches?"50%":"100%"}}>
<VendorNavigation data={{ pictures:{oldpicture:JSON.stringify(tempPicture),files:getFiles} ,mobileno:vendor.mobileno,opr:"ADD_VENDOR_PICTURE"}} vendorName={vendor.firstname+" "+vendor.lastname} myurl='/addproperties' />
<div className={classes.content}>
    <div style={{display:'flex',flexDirection:'row'}}>
    {showPicture()}
    </div>
<DropzoneArea
                    
                    onChange={handleFiles}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    showPreviews={false}
                    maxFileSize={5000000}
                    filesLimit={5-count}
                    showFileNames={true}
                                      
                />
</div>

<PrevNext data={{ pictures:{oldpicture:JSON.stringify(tempPicture),files:getFiles} ,mobileno:vendor.mobileno,opr:"ADD_VENDOR_PICTURE"}}  nextUrl='/title' backUrl='/vendoramenities' />

</div>
</div>
)




}

