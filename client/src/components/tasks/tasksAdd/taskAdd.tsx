// TaskAdd.tsx
import React, { useState } from 'react';
import './taskAdd.css'; // Import CSS for styling

const TaskAdd: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) {
        throw new Error('Failed to add task');
      }
      // Reset the input fields after successful submission
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="task-add-container">
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={handleTitleChange}
            className="form-control"
            placeholder="Enter title"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className="form-control"
            placeholder="Enter description"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Task</button>
      </form>
    </div>
  );
};

export default TaskAdd;
