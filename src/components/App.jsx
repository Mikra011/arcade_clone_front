import React from 'react';
import '../styles/App.css';
import SectionList from './SectionList';
import TopicList from './TopicList';
import Challenge from './Challange';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';

export default function App() {
  return (
      <div className='bg-gradient-to-t from-blue-900 to-gray-700 pt-[60px]'>
        <Navbar />
        <Routes>
          <Route path="/" element={<SectionList />} />
          <Route path="/:sectionName" element={<TopicList />} />
          <Route path="/:sectionName/:id" element={<Challenge />} />
        </Routes>
      </div>
  )
}

