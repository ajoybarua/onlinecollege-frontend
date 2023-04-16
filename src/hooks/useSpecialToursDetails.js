import { useState } from "react";
import { useEffect } from "react";


const useSpecialTourDetails=()=>{
    const [specialTours, setSpecialTours] = useState();

   
    
useEffect(() => {
    fetch(`http://localhost:5000/SpecialBookingDetails`)
        .then(res => res.json())
        .then(data => {
            setSpecialTours(data)
        }, [specialTours])
})


   
return  [specialTours, setSpecialTours];


}

export default useSpecialTourDetails;
