import React, { useState } from 'react';

export default function TopicCard({ item, isDropdownVisible, onCardClick }) {
    return (
        <div className="relative w-[896px] overflow-hidden shadow-sm bg-white rounded-md overflow-visible mb-12">

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
                className="relative w-full h-[232px] bg-cover bg-center cursor-pointer"
                style={{ backgroundImage: `url(${item.topic_img_url})` }}
                onClick={onCardClick}
            >
            </div>

            {/* Small Challenge Circles at the Bottom */}
            {!isDropdownVisible && (
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
            )}


            {/* Dropdown Content */}
            {isDropdownVisible && (
                <div className="w-full bg-white rounded-md">
                    <div className="flex flex-col items-center">
                        <div className="w-full flex flex-col items-center space-y-2 py-4 px-20">
                            {item.challenges.map((challenge, index) => (
                                <div
                                    key={index}
                                    className="flex flex-row items-center justify-between p-1 pr-2 w-full border rounded-full bg-gray-100"
                                >
                                    <div className='flex flex-row items-center space-x-4'>
                                        <div className="w-12 h-12 flex justify-center items-center bg-gray-300 rounded-full text-gray-800 font-bold">
                                            {challenge.order_index}
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-800">
                                            {challenge.challenge_name}
                                        </h3>
                                    </div>
                                    <div
                                        className="w-8 h-8 flex justify-center items-center bg-gray-700 
                                        border border-gray-300 rounded-full font-semibold">
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
