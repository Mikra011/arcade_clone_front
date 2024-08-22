import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetChallengesByIdQuery } from '../state/arcadeApi';

export default function Tests() {
    const { id } = useParams();
    const { data: challenge, error, isLoading } = useGetChallengesByIdQuery(id);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedSection, setSelectedSection] = useState('Inputs');

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handleDropdownClick = (testId) => {
        setOpenDropdown((prevId) => (prevId === testId ? null : testId));
    };

    return (
        <div className="p-4">
            {challenge.tests.map((test, index) => (
                <div key={test.test_id} className="mb-1">
                    <div className="
                    flex justify-between items-center cursor-pointer 
                    p-2 border border-slate-700" onClick={() => handleDropdownClick(test.test_id)}>
                        <div className="flex items-center space-x-2">
                            <svg
                                className={`w-2 h-2 text-white transition-transform ${
                                    openDropdown === test.test_id ? 'rotate-0' : '-rotate-90'
                                }`}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path d="M.44 6.22L12 17.78 23.56 6.22H.44z" fill="currentColor"></path>
                            </svg>
                            <span>Test {index + 1}</span>
                        </div>
                        <div className="w-4 h-4 rounded-full bg-white"></div>
                    </div>
                    {openDropdown === test.test_id && (
                        <div className="border border-t-0 border-l-0 border-slate-700">
                            <div className="flex h-full">
                                <div className="flex flex-col w-1/4">
                                    <div className="flex flex-col">
                                        <button
                                            className={`
                                                py-2 px-4 text-left border border-t-0 ${selectedSection === 'Inputs' 
                                                    ? 'border-2 border-t-2 border-blue-500' 
                                                    : 'border-slate-700 hover:bg-slate-800'}`}
                                            onClick={() => setSelectedSection('Inputs')}
                                        >
                                            Inputs
                                        </button>
                                        <button
                                            className={`
                                                py-2 px-4 text-left border border-t-0 ${selectedSection === 'Return Value' 
                                                    ? 'border-2 border-t-2 border-blue-500' 
                                                    : 'border-slate-700 hover:bg-slate-800'}`}
                                            onClick={() => setSelectedSection('Return Value')}
                                        >
                                            Return Value
                                        </button>
                                        <button
                                            className={`py-2 px-4 text-left border border-t-0 ${selectedSection === 'Console Output' 
                                                ? 'border-2 border-t-2 border-blue-500' 
                                                : 'border-slate-700 hover:bg-slate-800'}`}
                                            onClick={() => setSelectedSection('Console Output')}
                                        >
                                            Console Output
                                        </button>
                                        <button
                                            className={`py-2 px-4 text-left border border-t-0 ${selectedSection === 'Error Output' 
                                                ? 'border-2 border-t-2 border-blue-500' 
                                                : 'border-slate-700 hover:bg-slate-800'}`}
                                            onClick={() => setSelectedSection('Error Output')}
                                        >
                                            Error Output
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-grow p-4">
                                    {selectedSection === 'Inputs' && (
                                        <div>
                                            <div className="space-y-1">
                                                {test.inputs.map((input, i) => (
                                                    <div key={i} className='text-sm'>
                                                        {input.input_name}: {input.input_value}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {selectedSection === 'Return Value' && (
                                        <div>
                                            <div className="p-2 rounded shadow">{test.expected_output}</div>
                                        </div>
                                    )}
                                    {selectedSection === 'Console Output' && (
                                        <div>
                                            <h3 className="font-semibold mb-2">Console Output:</h3>
                                            <div className="p-2 rounded shadow">/* Console output here */</div>
                                        </div>
                                    )}
                                    {selectedSection === 'Error Output' && (
                                        <div>
                                            <h3 className="font-semibold mb-2">Error Output:</h3>
                                            <div className="p-2 rounded shadow">/* Error output here */</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}


