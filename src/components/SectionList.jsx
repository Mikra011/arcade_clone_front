// src/components/SectionList.js
import React from 'react';
import { useGetSectionsQuery } from '../state/arcadeApi';
import SectionCard from './SectionCard';

export default function SectionList(){
    const { data: sections, error, isLoading } = useGetSectionsQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="flex flex-col gap-4 justify-center items-center p-12">
            {sections.map((section, index) => (
                <SectionCard key={index} sectionData={section} />
            ))}
        </div>
    );
};


