import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from './AuthModal';

export default function SectionCard({ sectionData }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = (event) => {
        const token = localStorage.getItem('token'); // Check for token (authentication)
        if (!token) {
            event.preventDefault(); // Prevent navigation if not authenticated
            setIsModalOpen(true); // Open the modal
        }
    };

    return (
        <>
            <Link
                to={`/${sectionData.section_name}`}
                onClick={handleCardClick}
                className="
                w-[440px] overflow-hidden shadow-sm bg-white rounded-sm
                transition-transform transform hover:translate-y-[-4px]"
            >
                <div
                    className="w-full h-[144px] bg-cover bg-center"
                    style={{ backgroundImage: `url(${sectionData.section_img_url})` }}
                >
                </div>
                <div className="p-4 text-center text-gray-800 capitalize font-black">
                    {sectionData.section_name}
                </div>
            </Link>

            {/* Modal Component */}
            {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
        </>
    );
}
