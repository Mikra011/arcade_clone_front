import React, { useState } from 'react';
import { useGetTopicsByIdQuery } from '../state/arcadeApi';
import { useParams } from 'react-router-dom';
import TopicCard from './TopicCard';

export default function TopicList() {
    const [openIndex, setOpenIndex] = useState(null);

    const handleCardClick = (index) => {
        setOpenIndex(openIndex === index ? null : index); // Toggle the open state
    };
    const { sectionName } = useParams()
    const { data: topics, error, isLoading } = useGetTopicsByIdQuery(sectionName);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <h1 className='text-white p-12 text-4xl font-light capitalize tracking-widest'>{sectionName}</h1>
            {topics.map((topic, index) => (
                <TopicCard
                    key={index}
                    topicData={topic}
                    isDropdownVisible={openIndex === index}
                    onCardClick={() => handleCardClick(index)}
                />
            ))}
        </div>
    );
};