import React, { useState } from 'react';

export default function Tests({ challenge, testResults, errorMessage }) {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [selectedSection, setSelectedSection] = useState('Inputs');

    const handleDropdownClick = (testId) => {
        setOpenDropdown((prevId) => (prevId === testId ? null : testId));
    };

    // console.log(testResults.results)

    const totalTests = challenge.tests.length
    const passedTests = testResults
        ? testResults.results.filter(result => result.passed).length
        : 0;

    const allTestsPassed = passedTests === totalTests

    return (
        <div className="p-4">
            {testResults && (
                <div className={`mb-4 flex items-center space-x-2 ${allTestsPassed ? 'text-green-200' : 'text-red-500'}`}>
                    <span>
                        {allTestsPassed ? (
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-5.83l6.59-6.59L18 9l-8 8-4-4 1.41-1.41L10 14.17z" fill="currentColor"></path>
                            </svg>

                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path d="M1 21.5l11-19 11 19H1zm18.53-2L12 6.49 4.47 19.5h15.06zm-8.53-3v2h2v-2h-2zm0-6h2v4h-2v-4z" fill="currentColor"></path>
                            </svg>
                        )}
                    </span>
                    <span>Tests passed: {passedTests}/{totalTests}</span>
                </div>
            )}
            {challenge.tests.map((test, index) => (
                <div key={test.test_id} className="mb-1">
                    <div className="
                    flex justify-between items-center cursor-pointer 
                    p-2 border border-slate-700 overflow-hidden" onClick={() => handleDropdownClick(test.test_id)}>
                        <div className="flex items-center space-x-2">
                            <svg
                                className={`w-2 h-2 text-white transition-transform ${openDropdown === test.test_id ? 'rotate-0' : '-rotate-90'
                                    }`}
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                            >
                                <path d="M.44 6.22L12 17.78 23.56 6.22H.44z" fill="currentColor"></path>
                            </svg>
                            <span>Test {index + 1}</span>
                        </div>
                        <div>
                            {testResults
                                ? (testResults.results.find(result => result.test_id === test.test_id)?.passed
                                    ?
                                    <div className='flex flex-row text-green-200'>
                                        <span>Passed</span>
                                        <span>
                                            <svg width="24" height="24" viewBox="0 0 24 24">
                                                <path d="M8.795 15.875l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41-10.59 10.58z" fill="currentColor" ></path>
                                            </svg>
                                        </span>
                                    </div>

                                    :
                                    <div className='flex flex-row text-red-500'>
                                        <span >Wrong Answer</span>
                                        <span>
                                            <svg width="24" height="24" viewBox="0 0 24 24">
                                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor" ></path>
                                            </svg>
                                        </span>

                                    </div>
                                )
                                : <div className="w-4 h-4 rounded-full border"></div>}
                        </div>
                    </div>
                    {openDropdown === test.test_id && (
                        <div className="border border-t-0 border-l-0 border-slate-700">
                            <div className="flex h-full">
                                <div className="flex flex-col">
                                    <div className="flex flex-col">
                                        <button
                                            className={`
                                                py-2 px-4 text-left border border-t-0 
                                                w-[160px] h-[40px] ${selectedSection === 'Inputs'
                                                    ? 'border-2 border-t-2 border-blue-500'
                                                    : 'border-slate-700 hover:bg-slate-800'}`}
                                            onClick={() => setSelectedSection('Inputs')}
                                        >
                                            Inputs
                                        </button>
                                        <button
                                            className={`
                                                py-2 px-4 text-left border border-t-0 
                                                w-[160px] h-[40px] ${selectedSection === 'Return Value'
                                                    ? 'border-2 border-t-2 border-blue-500'
                                                    : 'border-slate-700 hover:bg-slate-800'}`}
                                            onClick={() => setSelectedSection('Return Value')}
                                        >
                                            Return Value
                                        </button>
                                        <button
                                            className={`
                                                py-2 px-4 text-left border border-t-0 
                                                w-[160px] h-[40px] ${selectedSection === 'Console Output'
                                                    ? 'border-2 border-t-2 border-blue-500'
                                                    : 'border-slate-700 hover:bg-slate-800'}`}
                                            onClick={() => setSelectedSection('Console Output')}
                                        >
                                            Console Output
                                        </button>
                                        <button
                                            className={`
                                                py-2 px-4 text-left border border-t-0 
                                                w-[160px] h-[40px] ${selectedSection === 'Error Output'
                                                    ? 'border-2 border-t-2 border-blue-500'
                                                    : 'border-slate-700 hover:bg-slate-800'}`}
                                            onClick={() => setSelectedSection('Error Output')}
                                        >
                                            Error Output
                                        </button>
                                    </div>
                                </div>
                                <div className="flex-grow p-4 overflow-hidden">
                                    {selectedSection === 'Inputs' && (
                                        <div>
                                            <div className="space-y-1 overflow-hidden">
                                                {test.inputs.map((input, i) => (
                                                    <div key={i} className='text-sm overflow-hidden'>
                                                        {input.input_name}: {input.input_value}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {selectedSection === 'Return Value' && (
                                        <div>
                                            <h3 className="mb-2">Expected output:</h3>
                                            <div className="p-2">{test.expected_output}</div>
                                        </div>
                                    )}
                                    {selectedSection === 'Console Output' && (
                                        <div>
                                            <h3 className="font-semibold mb-2">Console Output:</h3>
                                            <div className="p-2">Console output here</div>
                                        </div>
                                    )}
                                    {selectedSection === 'Error Output' && (
                                        <div>
                                            <h3 className="font-semibold mb-2">Error Output:</h3>
                                            <div className="p-2">{errorMessage && (
                                                    <span>{errorMessage}</span>
                                            )}</div>
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


