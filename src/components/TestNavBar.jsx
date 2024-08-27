import React from 'react';

export default function TestNavBar({ onRunTest }) {
    return (
        <div className="sticky z-10 top-0 text-white flex items-center justify-between px-4 py-1 border-b border-slate-700 bg-slate-900">
            <button className='text-white text-base font-bold'>
                TESTS
            </button>
            <button
                className="flex items-center bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold px-2 rounded h-[24px] text-center"
                onClick={onRunTest} // Call the function passed from the parent component
            >
                <svg
                    className="mr-2" 
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor" 
                >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4-8l-6 4.5v-9l6 4.5z"></path>
                </svg>
                RUN TESTS
            </button>
        </div>
    )
}
