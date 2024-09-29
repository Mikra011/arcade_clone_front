import React from 'react';
import { Link, useParams } from 'react-router-dom';

export default function TopicCard({ topicData, isDropdownVisible, onCardClick }) {
    const { sectionName } = useParams()

    // Determine the appropriate background image based on the topic's availability and completion status
    const backgroundImageUrl = topicData.available || topicData.completed
        ? topicData.topic_img_c_url
        : topicData.topic_img_url

    return (
        <div className="relative w-[896px] bg-white rounded-md mb-10">

            {/* Topic Name on Top Border */}
            <div className='flex justify-center'>
                <div className="
                    absolute top-0 text-center text-gray-800 
                    bg-white py-2 font-medium capitalize rounded-full z-10 
                    transform -translate-y-6 flex flex-row justify-between
                    pr-2">
                    <span className="text-xl px-6">{topicData.topic_name}</span>
                    <div className="w-8 h-8 flex justify-center items-center">
                        {topicData.completed ? (
                            <svg
                                width="32"
                                height="32"
                                viewBox="0 0 24 24"
                                className='text-green-500'>
                                <path d="M12 .3C5.55.3.3 5.56.3 12S5.56 23.7 12 23.7 23.7 18.44 23.7 12 18.44.3 12 .3zM9.66 17.85L3.82 12l1.65-1.65 4.2 4.2 8.86-8.88 1.65 1.66-10.52 10.5z" fill='currentColor' />
                            </svg>
                        ) : (
                            <div className='w-6 h-6 border-2 border-gray-300 rounded-full'></div>
                        )}
                    </div>
                </div>
            </div>

            {/* Background Image */}
            <div
                className="relative w-full h-[232px] bg-cover bg-center cursor-pointer rounded-t-md"
                style={{ backgroundImage: `url(${backgroundImageUrl})` }}
                onClick={onCardClick}
            >
            </div>

            {/* Small Challenge Circles at the Bottom */}
            {!isDropdownVisible && (
                <div className="flex justify-center items-center space-x-4 py-3">
                    {topicData.challenges.map((challenge, index) => (
                        <div key={index} className="relative">
                            {/* Pin SVG (shown when challenge is available) */}
                            {challenge.available && (
                                <div
                                    className="absolute cursor-pointer -top-12 left-1/2 transform -translate-x-1/2 -translate-y-6"
                                    onClick={onCardClick}>
                                    <svg
                                        width="40" // Adjusted width to fit above the circle
                                        height="60"
                                        viewBox="15 30 95 60"
                                    >
                                        <g
                                            style={{
                                                fill: 'black',
                                                opacity: 1,
                                            }}
                                            transform="scale(1.4 1.4)"
                                        >
                                            <path
                                                d="M 45 0 C 27.677 0 13.584 14.093 13.584 31.416 c 0 4.818 1.063 9.442 3.175 13.773 c 2.905 5.831 11.409 20.208 20.412 35.428 l 4.385 7.417 C 42.275 89.252 43.585 90 45 90 s 2.725 -0.748 3.444 -1.966 l 4.382 -7.413 c 8.942 -15.116 17.392 -29.4 20.353 -35.309 c 0.027 -0.051 0.055 -0.103 0.08 -0.155 c 2.095 -4.303 3.157 -8.926 3.157 -13.741 C 76.416 14.093 62.323 0 45 0 z M 45 42.81 c -6.892 0 -12.5 -5.607 -12.5 -12.5 c 0 -6.893 5.608 -12.5 12.5 -12.5 c 6.892 0 12.5 5.608 12.5 12.5 C 57.5 37.202 51.892 42.81 45 42.81 z"
                                                style={{
                                                    fill: 'white',
                                                }}
                                            />
                                        </g>
                                    </svg>
                                </div>
                            )}

                            {/* Challenge Circle */}
                            {(challenge.completed || challenge.available) ? (
                                // Link is active if the challenge is completed or available
                                <Link
                                    to={`/${sectionName}/${challenge.id}`}
                                    className={`
                                        w-8 h-8 flex justify-center items-center rounded-full font-semibold 
                                        ${challenge.completed
                                            ? 'bg-green-500 text-white'
                                            : 'bg-white border-2 border-red-500 text-gray-500'}`}
                                >
                                    {challenge.order_index}
                                </Link>
                            ) : (
                                // If not available, render a disabled button or span
                                <div
                                    className={`
                                        w-8 h-8 flex justify-center items-center rounded-full font-semibold 
                                        bg-white border-2 border-gray-400 text-gray-400 cursor-not-allowed`}
                                >
                                    {challenge.order_index}
                                </div>
                            )}

                        </div>
                    ))}
                </div>
            )}


            {/* Dropdown Content */}
            {isDropdownVisible && (
                <div className="w-full bg-white rounded-md">
                    <div className="flex flex-col items-center">
                        <div className="w-full flex flex-col items-center space-y-2 py-4 px-20">
                            {topicData.challenges.map((challenge, index) => (
                                (challenge.completed || challenge.available) ? (
                                    // Link is clickable if the challenge is completed or available
                                    <Link
                                        to={`/${sectionName}/${challenge.id}`}
                                        key={index}
                                        className="flex flex-row items-center justify-between p-1 pr-4 w-full border rounded-full bg-gray-100"
                                    >
                                        <div className='flex flex-row items-center space-x-4'>
                                            <div className="w-12 h-12 flex justify-center items-center bg-gray-300 rounded-full text-gray-800">
                                                {challenge.order_index}
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {challenge.challenge_name}
                                            </h3>
                                        </div>
                                        <div className="w-8 h-8 flex justify-center items-center">
                                            {challenge.completed ? (
                                                <svg
                                                    width="32"
                                                    height="32"
                                                    viewBox="0 0 24 24"
                                                    className='text-green-500'
                                                >
                                                    <path d="M12 .3C5.55.3.3 5.56.3 12S5.56 23.7 12 23.7 23.7 18.44 23.7 12 18.44.3 12 .3zM9.66 17.85L3.82 12l1.65-1.65 4.2 4.2 8.86-8.88 1.65 1.66-10.52 10.5z" fill='currentColor' />
                                                </svg>
                                            ) : (
                                                <div className="w-8 h-8 border-2 border-red-500 rounded-full"></div>
                                            )}
                                        </div>
                                    </Link>
                                ) : (
                                    // Render a disabled "fake link" (non-clickable div)
                                    <div
                                        key={index}
                                        className="flex flex-row items-center justify-between p-1 pr-4 w-full border rounded-full bg-gray-100 opacity-50 cursor-not-allowed"
                                    >
                                        <div className='flex flex-row items-center space-x-4'>
                                            <div className="w-12 h-12 flex justify-center items-center bg-gray-300 rounded-full text-gray-800">
                                                {challenge.order_index}
                                            </div>
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {challenge.challenge_name}
                                            </h3>
                                        </div>
                                        <div className="w-8 h-8 flex justify-center items-center">
                                            <svg width="32" height="32" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18.81 8.018h-1.135V5.742c0-3.14-2.542-5.69-5.675-5.69s-5.675 2.55-5.675 5.69v2.276H5.19a2.272 2.272 0 0 0-2.27 2.275v11.379a2.272 2.272 0 0 0 2.27 2.275h13.62a2.272 2.272 0 0 0 2.27-2.275V10.293a2.272 2.272 0 0 0-2.27-2.275zM12 18.258a2.272 2.272 0 0 1-2.27-2.276A2.272 2.272 0 0 1 12 13.707a2.272 2.272 0 0 1 2.27 2.275A2.272 2.272 0 0 1 12 18.258zm3.518-10.24H8.482V5.742A3.526 3.526 0 0 1 12 2.215a3.526 3.526 0 0 1 3.519 3.527v2.276z" />
                                            </svg>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
