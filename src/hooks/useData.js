import { useEffect, useState } from "react";


const useData = () =>{
    const [data, setData] = useState();
   
    useEffect(() => {
        fetch(`http://localhost:5000/data`)
            .then(res => res.json())
            .then(data => {
                setData(data)
            })
    }, [data])



    return [data, setData];
}
export default useData;