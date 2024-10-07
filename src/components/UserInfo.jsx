import React, { useState } from 'react';
import { useGetUserInfoQuery } from '../state/arcadeApi';
import AuthModal from './AuthModal';

export default function UserInfo() {
    const [isAuthModalOpen, setAuthModalOpen] = useState(false)
    const [isDropdownOpen, setDropdownOpen] = useState(false)

    const token = localStorage.getItem('token') // Check if user is authenticated

    const { data: userInfo } = useGetUserInfoQuery(undefined, {
        skip: !token // Only run query if token is available
    })

    const handleLoginClick = () => {
        setAuthModalOpen(true);
    };

    const handleLogout = () => {
        localStorage.removeItem('token')
        window.location.reload() // Reload to reflect logout
    };

    // Function to toggle the dropdown menu
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen)
    }

    return (
        <div className="flex">
            {!token ? (
                // Show login/register button if not authenticated
                <button onClick={handleLoginClick} className="text-base px-2">
                    Login / Register
                </button>
            ) : (
                // Display avatar if authenticated
                <div className="cursor-pointer" onClick={toggleDropdown}>
                    <div className="flex items-center justify-center bg-blue-500 text-white rounded-full w-10 h-10">
                        {/* Display the first two letters of username */}
                        {userInfo?.username.slice(0, 2).toUpperCase()}
                    </div>
                    {isDropdownOpen && (
                        <div className="absolute right-0 m-2 w-72 bg-white shadow-lg border rounded-md p-3 text-black">
                            <p className="font-bold">{userInfo.username}</p>
                            <p>Challenges Completed: {userInfo.challengesCompleted}</p>
                            <button 
                                onClick={handleLogout} 
                                className="w-full mt-2 bg-red-500 text-white rounded-md py-1">
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Auth Modal */}
            {isAuthModalOpen && (
                <AuthModal onClose={() => setAuthModalOpen(false)} />
            )}
        </div>
    )
}

