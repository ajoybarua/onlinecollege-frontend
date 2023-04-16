// import { signOut } from 'firebase/auth';
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
// import { useAuthState } from "react-firebase-hooks/auth";
// import { set } from "react-hook-form";
import auth from '../firebase';
// import auth from '../firebase.init';
// import auth from '../../firebase.init';
// import auth from '../../firebase';

const useUser = () =>{
    const logout = () => {
        signOut(auth);
    }
    const [users, setUsers] = useState([]);
    // const [isLoading, setIsLoading ] = useState(true);
    
    // const [person, setPerson] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(()=>{
        
        // setIsLoading(true);
        // fetch(`https://taja-jinis.herokuapp.com/user`)
        fetch('http://localhost:5000/user')
        .then(res => res.json())
        .then(data =>{
            setUsers(data);
            // setIsLoading(false);
            // console.log(data);
        });
    } , [])

    const emailId = user?.email;
    // console.log(user?.email)
    const testPerson = users?.filter(user => emailId === user?.email)
    // console.log(testPerson)
    // setPerson(testPerson)
    // const testPerson = users?.map(u => {
    //     if(u?.email == user?.email)
    //     {
    //         return u;
    //     }
    // })
    // const testPerson2 = testPerson.filter()
    // console.log(person);
    const person = testPerson[0];
    // console.log(person)
    

    return [person, setUsers];
}
export default useUser;