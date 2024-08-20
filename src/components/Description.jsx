import React, { useEffect, useState } from 'react';
import { useGetChallengesByIdQuery } from '../state/arcadeApi'; // Adjust the import path as needed
import '../styles/description.css'

export default function Description() {
    const [description, setDescription] = useState('');
    const { data: challenge, error, isLoading } = useGetChallengesByIdQuery(12); // Change `1` to the ID you want to test

    useEffect(() => {
        if (challenge) {
            setDescription(challenge.description);
        }
    }, [challenge]);

    return (
        <div className='bg-gradient-to-t from-blue-900 to-gray-700 p-12'>
            <div className='p-4 bg-white rounded-lg shadow-md'>
                <div
                    dangerouslySetInnerHTML={{ __html: description }}>
                </div>
            </div>
        </div>
    );
}

