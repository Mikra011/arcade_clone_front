import React from "react";

export default function TestDropdownButton({ label, isActive, onClick }) {
    return (
        <button
            className={`
                py-2 px-4 text-left border border-t-0 
                w-[160px] h-[40px] ${isActive
                    ? 'border-2 border-t-2 border-blue-500'
                    : 'border-slate-700 hover:bg-slate-800'}
            `}
            onClick={onClick}
        >
            {label}
        </button>
    )
}
