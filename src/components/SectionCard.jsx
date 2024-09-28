import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetProgressQuery } from '../state/arcadeApi';
import Modal from './AuthModal';

export default function SectionCard({ sectionData }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [progressData, setProgressData] = useState(null); // Local state to hold progress data

    // Fetch progress data when the component mounts
    const token = localStorage.getItem('token'); // Get the token from local storage

    const { data } = useGetProgressQuery(null, {
        skip: !token, // Skip fetching if no token is available
        refetchOnMountOrArgChange: true
    });

    useEffect(() => {
        if (data) {
            setProgressData(data.progress); // Set the progress data to local state
            // console.log('Fetched progress data:', data);
        }
    }, [data]); // Dependency on data

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
                <div className="p-4">
                    <div className="text-center text-gray-800 capitalize font-black">
                        {sectionData.section_name}
                    </div>

                    {/* Conditionally render the progress info */}
                    {sectionProgress && (
                        <div className="text-center text-gray-500 font-bold text-sm">
                            Solved questions: {sectionProgress.completed_challenges} / {sectionProgress.total_challenges}
                        </div>
                    )}
                </div>
            </Link>

            {/* Modal Component */}
            {isModalOpen && <Modal onClose={() => setIsModalOpen(false)} />}
        </>
    );
}
