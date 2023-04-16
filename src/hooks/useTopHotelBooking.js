import { useState } from "react";
import { useEffect } from "react";


const useTopHotelBooking=()=>{
   const  [topTours, settopSpecialTours]= useState();

   
    
useEffect(() => {
    fetch(`http://localhost:5000/bookingTopPlaces`)
        .then(res => res.json())
        .then(data => {
            settopSpecialTours(data)
        }, [topTours])
})


   
return  [topTours, settopSpecialTours];


}

export default useTopHotelBooking;
