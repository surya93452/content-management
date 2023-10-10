import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './App.css'

function ContentManagement() {
  const [content, setContent] = useState([]);
  const [newContent, setNewContent] = useState({
    title: '',
    content: '',
    author: '',
    date: '',
  });

  useEffect(() => {
    // Fetch content data from the server using Axios
    axios
      .get('http://localhost:4000/api/get/content')
      .then((response) => setContent(response.data))
      .catch((error) => console.error('Error fetching content:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewContent({
      ...newContent,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Send a POST request to create new content using Axios
    axios
      .post('http://localhost:3000/api/content', newContent, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status === 201) {
          // If the content is created successfully, reset the form and update the content list
          setNewContent({
            title: '',
            content: '',
            author: '',
            date: '',
          });
          setContent([...content, newContent]);
        }
      })
      .catch((error) => console.error('Error creating content:', error));
  };

  return (
    <div>
      <h1>Content Management</h1>
      <div>
        <h2>Add New Content</h2>
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newContent.title}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="content"
            placeholder="content"
            value={newContent.content}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="author"
            placeholder="Author"
            value={newContent.author}
            onChange={handleInputChange}
          />
          <input
            type="date"
            name="date"
            placeholder="date"
            value={newContent.date}
            onChange={handleInputChange}
          />
          <button onClick={handleSubmit}>Create</button>
        </div>
      </div>
      <ul>
        {content.map((item) => (
          <li key={item.id}> {/* Make sure to add a unique key */}
            <h2>{item.title}</h2>
            <p>{item.content}</p>
            <p>Author: {item.author}</p>
            <p>date: {item.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContentManagement;