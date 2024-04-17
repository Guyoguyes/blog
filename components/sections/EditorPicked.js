
import Link from "next/link"
import data from "@/utils/blogData2"

const EditorPicked = ({posts}) => {
    if (!posts) {
        return <div>Loading...</div>;
    }
    return (
        <>
           <h2 className="color-linear d-inline-block mb-10 wow animate__animated animate__fadeInUp">Top Articles</h2>
            <p className="text-lg color-gray-500 wow animate__animated animate__fadeInUp">Featured and highly
                rated articles</p>
            <div className="row mt-70">
            {posts.slice(0, 5).map((item, i) => (
                    i < 2 ? (
                        <div className="col-lg-6 wow animate__animated animate__fadeIn" key={i}>
                            <div className="card-blog-1 hover-up">
                                <div className="card-image mb-20 mh-315 bdr-16">
                                    <Link href={`/blog/${item.id}`}>
                                        <img src={item.imageUrl} alt="image" />
                                    </Link>
                                </div>
                                <div className="card-info">
                                    <Link href={`/blog/${item.id}`}>
                                        <h4 className="color-white mt-20">{item.title}</h4>
                                    </Link>
                                    <div className="row align-items-center mt-25">
                                        <div className="col-7"></div>
                                        <div className="col-5 text-end">
                                            <Link className="readmore color-gray-500 text-sm" href={`/blog/${item.id}`}>
                                                <span>Read more</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="col-lg-4 wow animate__animated animate__fadeIn" data-wow-delay=".1s" key={i}>
                            <div className="card-blog-1 hover-up">
                                <div className="card-image mb-20 mh-200 bdr-16 ">
                                    <Link href={`/blog/${item.id}`}>
                                        <img src={item.imageUrl} alt="image" />
                                    </Link>
                                </div>
                                <div className="card-info">
                                    <Link href={`/blog/${item.id}`}>
                                        <h5 className="color-white mt-20">{item.title}</h5>
                                    </Link>
                                    <div className="row align-items-center mt-25">
                                        <div className="col-5 text-end">
                                            <Link className="readmore color-gray-500 text-sm" href={`/blog/${item.id}`}>
                                                <span>Read more</span>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                ))}
            </div>
            
            <div className="text-center mb-80 mt-50 wow animate__animated animate__pulse"><img src="assets/imgs/page/homepage4/banner-3.png" alt="Genz" /></div>
        </>
     );
};

export default EditorPicked;