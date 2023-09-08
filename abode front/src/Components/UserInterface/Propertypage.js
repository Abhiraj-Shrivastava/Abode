import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import GTranslateIcon from "@mui/icons-material/GTranslate";
import StarIcon from "@mui/icons-material/Star";
import logo from "../../Assets/Airbnb-Logo.png";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MenuIcon from "@mui/icons-material/Menu";
import Navmui from "./Component/Navmui";
import Foot from "./Component/Foot";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import CloseIcon from "@mui/icons-material/Close";
import HotelIcon from "@mui/icons-material/Hotel";
import ChairIcon from "@mui/icons-material/Chair";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {
  Divider,
  stepContentClasses,
  TextField,
  Typography,
} from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import {
  getData,
  serverURL,
  postData,
} from "../Administrator/Statecity/Api/ServerService";
import BookCart from "./Component/BookCart";
import { useLocation, useParams } from "react-router-dom";

///fullscreen dialog////////
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import UserEmail from "./Component/UserEmail";
import Galleryshow from "./Component/Galleryshow";

export default function Propertypage(props) {
  const [states, setStates] = useState([]);
  const [refresh, setRefresh] = useState(false);

  //fullscreendialog///setup/////
  const [open, setOpen] = React.useState(false);
  const [openuser, setOpenuser] = React.useState(false);
  const [opengallery, setOpengallery] = React.useState(false);

  const handleopengallery = () => {
    setOpengallery(true);
  };

  const handleclosegallery = () => {
    setOpengallery(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleuserOpen = () => {
    setOpenuser(true);
  };

  const handleCloseuser = () => {
    setOpenuser(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //////show Grid image//////
  const Showimage = () => {
    return (
      <div
        className="grid"
        style={{
          marginTop: 32,

          overflow: "hidden",
          borderRadius: 12,

          display: "flex",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={handleClickOpen}
      >
        <img
          width={550}
          height={340}
          src={`${serverURL}/images/${rawimg[0]}`}
        />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 2fr)",
            flexDirection: "column",
          }}
        >
          <img
            src={`${serverURL}/images/${rawimg[4]}`}
            width={269}
            style={{ margin: "0 0.3rem" }}
          />

          <img src={`${serverURL}/images/${rawimg[3]}`} width={267} />
          <img
            src={`${serverURL}/images/${rawimg[2]}`}
            width={270}
            style={{ margin: "0rem 0.3rem" }}
          />
          <img src={`${serverURL}/images/${rawimg[1]}`} width={267} />
        </div>
      </div>
    );
  };
  /////////dialogimag//////
  const Dialogimage = () => {
    return (
      <div
        className="grid"
        style={{
          paddingRight: 30,
          borderRadius: "12px",
          margin: "2rem 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 25,
          cursor: "pointer",
        }}
        onClick={handleopengallery}
      >
        <img width={610} height={340} src={states[0]} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 2fr)",
            flexDirection: "column",
          }}
        >
          <img
            src={states[4]}
            width={300}
            style={{ margin: "0.5rem 0.3rem" }}
          />

          <img
            src={states[3]}
            width={300}
            style={{ margin: "0.5rem 0.1rem" }}
          />
          <img src={states[2]} width={300} style={{ margin: "0rem 0.3rem" }} />
          <img src={states[1]} width={300} />
        </div>
      </div>
    );
  };

  /////////////fullscreeimagedialog///////////
  function fullscreendialog() {
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="lg"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ overflowY: "auto", overflowX: "hidden" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: 1210,
            }}
          >
            <CloseIcon onClick={handleClose} style={{ cursor: "pointer" }} />
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={handleuserOpen}
            >
              {" "}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "space-between",
                  width: 200,
                }}
              >
                {" "}
                <span
                  style={{
                    fontFamily: "nunito",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "space-between",
                  }}
                >
                  <img
                    src="https://icons-for-free.com/iconfiles/png/512/box+document+outline+share+top+upload+icon-1320195323221671611.png"
                    width={15}
                  />
                  Share
                </span>
                <span
                  style={{
                    fontFamily: "nunito",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "space-between",
                    margin: "0 0.8rem",
                  }}
                >
                  <FavoriteBorderIcon sx={{ width: 15 }} />
                  Save
                </span>
              </div>
            </span>
          </div>
          {Dialogimage()}
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    );
  }

  /**************userlogindialor */

  function userdialog() {
    return (
      <Dialog
        open={openuser}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="xs"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent style={{ overflowY: "hidden", overflowX: "hidden" }}>
          <ArrowBackIcon
            onClick={handleCloseuser}
            style={{ color: "#000", cursor: "pointer" }}
          />
          <UserEmail />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    );
  }

  /**************photogallery dialog */

  function galdialog() {
    return (
      <Dialog
        open={opengallery}
        onClose={handleClose}
        fullWidth={true}
        maxWidth="lg"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent
          style={{
            overflowY: "hidden",
            overflowX: "hidden",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: 1210,
            }}
          >
            <ArrowBackIcon
              onClick={handleclosegallery}
              style={{ color: "#000", cursor: "pointer" }}
            />
            <span
              style={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={handleuserOpen}
            >
              {" "}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "space-between",
                  width: 200,
                }}
              >
                {" "}
                <span
                  style={{
                    fontFamily: "nunito",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "space-between",
                  }}
                >
                  <img
                    src="https://icons-for-free.com/iconfiles/png/512/box+document+outline+share+top+upload+icon-1320195323221671611.png"
                    width={15}
                  />
                  Share
                </span>
                <span
                  style={{
                    fontFamily: "nunito",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "space-between",
                    margin: "0 0.8rem",
                  }}
                >
                  <FavoriteBorderIcon sx={{ width: 15 }} />
                  Save
                </span>
              </div>
            </span>
          </div>
          <Galleryshow pic={states} />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    );
  }

  // const fetchAllStates = async (search) => {
  //   var result = await getData("states/displaycitybyid");
  //   // alert(JSON.stringify(result.data))
  //   var pictureData = result.data[0];
  //   var picture = Object.values(pictureData)[0];
  //   console.log(picture);
  //   var rowimages = JSON.parse(picture);
  //   console.log(rowimages);
  //   var images = Object.values(rowimages);
  //   console.log(images);
  //   setStates(images);
  // };

  const location = useLocation();
  var rawimg = location.state.data;
  console.log("location from component ", rawimg);

  const { data } = useParams();

  const Store = () => {
    var temparr = states;
    rawimg &&
      rawimg.map((item, index) => {
        temparr.push(item.url);
        setStates(temparr);
        setRefresh(true);
      });
  };

  useEffect(() => {
    Store();
  }, [!refresh]);

  console.log("location from component states", states);

  // const showAllCities = () => {
  //   return states.map((item, index) => {
  //     return (
  //       <>
  //         <Grid>
  //           <img src={`${serverURL}/images/${item}`} />
  //         </Grid>
  //       </>
  //     );
  //   });
  // };

  // useEffect(function () {
  //   // fetchAllStates();
  // }, []);

  return (
    <>
      {fullscreendialog()}
      {userdialog()}
      {galdialog()}
      <Navmui />

      <Propercontainer>
        <div className="header">
          <div className="tagline">
            <h1>
              <GTranslateIcon /> Emotional Healing in Lee Cheon-si,Seoul
            </h1>
            <div
              style={{
                display: "flex",
                flexDirection: "space-between",
                width: "100%",
                margin: "-0.8rem 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "space-between",
                  alignItems: "center",
                  width: "150%",
                  fontFamily: "nunito",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                }}
              >
                <StarIcon sx={{ width: 16, bottom: 12 }} />
                4.82.<span style={{ margin: "0 0.3rem" }}>115 reviews</span>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "space-between",

                    fontFamily: "nunito",
                    fontWeight: 300,
                    fontSize: "0.9rem",
                    margin: "0 0.6rem",
                  }}
                >
                  <WorkspacePremiumIcon sx={{ width: 20 }} /> Superhost
                </div>
                <span style={{ margin: "0 0.5rem" }}>
                  Sindun-myeon,lcheon-si,Gyeonggi Province, South Korea
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "space-between",
                  width: 200,
                }}
              >
                {" "}
                <span
                  style={{
                    fontFamily: "nunito",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "space-between",
                  }}
                >
                  <img
                    src="https://icons-for-free.com/iconfiles/png/512/box+document+outline+share+top+upload+icon-1320195323221671611.png"
                    width={15}
                  />
                  Share
                </span>
                <span
                  style={{
                    fontFamily: "nunito",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "space-between",
                    margin: "0 0.8rem",
                  }}
                >
                  <FavoriteBorderIcon sx={{ width: 15 }} />
                  Save
                </span>
              </div>
            </div>
          </div>
          {Showimage()}
        </div>

        <Top>
          <div className="left">
            <div className="first">
              <h1>Entire villa hosted by Wayan</h1>
              <div style={{ margin: "-1rem 0rem" }}>
                <span>4 guests .</span>
                <span style={{ marginLeft: " 0.3rem" }}>2 bedrooms .</span>
                <span style={{ marginLeft: " 0.3rem" }}>2 beds .</span>
                <span style={{ marginLeft: " 0.3rem" }}>2 bathrooms .</span>
              </div>
            </div>
            <Divider style={{ margin: "2rem 0" }} />

            <div className="secondline">
              <span>
                <DesignServicesIcon /> Designed by
              </span>
              <p>Ibuku Bamboo Architecture and Design</p>

              <div style={{ marginTop: "1rem" }}>
                <span>
                  <FeaturedPlayListIcon /> Featured in
                </span>
                <p>Condé Nast Traveler, October 2019 Home Crux, August 2019</p>
              </div>

              <div style={{ marginTop: "1rem" }}>
                <span>
                  <CalendarTodayIcon /> Free cancellation before 19 Feb
                </span>
              </div>
            </div>
            <Divider style={{ margin: "2rem 0" }} />

            <div className="third">
              <h1>
                <span>air</span>cover
              </h1>
              <p>
                {" "}
                Every booking includes free protection from Host cancellations,
                listing inaccuracies, and other issues like trouble checking in.
              </p>
              <h3>Learn more</h3>
            </div>

            <Divider style={{ margin: "3rem 0" }} />

            <div className="fourth">
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

              <h3>Show more</h3>
            </div>

            <Divider style={{ margin: "5rem 0" }} />

            <div className="fifth">
              <h1
                style={{
                  margin: "-0.3rem 0",
                }}
              >
                Where you'll sleep
              </h1>

              <div className="flexitem">
                <div
                  className="borderitem"
                  style={{
                    margin: "0rem 0.4rem",
                  }}
                >
                  <span>
                    <ChairIcon />
                  </span>
                  <h2>Bedroom 1</h2>
                  <h3> 1 double bed</h3>
                </div>

                <div
                  className="borderitem"
                  style={{
                    margin: "0rem 0.4rem",
                  }}
                >
                  <span>
                    <ChairIcon />
                  </span>
                  <h2>Bedroom 2</h2>
                  <h3> 1 double bed</h3>
                </div>

                <div className="borderitem">
                  <span>
                    <HotelIcon />
                  </span>
                  <h2>Common space</h2>
                  <h3> 1 sofa</h3>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <BookCart />
          </div>
        </Top>
      </Propercontainer>
      {/* <Grid>
        <div class="img-box">
         

        
           <img  class="img-big" src={`${serverURL}/images/${states[3]}`} />
          <img class="img-small" src={`${serverURL}/images/${states[0]}`} />
          <img class="img-small" src={`${serverURL}/images/${states[1]}`} />
          <img class="img-small" src={`${serverURL}/images/${states[1]}`} />
           <img class="img-small" src={`${serverURL}/images/${states[2]}`} />

          // {showAllCities()}
        </div>
      </Grid> */}

      <div
        style={{
          width: "100%",
          height: "40vh",
          margin: "10rem 0",
        }}
      >
        <Foot />
      </div>
    </>
  );
}

