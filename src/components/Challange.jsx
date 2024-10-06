import React, { useState, useRef, useEffect } from 'react';
import { useGetChallengesByIdQuery, useRunTestMutation } from '../state/arcadeApi';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  getChallenge,
  resetChallenge
} from '../state/arcadeSlice';
import CodeEditor from './CodeEditor';
import Description from './Description';
import TestNavBar from './TestNavBar';
import Tests from './Tests'

export default function Challenge() {
  const { id } = useParams()
  const { data: challenge, error, isLoading } = useGetChallengesByIdQuery(id);
  const [runTest] = useRunTestMutation()
  const [code, setCode] = useState('');
  const [testResults, setTestResults] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const [dividerPosition, setDividerPosition] = useState(50) // for horizontal divider
  const [verticalDividerPosition, setVerticalDividerPosition] = useState(50) // for vertical divider
  const containerRef = useRef(null)
  const rightContainerRef = useRef(null)

  const dispatch = useDispatch()

  const handleMouseMove = (e) => {
    if (!containerRef.current) return

    const rect = containerRef.current.getBoundingClientRect()
    const newDividerPosition = ((e.clientX - rect.left) / rect.width) * 100

    setDividerPosition(Math.max(0, Math.min(100, newDividerPosition)))
  }

  const handleVerticalMouseMove = (e) => {
    if (!rightContainerRef.current) return

    const rect = rightContainerRef.current.getBoundingClientRect()
    const newVerticalDividerPosition = ((e.clientY - rect.top) / rect.height) * 100

    setVerticalDividerPosition(Math.max(0, Math.min(95, newVerticalDividerPosition)))
  }

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mousemove', handleVerticalMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
  }

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  const handleVerticalMouseDown = () => {
    document.addEventListener('mousemove', handleVerticalMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // Dispatch getChallenge when the challenge data is fetched
  useEffect(() => {
    if (challenge) {
      dispatch(getChallenge(challenge));
    }
  }, [challenge, dispatch]);

  // Dispatch resetChallenge on component unmount
  useEffect(() => {
    return () => {
      dispatch(resetChallenge()); // Clear the challenge data when component unmounts
    };
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!challenge) return <div>No data found</div>

  const formattedInputNames = [
    ...new Set(challenge.tests.flatMap(
      test => test.inputs.map(input => input.input_name
      )))]
    .join(', ')


  const handleRunTest = async () => {
    const testData = challenge.tests.map(test => ({
      is_sample: test.is_sample,
      test_id: test.test_id,
      expected_output: test.expected_output,
      is_complex: test.is_complex,
      inputs: test.inputs.reduce((acc, input) => {
        acc[input.input_name] = {
          value: input.input_value,
          type: input.input_type,
        };
        return acc;
      }, {}),
    }));

    console.log("Code:", code);
    console.log("Test Data:", testData);

    try {
      const response = await runTest({ code, tests: testData }).unwrap();  // Unwrap the result to catch errors
      setErrorMessage(null);
      setTestResults(response);  // Store successful response
      console.log(response);
    } catch (error) {
      // This block will now be triggered on error
      console.error("Run Test Error:", error);

      if (error.data) {
        console.error("Backend Error:", error.data);
        setTestResults(null);  // You can store error details or display to the user
        setErrorMessage(error.data);
      } else {
        console.error("Unexpected Error:", error);
      }
    }
  }

  return (
    <div ref={containerRef} className="flex w-full h-screen">
      <div style={{ width: `${dividerPosition}%` }} className="bg-white overflow-auto">
        <Description description={challenge.description} />
      </div>
      <div
        onMouseDown={handleMouseDown}
        className="w-1 bg-gray-600 cursor-col-resize"
      />
      <div
        style={{ width: `${100 - dividerPosition}%` }}
        className="flex flex-col bg-slate-900 text-white "
        ref={rightContainerRef}>
        <div style={{ height: `${verticalDividerPosition}%` }} className="">
          <CodeEditor
            input={formattedInputNames}
            onChange={setCode} />
        </div>
        <div
          onMouseDown={handleVerticalMouseDown}
          className="h-1 bg-gray-600 cursor-row-resize"
        />
        <div
          style={{ height: `${100 - verticalDividerPosition}%` }}
          className="overflow-auto relative">
          <TestNavBar onRunTest={handleRunTest} />
          {/* I was a bit lazy, may fix it later on */}
          <Tests challenge={challenge} testResults={testResults} errorMessage={errorMessage} />
          
        </div>
      </div>
    </div>
  )
}

