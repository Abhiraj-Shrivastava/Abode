import StarIcon from "@mui/icons-material/Star";
import { Button, Divider } from "@mui/material";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import Box from '@mui/material/Box';
import React, { useState, useEffect } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
export default function BookCart(props) {
  
  const [value, setValue] = useState([null, null]);
  const [guest, setGuest] = useState('');

  const [count ,  setCount] = useState('');
  var discount = props.price-props.offerPrice
  const handleChange = (event) => {
    setGuest(event.target.value);
  };

const handleDaysCount =(newValue)=>{
  const date1 = new Date(newValue[0])
  const date2 = new Date(newValue[1])
  setValue(newValue)

  var mnth = ("0" + (date1.getMonth() + 1)).slice(-2)
  var day = ("0" + date1.getDate()).slice(-2)

  const start = [date1.getFullYear(), mnth, day].join("-")

  var mnth = ("0" + (date2.getMonth() + 1)).slice(-2)
  var day = ("0" + date2.getDate()).slice(-2)

  const last = [date2.getFullYear(), mnth, day].join("-")

  const startDate = new Date(start)
  const lastDate =new Date(last)

  var diff = lastDate.getTime() - startDate.getTime();   
    
  setCount(diff / (1000 * 60 * 60 * 24))   
  console.log(diff / (1000 * 60 * 60 * 24))

}




  return (
    <>
      <Booking>
        <div className="heading">
          <h1>
            ₹{props.price}<span style={{marginLeft:5}} > Per Night</span>
          </h1>

          <div style={{ display: "flex", alignItems: "center", margin:"-1.9rem 0", }}>
            <StarIcon sx={{ width: 15 }} />
            <h2>
              {" "}
              5.0<span style={{textDecoration:"underline"}}>45 reviews</span>
            </h2>
          </div>

         <div style={{
              display: "flex",
              border: "2px solid #bdc3c7",
              borderRadius: "5px",
              height:"19vh",
              margin:"2.9rem 0",

              flexDirection: "column",
            }}>
              <div style={{
                display: "flex",
                margin:8,
                borderRadius: "5px",
              }}>
         <LocalizationProvider
      dateAdapter={AdapterDateFns}
      localeText={{ start: 'Check-in', end: 'Check-out' }}
    >
      <DateRangePicker
        value={value}
        onChange={(newValue) => {
          handleDaysCount(newValue)
        }}
        renderInput={(startProps, endProps) => (
          <React.Fragment>
            <TextField {...startProps} />
            <Box sx={{ mx: 2 }}> to </Box>
            <TextField {...endProps} />
          </React.Fragment>
        )}
      />
    </LocalizationProvider>
         </div>
         <div style={{
                display: "flex",
              justifyContent: "space-between",
                alignItems: "center",
                padding: 12,
              }}>
<FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Guest</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={guest}
          label="Guest"
          onChange={handleChange}
        >
          <MenuItem value={0}>None</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
         </div>
         </div>

          <Button
            // onClick={() => navigate(props.backUrl)}
            variant="contained"
            style={{
              textTransform: "capitalize",
              background: "rgb(202,6,93)",
              color: "#FFF",
              fontSize: "1rem",
              margin:"-2rem 0",
            }}
          >
            Reserve
          </Button>

          <div
            style={{
              fontFamily: "questrial",
              fontWeight: 100,
              fontSize: "0.9rem",
              textAlign: "center",
              marginTop: 45,
            }}
          >
            You won't be charged yet
          </div>
        </div>

        <div className="calculate">
          <div className="flyx">
            <h2>{props.price} x {count} nights</h2>
            <span>{props.price*count}</span>
          </div>

          <div className="flyx">
            <h2>Weekly discount</h2>
            <span style={{ color: "#27ae60", fontWeight: 500 }}>{discount*count}</span>
          </div>

          <div className="flyx">
            <h2>Service fee</h2>
            <span>₹0</span>
          </div>
        </div>

        <Divider
          style={{
            margin: "0.2rem 1.5rem",
            width: "87%",
            alignItems: "center",
          }}
        />

        <div
          style={{
            padding: "2rem",
            display: "flex",
            justifyContent: "space-between",
            fontWeight: 700,
            fontFamily: "questrial",
            alignItems: "center",
            fontSize: "0.9rem",
            margin: "-2.2rem 0",
          }}
        >
          <h2
            style={{
              fontWeight: 700,
              fontFamily: "questrial",

              fontSize: "1rem",
            }}
          >
            Total befor taxes
          </h2>
          <span>{(props.price*count)-(discount*count)}</span>
        </div>
      </Booking>
    </>
  );
}

const Booking = styled.div`
display:flex;
flex-direction:column;
width:138%;
height:550px;
border-radius:1rem;
border:1px solid #dfe4ea;



box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

.heading{
    display:flex;
flex-direction:column;
margin:-1rem 0;
padding:2rem;


h1{display:flex;
    font-family:questrial;
    font-size: 1.4rem;
    color: #2d3436;
    font-weight:700;
    align-items:center;

  


}

h2{align-items:center;
    font-size:0.9rem;
    margin-left:0rem;
    span{
        
        color:#7f8c8d;
        font-weight:500;
        margin-left:0.4rem;

    }
}


}





.calculate{
    display:flex;
    flex-direction:column;
    padding:2rem;
    margin:-1.9rem 0;

    .flyx{
        display:flex;
        justify-content:space-between;
        align-items:center;
margin:-0.2rem 0;
        h2{align-items:center;
         font-family:nunito;
    font-size:1rem;
            margin-left:0rem;
            font-weight:500;
            text-decoration:underline;
            span{
                 color:#7f8c8d;
                font-weight:500;
                margin-left:0.4rem;
        
            }
        
    }


}


`;

const Input = styled.input`
  padding: 10px;
  outline-width: 0;
  border: none;

  cursor: pointer;
width:11vw;
font-family:questrial;
font-size: 0.8rem;
color: #2d3436;
font-weight:100;

  ::placeholder {
    color: #2d3436;
  
  
    
  }
`;
