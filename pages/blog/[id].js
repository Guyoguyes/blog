import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import Layout from "@/components/layout/Layout"
import Breadcrumb from "@/components/elements/Breadcrumb"
import data from "@/utils/blogData"
import { getDoc, doc } from "firebase/firestore"
import { db } from "@/firebase"
import Advertisement from "@/components/sections/Adveristment"
import SideCards from "@/components/layout/SideCard"



const BlogDetails = () => {

    let Router = useRouter();

    const [blogPost, setBlogPost] = useState(null);

    const { id } = Router.query;

    const getSinglePost =async (id) => {
        if(id){
            const singlePost = doc(db, 'posts', id);
            const data = await getDoc(singlePost)
            setBlogPost({ ...data.data(), id: data.id })
            console.log({ ...data.data(), id: data.id })
        }
        console.log(id)
    }


    useEffect(() => {
     
        getSinglePost(id)
    }, [id]);


    return (
        <>
            <Layout>
                {blogPost && (
                    <>
                        <div className="cover-home3">
                            <div className="container">
                                <div className="row">
                                    <Advertisement />
                                    <div className="col-xl-1" />
                                    <div className="col-xl-10 col-lg-12">
                                        <div className="pt-30 border-bottom border-gray-800 pb-20">
                                            <div className="box-breadcrumbs">
                                                <Breadcrumb title={blogPost.title} />
                                            </div>
                                        </div>
                                        <div className="row mt-50 align-items-end">
                                            <div className="col-lg-9 col-md-8">
                                                <h2 className="color-linear mb-30">{blogPost.title} </h2>
                                            </div>
                                            <div className="col-lg-3 col-md-4">
                                                <div className="box-share border-gray-800">
                                                    <h6 className="d-inline-block color-gray-500 mr-10">Share</h6>
                                                    <Link className="icon-media icon-fb" href="#" />
                                                    <Link className="icon-media icon-tw" href="#" />
                                                    <Link className="icon-media icon-printest" href="#" />
                                                </div>
                                            </div>
                                        </div>
                                                <div className="content-detail border-gray-800">
                                                    <div className="mt-20 mb-20">
                                                        <img className="img-bdrd-16 " src={blogPost.imageUrl} alt="blog" />
                                                    </div>

                                                </div>
                                                <div dangerouslySetInnerHTML={{ __html: blogPost.content }}></div>
                                            
                                    </div>
                                    <Advertisement />
                                    {/* <SideCards /> */}
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </Layout>
        </>
    );
};

export default BlogDetails;