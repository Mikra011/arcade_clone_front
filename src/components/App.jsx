import React from 'react';
import '../styles/App.css';
import DataFetcher from './DataFetcher.jsx';
import Card from './Card';

function App() {
  return (
    <DataFetcher url="http://localhost:5000/api/sections">
      {(data) => (
        <div className="flex flex-wrap gap-4 justify-center">
          {data.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </div>
      )}
    </DataFetcher>
  );
}

export default App;
