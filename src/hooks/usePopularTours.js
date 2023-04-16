import { useState } from "react";
import { useEffect } from "react";



const usePopularTours=()=>{
 const [popularTours, setPopularTours] = useState();
useEffect(() => {
    fetch(`http://localhost:5000/popularTours`)
        .then(res => res.json())
        .then(data => {
            setPopularTours(data)
        })
}, [popularTours]);

return [popularTours, setPopularTours]

}

export default usePopularTours;