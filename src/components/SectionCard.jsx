import React from 'react';
import { Link } from 'react-router-dom';

export default function SectionCard({ sectionData }) {
    return (
        <Link
            to={`/${sectionData.section_name}`}
            className="
            w-[440px] overflow-hidden shadow-sm bg-white rounded-sm
            transition-transform transform hover:translate-y-[-4px]">
            <div
                className="w-full h-[144px] bg-cover bg-center"
                style={{ backgroundImage: `url(${sectionData.section_img_url})` }}
            >
            </div>
            <div className="p-4 text-center text-gray-800 capitalize font-black">
                {sectionData.section_name}
            </div>
        </Link>
    );
}
