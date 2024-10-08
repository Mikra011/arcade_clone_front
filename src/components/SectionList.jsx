// src/components/SectionList.js
import React, { useEffect, useState } from 'react';
import { useGetSectionsQuery } from '../state/arcadeApi';
import SectionCard from './SectionCard';
import LoadingMainPageSpinner from './LoadingMainPageSpinner';

export default function SectionList() {
    const { data: sections, error, isLoading } = useGetSectionsQuery()
    const [countdown, setCountdown] = useState(60) // Initialize countdown at 60 seconds

    useEffect(() => {
        let timer
        if (isLoading && countdown > 0) {
            timer = setInterval(() => {
                setCountdown(prev => prev - 1)
            }, 1000)
        }

        return () => clearInterval(timer) // Clean up the timer on unmount
    }, [isLoading, countdown])

    if (isLoading) return <LoadingMainPageSpinner countdown={countdown} />
    if (error) return <div>Error: {error.message}</div>

    return (
        <div className="flex flex-col gap-4 justify-center items-center p-12">
            {sections.map((section, index) => (
                <SectionCard key={index} sectionData={section} />
            ))}
        </div>
    )
}
