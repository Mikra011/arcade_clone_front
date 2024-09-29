import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function CongratModal({ isOpen, onClose }) {
    const navigate = useNavigate()

    const handleClose = () => {
        onClose()
        navigate(-1)
    }

    if (!isOpen) return null

    return (
        <div
            className="
            fixed inset-0 flex items-center justify-center 
            bg-black bg-opacity-50 z-50">
            <div
                className="
                bg-white p-6 rounded-lg shadow-lg 
                relative max-w-md w-full">
                <button
                    className="
                    absolute top-2 right-2 text-gray-500 
                    hover:text-gray-700 focus:outline-none"
                    onClick={handleClose}
                >
                    &times;
                </button>
                <div className="text-center">
                    <h2 className='text-gray-900 p-4'>
                        Congratulations! Challenge solved!
                    </h2>
                </div>
            </div>
        </div>
    );
};



