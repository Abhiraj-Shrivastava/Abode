import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import DashBoard from "./Components/Adminstrator/Login/DashBoard";
import AdminLogin from "./Components/Adminstrator/Login/AdminLogin";
import VendorSplashScreen from "./Components/Vendors/VendorSplashScreen";
import OtpComponent from "./Components/MyComponents/OtpComponent";
import VendorPropertiesSplashScreen from "./Components/Vendors/VendorPropertiesSplashScreen";
import VendorNavigation from "./Components/MyComponents/VendorNavigation";
import VendorSubPropertiesSplashScreen from "./Components/Vendors/VendorSubPropertiesSplashScreen";
import ThirdPage from "./Components/Vendors/ThirdPage";
import VendorAddress from "./Components/Vendors/VendorAddress";
import PlusMinus from "./Components/MyComponents/PlusMinus";
import Guest from "./Components/Vendors/Guest";
import VendorAmenities from "./Components/Vendors/VendorAmenities";
import UploadVendorPicture from "./Components/Vendors/UploadVendorPicture";
import Title from "./Components/Vendors/Title";
import Header from "./Components/UserInterface/Header";
import Footer from "./Components/UserInterface/Footer";
import Home from "./Components/UserInterface/Home";
import SecondPage from "./Components/UserInterface/SecondPage";
import PropertiesPage from "./Components/UserInterface/PropertiesPage";
import StateHeader from "./Components/UserInterface/StateHeader";
import BookCart from "./Components/UserInterface/BookCart";
import { HdrEnhancedSelect } from "@mui/icons-material";
function App(props) {
  return (
    
   <div style={{ overflowX:'hidden'}}>
    <Router>
      <Routes>
              <Route element={<AdminLogin/>} path="/adminlogin" />
              <Route element={<DashBoard/>} path="/dashboard/*" />
              <Route element={<VendorSplashScreen/>} path="/vendorsplashscreen" />
              <Route element={<VendorPropertiesSplashScreen/>} path="/vendorproperties" />
              <Route element={<OtpComponent/>} path="/otpcomponent" />
              <Route element={<VendorNavigation/>} path="/vendornavigation" />
              <Route element={<VendorSubPropertiesSplashScreen/>} path="/vendorsubproperties" />
              <Route element={<ThirdPage/>} path="/thirdpage" />  
              <Route element={<VendorAddress/>} path="/vendoraddress" /> 
              <Route element={<Guest/>} path="/guest" />  
              <Route element={<PlusMinus/>} path="/plusminus" />  
              <Route element={<VendorAmenities/>} path="/vendoramenities" />  
              <Route element={<UploadVendorPicture/>} path="/uploadvendorpicture" />
              <Route element={<Title/>} path="/title" />
              <Route element={<Header/>} path="/header" />
              <Route element={<Footer/>} path="/footer" />
              <Route element={<Home/>} path="/home" />
              <Route element={<SecondPage/>} path="/secondpage" />
              <Route element={<PropertiesPage/>} path="/propertiespage" />
              <Route element={<BookCart/>} path="/bookcart" />
                            
              
              
              
      </Routes>
    </Router>
    </div>
  );
}

export default App;
