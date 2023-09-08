import{Grid, TextField} from '@mui/material';
import React,{useState} from 'react'; 

export default function OtpComponent(props){
     const [valueOne,setValueOne]=useState('')
const [valueTwo,setValueTwo]=useState('')
const [valueThree,setValueThree]=useState('')
const [valueFour,setValueFour]=useState('')
const [otp,setOtp]=useState('')
  const handleTextOne=(event)=>{
   if(event.target.value.length==1)
   {   setValueOne(event.target.value)
        document.getElementById('textTwo').focus()}
    }

    const handleTextTwo=(event)=>{
        if(event.target.value.length==1)
        {  
            setValueTwo(event.target.value)
            document.getElementById('textThree').focus()}
         }

    const handleTextThree=(event)=>{
        if(event.target.value.length==1)
        {  setValueThree(event.target.value)
            document.getElementById('textFour').focus()}
         }
        const handleTextFour=(event)=>{
            setValueFour(event.target.value)
        props.onChange(valueOne+valueTwo+valueThree+event.target.value)
            }
    return(
        <div style={{width:300,padding:20}}>
        <Grid container spacing={2} >
            <Grid item xs={3}>
                <TextField id='textOne' style={{fontSize:30,fontWeight:'bold'}} onChange={handleTextOne} variant='outlined' />
            </Grid>
            <Grid item xs={3}>
                <TextField id='textTwo' variant='outlined'  onChange={handleTextTwo} />
            </Grid>
            <Grid item xs={3}>
                <TextField id='textThree' variant='outlined' onChange={handleTextThree}  />
            </Grid>
            <Grid item xs={3}>
                <TextField id='textFour' variant='outlined' onChange={handleTextFour} />
            </Grid>
        </Grid>
        </div>
    )
}
