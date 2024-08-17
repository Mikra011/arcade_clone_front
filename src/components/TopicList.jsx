import React from 'react';
import { useGetTopicsByIdQuery } from '../state/arcadeApi';
import { useParams } from 'react-router-dom';
import TopicCard from './TopicCard';

export default function TopicList(){
    const { id } = useParams()
    const { data: topics, error, isLoading } = useGetTopicsByIdQuery(id);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="flex flex-wrap gap-4 justify-center">
            {topics.map((topic, index) => (
                <TopicCard key={index} item={topic} />
            ))}
        </div>
    );
};