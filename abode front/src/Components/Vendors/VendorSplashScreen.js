import  React,{useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useStyles} from './VendorSplashScreenCss'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Divider } from '@mui/material';
import OtpComponent from '../MyComponents/OtpComponent';
import OtpGenerator from '../MyComponents/OtpGenerator';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from "@mui/icons-material/Mail";
import PhoneIcon from '@mui/icons-material/Phone';
import {postData} from '../Api/ServerServices';
import Stack from '@mui/material/Stack';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useNavigate } from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {useForm}  from 'react-hook-form'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function VendorSpalshScreen (props) {
  const {register,handleSubmit,formState:{errors},reset,trigger}=useForm();

  const classes=useStyles();
  const [open, setOpen] = useState(false);
  const [openOtp, setOpenOtp] = useState(false);
  const [openVendor,setOpenVendor]=useState(false);
  const [otp,setOtp]=useState()
  const [userOtp,setUserOtp]=useState()
  const [mobileNumber,setMobileNumber]=useState('')
  const [message,setMessage]=useState('')
  const [vendorMessage,setVendorMessage]=useState('')
  const [date,setDate]=useState()
  const [firstName,setFirstName]=useState('')
  const [lastName,setLastName]=useState('')  
  const [emaiId,setEmailId]=useState('')
 var navigate=useNavigate()
 var dispatch=useDispatch()

  const handleClick=async()=>{
    
    var body={firstname:firstName,lastname:lastName,emailid:emaiId,mobilenumber:mobileNumber,dob:date}
    var response=await postData('vendors/addnewvendors',body)
    if(response.status)
    { setOpenVendor(false)
      dispatch({type:"ADD_VENDOR",payload:[mobileNumber,body]})
      var vp=await postData('vendors/search_vendor_property',{mobileno:mobileNumber})
      if(vp.status)
      
      {
      dispatch({type:"ADD_DB_VENDORPROP",payload:[mobileNumber,vp.data]})
       navigate('/vendorproperties')
      }
          }
    else
    {
      setVendorMessage("please fill the correct values")
      
    }


    
}

const handleDateChange = (newValue) => {
  setDate(newValue);
};

  const handleClickContinue=()=>{
 setOpen(false)
 setOpenOtp(true)
 
 var otpval=OtpGenerator()
 setOtp(otpval)
 alert(otpval)
  }

  const chkOtp=async(value)=>{
    if(otp==value)
    {setOpenOtp(false)
       var result=await postData('vendors/search_vendor_mobileno',{mobileno:mobileNumber})
     if(result.status){

        //navigate('/vendorproperties',{state:{vendor:result.data}})
        dispatch({type:"ADD_VENDOR",payload:[mobileNumber,result.data]})
        var vp=await postData('vendors/search_vendor_property',{mobileno:mobileNumber})
        if(vp.status)
        
        {dispatch({type:"ADD_DB_VENDORPROP",payload:[mobileNumber,vp.data]})
         navigate('/vendorproperties')
        }
        else
        {
          alert("fail")
        }

      
      
     }
     else{
      setOpenVendor(true)
     }
      
      
    }
    else
    {
     setMessage('Invalid Otp')
    }
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }; 

  const handleOpenOtp=()=> {
       setOpenOtp(true);
  };

  const handleCloseOtp = () => {
    setOpenOtp(false);
  }; 
  const handleVendorOpen = () => {
    setOpenVendor(true);
  };

  const handleVendorClose = () => {
    setOpenVendor(false);
  }; 
  const dialogMobile=()=>{
    return (
      <div >
        
        <Dialog
          open={open}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle >
          <div className={classes.dialogTitle}>
          Login or sign up
          </div>
          </DialogTitle>
          <Divider/>
          <DialogContent>
            <DialogContentText >
              <div  className={classes.dialogWelcomeTitle}>
              Welcome to Abode
              </div>
              </DialogContentText>
              <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
          <Grid item xs={12}>
          <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Mobile Number</InputLabel>
          <OutlinedInput
          {...register("phonenumber",{required:"Number is Required",
          pattern:{
            value:/((\+*)((0[ -]*)*|((91 )*))((\d{12})+|(\d{10})+))|\d{5}([- ]*)\d{6}/,
            message: 'Invalid number',
          }})}
          onKeyUp={()=>{trigger("phonenumber")}}
          onChange={(event)=>setMobileNumber(event.target.value)}
            startAdornment={<InputAdornment position="start">+91</InputAdornment>}
            label="Mobile Number"
          />
        </FormControl></Grid>
        {errors.phonenumber &&(  <small >{errors.phonenumber.message}</small>)}
          <Grid item xs={12}>
            <div className={classes.dialogText}>
          We'll call or text you to confirm your mobile number.Standard message and data rates apply.
          </div>
          </Grid>
          <Grid  item xs={12}>
          <Button variant="contained" type='submit' onClick={handleClickContinue} fullWidth style={{fontWeigth:700,textTransform:'Capitalize',backgroundColor:'#E31C5F',color:'#fff',padding:10,borderRadius:8}} >Continue</Button>
          
          </Grid>
          </Grid>
          </form>
          </DialogContent>
          
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  
  const dialogOtp=()=>{
    return (
      <div >
        
        <Dialog
          open={openOtp}
          keepMounted
          onClose={handleCloseOtp}
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle >
          <div className={classes.dialogTitle}>
          Confirm your number
          </div>
          </DialogTitle>
          <Divider/>
          <DialogContent>
            <DialogContentText >
              <div >
              Enter the code we have sent via SMS to +91{mobileNumber}
              </div>
              </DialogContentText>
              <Grid container spacing={2}>
          <Grid item xs={12}>
            <OtpComponent value="" onChange={(value)=>{chkOtp(value)}}/>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.dialogText}>
              Haven't recieved a code? More Options
          </div>
          </Grid>
          <Grid item xs={12}>
            <div className={classes.otpErrorMessage}>
             {message}
          </div>
          </Grid>
        
          </Grid>
          </DialogContent>
          
          <DialogActions>
            <Button onClick={handleCloseOtp}>Close</Button>
            
          </DialogActions>
        </Dialog>
      </div>
    );
  }


  const dialogVendor=()=>{
    return (
      <div >
        
        <Dialog
          open={openVendor}
          keepMounted
          onClose={handleVendorClose}
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle >
          <div className={classes.dialogTitle}>
          Finish signing up
          </div>
          </DialogTitle>
          <Divider/>
          <DialogContent>
          <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="input-with-icon-textfield"
                  label="First Name"
                  fullWidth
                  
                  onChange={(event) => setFirstName(event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="input-with-icon-textfield"
                  label="Last Name"
                  fullWidth
                  onChange={(event) => setLastName(event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
                </Grid>
    
                <Grid item xs={12}>
                <TextField
                  id="input-with-icon-textfield"
                  label="Email ID"
                  fullWidth
                  onChange={(event) => setEmailId(event.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MailIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
                 <div className={classes.vendorText}>
                  We'll email you trip confirmations and receipts.
                </div>
                </Grid>
    <Grid item xs={12}>
                <TextField
                  id="input-with-icon-textfield"
                  label="Mobile No"
                  fullWidth
                  value={"+91"+mobileNumber}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon />
                      </InputAdornment>
                    ),
                  }}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
        <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/dd/yyyy"
          value={date}
          onChange={handleDateChange}
          renderInput={(params) => <TextField {...params} />}
        />
        </Stack>
        </LocalizationProvider>
                <div className={classes.vendorText}>
                  To sign up, you need to be at least 18. Your birthday won’t be
                  shared with other people who use Abode.
                </div>
                <div className={classes.vendorText}>
                  By selecting <b>Agree and continue</b>, I agree to Abode’s{" "}
                  <span className={classes.vendorTextColor}>Terms of Service</span>, <span className={classes.vendorTextColor}>Payments Terms of Service</span>, and{" "}
                  <span className={classes.vendorTextColor}>Nondiscrimination Policy</span> and acknowledge the{" "}
                  <span className={classes.vendorTextColor}>Privacy Policy</span>.
                </div>
      </Grid>
      </Grid>
      <Grid item xs={12}>
                <Button
                  variant="contained"
                  fullWidth
                  style={{
                    fontWeight: 700,
                    textTransform: "capitalize",
                    backgroundColor: "#E31C5F",
                    color: "#fff",
                    padding: 10,
                    borderRadius: 8,
                  }}
                  onClick={handleClick}
                >
                  Agree and continue
                </Button>
              </Grid>
         <Grid>
          {vendorMessage}
         </Grid>
         
        
         
          </DialogContent>
          
         
        </Dialog>
      </div>
    );
  }

const onSubmit=(data)=>{
  console.log(data)
}
  return (
    <ThemeProvider theme={theme}>
      
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random/?city,citynight)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <div  className={classes.sideDiv} > 
          <div className={classes.textHeadStyle}>
           Try hosting on Abode
           
          </div>
          <div className={classes.textSubStyle}>
            Join us.We'll help you every
            step of the way 
           </div>
           <div >
           <Button variant="contained" style={{fontWeigth:700,textTransform:'Capitalize',backgroundColor:'#E31C5F',color:'#fff',padding:10,width:110,borderRadius:8}} onClick={handleClickOpen}>Let's go!</Button>
           </div>
        </div>


        </Grid>
      </Grid>
     
      {dialogMobile()}
      {dialogOtp()}
      {dialogVendor()}
    </ThemeProvider>
  );
}