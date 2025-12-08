import React from 'react';

export default function Toggle({ checked, onChange }) {
    return (
        <div
            onClick={onChange}
            className={`relative inline-flex h-7 w-14 items-center rounded-full transition-all cursor-pointer ${checked ? "bg-[#f7c948] shadow-[0_0_8px_#f7c948,0_0_12px_rgba(247,201,72,0.5)]" : "bg-gray-600"
                }`}
        >
            <div
                className={`h-6 w-6 rounded-full bg-white shadow-md transform transition-transform duration-300 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${checked ? "translate-x-7" : "translate-x-1"
                    }`}
            ></div>
        </div>
    );
}
