import React, {useEffect, useState} from 'react'
import Layout from "@/components/layout/Layout"
import PageHeader1 from "@/components/elements/PageHeader1"
import RecentPosts from "@/components/sections/RecentPosts"
import Sidebar from "@/components/layout/Sidebar"
import data from "@/utils/blogData2"
import Link from 'next/link'
import { db, auth } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore';

function AuthorList() {
  const [author, setAuthor] = useState();
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    getDocs(collection(db, 'users'))
       .then((querySnapshot) => {
            const data = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                 id: doc.id
            }));
            setUsers(data);
        })
       .catch((error) => {
            console.error('Error getting documents: ', error);
        });
    }

    useEffect(() => {
      getUsers()
    })

  return (
    <Layout>
                <div className="cover-home1">
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-1" />
                            <div className="col-xl-10 col-lg-12">
                            <PageHeader1
                                    title={'Author List'}
                                    des={'Top authors'}
                                />
                                  <div className="content-sidebar">
                        <div className="list-posts">
                            {users.map((item, i) => (
                                <div className="item-post wow animate__animated animate__fadeIn"  data-wow-delay={`${i/10}s`}  key={i}>
                                    <div className="image-post">
                                        <Link href={`/author/${item.id}`}>
                                            <img src={`${item.imageUrl}`} alt="Masomo Guide" />
                                        </Link>
                                    </div>
                                    <div className="info-post border-gray-800">
                                        <Link href={`/author/${item.id}`}>
                                            <h6 className="color-white mt-15">{item.fullname}</h6>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                                  <div className="row mt-70">
                                    <div className="col-lg-8">
                                        {/* <RecentPosts posts={posts}/> */}
                                    </div>
                                    <div className="col-lg-4">
                                        <Sidebar />
                                    </div>
                                </div>
                                  </div>
                                
                                
                                
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
  )
}

export default AuthorList
