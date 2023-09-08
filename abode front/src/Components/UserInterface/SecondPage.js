import React, { useState, createRef, useRef, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";
import { postData } from "../Api/ServerServices";
import ViewProperties from "./ViewProperties";
import { useNavigate } from "react-router-dom";

export default function SecondPage(props) {
      var navigate=useNavigate()
  var location = useLocation();
  const [properties, setProperties] = useState([]);
  

  const fetchAllProperties = async () => {
    var body = { cityname: location.state.city };
    var result = await postData("users/displayallproperties", body);
    setProperties(result.data);
  };
  useEffect(function () {
    fetchAllProperties();
  }, []);
  const handleNavigate=(vendorpropertyid)=>{

   navigate("/propertiespage",{state:{vendorpropertyid:vendorpropertyid}})

}
  const showAllProperties = () => {
    return properties.map((item) => {
      return <ViewProperties pictures={item.pictures} data={item} navigation={handleNavigate} />;
      alert(item);
    });
  };

  return (
    <div>
      <Header />
      <div
        style={{
          
          marginRight: 10,
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          flexDirection: "row",
          marginBottom:150
        }}
      >
        {showAllProperties()}
      </div>

      <Footer />
    </div>
  );
}
