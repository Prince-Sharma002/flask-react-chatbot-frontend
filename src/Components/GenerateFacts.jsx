import React, { useState } from 'react';
import {Link} from "react-router-dom";

const FactGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [generatedFacts, setGeneratedFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/generate-facts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate facts');
      }

      const data = await response.json();
      setGeneratedFacts(data.facts);
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while generating facts');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div style={{ maxWidth: '600px', margin: '10rem auto', padding: '2rem', border: '1px solid #ddd', borderRadius: '8px' }}>
      <h1 style={{textAlign:"center"}}> Fact Generator</h1>
      
      <Link 
          style={{ 
            position: "absolute", 
            right: "5rem", 
            top: "5rem",
            color: "black", 
            textDecoration: "none",
            border: "1px solid black",
            backgroundColor: "white",
            padding: "0.5rem 1rem",
            borderRadius: "5px",
            cursor: "pointer"
          }} 
          to={"/"}
        >
          Mission Pilot
        </Link>
      <div style={{ marginBottom: '1rem' }}>
      </div>
      <div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your text here..."
            style={{ width: '100%', height: '150px', padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' }}
            required
          />
          <button
            type="submit"
            style={{ padding: '0.5rem 1rem', borderRadius: '4px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate Facts'}
          </button>
        </form>

        

        {generatedFacts.length > 0 && (
          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>Generated Facts:</h3>
            <ul style={{ paddingLeft: '1.5rem' }}>
              {generatedFacts.map((fact, index) => (
                <li key={index} style={{ marginBottom: '0.5rem' }}>
                  <strong>{fact.question}:</strong> {fact.answer}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      
      <Link 
          style={{ 
            position : "relative",
            bottom : "3rem",
            left : "2rem",
            color: "black", 
            textDecoration: "none",
            border: "1px solid black",
            backgroundColor: "white",
            padding: "0.5rem 1rem",
            margin: "0.5rem 1rem",
            borderRadius: "5px",
            cursor: "pointer",
            float: "right",
          }} 
          to={"/facts-panel"}
        >
          Facts Panel
        </Link>

    </div>
  );
};

export default FactGenerator;
