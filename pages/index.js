'use client'
import Head from 'next/head'
import React, {useState, useEffect} from 'react'
import Layout from "@/components/layout/Layout"
import Hero1 from "@/components/sections/Hero1"
import EditorPicked from "@/components/sections/EditorPicked"
import PopularCategories from "@/components/sections/PopularCategories"
import RecentPosts from "@/components/sections/RecentPosts"
import Sidebar from "@/components/layout/Sidebar"
import HotTopic from "@/components/slider/HotTopic"
import { db } from "@/utils/firebase";

import { collection, addDoc, getDocs } from 'firebase/firestore';
import Advertisement from '@/components/sections/Adveristment'




export default function Home() {
    
    const [posts, setPosts] = useState(null);

    const dbInstance = collection(db, 'posts');

    const getPosts = () => {
        getDocs(dbInstance)
        .then((data) => {
            setPosts(data.docs.map((item) => {
                return { ...item.data(), id: item.id }
            }));
        })
    }

    
    useEffect(() => {
       getPosts()
    }, []);

    return (
        <>
            <Head>
                <title>Digitalearn Education</title>
            </Head>
            <Layout>
                <div className="cover-home1">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-1" />
                            <div className="col-xl-10 col-lg-12">
                                <Hero1 />
                                {/* <HotTopic /> */}
                                <EditorPicked posts={posts}/>
                                <div className="row mt-70">
                                    <div className="col-lg-8">
                                        <RecentPosts posts={posts}/>
                                    </div> 
                                    <div className="col-lg-4">
                                        <Advertisement />
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
