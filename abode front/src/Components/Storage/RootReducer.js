import { Description } from "@mui/icons-material"


const initialState={
    vendor:{},
    properties:{},
    subProperties:{},
    description:{},
    address:{},
    guest:{},
    amenities:{},
    vendorDBData:{},
    pictures:{},
    title:{},

}
export default  function RootReducer(state=initialState,action)
{ 
  switch(action.type)
  { case 'ADD_VENDOR':
       state.vendor[action.payload[0]]=action.payload[1]   
       
       return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,pictures:state.pictures,title:state.title})
       case 'ADD_PROPERTIES':
 
       state.properties[action.payload[0]]=action.payload[1]   
       return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,pictures:state.pictures,title:state.title})
       case 'ADD_SUB_PROPERTIES':
 
        state.subProperties[action.payload[0]]=action.payload[1]   
 
        return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,pictures:state.pictures,title:state.title})
 
    case 'ADD_PROPERTY_DESCRIPTION':
 
          state.description[action.payload[0]]=action.payload[1]   
         
          return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,pictures:state.pictures,title:state.title})
 
    case 'ADD_ADDRESS':
 
            state.address[action.payload[0]]=action.payload[1]   
            console.log("add",state.address)
            return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,pictures:state.pictures,title:state.title})
            case 'ADD_GUEST':  

    state.guest[action.payload[0]]=action.payload[1]   
     console.log("Guest",state.guest)
     return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,pictures:state.pictures,title:state.title})
    case 'ADD_AMENITIES':  

    state.amenities[action.payload[0]]=action.payload[1]   
     
    return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,pictures:state.pictures,title:state.title})
 
    case 'ADD_DB_VENDORPROP':  

    state.vendorDBData[action.payload[0]]=action.payload[1]   
    console.log("REDUX",state.vendorDBData)
     
    return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,pictures:state.pictures,title:state.title})
  
    case 'ADD_PICTURES':
     state.pictures[action.payload[0]]=action.payload[1] 
     
     return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,pictures:state.pictures,title:state.title})    
    
    case 'ADD_TITLE_DATA':
      state.title[action.payload[0]]=action.payload[1]

      return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,pictures:state.pictures,title:state.title})
    
     default:
      return ({vendor:state.vendor,properties:state.properties,subProperties:state.subProperties,description:state.description,address:state.address,guest:state.guest,amenities:state.amenities,vendorDBData:state.vendorDBData,pictures:state.pictures,title:state.title})
 

  }

}
