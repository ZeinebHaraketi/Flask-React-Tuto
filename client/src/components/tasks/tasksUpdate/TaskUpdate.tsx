// TaskUpdate.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TaskUpdate.css'; // Import CSS file for styling

interface Task {
  id: number;
  title: string;
  description: string;
}

const TaskUpdate: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract taskId from URL
  const navigate = useNavigate(); // Initialize useNavigate hook

  const [task, setTask] = useState<Task | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:5000/tasks/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch task');
        }
        const taskData = await response.json();
        setTask(taskData);
        setTitle(taskData.title);
        setDescription(taskData.description);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTask();
  }, [id]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description }),
      });
      if (!response.ok) {
        throw new Error('Failed to update task');
      }
      navigate('/'); // Navigate back to task list after successful update
    } catch (error) {
      console.error(error);
    }
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    
    <div className="task-update-container">
                  <br />

      <h2 className="task-update-heading">Update Task</h2>
      <form onSubmit={handleSubmit} className="task-update-form">
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description" className="form-label">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            className="form-textarea"
            required
          />
        </div>
        <button type="submit" className="btn-update">Update Task</button>
      </form>
    </div>
  );
};

export default TaskUpdate;
