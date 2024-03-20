import Link from "next/link"
import { useState } from "react"

const MobileMenu = ({ openClass }) => {
    // State to track the active status and key
    const [isActive, setIsActive] = useState({
        status: false,
        key: "",
    });

    // Function to handle toggling the active status based on the given key
    const handleToggle = (key) => {
        // Check if the current key matches the active key in the state
        if (isActive.key === key) {
            // If the current key matches, set the active status to false
            setIsActive({
                status: false,
            });
        } else {
            // If the current key does not match, set the active status to true and update the key
            setIsActive({
                status: true,
                key,
            });
        }
    };

    return (
        <>
            <div className={`mobile-header-active mobile-header-wrapper-style perfect-scrollbar bg-gray-900 ${openClass}`}>
                <div className="mobile-header-wrapper-inner">
                    <div className="mobile-header-content-area">
                        <div className="mobile-logo border-gray-800">
                            <Link className="d-flex" href="/">
                                <img className="logo-night" alt="Logo" src="/assets/imgs/template/logo1-.png" />
                                <img className="d-none logo-day" alt="Logo" src="/assets/imgs/template/logo1-.png" />
                            </Link>
                        </div>
                        <div className="perfect-scroll">
                            <div className="mobile-menu-wrap mobile-header-border">
                                <nav className="mt-15">
                                    <ul className="mobile-menu font-heading">
                                        <li className={isActive.key == 1 ? "has-children active" : "has-children"} onClick={() => handleToggle(1)}>
                                            <span className="menu-expand"><i className="fi-rr-caret-down"></i></span>
                                            <Link href="/">Home</Link>
                                        </li>
                                        {/* <li className={isActive.key == 1 ? "has-children active" : "has-children"} onClick={() => handleToggle(1)}>
                                            <span className="menu-expand"><i className="fi-rr-caret-down"></i></span>
                                            <Link href="/addblog">Add</Link>
                                        </li> */}
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default MobileMenu;