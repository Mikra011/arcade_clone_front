import React from 'react';
import '../styles/App.css';
// import SectionList from './SectionList';
// import TopicList from './TopicList';
// import { Route, Routes } from 'react-router-dom';
import Description from './Description';

function App() {
  return (
    <div className='bg-gradient-to-t from-blue-900 to-gray-700 p-12'>
        <Description />
        {/* <Routes>
            <Route path="/" element={<SectionList />} />
            <Route path="/:id" element={<TopicList />} />
        </Routes> */}
    </div>
  );
}

export default App;
