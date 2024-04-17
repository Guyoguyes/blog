import Link from "next/link"
import { useState, useEffect } from "react"
import Head from 'next/head'
import Layout from "@/components/layout/Layout"
import Pagination from "@/components/elements/Pagination"
import Hero6 from "@/components/sections/Hero6"
import { doc, getDoc, getDocs, collection } from "firebase/firestore"
import { db } from "@/firebase"
import data from "@/utils/blogData"
import { useRouter } from "next/router"

export default function PageAuthor() {

  const [blogPost, setBlogPost] = useState([]);
  const [author, setAuthor] = useState('');

  const router = useRouter();

    const { id } = router.query;

    console.log('IDDDDDD : ' + id)

    const getSingleAuthor =async (id) => {
        if(id){
            const singleAuthor = doc(db, 'users', id);
            const data = await getDoc(singleAuthor)
            
            setAuthor({ ...data.data(), id: data.id })
            
            console.log("NEWWWWWW" + { ...data.data(), id: data.id })
        }
        console.log(id)
    }

    const getPostsByUser = async (userId) => {
      try {
        getDocs(collection(db, 'posts', userId))
       .then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                 id: doc.id
            }));
            setBlogPost({...data.data(), id: doc.id});
            console.log({...data.data(), id: doc.id})
        })
       .catch((error) => {
            console.error('Error getting documents: ', error);
        });
      } catch (error) {
        console.error('Error getting user document:', error);
        return null;
      }
    };


    useEffect(() => {
     
        getSingleAuthor(id)
        getPostsByUser(id)
    }, [id]);


    return (
        <>
            <Head>
                <title>
                    Masomo Guide - Author Bio
                </title>
            </Head>
            <Layout>
                <Hero6 name={author.fullname} profile={author.imageUrl}/>
                <div className="cover-home3">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-1" />
                            <div className="col-xl-10 col-lg-12">
                                <div className="mt-50">
                                    <h2 className="color-linear d-inline-block mb-10">Posted by {author.fullname}</h2>
                                    <p className="text-lg color-gray-500">Exclusive author</p>
                                    <div className="mt-50 mb-50">
                                        <div className="row mt-50 mb-10">
                                            {blogPost.slice(0, 2).map((item, i) => (
                                                <div className="col-lg-6" key={i}>
                                                    <div className="card-blog-1 hover-up wow animate__animated animate__fadeIn">
                                                        <div className="card-image mb-20">
                                                            <Link className="post-type" href="#" />
                                                            <Link href={`/blog/${item.id}`} >
                                                                <img src={`${item.imageUrl}`} alt="masomo guide" />
                                                            </Link>
                                                        </div>
                                                        <div className="card-info">
                                                            
                                                            <Link href={`/blog/${item.id}`} >
                                                                <h4 className="color-white mt-20">{item.title} </h4>
                                                            </Link>
                                                            <div className="row align-items-center mt-25">
                                                                <div className="col-7">
                                                                    <div className="box-author">
                                                                        <img src={`${author.imgUrl}`} alt="masomo" />
                                                                        <div className="author-info">
                                                                            <h6 className="color-gray-700">{author.fullname}</h6><span className="color-gray-700 text-sm">{item.date}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-5 text-end"><Link className="readmore color-gray-500 text-sm" href={`/blog/${item.id}`}><span>Read more</span></Link></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            {blogPost.slice(2,8).map((item, i) => (
                                                <div className="col-lg-4" key={i}>
                                                    <div className="card-blog-1 hover-up wow animate__animated animate__fadeIn">
                                                        <div className="card-image mb-20"><Link className="post-type" href="#" />
                                                            <Link href={`/blog/${item.id}`} ><img src={`${item.imgUrl}`} alt="masomo" /></Link></div>
                                                        <div className="card-info"><Link href={`/blog/${item.id}`} >
                                                                <h5 className="color-white mt-20">{item.title}</h5></Link>
                                                            <div className="row align-items-center mt-25">
                                                                <div className="col-7">
                                                                    <div className="box-author">
                                                                        <img src={`${author.imgUrl}`} alt="masomo" />
                                                                        <div className="author-info">
                                                                            <h6 className="color-gray-700">{author.fullname}</h6><span className="color-gray-700 text-sm">{item.date}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-5 text-end"><Link className="readmore color-gray-500 text-sm" href={`/blog/${item.id}`}><span>Read more</span></Link></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <Pagination />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>

        </>
    )
}