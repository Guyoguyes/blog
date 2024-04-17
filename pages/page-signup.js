import Link from "next/link"
import Head from 'next/head'
import Layout from "@/components/layout/Layout"
import React, { useState } from "react"
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";
import Swal from 'sweetalert2'
import { addDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "@/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

export default function PageSignup({initialImageUrl }) {

    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(initialImageUrl || null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const [passwordShown, setPasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
        setPasswordShown(passwordShown ? false : true);
    };

    const { register, handleSubmit, formState: {errors}, control} = useForm();

    function handleChange(event) {
        if (event.target.files && event.target.files[0]) {
          setSelectedImage(event.target.files[0]);
        }
      }
    
      const handleUpload = async (e) => {
        console.log("Firebase Storage Object:", storage);
        
        if (!selectedImage) return;
        const storageRef = ref(storage, `files/${selectedImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedImage);
    
        uploadTask.on("state_changed",
          (snapshot) => {
            const progress =
              Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            // setProgresspercent(progress);
          },
          (error) => {
            alert(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUrl(downloadURL)
            });
          }
        );
      };

    const onSubmit = async (data) => {
        console.log(data)
        try{
            await handleUpload();
            const newUserCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
        
            const userId = newUserCredential.user.uid;
        
            await addDoc(collection(db, 'users'), { ...data, userId, imageUrl: imageUrl }).then((user) => {
                console.log('User registered successfully.');
                Swal.fire({
                    title: 'Authenticated!',
                    text: 'Success',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });

                router.push('/page-login')
            })
        
            
        
            return { success: true };
            // router.push('/page-login')
            
          } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error?.response?.data?.message || 'An error occurred',
                icon: 'error',
                confirmButtonText: 'OK'
              });
            console.error('Error in registration', error);
            throw error;
          }
    }

    return (
        <>
            <Head>
                <title>
                    Masomo Guide - Signup
                </title>
            </Head>
            <Layout>
                <div className="cover-home3">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-10 col-lg-12 m-auto">
                                <div className="text-center mt-50 pb-50">
                                    <h2 className="color-linear d-inline-block">Register</h2>
                                </div>
                                <div className="box-form-login pb-50">
                                    <div className="form-login bg-gray-850 border-gray-800 text-start">
                                    <form action="#" onSubmit={handleSubmit(onSubmit)} method="post">
                                            <div className="form-group">
                                                <input className="form-control bg-gray-850 border-gray-800" type="text" placeholder="Full name" 
                                                    {...register('fullname')}/>
                                                    {errors.fullname && <span>This field is required</span>}
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control bg-gray-850 border-gray-800" type="text" placeholder="Email" {...register('email')}/>
                                                {errors.email && <span>This field is required</span>}
                                            </div>
                                            <div className="form-group">
                                                <input className="form-control bg-gray-850 border-gray-800" type="text" placeholder="User name" {...register('username')}/>
                                                {errors.username && <span>This field is required</span>}
                                            </div>
                                            <div className="form-group">
                                                <input
                                                className="form-control bg-gray-850 border-gray-800 color-gray-500"
                                                type="file"
                                                placeholder="Cover Photo *"
                                                onChange={handleChange} />
                                                {/* <button onClick={handleUpload}>Upload Image</button> */}
                                                {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
                                                {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
                                            </div>
                                            <div className="form-group position-relative">
                                                <input className="form-control bg-gray-850 border-gray-800 password"
                                                type={passwordShown ? "text" : "password"} placeholder="Password" 
                                                    {...register('password')}/><span className="viewpass" onClick={togglePasswordVisiblity} />
                                                    {errors.password && <span>This field is required</span>}
                                            </div>
                                            <div className="form-group position-relative">
                                                <input className="form-control bg-gray-850 border-gray-800 password" type={passwordShown ? "text" : "password"} placeholder="Confirm password" {...register('confirmPassword')}/><span className="viewpass" onClick={togglePasswordVisiblity} />
                                                {errors.confirmPassword && <span>This field is required</span>}
                                            </div>
                                            <div class="flex items-center">
                                            <Controller
                                                    name="checkedCheckbox"
                                                    control={control}
                                                    defaultValue={false}
                                                    render={({ field }) => (
                                                    <input
                                                        id="checked-checkbox"
                                                        type="checkbox"
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        {...register('author')}
                                                    />
                                                    )}
                                                />
                                            <label for="checked-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Are you an Author</label>
                                        </div>
                                            <div className="form-group">
                                                <button className="btn btn-linear color-gray-850 hover-up" type="submit">Create an account</button>
                                            </div>
                                            <div className="form-group mb-0"><span>Already have an account?</span><Link className="color-linear" href="/page-login"> Sign In</Link></div>
                                        </form>
                                    </div>
                                    <div className="box-line"><span className="bg-gray-900">Or, sign up with your email</span></div>
                                    <div className="box-login-gmail bg-gray-850 border-gray-800 hover-up"><Link className="btn btn-login-gmail color-gray-500" href="#">Sign up with Google</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}