import React from 'react';
import Navbar from '../Shared/Navbar';
import Footer from '../Shared/Footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import useAuth from '../../hooks/useAuth';
// import { useState } from 'react';
import { useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../../firebase';
import { useForm } from 'react-hook-form';

const SignIn = () => {

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error
    ] = useSignInWithEmailAndPassword(auth);



    let signInError;
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    // useEffect( () =>{
    //     if (user || gUser) {
    //         navigate(from, { replace: true });
    //     }
    // }, [user || gUser , from, navigate])

    if (user || gUser) {
        navigate('/home');
    }


    if (error || gError) {
        signInError = <p className='text-red-500'><small>{error?.message || gError?.message}</small></p>
    }

    const onSubmit = data => {
        signInWithEmailAndPassword(data.email, data.password);
    }

    return (
        <div className='bg-slate-900'>
            <Navbar></Navbar>
            <section class="text-white body-font">
                <div class="container px-5 py-24 mx-auto flex flex-wrap items-center">
                    <div class="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
                        <h1 class="title-font font-medium text-3xl ">Please sign in to access your online college account and begin your educational journey with us.</h1>
                        <p class="leading-relaxed text-lg mt-4">As an online college student, we wish you success and fulfillment in achieving your academic goals and pursuing your passions.</p>
                    </div>
                    <div class="lg:w-2/6 md:w-1/2 bg-rose-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
                        <h2 class="text-gray-900 text-lg font-medium title-font mb-5">Sign In</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div class="relative mb-4">
                                <label for="full-name" class="leading-7 text-sm text-gray-600">Email</label>
                                <input type="text" id="full-name" name="full-name" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: 'Email is Required'
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: 'Provide a valid Email'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                    {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                </label>
                            </div>
                            <div class="relative mb-4">
                                <label for="email" class="leading-7 text-sm text-gray-600">password</label>
                                <input type="email" id="email" name="email" class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: 'Password is Required'
                                        },
                                        minLength: {
                                            value: 6,
                                            message: 'Must be 6 characters or longer'
                                        }
                                    })}
                                />
                                <label className="label">
                                    {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                    {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                </label>
                            </div>
                            {signInError}
                            <input className='btn w-full max-w-xs text-white' type="submit" value="Sign In" />

                           
                            
                        </form>
                        <p className='text-md text-gray-500 mt-3'><small>If you don't have an account? please <Link className='text-primary text-bolder' to="/signUp"> SignUp </Link></small></p>
                        {/* <button  onClick={() => signInWithGoogle()} class="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">SIGN IN WITH GOOGLE</button> */}
                    </div>
                </div>
            </section>
            <Footer></Footer>
        </div>
    );
};

export default SignIn;