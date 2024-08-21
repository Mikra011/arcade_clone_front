import React from 'react';

export default function TopicCard({ item }) {
    return (
        <div className="relative w-[896px] overflow-hidden shadow-sm 
        bg-white rounded-md overflow-visible mb-12">

            {/* Topic Name on Top Border */}
            <div className='flex justify-center'>
                <div className="
                absolute w-[285px] top-0 w-full text-center text-gray-800 
                bg-white py-2 font-medium capitalize rounded-full z-10 
                transform -translate-y-6">
                    <span className="text-lg px-6">{item.topic_name}</span>
                </div>
            </div>


            {/* Background Image */}
            <div
                className="relative w-full h-[232px] bg-cover bg-center"
                style={{ backgroundImage: `url(${item.topic_img_url})` }}
            >
            </div>

            {/* Small Challenge Circles at the Bottom */}
            <div className="flex justify-center items-center space-x-4 py-4">
                {item.challenges.map((challenge, index) => (
                    <div
                        key={index}
                        className="w-8 h-8 flex justify-center items-center bg-white 
                        border border-gray-300 rounded-full text-gray-800 font-semibold">
                        {challenge.order_index}
                    </div>
                ))}
            </div>
        </div>
    );
}


{/* Challenges List */ }
{/* <div className="p-4 flex flex-col items-center bg-white">
                <div className="w-full flex flex-col items-center space-y-4 py-4">
                    {item.challenges.map((challenge, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-center space-x-4 py-2 px-8 w-full max-w-[800px] border rounded-lg bg-gray-100"
                        >
                            <div className="w-10 h-10 flex justify-center items-center bg-gray-300 rounded-full text-gray-800 font-bold">
                                {challenge.order_index}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800">
                                {challenge.challenge_name}
                            </h3>
                        </div>
                    ))}
                </div>
            </div> */}