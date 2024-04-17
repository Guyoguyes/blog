import Link from "next/link"
import Head from 'next/head'
import Layout from "@/components/layout/Layout"
import React, { useState } from "react"
import { useRouter } from "next/router"
import Swal from "sweetalert2"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase"
import { useForm } from "react-hook-form"

export default function PageLogin() {

    const router = useRouter();

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const { register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = async (data) => {
        try {
            const result = await signInWithEmailAndPassword(auth, data.email, data.password);
            Swal.fire({
                title: 'Logged in!',
                text: 'Success',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            router.push('/');
            console.log('Logged User', result)
            return result
        } catch(error) {
            console.error('Error in login', error);
            Swal.fire({
                title: 'Error!',
                text: error.message || 'An error occurred',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    return (
        <>
            <Head>
                <title>
                    Masomo Guide - Login
                </title>
            </Head>
            <Layout>
                <div className="cover-home3">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-10 col-lg-12 m-auto">
                                <div className="text-center mt-50 pb-50">
                                    <h2 className="color-linear d-inline-block">Welcome back !</h2>
                                </div>
                                <div className="box-form-login pb-50">
                                    <div className="form-login bg-gray-850 border-gray-800 text-start">
                                    <form action="#" onSubmit={handleSubmit(onSubmit)}>
                                            <div className="form-group">
                                                <input className="form-control bg-gray-850 border-gray-800" type="text" placeholder="Email" {...register('email')}/>
                                                {errors.email && <span>This field is required</span>}
                                            </div>
                                            <div className="form-group position-relative">
                                                <input className="form-control bg-gray-850 border-gray-800 password"
                                                    type={passwordShown ? "text" : "password"}
                                                    placeholder="Password"
                                                    {...register('password')}
                                                />
                                                {errors.password && <span>This field is required</span>}
                                                <span className="viewpass" onClick={togglePasswordVisiblity} />
                                            </div>
                                            <div className="form-group"><Link className="color-white link" href="#">Forgot password?</Link></div>
                                            
                                            <div className="form-group">
                                                <button className="btn btn-linear color-gray-850 hover-up" type="submit">Log me in</button>
                                            </div>
                                            <div className="form-group mb-0"><span>Don’t have an account?</span><Link className="color-linear" href="/page-signup"> Sign Up</Link></div>
                                        </form>
                                    </div>
                                    {/* <div className="box-line"><span className="bg-gray-900">Or, sign in with your email</span></div> */}
                                    {/* <div className="box-login-gmail bg-gray-850 border-gray-800 hover-up"><Link className="btn btn-login-gmail color-gray-500" href="#">Sign in with Google</Link></div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}