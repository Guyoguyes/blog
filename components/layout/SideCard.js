import React from 'react'
import Link from "next/link"

function SideCards() {
  return (
    <div className="sidebar">
                                                    <div className="box-sidebar bg-gray-850 border-gray-800">
                                                        <div className="head-sidebar">
                                                            <h5 className="line-bottom">Categories</h5>
                                                        </div>
                                                        <div className="content-sidebar">
                                                            <div className="list-cats">
                                                                <div className="item-cats border-gray-800 wow animate__animated animate__fadeIn">
                                                                    <div className="cat-left">
                                                                        <div className="image-cat">
                                                                            <Link href="/blog-archive"><img src="/assets/imgs/page/healthy/cat1.png" alt="Genz" /></Link></div>
                                                                        <div className="info-cat">
                                                                            <Link className="color-gray-500 text-xl" href="/blog-archive">Travel Tips</Link></div>
                                                                    </div>
                                                                    <div className="cat-right">
                                                                        <Link className="btn btn-small text-sm color-gray-500 bg-gray-800" href="/blog-archive">36
                                                                            posts</Link></div>
                                                                </div>
                                                                <div className="item-cats border-gray-800 wow animate__animated animate__fadeIn">
                                                                    <div className="cat-left">
                                                                        <div className="image-cat">
                                                                            <Link href="/blog-archive-2"><img src="/assets/imgs/page/healthy/cat2.png" alt="Genz" /></Link></div>
                                                                        <div className="info-cat">
                                                                            <Link className="color-gray-500 text-xl" href="/blog-archive-2">Technology</Link></div>
                                                                    </div>
                                                                    <div className="cat-right">
                                                                        <Link className="btn btn-small text-sm color-gray-500 bg-gray-800" href="/blog-archive-2">14
                                                                            posts</Link></div>
                                                                </div>
                                                                <div className="item-cats border-gray-800 wow animate__animated animate__fadeIn">
                                                                    <div className="cat-left">
                                                                        <div className="image-cat">
                                                                            <Link href="/blog-archive-3"><img src="/assets/imgs/page/healthy/cat3.png" alt="Genz" /></Link></div>
                                                                        <div className="info-cat">
                                                                            <Link className="color-gray-500 text-xl" href="/blog-archive-3">Business</Link></div>
                                                                    </div>
                                                                    <div className="cat-right">
                                                                        <Link className="btn btn-small text-sm color-gray-500 bg-gray-800" href="/blog-archive-3">87
                                                                            posts</Link></div>
                                                                </div>
                                                                <div className="item-cats border-gray-800 wow animate__animated animate__fadeIn">
                                                                    <div className="cat-left">
                                                                        <div className="image-cat">
                                                                            <Link href="/blog-archive-4"><img src="/assets/imgs/page/healthy/cat4.png" alt="Genz" /></Link></div>
                                                                        <div className="info-cat">
                                                                            <Link className="color-gray-500 text-xl" href="/blog-archive-4">Food</Link></div>
                                                                    </div>
                                                                    <div className="cat-right">
                                                                        <Link className="btn btn-small text-sm color-gray-500 bg-gray-800" href="/blog-archive-4">125
                                                                            posts</Link></div>
                                                                </div>
                                                                <div className="item-cats border-gray-800 wow animate__animated animate__fadeIn">
                                                                    <div className="cat-left">
                                                                        <div className="image-cat">
                                                                            <Link href="/blog-archive-5"><img src="/assets/imgs/page/healthy/cat5.png" alt="Genz" /></Link></div>
                                                                        <div className="info-cat">
                                                                            <Link className="color-gray-500 text-xl" href="/blog-archive-5">Lifestyle</Link></div>
                                                                    </div>
                                                                    <div className="cat-right">
                                                                        <Link className="btn btn-small text-sm color-gray-500 bg-gray-800" href="/blog-archive-5">6
                                                                            posts</Link></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="box-sidebar bg-gray-850 border-gray-800">
                                                        <div className="head-sidebar wow animate__animated animate__fadeIn">
                                                            <h5 className="line-bottom">Popular Posts</h5>
                                                        </div>
                                                        <div className="content-sidebar">
                                                            <div className="list-posts">
                                                                <div className="item-post wow animate__animated animate__fadeIn">
                                                                    <div className="image-post">
                                                                        <Link href="/single-sidebar"><img src="/assets/imgs/page/homepage1/img-post.jpg" alt="Genz" /></Link></div>
                                                                    <div className="info-post border-gray-800">
                                                                        <Link href="/single-sidebar">
                                                                            <h6 className="color-white">Creating is a privilege but it’s also a gift</h6></Link><span className="color-gray-700">15 mins read</span>
                                                                        <ul className="d-inline-block">
                                                                            <li className="color-gray-700">15 April 2023</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="item-post wow animate__animated animate__fadeIn">
                                                                    <div className="image-post">
                                                                        <Link href="/single-sidebar"><img src="/assets/imgs/page/homepage1/img-post2.jpg" alt="Genz" /></Link></div>
                                                                    <div className="info-post border-gray-800">
                                                                        <Link href="/single-sidebar">
                                                                            <h6 className="color-white">Being unique is better than being perfect</h6></Link><span className="color-gray-700">15 mins read</span>
                                                                        <ul className="d-inline-block">
                                                                            <li className="color-gray-700">15 April 2023</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="item-post wow animate__animated animate__fadeIn">
                                                                    <div className="image-post">
                                                                        <Link href="/single-sidebar"><img src="/assets/imgs/page/homepage1/img-post3.jpg" alt="Genz" /></Link></div>
                                                                    <div className="info-post border-gray-800">
                                                                        <Link href="/single-sidebar">
                                                                            <h6 className="color-white">Every day, in every city and town across the country</h6></Link><span className="color-gray-700">15 mins read</span>
                                                                        <ul className="d-inline-block">
                                                                            <li className="color-gray-700">15 April 2023</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="item-post wow animate__animated animate__fadeIn">
                                                                    <div className="image-post">
                                                                        <Link href="/single-sidebar"><img src="/assets/imgs/page/homepage1/img-post4.jpg" alt="Genz" /></Link></div>
                                                                    <div className="info-post border-gray-800">
                                                                        <Link href="/single-sidebar">
                                                                            <h6 className="color-white">Your voice, your mind, your story, your vision</h6></Link><span className="color-gray-700">15 mins read</span>
                                                                        <ul className="d-inline-block">
                                                                            <li className="color-gray-700">15 April 2023</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className="item-post wow animate__animated animate__fadeIn">
                                                                    <div className="image-post">
                                                                        <Link href="/single-sidebar"><img src="/assets/imgs/page/homepage1/img-post4.jpg" alt="Genz" /></Link></div>
                                                                    <div className="info-post border-gray-800">
                                                                        <Link href="/single-sidebar">
                                                                            <h6 className="color-white">Your voice, your mind, your story, your vision</h6></Link><span className="color-gray-700">15 mins read</span>
                                                                        <ul className="d-inline-block">
                                                                            <li className="color-gray-700">15 April 2023</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="box-sidebar bg-gray-850 border-gray-800">
                                                        <div className="head-sidebar wow animate__animated animate__fadeIn">
                                                            <h5 className="line-bottom">Last Comment</h5>
                                                        </div>
                                                        <div className="content-sidebar">
                                                            <div className="list-comments">
                                                                <div className="item-comment border-gray-800 wow animate__animated animate__fadeIn">
                                                                    <p className="color-gray-500 mb-20">“ Gosh jaguar ostrich quail one excited dear hello and bound and the and bland moral misheard roadrunner “</p>
                                                                    <div className="box-author-small"><img src="/assets/imgs/page/homepage1/author6.png" alt="Genz" />
                                                                        <div className="author-info"><span className="d-block color-gray-700 text-sm">Jane Cooper</span><span className="color-gray-700 text-xs">15 April 2023</span></div>
                                                                    </div>
                                                                </div>
                                                                <div className="item-comment border-gray-800 wow animate__animated animate__fadeIn">
                                                                    <p className="color-gray-500 mb-20">“ Gosh jaguar ostrich quail one excited dear hello and bound and the and bland moral misheard roadrunner “</p>
                                                                    <div className="box-author-small"><img src="/assets/imgs/page/homepage1/author7.png" alt="Genz" />
                                                                        <div className="author-info"><span className="d-block color-gray-700 text-sm">Katen Doe</span><span className="color-gray-700 text-xs">15 April 2023</span></div>
                                                                    </div>
                                                                </div>
                                                                <div className="item-comment border-gray-800 wow animate__animated animate__fadeIn">
                                                                    <p className="color-gray-500 mb-20">“ Gosh jaguar ostrich quail one excited dear hello and bound and the and bland moral misheard roadrunner “</p>
                                                                    <div className="box-author-small"><img src="/assets/imgs/page/homepage1/author8.png" alt="Genz" />
                                                                        <div className="author-info"><span className="d-block color-gray-700 text-sm">Barbara Cartland</span><span className="color-gray-700 text-xs">15 April 2023</span></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="box-sidebar bg-gray-850 border-gray-800">
                                                        <div className="head-sidebar">
                                                            <h5 className="line-bottom d-inline-block wow animate__animated animate__fadeIn">Popular Tags</h5>
                                                        </div>
                                                        <div className="content-sidebar pb-20">
                                                            <Link className="btn btn-tags bg-gray-850 border-gray-800 mr-10 mb-10 bdrd16 wow animate__animated animate__fadeIn" href="/blog-archive">Technology</Link>
                                                            <Link className="btn btn-tags bg-gray-850 border-gray-800 mr-10 mb-10 bdrd16 wow animate__animated animate__fadeIn" href="/blog-archive">Travel</Link>
                                                            <Link className="btn btn-tags bg-gray-850 border-gray-800 mr-10 mb-10 bdrd16 wow animate__animated animate__fadeIn" href="/blog-archive">Interior</Link>
                                                            <Link className="btn btn-tags bg-gray-850 border-gray-800 mr-10 mb-10 bdrd16 wow animate__animated animate__fadeIn" href="/blog-archive">Minimal</Link>
                                                            <Link className="btn btn-tags bg-gray-850 border-gray-800 mr-10 mb-10 bdrd16 wow animate__animated animate__fadeIn" href="/blog-archive">Plant</Link>
                                                            <Link className="btn btn-tags bg-gray-850 border-gray-800 mr-10 mb-10 bdrd16 wow animate__animated animate__fadeIn" href="/blog-archive">Nature</Link>
                                                            <Link className="btn btn-tags bg-gray-850 border-gray-800 mr-10 mb-10 bdrd16 wow animate__animated animate__fadeIn" href="/blog-archive">Business</Link>
                                                            <Link className="btn btn-tags bg-gray-850 border-gray-800 mr-10 mb-10 bdrd16 wow animate__animated animate__fadeIn" href="/blog-archive">Animal</Link>
                                                            <Link className="btn btn-tags bg-gray-850 border-gray-800 mr-10 mb-10 bdrd16 wow animate__animated animate__fadeIn" href="/blog-archive">Healthy</Link>
                                                            <Link className="btn btn-tags bg-gray-850 border-gray-800 mr-10 mb-10 bdrd16 wow animate__animated animate__fadeIn" href="/blog-archive">Space</Link></div>
                                                    </div>
                                                </div>
  )
}

export default SideCards