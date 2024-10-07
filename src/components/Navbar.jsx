import React from "react";
import { useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import UserInfo from "./UserInfo";

export default function Navbar() {
    // Access challengeName from the global state
    const challengeName = useSelector(state => state.challenge.challengeName)

    const navigate = useNavigate()
    const location = useLocation()

    // Function to handle back button click
    const handleBackClick = () => {
        navigate(-1)
    }

    // Conditionally show the back button if not on the main page
    const isMainPage = location.pathname === '/'

    return (
        <nav className="fixed top-0 w-full z-40 text-white bg-indigo-950 ">
            <div className="p-2 flex justify-between items-center">
                {/* Show back button only if not on the main page */}
                {!isMainPage && (
                    <div className="cursor-pointer flex flex-row space-x-2 items-center" onClick={handleBackClick}>
                        <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            transform="rotate(270)">
                            <path
                                d="M20.8 19.1L12 10.32 3.2 19.1.5 16.4 12 4.9l11.5 11.5-2.7 2.7z"
                                fill="currentColor"></path>
                        </svg>
                        <span className="text-xs font-black">
                            BACK
                        </span>
                    </div>
                )}
                {/* Display challengeName */}
                <div className="font-medium">{challengeName}</div>

                <UserInfo />

            </div>
        </nav>
    )
}
