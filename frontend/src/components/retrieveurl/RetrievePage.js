import React, { useState } from 'react';
import './RetrievePage.css';

function RetrievePage() {
  const [key, setKey] = useState('');
  const [originalUrl, setOriginalUrl] = useState('');
  const [error, setError] = useState('');

  const handleRetrieve = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/${key}`, {
        method: 'GET',
      });

      if (response.status === 404) {
        throw new Error('Short URL not found');
      }

      const data = await response.json();
      setOriginalUrl(data.url);
    } catch (error) {
      setError(error.message); // Log the exact error message
    }
  };


  return (
    <div className="container">
      <h2>Retrieve Original URL</h2>
      <form onSubmit={handleRetrieve}>
        <input
          type="text"
          value={key}
          onChange={(e) => setKey(e.target.value)}
          placeholder="Enter shortened URL key"
          required
        />
        <button type="submit">Retrieve</button>
      </form>
  
      {error && <p>{error}</p>}
      {originalUrl && (
        <div>
          <h3>Original URL:</h3>
          <a href={originalUrl} target="_blank" rel="noopener noreferrer">
            {originalUrl}
          </a>
        </div>
      )}
    </div>
  );
  
}

export default RetrievePage;
