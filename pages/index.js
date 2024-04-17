import Head from 'next/head'
import { useState, useEffect } from 'react'
import Layout from "@/components/layout/Layout"
import Hero2 from "@/components/sections/Hero2"
import EditorPicked from "@/components/sections/EditorPicked"
import PopularCategories from "@/components/sections/PopularCategories"
import RecentPosts from "@/components/sections/RecentPosts"
import Sidebar from "@/components/layout/Sidebar"
import HotTopic from "@/components/slider/HotTopic"
import { db, auth } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore';
import { useRouter } from 'next/router'

export default function Home() {
    const [posts, setPosts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [user, setUser] = useState(null);

    const router = useRouter()

    const dbInstance = collection(db, 'posts');

    const getPosts = () => {
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
                // router.push('/page-login');
            }
        });

        return () => unsubscribe(); // Return the cleanup function
    }, []);

    return (
        <>
            <Head>
                <title>Masomo Guide</title>
            </Head>
            <Layout>
                <div className="cover-home1">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-1" />
                            <div className="col-xl-10 col-lg-12">
                                <Hero2 categories={categories}/>
                                <HotTopic categories={categories}/>
                                <EditorPicked posts={posts}/>
                                <PopularCategories categories={categories}/>
                                <div className="row mt-70">
                                    <div className="col-lg-8">
                                        <RecentPosts posts={posts}/>
                                    </div>
                                    <div className="col-lg-4">
                                        <Sidebar />
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
