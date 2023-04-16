
import { useEffect, useState } from "react";
// import { set } from "react-hook-form";

const useSpecialTour = () =>{
    const [tours, setTours] = useState();
   
    useEffect(() => {
        fetch(`http://localhost:5000/specialtour`)
            .then(res => res.json())
            .then(data => {
                setTours(data[0])
            })
    }, [tours])

return [tours, setTours];
}
export default useSpecialTour;

   