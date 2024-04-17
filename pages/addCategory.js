// 'use client'
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Layout from "@/components/layout/Layout";
import Link from 'next/link';
import { useForm } from "react-hook-form";

import Swal from 'sweetalert2'
import { collection, addDoc } from "firebase/firestore";
import { db, storage, auth } from "@/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import PageHeader1 from "@/components/elements/PageHeader1"


const AddCategory = ({initialImageUrl }) => {
  const [user, setUser] = useState(null)

  const editorRef = useRef(null);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [value, setValue] = useState();
  const [title, setTitle] = useState();
  const [topic, setTopic] = useState();
  const [contentInfo, setcontentInfo] = useState();
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(initialImageUrl || null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
          setUser(user);
          console.log(user)
      } else {
          setUser(null);
          router.push('/page-login');
      }
    });

    return () => unsubscribe();
  }, [])

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


  const onSubmit = async (e) => {
    try {
      
      await handleUpload();
      const data = { topic: topic, imageUrl: imageUrl, date: Date.now()};
      console.log(data)
      const response = await addDoc(collection(db, 'category'), data);
      Swal.fire({
        title: 'Success!',
        text: 'Category Added Successfully!',
        icon: 'success',
        confirmButtonButtonText: 'Back'
      });
      console.log('Category Added Successfully! ', response);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed. Please try again!',
        icon: 'error',
        confirmButtonButtonText: 'Try'
      });
      console.error("Error adding document: ", error);
    }
  };
  


  return (
    <Layout>
      <div className="container">
      <PageHeader1
          title={'Add Category'}
          des={''}/>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mt-50">
            <div className="col-lg-6">
              <div className="form-group">
                <input
                  className="form-control bg-gray-850 border-gray-800 color-gray-500"
                  type="text"
                  placeholder="Name *"
                  value={topic} onChange={(e) => setTopic(e.target.value)} 
                />
              </div>
            </div>
            <div className="col-lg-6">
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
            </div>
          </div>
          <button type="submit" className="btn btn-linear d-none d-sm-inline-block hover-up hover-shadow mt-10">
            Save Category
            <i className="fi-rr-arrow-small-right" />
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddCategory;
