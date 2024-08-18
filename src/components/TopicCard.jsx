import React from 'react';

export default function TopicCard({ item }) {
    return (
        <div className="w-[896px] overflow-hidden shadow-sm bg-white rounded-md">
            <div
                className="w-full h-[232px] bg-cover bg-center"
                style={{ backgroundImage: `url(${item.topic_img_url})` }}
            >
            </div>
            <div className="p-4 text-center text-gray-800 capitalize font-black">
                {item.topic_name}
            </div>
        </div>
    );
}
