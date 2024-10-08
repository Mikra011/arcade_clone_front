// src/components/LoadingSpinner.js
import React from 'react';

export default function LoadingMainPageSpinner({ countdown }) {
    return (
        <div
            className="
            fixed inset-0 flex items-center justify-center 
            bg-gradient-to-t from-blue-900 to-gray-700 bg-opacity-50 z-50">
            <div className="flex flex-col items-center">
                <div
                    className="
                    loader animate-spin rounded-full border-t-4 border-b-4 
                    border-blue-500 h-16 w-16 mb-4">
                </div>
                <span className="text-white text-xl text-center p-4">
                    <div className="mb-2">It is a free deployment, so please be patient!</div>
                    <div className="font-mono">Loading... {countdown} seconds remaining.</div>
                    <div className="mt-2 text-3xl font-semibold">THANK YOU!</div>
                </span>
            </div>
        </div>
    )
}
