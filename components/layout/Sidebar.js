import Link from "next/link"
import data from "@/utils/blogData2"
import comments from "@/utils/commentsData"
import gallery from "@/utils/galleryData"

const Sidebar = ({ posts }) => {
    if (!posts) {
        return <div>Loading...</div>;
    }
    return (
        <>
            <div className="sidebar">
                <div className="box-sidebar bg-gray-850 border-gray-800">
                    <div className="head-sidebar wow animate__animated animate__fadeIn">
                        <h5 className="line-bottom">Popular Posts</h5>
                    </div>
                    <div className="content-sidebar">
                        <div className="list-posts">
                            {posts.slice(0, 5).map((item, i) => (
                                <div className="item-post wow animate__animated animate__fadeIn"  data-wow-delay={`${i/10}s`}  key={i}>
                                    <div className="image-post">
                                        <Link href={`/blog/${item.id}`}>
                                            <img src={`${item.imageUrl}`} alt="Genz" />
                                        </Link>
                                    </div>
                                    <div className="info-post border-gray-800">
                                        <Link href={`/blog/${item.id}`}>
                                            <h6 className="color-white">{item.title}</h6>
                                        </Link>
                                        <ul className="d-inline-block">
                                            <li className="color-gray-700">{item.date}</li>
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default Sidebar;