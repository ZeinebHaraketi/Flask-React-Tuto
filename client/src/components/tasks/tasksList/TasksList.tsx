// TaskList.tsx
import React, { useState, useEffect } from 'react';
import './TasksList.css';
import TaskAdd from '../tasksAdd/taskAdd';
import { useNavigate } from 'react-router-dom';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/tasks');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const tasksData = await response.json();
        setTasks(tasksData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchTasks();
  }, []);

  const handleUpdate = (id: number) => {
    // Navigate to TaskUpdate with the task ID as URL parameter
    navigate(`/taskEdit/${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Failed to delete task');
      }
      // Remove the deleted task from the local state
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Display All Tasks</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task: any) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td className="button-container">
                <button className="button" onClick={() => handleUpdate(task.id)}>Update</button>
                <button className="button" onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <br />
      <br />
      <br />

      <TaskAdd />
    </div>
  );
};

export default TaskList;
