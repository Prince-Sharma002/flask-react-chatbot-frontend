import React, { useState, useEffect } from 'react';
import '../styles/FactsPanel.scss';  
import { Link } from 'react-router-dom';

const FactsPanel = () => {
    const [facts, setFacts] = useState([]);
    const [isEditing, setIsEditing] = useState(null);  // Track which item is being edited
    const [editedFact, setEditedFact] = useState({ question: "", answer: "" });

    // Fetch the JSON data from server
    useEffect(() => {
        fetch("http://localhost:5000/extracted_facts.json")
            .then(response => response.json())
            .then(jsondata => {
                setFacts(jsondata.questions); // Assuming the data is inside a "questions" array
            })
            .catch(err => console.log(err));
    }, []);

    // Handle input change during edit
    const handleInputChange = (key, value) => {
        setEditedFact({ ...editedFact, [key]: value });
    };

    // Save the edited fact to backend
    const saveChanges = (index) => {
        const updatedFacts = [...facts];
        updatedFacts[index] = editedFact;
        setFacts(updatedFacts);  // Update local state

        // Send updated data to the backend to save in JSON file
        fetch("http://localhost:5000/edit_facts", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ questions: updatedFacts }), // Send updated questions array
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            setIsEditing(null);  // Exit editing mode
        })
        .catch(err => console.log(err));
    };

    // Delete a fact from the list
    const deleteFact = (index) => {
        const updatedFacts = facts.filter((_, i) => i !== index);  // Remove item at index
        setFacts(updatedFacts);  // Update local state

        // Send delete request to backend to update JSON file
        fetch("http://localhost:5000/delete_fact", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ index })  // Send the index to delete
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err));
    };

    return (
        <div className="facts-panel">
            <h1 style={{color:"black" , textAlign:"center"}}> Generated Facts</h1>
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
            {facts.map((fact, index) => (
                <div key={index} className="fact-item">
                    {isEditing === index ? (
                        <div className="edit-form">
                            <label>Question:</label>
                            <input 
                                type="text" 
                                value={editedFact.question} 
                                onChange={(e) => handleInputChange("question", e.target.value)} 
                            />
                            
                            <label>Answer:</label>
                            <input 
                                type="text" 
                                value={editedFact.answer} 
                                onChange={(e) => handleInputChange("answer", e.target.value)} 
                            />
                            <button className="save-btn" onClick={() => saveChanges(index)}>Save</button>
                        </div>
                    ) : (
                        <div className="fact-content">
                            <p><strong>Question:</strong> {fact.question}</p> 
                            <p><strong>Answer:</strong> {fact.answer}</p>
                            <button className="edit-btn" onClick={() => { 
                                setIsEditing(index); 
                                setEditedFact(fact); // Set the current fact for editing
                            }}>Edit</button>
                            <button className="delete-btn" onClick={() => deleteFact(index)}>Delete</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FactsPanel;
