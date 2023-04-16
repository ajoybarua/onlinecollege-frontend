
import { useEffect, useState } from "react";
// import { set } from "react-hook-form";

const useForum = () =>{
    const [messages, setMessages] = useState();
   
    useEffect(() => {
        fetch(`http://localhost:5000/messages`)
            .then(res => res.json())
            .then(data => {
                setMessages(data)
            })
    }, [messages])

    return [messages, setMessages];
}
export default useForum;