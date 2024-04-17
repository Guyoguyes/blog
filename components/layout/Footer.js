import Link from 'next/link'
import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="footer-1 bg-gray-850 border-gray-800">
                        <div className="footer-bottom border-gray-800">
                            <div className="row">
                                <div className="col-lg-5 text-center text-lg-start">
                                    <p className="text-base color-white wow animate__animated animate__fadeIn">© 2024 Masomo Guide</p>
                                </div>
                                <div className="col-lg-7 text-center text-lg-end">
                                    <div className="box-socials">
                                        <div className="d-inline-block mr-30 wow animate__animated animate__fadeIn" data-wow-delay=".0s"><Link className="icon-socials icon-twitter color-gray-500" href="https://twitter.com">Twitter</Link></div>
                                        <div className="d-inline-block mr-30 wow animate__animated animate__fadeIn" data-wow-delay=".2s"><Link className="icon-socials icon-linked color-gray-500" href="https://www.linkedin.com">LinkedIn</Link></div>
                                        <div className="d-inline-block wow animate__animated animate__fadeIn" data-wow-delay=".4s">
                                            <Link className="icon-socials icon-insta color-gray-500" href="https://www.instagram.com">Instagram</Link></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>

        </>
    );
};

export default Footer;