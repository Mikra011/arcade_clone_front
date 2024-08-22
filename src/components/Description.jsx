import React from 'react';
import '../styles/description.css';

export default function Description({ description }) {
    return (
        <div className='p-8 bg-white'>
            <div
                className='description-container'
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    )
}