const Propercontainer = styled.div`
  display: flex;
  
  flex-direction: column;
padding:1rem;
  width: 78%;
  height:auto;
  position: relative;
  margin: 5rem 10rem;

  .header {
    width: 100%;
    display: flex;
    flex-direction: column;
    .tagline {
      h1 {
        font-family: open sans;
        font-size: 1.6rem;
        color: #2d3436;
        font-weight: 600;
      }

span{
    font-family:"nunito",
    font-weight:700,
    font-size:"0.9rem",
    cursor:pointer;
        color: #2d3436;
     justify-content:space-between;
        text-decoration: underline;

}


    }
img{
  transition:0.3s each-in-out;
  &:hover{
    filter: grayscale(80%);
  }
}

  }
`;
const Grid = styled.div`
  .grid {
    margin: 2rem 0;
    display: grid;
    grid-template-columns: repeat(3, 2fr);
    flex-direction: column;
  }

  .img-box {
    float: left;
    width: 305px;
    height: 205px;
    margin: 40px 5px 0 5px;
    border-radius: 12px !important;
    box-sizing: border-box;
    --maxWidth: 1120px;
  }
    

    &:last-child {
      margin-right: 0;
    }

    .img-big {
      float: left;
      margin-top: 3px;
      width: 200px;
      height: 163px;
    }
    .img-small {
      display: grid;
      grid-template-columns: repeat(2, 2fr);
      width: 100px;
      height: 80px;
      margin-top: 3px;
    }
  }
`;

