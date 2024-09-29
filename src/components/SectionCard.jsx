import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetProgressQuery } from '../state/arcadeApi';
import Modal from './AuthModal';

export default function SectionCard({ sectionData }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [progressData, setProgressData] = useState(null);

    const token = localStorage.getItem('token');

    const { data, refetch } = useGetProgressQuery(null, {
        skip: !token, // Only fetch if the token is available
        refetchOnMountOrArgChange: true, // Automatically refetch when needed
    });

    useEffect(() => {
        if (token) {
            refetch(); // Refetch progress data when token is set
        }
    }, [token, refetch]);

    useEffect(() => {
        if (data) {
            setProgressData(data.progress);
        }
    }, [data]);

    const handleCardClick = (event) => {
        if (!token) {
            event.preventDefault(); // Prevent navigation if not authenticated
            setIsModalOpen(true); // Open the modal
        }
    };

    const sectionProgress = progressData?.find(
        (progress) => progress.section_name === sectionData.section_name
    );

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
                <div className="p-3">
                    <div className="text-center text-gray-800 capitalize font-black">
                        {sectionData.section_name}
                    </div>

                    {/* Conditionally render the progress info */}
                    {sectionProgress && (
                        <div className="mt-2 text-center text-gray-500 font-light text-sm">
                            Solved questions: <span className='font-bold'>{sectionProgress.completed_challenges} / {sectionProgress.total_challenges}</span> 
                        </div>
                    )}
                </div>
            </Link>

            {/* Modal Component */}
            {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
        </>
    );
}
