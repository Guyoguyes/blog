import Link from "next/link"
import categories from "@/utils/categoriesData"

const Hero2 = ({categories}) => {
    if(!categories){
        <div>Loading</div>
    }
    return (
        <>
            <div className="banner banner-home2">
                <div className="text-center">
                    <h6 className="color-gray-600">Welcome to Masomo Guide</h6>
                    <h1 className="color-white">One<span className="color-linear"> Unique&nbsp;</span>
                        stop<br className="d-none d-lg-block" />for learning
                        <span className="color-linear">&nbsp;Blogs</span>
                    </h1>
                </div>
                <div className="text-center mt-50">
                    {/* <ul className="list-tags-col-5 mb-50 text-center">
                        {categories.slice(0, 9).map((item, i) => (
                            <li key={i}>
                                <div className="card-style-2 hover-up hover-neon wow animate__animated animate__fadeInUp" data-wow-delay={`${i/10}s`}>
                                    <div className="card-image"><Link href="/blog-archive"><img src={`${item.img}`} alt="masomo guide" /></Link></div>
                                    <div className="card-info"><Link className="color-gray-500" href="/blog-archive">{item.topic}</Link></div>
                                </div>
                            </li>
                        ))}
                    </ul> */}
                </div>
            </div>
        </>
     );
};

export default Hero2;