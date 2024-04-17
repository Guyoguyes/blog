// 'use client'
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Layout from "@/components/layout/Layout";
import Link from 'next/link';
import { useForm } from "react-hook-form";

import Swal from 'sweetalert2'
import { collection, addDoc, getDocs, doc } from "firebase/firestore";
import { db, storage, auth } from "@/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";



const AddBlog = ({initialImageUrl }) => {
  const [user, setUser] = useState(null)
  const [category, setCategory] = useState([])

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

  const handleEditorChange = (content, editor) => {
    // setValue("content", content);
    setcontentInfo(content)
  };

  const onSubmit = async (e) => {
    try {
      
      await handleUpload();
      const data = { topic: topic, title: title, content: contentInfo, imageUrl: imageUrl, author: user.uid };
      console.log(data)
      const response = await addDoc(collection(db, 'posts'), data);
      Swal.fire({
        title: 'Success!',
        text: 'Blog Added Successfully!',
        icon: 'success',
        confirmButtonButtonText: 'Back'
      });
      console.log('Blog Added Successfully! ', response);
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
  

  const getCategory = async() => {
    getDocs(collection(db, 'category'))
       .then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                 id: doc.id
            }));
            setCategory(data);
            console.log(data)
        })
       .catch((error) => {
            console.error('Error getting documents: ', error);
        });
  }

  useEffect(() => {
    getCategory();
  })

  return (
    <Layout>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mt-50">
            <div className="col-lg-6">
            <div className="form-group">
                <select
                  className="form-control bg-gray-850 border-gray-800 color-gray-500"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                >
                  <option value="">Select a Category</option>
                  {category.map((item) =>{
                    return (
                      <option key={item.id} value={item.id}>{item.topic}</option>
                    )
                  })}
                  
                  {/* Add more options as needed */}
                </select>
          </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <input
                  className="form-control bg-gray-850 border-gray-800 color-gray-500"
                  type="text"
                  placeholder="Title *"
                  value={title} onChange={(e) => setTitle(e.target.value)} 
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
          <Editor
            apiKey='7umko255qrrk86q7hqkkygkcizg6vi2fob119obv0vcklt5e'
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue=""
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              setup: function (editor) {
                editor.on('change', function () {
                  handleEditorChange(editor.getContent(), editor);
                });
              }
            }}
          />
          <button type="submit" className="btn btn-linear d-none d-sm-inline-block hover-up hover-shadow mt-10">
            Save Blog
            <i className="fi-rr-arrow-small-right" />
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default AddBlog;
