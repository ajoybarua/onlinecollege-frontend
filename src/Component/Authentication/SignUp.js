import React from 'react';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
// import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSignInWithGoogle, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../../firebase';

const SignUp = () => {

    const [loginData, setLoginData] = useState({});
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [createUserWithEmailAndPassword, user, loading, error] = useCreateUserWithEmailAndPassword(auth);
    const [updateProfile, updating, updateError] = useUpdateProfile(auth);
    const navigate = useNavigate();
    let signInError;

    console.log("In sign up page");
    if (error || gError || updateError) {
        signInError = <p className='text-red-500'><small>{error?.message || gError?.message || updateError?.message}</small></p>
    }

    if (user || gUser) {
        console.log(user);

    }
    // if(loading | gLoading){
    //     return <LoadingSpiner></LoadingSpiner>
    // }


    const onSubmit = async data => {
        console.log(data);
        // console.log(register);
        await createUserWithEmailAndPassword(data.email, data.password);


        // const userEmail = data.email;
        // const userPassword = data.password;

        // console.log(user)
        const userObject = {

            email: data.email,
            name: data.name,
            password: data.password,
            role: 'user'
        }

        console.log(userObject);
        setLoginData(userObject);

        // const field = e.target.name;
        // const value = e.target.value;
        // const newLoginData = { ...loginData };
        // newLoginData[field] = value;
        // setLoginData(newLoginData);




        fetch('http://localhost:5000/user', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userObject)
        })


            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    console.log("form submitted successfully")
                }
            })
        // e.preventDefault();

        navigate('/home');
        // toast('অ্যাকাউন্ট তৈরি করা হয়েছে');

        const googleLogin = await signInWithGoogle(data.email);
        await updateProfile({ displayName: data.name });
        console.log('update done');

    }



    // console.log("In sign up page");
    if (error || gError || updateError) {
        signInError = <p className='text-red-500'><small>{error?.message || gError?.message || updateError?.message}</small></p>
    }

    // if (user || gUser) {
    //     console.log(user);

    // }
    // // if(loading | gLoading){
    // //     return <LoadingSpiner></LoadingSpiner>
    // // }

    return (
        <div className='bg-slate-900 '>
            <Navbar></Navbar>
            <section class="text-gray-600 body-font relative">
                <div class="container px-5 py-24 mx-auto">
                    <div class="flex flex-col text-center w-full ">
                        <h1 class="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">Sign Up</h1>
                    </div>

                    <div class="lg:w-1/2 md:w-2/3 mx-auto bg-slate-800  p-16 rounded-sm">
                        {/* form code start here */}
                        <form onSubmit={handleSubmit(onSubmit)} action="" class="flex w-full flex-col md:flex-row lg:flex-row flex-wrap -m-2">

                            {/* name field start here */}
                            <div class="p-2 w-full md:w-1/2  lg:w-72 ">
                                <div class="relative">
                                    <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
                                    <input type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out "
                                        {...register("name", {
                                            required: {
                                                value: true,
                                                message: 'Name is Required'
                                            }
                                        })}
                                    />

                                </div>
                            </div>
                            {/* Email field start here */}
                            <div class="p-2 w-full md:w-1/2  lg:w-72 ">
                                <div class="relative">
                                    <label for="email" class="leading-7 text-sm ">Email</label>
                                    <input type="email" id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                            </div>

                            <fieldset className='px-2 my-4'>
                                <span className='mr-10 md:mr-0 md:pr-10 lg:pr-10'>Select the position</span>

                                <input id="teacher" class="mr-2 peer/teacher cursor-pointer" type="radio" name="status" checked />
                                <label for="teacher" class="mr-2 md:mr-5 lg:mr-16 cursor-pointer peer-checked/teacher:text-sky-500">teacher</label>

                                <input id="student" class="mr-2 peer/student cursor-pointer" type="radio" name="status" />
                                <label for="student" class="cursor-pointer peer-checked/student:text-sky-500">student</label>

                                {/* teacher block */}
                                <div class="hidden peer-checked/teacher:block w-full">
                                    <div className='flex w-full flex-col md:flex-row lg:flex-row flex-wrap'>
                                        {/* Group field start here */}
                                        <div class="py-2 pr-2 w-full md:w-1/2  lg:w-72 ">
                                            <div class="relative">
                                                <label for="email" class="leading-7 text-sm text-gray-600">Expertise Group</label>
                                                {/* <input type="email" id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /> */}
                                                {/* <select class="select w-full select-sm bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none  text-gray-700  px-3  py-1 transition-colors duration-200 ease-in-out">
                                                    <option disabled selected>Pick your Group</option>
                                                    <option className=' '>Commerce</option>
                                                    <option className=''>Science</option>
                                                    <option className=' '>Humanities</option>
                                                </select> */}
                                                <select className='select w-full select-sm bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none  text-gray-700  px-3  py-1 transition-colors duration-200 ease-in-out' {...register("group")}>
                                                    <option value="commerce">Commerce</option>
                                                    <option value="science">Science</option>
                                                    <option value="humanities">Humanities</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* name field start here */}
                                        <div class="py-2 pr-2 w-full md:w-1/2  lg:w-72 ">
                                            <div class="relative">
                                                <label for="name" class="leading-7 text-sm ">Address</label>
                                                <input type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out " />
                                            </div>
                                        </div>

                                        <div class=" w-full ">
                                            <div class="relative">
                                                <label for="email" class="leading-7 text-sm ">Upload Your Image</label>
                                                <input type="file" class="file-input file-input-bordered file-input-sm w-full max-w-xs bg-gray-100 bg-opacity-50 rounded border border-gray-300" />
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div class="relative">
                                            <label for="password" class="leading-7 text-sm text-gray-600">Password</label>
                                            <input type="text" id="name" name="password" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out " />
                                        </div>
                                    </div>

                                </div>










                                {/* student block */}
                                <div class="hidden peer-checked/student:block ">
                                    <div className='flex w-full flex-col md:flex-row lg:flex-row flex-wrap '>
                                        {/* Roll field start here */}
                                        <div class="p-2 w-full md:w-1/2  lg:w-72">
                                            <div class="relative">
                                                <label for="email" class="leading-7 text-sm ">Roll</label>
                                                <input type="Roll" id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>
                                        {/* Group field start here */}
                                        <div class="p-2 w-full md:w-1/2  lg:w-72">
                                            <div class="relative">
                                                <label for="email" class="leading-7 text-sm ">Group</label>
                                                {/* <input type="email" id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" /> */}
                                                {/* <select class="select w-full select-sm bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none  text-gray-700  px-3  py-1 transition-colors duration-200 ease-in-out">
                                                    <option disabled selected>Pick your Group</option>
                                                    <option className=' '>Commerce</option>
                                                    <option className=''>Science</option>
                                                    <option className=' '>Humanities</option>
                                                </select> */}
                                                <select className='select w-full select-sm bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none  text-gray-700  px-3  py-1 transition-colors duration-200 ease-in-out' {...register("group")}>
                                                    <option value="commerce">Commerce</option>
                                                    <option value="science">Science</option>
                                                    <option value="humanities">Humanities</option>
                                                </select>
                                            </div>
                                        </div>
                                        {/* Mobile number field start here */}
                                        <div class="p-2 w-full md:w-1/2  lg:w-72">
                                            <div class="relative">
                                                <label for="email" class="leading-7 text-sm ">Mobile</label>
                                                <input type="email" id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700  px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                            </div>
                                        </div>

                                        {/* Session field start here */}
                                        <div class="p-2 w-full md:w-1/2  lg:w-72">
                                            <div class="relative">
                                                <label for="email" class="leading-7 text-sm ">Session</label>
                                                <select class="select w-full select-sm bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none  text-gray-700  px-3  py-1 transition-colors duration-200 ease-in-out">
                                                    <option disabled selected>Pick your session year</option>
                                                    <option>2023</option>
                                                    <option>2024</option>
                                                    <option>2025</option>
                                                    <option>2026</option>
                                                    <option>2027</option>
                                                    <option>2028</option>
                                                    <option>2029</option>
                                                    <option>2030</option>
                                                </select>
                                            </div>
                                        </div>


                                        <div class="p-2 w-full ">
                                            <div class="relative">
                                                <label for="email" class="leading-7 text-sm ">Upload Your Image</label>
                                                <input type="file" class="file-input file-input-bordered file-input-sm w-full max-w-xs bg-gray-100 bg-opacity-50 rounded border border-gray-300" />
                                            </div>
                                        </div>

                                        
                                    </div>
                                </div>
                            </fieldset>

                            <div class="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center"> </div>

                            <div class="p-2 w-full">
                                {/* <button class="  w-full  text-center  text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Sign Up</button> */}
                                <input className='w-full  text-center  text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' type="submit" value="Sign Up" />
                            </div>
                        </form>

                        <p className='text-md text-center text-gray-500 mt-3'><small>If you  have an account? please <Link className='text-primary text-bolder' to="/signIn"> Sign In </Link></small></p>

                    </div>
                </div>
            </section >


            <Footer></Footer>
        </div >
    );
};

export default SignUp;