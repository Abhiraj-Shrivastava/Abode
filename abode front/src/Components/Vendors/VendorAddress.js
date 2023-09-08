import React,{useEffect,useState} from "react"
import { Grid } from "@mui/material"
import { useStyles} from "./VendorAddressCss"
import { Button } from "@mui/material"
import { useSelector,useDispatch } from "react-redux"
import PrevNext from "../MyComponents/PrevNext"
import VendorNavigation from "../MyComponents/VendorNavigation"
import Autocomplete from "react-google-autocomplete"
import Map from "../MyComponents/Map"
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import TextField from "@mui/material/TextField";

import { InputAdornment } from "@mui/material";
import RemoveRoadIcon from "@mui/icons-material/RemoveRoad";
import BusinessIcon from "@mui/icons-material/Business";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ApartmentIcon from "@mui/icons-material/Apartment";
import CodeIcon from "@mui/icons-material/Code";
import PublicIcon from "@mui/icons-material/Public";
import { parseJSON } from "date-fns"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"





export default function VendorAddress()
{ var theme=useTheme()
  const matches=useMediaQuery(theme.breakpoints.up('md'))  
    const [latLng, setLatLng] = useState({ lat: 0, lng: 0 });
    const [street, setStreet] = useState("");
  const [flat, setFlat] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postCode, setPostCode] = useState("");

    const classes=useStyles()

    var vendorData=useSelector(state=>state.vendor)
    var vendor=Object.values(vendorData)[0]
    var vendorAddress= useSelector((state) => state.address);
    var vendorDBData=useSelector(state=>state.vendorDBData)
    var vendorDB=Object.values(vendorDBData)[0]
 
    
    

var dispatch=useDispatch()

const [openMapDialog, setOpenMapDialog] = useState(false);
  const handleOpenMap = async () => {
    setOpenMapDialog(true);
  };

  const handleCloseMap = () => {
    setOpenMapDialog(false);
  };

  const showAddress=()=>{
    if(JSON.stringify(vendorAddress)!='{}')
    {var address = Object.values(vendorAddress)[0];
      setLatLng(address.latlng)
      setStreet(address.street)
      setFlat(address.flat)
      setCity(address.city)
      setState(address.state)
      setPostCode(address.postcode)
      setCountry(address.country)
      setOpenMapDialog(true)
    }

    if(vendorDB.address!=null)
    {
      var addressData=JSON.parse(vendorDB.address)
      setTimeout(() => {
        setLatLng(addressData.latlng);
      }, 500);
      setStreet(addressData.street)
      setFlat(addressData.flat)
      setCity(addressData.city)
      setState(addressData.state)
      setPostCode(addressData.postcode)
      setCountry(addressData.country)
      setOpenMapDialog(true)
    }
  }

  const address={latlng:latLng,street:street,flat:flat,city:city,state:state,country:country,postcode:postCode}


  useEffect(function(){
  showAddress()
},[])



  const handleAddress=()=>{
  var body={mobileno:vendor.mobileno,latlng:latLng,street:street,flat:flat,city:city,state:state,country:country,postcode:postCode}
  dispatch({type:'ADD_ADDRESS',payload:[vendor.mobileno,body]})
  setOpenMapDialog(false)

 }
  const mapDialog = () => {
    return (
      <div>
        <Dialog
          open={openMapDialog}
          onClose={handleCloseMap}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>
            <div
              style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}
            >
              Confirm your address
            </div>
          </DialogTitle>

          <DialogContent>
            <div className={classes.root}>
              <div className={classes.subdiv}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      label="Street"
                      onChange={(event) => setStreet(event.target.value)}
                      value={street}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <RemoveRoadIcon
                              sx={{ color: "action.active", mr: 1, my: 0.5 }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Flat,Suite,etc(Optional)"
                      onChange={(event) => setFlat(event.target.value)}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AccountCircleIcon
                              sx={{ color: "action.active", mr: 1, my: 0.5 }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      label="City"
                      value={city}
                      onChange={(event) => setStreet(event.target.value)}
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <ApartmentIcon
                              sx={{ color: "action.active", mr: 1, my: 0.5 }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={state}
                      onChange={(event) => setState(event.target.value)}
                      label="State(Optional)"
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <BusinessIcon
                              sx={{ color: "action.active", mr: 1, my: 0.5 }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={postCode}
                      onChange={(event) => setPostCode(event.target.value)}
                      label="Postcode(Optional)"
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CodeIcon
                              sx={{ color: "action.active", mr: 1, my: 0.5 }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      value={country}
                      onChange={(event) => setCountry(event.target.value)}
                      label="Country/Region"
                      fullWidth
                      variant="outlined"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <PublicIcon
                              sx={{ color: "action.active", mr: 1, my: 0.5 }}
                            />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <Button
                      variant="contained"
                      onClick={handleAddress}
                      style={{
                        backgroundColor: "#000",
                        color: "white",
                        marginTop: "10px",
                        marginBottom: "20px",
                      }}
                    >
                      Looks good
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    );
  };
    


    

return(
<div className={classes.container}>
   {matches?<div className={classes.gradient}>
        <p style={{marginLeft:20}}>
          Where's your place
          <br />
          located?
        </p>
      </div>:<></>}
      <div style={{ display: "flex", flexDirection: "column",width:matches?"50%":"100%" }}>
      <VendorNavigation data={{address:JSON.stringify(address),mobileno:vendor.mobileno,opr:"ADD_VENDOR_ADDRESS"}} vendorName={vendor.firstname+" "+vendor.lastname} myurl='/addproperties' />
        <div className={classes.content}>
          {latLng.lat != 0 ? <Map latLng={latLng} /> : <></>}
          <Autocomplete
            apiKey={"AIzaSyAytC_TusuhG7kpNQ19hMrCzXDIUjd307o"}
            options={{
              types: ["address"],
              componentRestrictions: { country: "in" },
            }}
            style={{
              padding: 10,
              width: "40vw",
              height: "5%",
              fontWeight: "bold",
              fontSize: 18,
              borderWidth: 2,
              borderRadius: 10,
              borderColor: "#000",
              position: "absolute",
              top: 100,
            }}
            onPlaceSelected={(place) => {
              console.log(place)
              setTimeout(() => {
                setOpenMapDialog(true);
              }, 1000);
              setLatLng(place.geometry.location);
              setStreet(
                place.address_components[0].long_name +
                  ", " +
                  place.address_components[1].long_name
              );
              setCity(place.address_components[3].long_name);
              setState(place.address_components[5].long_name);
              setCountry(place.address_components[6].long_name);
              setPostCode(place.address_components[7].long_name);
            }}
          />
        </div>

        <PrevNext data={{address:JSON.stringify(address),mobileno:vendor.mobileno,opr:"ADD_VENDOR_ADDRESS"}} nextUrl="/guest" backUrl="/thirdpage" />
      </div>
      {mapDialog()}
    </div>
)




}

