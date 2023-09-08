import { useState,useRef } from "react";
import { getData, serverURL } from "../Api/ServerServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Divider, IconButton ,Button} from "@mui/material";
import Slider from "react-slick";
import KeyboaordArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboaordArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import BookCart from "./BookCart";
import CloseIcon from "@mui/icons-material/Close";
import HotelIcon from "@mui/icons-material/Hotel";
import ChairIcon from "@mui/icons-material/Chair";
import { useNavigate } from "react-router-dom";
import Map from "../MyComponents/Map";


export default function ViewProperty(props){
   
    var navigate=useNavigate()
    var rs=useRef()
    var data=props.data
    var pictures=JSON.parse(props.pictures)
    var images=[pictures[1],pictures[2],pictures[3],pictures[4]]
    var bigImages=pictures[0]
    var guestDatas=JSON.parse(data.placeoffer)
    var amenities=JSON.parse(data.amenities)
    var address=JSON.parse(data.address)
    
    console.log("img:",images)
    console.log("guest:",guestDatas)
    console.log("amenities:",address.latlng)

    const [isHover, setIsHover] = useState(false);
    const [latLng, setLatLng] = useState(address.latlng);

   const handleMouseEnter = () => {
      setIsHover(true);
   };

   const handleMouseLeave = () => {
      setIsHover(false);
   };
   
    const showRemainingImages=()=>{
        return images.map((item)=>{
            return(
                <div>
                    <img src={`${serverURL}/images/${item}`} width='275px' height='245px' style={{borderRadius:12,marginRight:'5px',marginBottom:'5px'}}/>
                </div>
            )
        })
    }
    const showPlaceOffer=()=>{
        return guestDatas.map((item)=>{
            return(
                <div style={{marginLeft:5}}>
                    {item.value} {item.option}
                </div>
            )
        })
    }
    const showAmenities=()=>{
        return Object.values(amenities).map((item)=>{
            return(
         
                <div style={{width:'50%',display:'flex',flexDirection:'row',flexWrap:'wrap',marginTop:10}} >
                    <img src={`${serverURL}/Images/${item.icon}`} style={{width: 50,display:'flex',flexWrap:'wrap-reverse', borderRadius: 5}}/>
                    <div style={{marginTop:15,marginLeft:15}}>{item.optionname}</div>
                    
                </div>
                
            )
        })
    }

return(
    <>
    <div style={{width:'100%',}}>
    <div style={{fontSize:30,marginLeft:'12px',color:'#000',fontWeight:'bold',display:'flex',flexDirection:'column',marginBottom:10}}>
    {data.title}

    </div>
    <div style={{width:'100%',display:'flex',flexDirection:'row'}}>
<div style={{display:'flex',width:'50%'}}>
<img src={`${serverURL}/images/${bigImages}`} width='600px' height='500px' style={{borderRadius:12}}/>
</div>
<div style={{display:'flex',justifyContent:'center',flexWrap:'wrap',flexDirection:'row',width:'50%'}}>
{showRemainingImages()}
</div>

</div>
<div style={{fontSize:20,fontWeight:'bolder',margin:10,color:'#000'}}>
           {data.propertysubtype} Hosted By {data.vendorfirstname + ' ' + data.vendorlastname}
        </div>
        <div style={{display:'flex',flexDirection:'row',margin:10}}>
            {showPlaceOffer()}
        </div>
        <div style={{width:'100%',display:'flex',flexDirection:'row'}}>
        <div style={{width:'60%'}}>
        <Divider />
        <div>

        </div>
        <div style={{margin:10}} >
        {data.vendorfirstname + ' ' + data.vendorlastname} is a Superhost
Superhosts are experienced, highly rated hosts who are committed to providing great stays for their guests.</div>
<div style={{margin:10}}>
Great check-in experience
100% of recent guests gave the check-in process a 5-star rating.
Furry friends welcome
Bring your pets along for the stay.
        </div>
        <Divider/>
        <div >
              <h1>
                <span style={{alignItems:'center',fontWeight:700,cursor:'pointer',justifyContent:'space-between',color:'#eb4d4b'}}>air</span>cover
              </h1>
              <p>
                {" "}
                Every booking includes free protection from Host cancellations,
                listing inaccuracies, and other issues like trouble checking in.
              </p>
              <Button style={{marginBottom:9}}>Learn more</Button>
            </div>
                    <Divider/>
                    <div >
              <p>
                {" "}
                Aura house is a beautiful & unique eco bamboo house built on the
                west bank of the River Ayung facing east to catch sunrise. Aura
                House is situated 25min away from Ubud, and 35min away from
                Canggu.
                <br />
                <div style={{ margin: "2rem 0" }}>
                  {" "}
                  IF WE ARE FULLY BOOKED, PLEASE CHECK OUR AIRBNB PROFILE (CLICK
                  ON OUR PROFILE PICTURE) TO FIND 10 MORE BEAUTIFUL BAMBOO
                  HOUSES, ALL BASED IN THE...{" "}
                </div>
              </p>

              <Button style={{marginBottom:9}}>Show more</Button>
            </div>
<Divider/>
        <div style={{marginBottom:30}}>
            <div style={{fontSize:20,fontWeight:'bolder' }}>
            What This Place Offer's
            </div>
        <div style={{display:'flex',width:'100%',flexDirection:'row',flexWrap:'wrap',margin:10}}>
            {showAmenities()}
        </div>
        </div>
        <Divider/>
        <div style={{display:'flex',flexDirection:'column',}} >
              <div
                style={{
                  margin: "-0.3rem 0",fontSize:20,fontWeight:'bolder'
                }}
              >
                Where you'll sleep
              </div>

              <div style={{margin:10,display:'flex',justifyContent:'space-between'}}  >
                <div
                  style={{ margin: "0rem 0.4rem",cursor:'pointer',margin:'0rem 0.4rem',borderRadius:'1rem',border:'1px solid #dfe4ea',padding:'1.4rem',boxShadow: isHover ? 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px ' : ''}}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}>
                  <span>
                    <ChairIcon />
                  </span>
                  <h2 style={{fontFamily:'questrial',fontSize:'1.1rem',color: '#2d3436',fontWeight:600}}>Bedroom 1</h2>
                  <h3 style={{ fontFamily:'questrial',fontSize: '1.1rem',color: '#2d3436',fontWeight:100}}> 1 double bed</h3>
                </div>

              </div>
            </div>
          <Divider/>
          <div style={{width:500}}>
          {latLng.lat != 0 ? <Map latLng={latLng} /> : <></>}
      
          </div>
        </div>
        <div style={{width:'30%',marginLeft:30}}>
                <BookCart  price={data.price} offerPrice={data.offerprice}/>
            </div>
        </div>
        </div>
</>
)
    }