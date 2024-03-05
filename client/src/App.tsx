// App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import TaskList from './components/tasks/tasksList/TasksList';
import TaskAdd from './components/tasks/tasksAdd/taskAdd';
import TaskUpdate from './components/tasks/tasksUpdate/TaskUpdate';


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/taskAdd" element={<TaskAdd />} />
          <Route path="/taskEdit/:id" element={<TaskUpdate />} />

          {/* Add more routes as needed */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
