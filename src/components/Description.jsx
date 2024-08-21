import React, { useEffect, useState } from 'react';
import { useGetChallengesByIdQuery } from '../state/arcadeApi'; 
import { useParams } from 'react-router-dom';
import '../styles/description.css'

export default function Description() {
    const { id } = useParams()
    const [description, setDescription] = useState('');
    const { data: challenge, error, isLoading } = useGetChallengesByIdQuery(id); // Change `1` to the ID you want to test

    useEffect(() => {
        if (challenge) {
            setDescription(challenge.description);
        }
    }, [challenge]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading challenge description.</div>;

    return (
            <div className='p-4 bg-white rounded-lg shadow-md'>
                <div
                    className='description-container'
                    dangerouslySetInnerHTML={{ __html: description }}>
                </div>
            </div>
    );
}

