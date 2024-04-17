import Link from "next/link"
import { useState, useEffect } from "react"
import Head from 'next/head'
import Layout from "@/components/layout/Layout"
import Pagination from "@/components/elements/Pagination"
import PageHeader1 from "@/components/elements/PageHeader1"
import PopularCategories from "@/components/sections/PopularCategories"

import data from "@/utils/blogData"

import { db, auth } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router'

export default function Archive() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [categories, setCategories] = useState(null);
    const [authorId, setAuthorId] = useState([]);

    const router = useRouter()

    const dbInstance = collection(db, 'posts');

    const getPosts = async() => {
        getDocs(dbInstance)
            .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }));
                setPosts(data);
            })
            .catch((error) => {
                console.error('Error getting documents: ', error);
            });
    };

    const getCategories = () => {
        getDocs(collection(db, 'category'))
           .then((querySnapshot) => {
                const data = querySnapshot.docs.map((doc) => ({
                    ...doc.data(),
                     id: doc.id
                }));
                setCategories(data);
                setAuthorId(data.author)
                console.log(data)
            })
           .catch((error) => {
                console.error('Error getting documents: ', error);
            });
    }

    
    useEffect(() => {
        getPosts();
        getCategories();
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
                router.push('/page-login');
            }
        });

        return () => unsubscribe(); // Return the cleanup function
    }, []);
    return (
        <>
            <Head>
                <title>Masomo Guide - Blog archive</title>
            </Head>
            <Layout>
                <div className="cover-home3">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-1" />
                            <div className="col-xl-10 col-lg-12">
                                <PageHeader1
                                    title={'Blogs'}
                                    des={'Top rated blogs for you to learn'}
                                />
                                <div className="mt-50 mb-50">
                                    <div className="row mt-50 mb-10">
                                        {posts.slice(0, 2).map((item, i) => (
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
                                                                    <img src={`assets/imgs/page/homepage1/${item.author}`} alt="masomo guide" />
                                                                    <div className="author-info">
                                                                        <h6 className="color-gray-700">{item.authorTitle}</h6><span className="color-gray-700 text-sm">{item.date}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-5 text-end"><Link className="readmore color-gray-500 text-sm" href={`/blog/${item.id}`}><span>Read more</span></Link></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {posts.slice(2,8).map((item, i) => (
                                            <div className="col-lg-4" key={i}>
                                                <div className="card-blog-1 hover-up wow animate__animated animate__fadeIn">
                                                    <div className="card-image mb-20"><Link className="post-type" href="#" />
                                                        <Link href={`/blog/${item.id}`} ><img src={`${item.imageUrl}`} alt="masomo guide" /></Link></div>
                                                    <div className="card-info">
                                                        <Link href={`/blog/${item.id}`} >
                                                            <h5 className="color-white mt-20">{item.title}</h5></Link>
                                                        <div className="row align-items-center mt-25">
                                                            <div className="col-7">
                                                                <div className="box-author">
                                                                    <img src={`assets/imgs/page/homepage1/${item.author}`} alt="masomo guide" />
                                                                    <div className="author-info">
                                                                        <h6 className="color-gray-700">{item.authorTitle}</h6><span className="color-gray-700 text-sm">{item.date}</span>
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
                                    {/* <Pagination /> */}
                                </div>
                                <div className="mb-70" />
                                <PopularCategories categories={categories}/>
                            </div>
                        </div>
                    </div>
                </div>

            </Layout>
        </>
    )
}