import { useState, useRef } from "react";
import { getData, serverURL } from "../Api/ServerServices";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IconButton } from "@mui/material";
import Slider from "react-slick";
import KeyboaordArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboaordArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import { useNavigate } from "react-router-dom";

export default function ViewComponent(props) {
  var navigate = useNavigate();
  var rs = useRef();
  var data = props.data;
  var pictures = JSON.parse(props.pictures);
  var images = Object.values(pictures);
  const [button1Style, setButton1Style] = useState({display: 'none'});
  const [button2Style, setButton2Style] = useState({display: 'none'});
  const [count,setCount] = useState(1)
  var settings = {
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const showImages = () => {
    return images.map((item,index) => {
      return (
        <div  onMouseEnter={()=>handleShow(index)}   >
          <img
            src={`${serverURL}/images/${item}`}
            width="350px"
            height="230px"
            style={{borderRadius:12}}
            onClick={handleNavigate}
           
          />
        </div>
      );
    });
  };
const handleShow=(index)=>{
  if(index){
    setButton2Style({display: 'flex',position: "absolute",left: 5,top: 110,zIndex: 2,border: 0,borderRadius: 13,width: 26,height: 26,backgroundColor: "#fff",color: "#000",cursor: "pointer"})

  }

}

  const handleNext = () => {
    rs.current.slickNext();
    setButton2Style({display: 'flex',position: "absolute",left: 5,top: 110,zIndex: 2,border: 0,borderRadius: 13,width: 26,height: 26,backgroundColor: "#fff",color: "#000",cursor: "pointer"})
}
  const handlePrev = () => {
    rs.current.slickPrev();
  };

  const handleNavigate = () => {
    props.navigation(data.cityname);
  };

  return (
    <>
      <div
        style={{
          
          display: "inline-list-item",
          position: "relative",
          width: 350,
          height: 270,
          margin: 12,
          marginTop:35,
          cursor: "pointer",
                  
        }}

        onMouseEnter={e => {
            setButton1Style({display: 'flex',
            position: "absolute",
            right: 5,
            top: 110,
            zIndex: 2,
            border: 0,
            borderRadius: 13,
            width: 26,
            height: 26,
            backgroundColor: "#fff",
            color: "#000",
            cursor: "pointer",});
        }}
        onMouseLeave={e => {
            setButton1Style({display: 'none'})
            setButton2Style({display:'none'})
        }}

      >
        <IconButton
          onClick={handlePrev}
          variant="contained"
          style={button2Style}
        >
          <KeyboaordArrowLeftIcon />
        </IconButton>

        <Slider {...settings} ref={rs}>
          {showImages()}
        </Slider>
        <IconButton
          onClick={handleNext}
          variant="contained"
          style={button1Style}
        >
          <KeyboaordArrowRightIcon />
        </IconButton>
        <div style={{ fontSize: 14, marginLeft: 8, fontWeight: "bolder" }}>
          {data.cityname},{data.statename}
        </div>
      </div>
    </>
  );
}
