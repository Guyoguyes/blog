import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import Layout from "@/components/layout/Layout";
import Link from 'next/link';
import { useForm } from "react-hook-form";

const TextEditor = () => {
  const editorRef = useRef(null);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Log the form data
  };

  return (
    <Layout>
      <div className="container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row mt-50">
            <div className="col-lg-6">
              <div className="form-group">
                <input
                  className="form-control bg-gray-850 border-gray-800 color-gray-500"
                  type="text"
                  placeholder="Topic *"
                  {...register("topic", { required: true })}
                />
                {errors.topic && <span>This field is required</span>}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <input
                  className="form-control bg-gray-850 border-gray-800 color-gray-500"
                  type="text"
                  placeholder="Title *"
                  {...register("title", { required: true })}
                />
                {errors.title && <span>This field is required</span>}
              </div>
            </div>
            <div className="col-lg-6">
              <div className="form-group">
                <input
                  className="form-control bg-gray-850 border-gray-800 color-gray-500"
                  type="file"
                  placeholder="Cover Photo *"
                  {...register("image", { required: true })}
                />
                {errors.image && <span>This field is required</span>}
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
            }}
          />
          <button type="submit" className="text-center mb-50">
            Save Blog
            <i className="fi-rr-arrow-small-right" />
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default TextEditor;
