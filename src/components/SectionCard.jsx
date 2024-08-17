import React from 'react';
import { Link } from 'react-router-dom';

export default function SectionCard({ item }) {
    return (
        <Link to={`/${item.id}`} className="w-[440px] overflow-hidden shadow-sm bg-white">
            <div
                className="w-full h-[144px] bg-cover bg-center"
                style={{ backgroundImage: `url(${item.section_img_url})` }}
            >
            </div>
            <div className="p-4 text-center text-gray-800 capitalize font-black">
                {item.section_name}
            </div>
        </Link>
    );
}
