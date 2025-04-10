import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate for navigation
import './HomePage.css';

function HomePage() {
  const [url, setUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Hook to navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to shorten the URL');
      }

      const data = await response.json();
      setShortenedUrl(data.shortened_url);
    } catch (error) {
      setError('Error occurred while shortening the URL');
    }
  };

  const goToRetrievePage = () => {
    navigate('/retrieve'); // Navigate to the RetrievePage
  };

  return (
    <div className="container">
      <h2>Shorten your URL</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter URL"a
          required
        />
        <button type="submit">Shorten</button>
      </form>
  
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {shortenedUrl && (
        <div>
          <h3>Shortened URL:</h3>
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer">
            {shortenedUrl}
          </a>
        </div>
      )}
  
      <button onClick={goToRetrievePage}>Fetch Original URL</button>
    </div>
  );  
}

export default HomePage;