import Link from 'next/link'
import { React, useState, useEffect } from "react"
import SwitchButton from '@/components/elements/SwitchButton'

const Header = ({ handleOpen, handleRemove, openClass }) => {
    // State to keep track of the scroll position
    const [scroll, setScroll] = useState(0);

    // State to represent whether something is toggled or not
    const [isToggled, setToggled] = useState(false);

    // Function to toggle the value of 'isToggled'
    const toggleTrueFalse = () => setToggled(!isToggled);

    // Effect hook to add a scroll event listener
    useEffect(() => {
        // Callback function to handle the scroll event
        const handleScroll = () => {
            // Check if the current scroll position is greater than 100 pixels
            const scrollCheck = window.scrollY > 100;

            // Update the 'scroll' state only if the scroll position has changed
            if (scrollCheck !== scroll) {
                setScroll(scrollCheck);
            }
        };

        // Add the 'handleScroll' function as a scroll event listener
        document.addEventListener("scroll", handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener("scroll", handleScroll);
        };
    });

    return (
        <>
            <header className={scroll ? "header sticky-bar bg-gray-900 stick" : "header sticky-bar bg-gray-900"}>
                <div className="container">
                    <div className="main-header">
                        <div className="header-logo">
                            <Link className="d-flex" href="/">
                                <img className="logo-night" alt="logo" src="/assets/imgs/template/logo1-.png" />
                                <img className="d-none logo-day" alt="logo" src="/assets/imgs/template/logo1-.png" />
                            </Link>
                        </div>
                        <div className="header-nav">
                            <nav className="nav-main-menu d-none d-xl-block">
                                <ul className="main-menu">
                                    <li><Link className="active" href="/">Home</Link>
                                    </li>
                                    {/* <li><Link className="color-gray-500" href="/page-contact">Contact</Link></li> */}
                                    {/* <li><Link className="color-gray-500" href="/addblog">Add</Link></li> */}
                                </ul>
                            </nav>
                            <div className={`burger-icon burger-icon-white ${openClass && "burger-close"}`}
                                onClick={() => { handleOpen(); handleRemove() }}>
                                <span className="burger-icon-top" />
                                <span className="burger-icon-mid" />
                                <span className="burger-icon-bottom" />
                            </div>
                        </div>
                        <div className="header-right text-end">
                            <Link className="btn btn-search" href="#" onClick={toggleTrueFalse} />
                            <SwitchButton />
                            <div className={isToggled ? "form-search p-20 d-block" : " form-search p-20 d-none"}>
                                <form action="#">
                                    <input className="form-control" type="text" placeholder="Search" />
                                    <input className="btn-search-2" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

        </>
    );
};

export default Header;