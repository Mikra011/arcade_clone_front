import React, { useState, useRef } from 'react';
import Description from './Description';
import Tests from './Tests'

export default function Challenge() {
  const [dividerPosition, setDividerPosition] = useState(50) // for horizontal divider
  const [verticalDividerPosition, setVerticalDividerPosition] = useState(50) // for vertical divider
  const containerRef = useRef(null)
  const rightContainerRef = useRef(null)

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
    
    setVerticalDividerPosition(Math.max(0, Math.min(90, newVerticalDividerPosition)))
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

  return (
    <div ref={containerRef} className="flex w-full h-screen">
      <div style={{ width: `${dividerPosition}%` }} className="bg-white overflow-auto">
        <Description />
      </div>
      <div
        onMouseDown={handleMouseDown}
        className="w-1 bg-gray-600 cursor-col-resize"
      />
      <div style={{ width: `${100 - dividerPosition}%` }} className="flex flex-col bg-slate-900 text-white " ref={rightContainerRef}>
        <div style={{ height: `${verticalDividerPosition}%` }} className="">
          <p>Upper right content</p>
        </div>
        <div
          onMouseDown={handleVerticalMouseDown}
          className="h-1 bg-gray-600 cursor-row-resize"
        />
        <div style={{ height: `${100 - verticalDividerPosition}%` }} className="overflow-auto">
          <Tests />
        </div>
      </div>
    </div>
  )
}