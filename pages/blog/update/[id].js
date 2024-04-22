import React, { useEffect, useRef, useState } from "react";
import Layout from "@/components/layout/Layout";
import { useForm } from "react-hook-form";
import { Editor } from 'primereact/editor';
import Swal from 'sweetalert2';
import { doc, updateDoc } from "firebase/firestore";
import { db, storage, auth } from "@/firebase";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

const UpdateBlog = ({ initialBlog }) => {
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(initialBlog.imageUrl);
  const [uploadProgress, setUploadProgress] = useState(0);

  const editorRef = useRef(null);
  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();

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
  }, []);

  useEffect(() => {
    getCategory();
    setValue("title", initialBlog.title);
    setValue("topic", initialBlog.topic);
    setValue("content", initialBlog.content);
  }, []);

  function handleChange(event) {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  }

  const handleUpload = async () => {
    if (!selectedImage) return;
    const storageRef = ref(storage, `files/${selectedImage.name}`);
    const uploadTask = uploadBytesResumable(storageRef, selectedImage);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setUploadProgress(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
        });
      }
    );
  };

  const handleEditorChange = (content, editor) => {
    setValue("content", content);
  };

  const onUpdate = async (data) => {
    try {
      await handleUpload();
      const newData = { ...data, imageUrl };
      await updateDoc(doc(db, 'posts', initialBlog.id), newData);
      Swal.fire({
        title: 'Success!',
        text: 'Blog Updated Successfully!',
        icon: 'success',
        confirmButtonButtonText: 'Back'
      });
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed. Please try again!',
        icon: 'error',
        confirmButtonButtonText: 'Try'
      });
      console.error("Error updating document: ", error);
    }
  };

  const getCategory = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'category'));
      const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setCategory(data);
    } catch (error) {
      console.error('Error getting documents: ', error);
    }
  };

  return (
    <Layout>
      <div className="container">
        <form onSubmit={handleSubmit(onUpdate)}>
          <div className="row mt-50">
            <div className="col-lg-6">
              <div className="form-group">
                <select
                  className="form-control bg-gray-850 border-gray-800 color-gray-500"
                  {...register("topic")}
                >
                  <option value="">Select a Category</option>
                  {category.map((item) => (
                    <option key={item.id} value={item.id}>{item.topic}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <input
                  className="form-control bg-gray-850 border-gray-800 color-gray-500"
                  type="text"
                  placeholder="Title *"
                  {...register("title")}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <input
                  className="form-control bg-gray-850 border-gray-800 color-gray-500"
                  type="file"
                  onChange={handleChange}
                />
                {uploadProgress > 0 && <p>Upload Progress: {uploadProgress}%</p>}
                {imageUrl && <img src={imageUrl} alt="Uploaded Image" />}
              </div>
            </div>
          </div>
          <Editor
            value={watch("content")}
            onTextChange={handleEditorChange}
            style={{ height: '320px' }}
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

export default UpdateBlog;
