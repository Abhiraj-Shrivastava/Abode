import React,{useState,useEffect} from "react";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import DisplayAllStates from "../StateCity/DisplayAllStates";
import States from "../StateCity/States";
import Vendors from "../Vendor/Vendors";
import City from "../StateCity/City";
import DisplayAllVendors from "../Vendor/DisplayAllVendors";
import DisplayAllCities from "../StateCity/DisplayAllCities";
import Amenities from "../Amenities/Amenities";
import DisplayAllAmenities from "../Amenities/DisplayAllAmenities";
import AmenitiesOption from "../Amenities/AmenitiesOption";
import DisplayAllAmenitiesOptions from "../Amenities/DisplayAmenitiesOption";
import TypesOfProperties from "../TypesOfProperties/TypesOfProperties";
import DisplayallPropertySubtype from "../TypesOfProperties/DisplayAllPropertySubtype";
import DisplayAllTypesOfProperties from "../TypesOfProperties/DisplayAllTypesOfProperties";
import PropertySubtype from "../TypesOfProperties/PropertySubtype";
import AdminLogin from "../Login/AdminLogin";
import TopBar  from "./TopBar";
import SideBar from "./SideBar";

export default function DashBoard(props){

return(
    <div>
    <TopBar/>
   
        <div style={{display:'flex',flexDirection:'row'}}>
    <SideBar/>
       <Routes>
         <Route element={<States/>} path="/states"/>
         <Route element={<DisplayAllStates/>} path="/displayallstates"/>
         <Route element={<Vendors/>} path="/vendors"/>
         <Route element={<DisplayAllVendors/>} path="/displayallvendors"/>
         <Route element={<DisplayAllCities/>} path="/displayallcities"/>
         <Route element={<City/>} path="/city"/>
         <Route element={<Amenities/>} path="/amenities"/>
         <Route element={<DisplayAllAmenities/>} path="/displayallamenities"/>
         <Route element={<AmenitiesOption/>} path="/amenitiesoptions"/>
         <Route element={<DisplayAllAmenitiesOptions/>} path="/displayallamenitiesoption"/>
         <Route element={<TypesOfProperties/>} path="/typesofproperties"/>
         <Route element={<PropertySubtype/>} path="/propertysubtype"/>
         <Route element={<DisplayAllTypesOfProperties/>} path="/displayalltypeofproperties"/>
         <Route element={<DisplayallPropertySubtype/>} path="/displayallpropertysubtype"/>

       </Routes>
       </div>
    
    </div>
)


}