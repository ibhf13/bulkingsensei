import React from 'react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import MyPlan from './Pages/MyPlan';
import Biceps from './Pages/Exercises/Biceps';
import Shoulder from './Pages/Exercises/Shoulder';
import Chest from './Pages/Exercises/Chest';
import Back from './Pages/Exercises/Back';
import Arm from './Pages/Exercises/Arm';
import Forearm from './Pages/Exercises/Forearm';
import Legs from './Pages/Exercises/Legs';
import Glutes from './Pages/Exercises/Glutes';

function App() {
  return (
    <div className="App">
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/myplan" element={<MyPlan />} />
          <Route path="/biceps" element={<Biceps />} />
          <Route path="/shoulder" element={<Shoulder />} />
          <Route path="/chest" element={<Chest />} />
          <Route path="/back" element={<Back />} />
          <Route path="/arm" element={<Arm />} />
          <Route path="/forearm" element={<Forearm />} />
          <Route path="/legs" element={<Legs />} />
          <Route path="/glutes" element={<Glutes />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