const Top = styled.div`
display: flex;
padding:1rem;
width: 95%;
height: 100%;
justify-content:space-between;

margin: -0.2rem -1rem;
.left{
  width: 65%;
  display: flex;
  flex-direction: column;
 
 .first{ h1 {
  font-family:open sans;
  font-size: 1.4rem;
  color: #2d3436;
  font-weight:600;
}

span{
align-items:center;
font-family:"nunito",
font-weight:700,
font-size:"0.9rem"
cursor:pointer;
justify-content:space-between;
  color: #2d3436;
}
}
 

.secondline{
  display:flex;

  flex-direction:column;
  p{
    font-family:nunito;
  font-weight:300;
  font-size:0.9rem;
  cursor:pointer;
  justify-content:space-between;
      color:#636e72;
  margin:0.2rem 1.7rem;
   }

span{align-items:center;

    font-family:nunito;
    font-weight:700;
    font-size:1rem;
    cursor:pointer;
    justify-content:space-between;
        color: #2d3436;
     }

}

.third{
  
  display:flex;
flex-direction:column;
margin:-1.8rem 0;
h1{
  
  align-items:center;

  font-family:questrial;
  font-weight:700;
  font-size:2.1rem;
  cursor:pointer;
  justify-content:space-between;

  span{align-items:center;

  
    font-weight:700;
 
    cursor:pointer;
    justify-content:space-between;
        color:#eb4d4b;
     }

}
  p{
    font-family:nunito;
  font-weight:500;
  font-size:1rem;
  cursor:pointer;
  justify-content:space-between;
      color:#2d3436;
  margin:-0.3rem 0rem;
   }

   h3{
    font-family:nunito;
    font-weight:700;
    font-size:1rem;
    cursor:pointer;
        color: #2d3436;

        text-decoration: underline;
   }

}


.fourth{
  display:flex;
flex-direction:column;
margin:-1.7rem 0;

h3{margin:-1.4rem 0;
  font-family:nunito;
  font-weight:700;
  font-size:1rem;
  cursor:pointer;
      color: #2d3436;

      text-decoration: underline;
 }

  
}


.fifth{
  display:flex;
  flex-direction:column;
  margin:-2.2rem 0;

  h1 { 

    font-family:questrial;
    font-size: 1.4rem;
    color: #2d3436;
    font-weight:600;
  }
  

  .flexitem{
    margin:2.2rem 0;
    display:flex;
    justify-content:space-between;
  

.borderitem{
  cursor:pointer;
  width:50%;
  margin:0rem 0.4rem;
  border-radius:1rem;
  border:1px solid #dfe4ea;
  padding:1.4rem;


h2{ font-family:questrial;
  font-size:1.1rem;
  color: #2d3436;
  font-weight:600;

}
h3{
  font-family:questrial;
  font-size: 0.8rem;
  color: #2d3436;
  font-weight:100;
}

&:hover{

  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}


}


  }
  
}



}



.right{
  width:27%;
  height:78%;
  margin:1rem 1rem;
}


`;
