// Import necessary components
import Layout from '@/components/layout/Layout';
import React,{useEffect, useState} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { db, auth } from '@/firebase'
import { collection, getDocs } from 'firebase/firestore';


// Profile component
const Profile = () => {

  const [posts, setPosts] = useState([]);

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

useEffect(() => {
    getPosts();
}, [])


  return (
    <Layout>
      <div className="overflow-y-auto sm:p-0 pt-4 pr-4 pb-20 pl-4 bg-gray-800">
        <div className="flex justify-center items-end text-center min-h-screen sm:block">
          <div className="bg-gray-500 transition-opacity bg-opacity-75"></div>
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen">​</span>
          <div className= "inline-block text-left bg-gray-900 rounded-lg overflow-hidden align-bottom transition-all transform shadow-2xl sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
            <div className="items-center w-full mr-auto ml-auto relative max-w-7xl md:px-12 lg:px-24">
              <div className="grid grid-cols-1">
                <div className="mt-4 mr-auto mb-4 ml-auto bg-gray-900 max-w-lg">
                  <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
                    <img src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;w=500" className="flex-shrink-0 object-cover object-center btn- flex w-8 h-8 mr-auto -mb-8 ml-auto rounded-full shadow-xl" style={{height: "150px", width: "150px", }}/>
                    <p className="mt-2 text-2xl font-semibold leading-none text-black tracking-tighter lg:text-3xl">Mark Xenon</p>
                    <p className="mt-3 text-base leading-relaxed text-center text-gray-200">I am a fullstack software developer with ReactJS for frontend and NodeJS for backend</p>
                    <div className="w-full mt-6">
                      <a className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base font-medium text-white bg-indigo-600 rounded-xl transition duration-500 ease-in-out transform hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Hire me</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-50 mb-50">
                                    <div className="row mt-50 mb-10">
                                        {posts.slice(0, 2).map((item, i) => (
                                            <div className="col-lg-6" key={i}>
                                                <div className="card-blog-1 hover-up wow animate__animated animate__fadeIn">
                                                    <div className="card-image mb-20">
                                                        <Link className="post-type" href="#" />
                                                        <Link href={`/blog/${item.id}`} >
                                                            <img src={`${item.imageUrl}`} alt="masomo guide"  style={{height:'200px',width:'300px'}}/>
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
                                                            <div className="col-5 text-end"><Link href={`/blog/update/${item.id}`}>
                                                                <button className="btn btn-linear d-none d-sm-inline-block hover-up hover-shadow"> Edit Article</button>
                                                            </Link></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}

                                        {posts.slice(2,8).map((item, i) => (
                                            <div className="col-lg-4" key={i}>
                                                <div className="card-blog-1 hover-up wow animate__animated animate__fadeIn">
                                                    <div className="card-image mb-20"><Link className="post-type" href="#" />
                                                        <Link href={`/blog/${item.id}`} ><img src={`${item.imageUrl}`} style={{height:'200px',width:'300px'}} alt="masomo guide" /></Link></div>
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
                                                            <div className="col-5 text-end"><Link href={`/blog/update/${item.id}`}>
                                                                <button className="btn btn-linear d-none d-sm-inline-block hover-up hover-shadow"> Edit Article</button>
                                                            </Link></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* <Pagination /> */}
                                </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

// Export the Profile component
export default Profile;
