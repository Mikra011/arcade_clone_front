import React, { useState, useRef, useEffect } from 'react';
import CongratModal from './CongratModal';
import TestDropdownButton from './TestDropdownButton';
import { useRecordProgressMutation } from '../state/arcadeApi';
import { useParams } from 'react-router-dom';

export default function Tests({ challenge, testResults = { results: [] }, errorMessage }) {
    const [openDropdown, setOpenDropdown] = useState(null)
    const [selectedSection, setSelectedSection] = useState('Inputs')
    const [returnDividerPosition, setReturnDividerPosition] = useState(50)
    const [isModalOpen, setIsModalOpen] = useState(false) // Modal state

    const { id } = useParams()
    const [recordProgress] = useRecordProgressMutation()

    const containerRef = useRef(null)
    const isDragging = useRef(false)

    // Handles the movement of the divider (dragging)
    const handleMouseMove = (e) => {
        if (!isDragging.current || !containerRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const newDividerPosition = ((e.clientX - rect.left) / rect.width) * 100

        setReturnDividerPosition(Math.max(0, Math.min(100, newDividerPosition))) // Keep the divider within bounds
    }

    // Handles the mouse down event (when the user starts dragging)
    const handleMouseDown = () => {
        isDragging.current = true;
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    // Handles the mouse up event (when the user stops dragging)
    const handleMouseUp = () => {
        isDragging.current = false
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }

    const handleDropdownClick = (testId) => {
        setOpenDropdown((prevId) => (prevId === testId ? null : testId))
    }

    const totalTests = challenge?.tests?.length || 0
    const passedTests = testResults?.results?.filter(result => result.passed).length || 0


    const allTestsPassed = passedTests === totalTests

    useEffect(() => {
        if (allTestsPassed) {
            const progressData = { challenge_id: id, completed: true }

            // Log the data being sent
            // console.log('Recording progress with data:', progressData)

            // Record progress when all tests have passed
            recordProgress(progressData)
                .unwrap()
                .then((response) => {
                    // console.log('Progress recorded successfully:', response)
                    setIsModalOpen(true) // Open modal when progress is recorded
                })
                .catch((error) => {
                    // console.error('Failed to record progress:', error);
                })
        }
    }, [allTestsPassed, recordProgress, id]);

    return (
        <div className="p-4">
            <CongratModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            {errorMessage && (
                <div className="text-red-500 p-4 mb-4">
                    <strong>{errorMessage.name}:</strong>
                    <p>
                        {/* Safely handle both string and object errors */}
                        {typeof errorMessage === 'string'
                            ? errorMessage // if it's a string, just display it
                            : (errorMessage.message || "An unknown error occurred")} {/* if it's an object, display the message */}
                    </p>
                    {errorMessage.stack && (
                        <pre className="whitespace-pre-wrap">{errorMessage.stack}</pre>
                    )}
                </div>
            )}

            {/* Render test results only if there is no error */}
            {!errorMessage && testResults && (
                <div className={`mb-4 flex items-center space-x-2 ${allTestsPassed ? 'text-green-200' : 'text-red-500'}`}>
                    <span>
                        {allTestsPassed ? (
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-2-5.83l6.59-6.59L18 9l-8 8-4-4 1.41-1.41L10 14.17z"
                                    fill="currentColor"></path>
                            </svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24">
                                <path d="M1 21.5l11-19 11 19H1zm18.53-2L12 6.49 4.47 19.5h15.06zm-8.53-3v2h2v-2h-2zm0-6h2v4h-2v-4z"
                                    fill="currentColor"></path>
                            </svg>
                        )}
                    </span>
                    <span>Tests passed: {passedTests}/{totalTests}</span>
                </div>
            )}

            {challenge.tests.map((test, index) => {
                // Find the matching test result using the test_id
                const result = testResults?.results?.find(result => result.test_id === test.test_id) || null;

                const log = testResults?.logs[index] || null

                return (

                    <div key={test.test_id} className="mb-1">
                        <div className="
                                flex justify-between items-center cursor-pointer 
                                p-2 border border-slate-700 overflow-hidden"
                            onClick={() => handleDropdownClick(test.test_id)}>
                            <div className="flex items-center space-x-2">
                                <svg
                                    className={`w-2 h-2 text-white transition-transform ${openDropdown === test.test_id ? 'rotate-0' : '-rotate-90'}`}
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M.44 6.22L12 17.78 23.56 6.22H.44z" fill="currentColor"></path>
                                </svg>
                                <span>Test {index + 1}</span>
                                {!test.is_sample && (
                                    <svg width="24" height="24" viewBox="0 0 24 24" className="text-gray-400">
                                        <path fill="currentColor" fillRule="evenodd" clipRule="evenodd" d="M4.7 6.5L2 3.8l1.4-1.4 17.7 17.8-1.4 1.4-3.4-3.4A11.8 11.8 0 011 11.5c.8-2 2-3.7 3.7-5zM12 6c3.8 0 7.2 2.1 8.8 5.5a9.6 9.6 0 01-2.4 3.1l1.4 1.4c1.4-1.2 2.5-2.8 3.2-4.5a11.8 11.8 0 00-14.6-7L10 6.2l2-.2zM11 7l2 2c.6.3 1 .8 1.3 1.4l2 2 .2-1A4.5 4.5 0 0010.9 7zm-1.5 4.2l2.6 2.7H12a2.5 2.5 0 01-2.5-2.6zM8 9.7L6 7.9a9.9 9.9 0 00-3 3.6 9.8 9.8 0 0011.7 5l-1-.9a4.5 4.5 0 01-6-5.9z"></path>
                                    </svg>
                                )}
                            </div>
                            <div>
                                {testResults ? (
                                    testResults?.results?.find(result => result.test_id === test.test_id)?.passed ? (
                                        <div className="flex flex-row text-green-200">
                                            <span>Passed</span>
                                            <span>
                                                <svg width="24" height="24" viewBox="0 0 24 24">
                                                    <path d="M8.795 15.875l-4.17-4.17-1.42 1.41 5.59 5.59 12-12-1.41-1.41-10.59 10.58z"
                                                        fill="currentColor"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex flex-row text-red-500">
                                            <span>Wrong Answer</span>
                                            <span>
                                                <svg width="24" height="24" viewBox="0 0 24 24">
                                                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                                                        fill="currentColor"></path>
                                                </svg>
                                            </span>
                                        </div>
                                    )
                                ) : (
                                    <div className="w-4 h-4 rounded-full border"></div>
                                )}
                            </div>
                        </div>

                        {openDropdown === test.test_id && (
                            <div className="border border-t-0 border-l-0 border-slate-700">
                                {test.is_sample ? (
                                    <div className="flex h-full">
                                        <div className="flex flex-col">
                                            <div className="flex flex-col">
                                                {['Inputs', 'Return Value', 'Console Output', 'Error Output'].map((section) => (
                                                    <TestDropdownButton
                                                        key={section}
                                                        label={section}
                                                        isActive={selectedSection === section}
                                                        onClick={() => setSelectedSection(section)}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {selectedSection === 'Inputs' && (
                                            <div className='flex-grow p-4 overflow-hidden'>
                                                <div className="space-y-1 overflow-hidden">
                                                    {test.inputs.map((input, i) => (
                                                        <div key={i} className="text-sm overflow-hidden">
                                                            {input.input_name}: {input.input_value}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {selectedSection === 'Return Value' && (
                                            <div
                                                ref={containerRef}
                                                className="flex w-full overflow-hidden">
                                                {/* Left Side */}
                                                <div style={{ width: `${returnDividerPosition}%` }} className="overflow-hidden p-4">
                                                    <h3 className="mb-2">Expected output:</h3>
                                                    <div className="p-2">{test.expected_output}</div>
                                                </div>

                                                {/* Draggable Divider */}
                                                <div
                                                    onMouseDown={handleMouseDown}
                                                    className="w-1 bg-gray-600 cursor-col-resize"
                                                ></div>

                                                {/* Right Side */}
                                                <div style={{ width: `${100 - returnDividerPosition}%` }} className="overflow-hidden p-4">
                                                    <h3 className="mb-2">Your return value:</h3>
                                                    <div className="p-2 font-thin">{result?.result ? result.result : "Press 'Run Tests' button to get your return value"}</div>
                                                </div>
                                            </div>
                                        )}

                                        {selectedSection === 'Console Output' && (
                                            <div className='flex-grow p-4 overflow-hidden'>
                                                <h3 className="font-semibold mb-2">Console Output:</h3>
                                                <div className="p-2">
                                                    {log ? (
                                                        <div className="text-sm">{log}</div>
                                                    ) : (
                                                        <div>No console output available.</div>
                                                    )}
                                                </div>
                                            </div>
                                        )}

                                        {selectedSection === 'Error Output' && (
                                            <div className='flex-grow p-4 overflow-hidden'>
                                                <h3 className="font-semibold mb-2">Error Output:</h3>
                                                <div className="p-2 font-base text-green-300">
                                                    {result?.error ? (
                                                        <div>
                                                            {result.error && (
                                                                <pre className="text-red-500">
                                                                    <strong>{result.error.name}</strong> {result.error.message}
                                                                </pre>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        "No errors recorded."
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="p-2 text-gray-500 border border-t-0 border-r-0 border-b-0 border-slate-700">hidden</div>
                                )}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}
