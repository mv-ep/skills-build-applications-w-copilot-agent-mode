import React from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import './App.css';

const logoUrl =
  'https://raw.githubusercontent.com/mv-ep/skills-build-applications-w-copilot-agent-mode/main/docs/octofitapp-small.png';

const navItems = [
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/teams', label: 'Teams' },
  { to: '/users', label: 'Users' },
  { to: '/workouts', label: 'Workouts' },
];

export default function App() {
  return (
    <div className="app-shell min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark app-navbar shadow-sm">
        <div className="container py-1">
          <span className="navbar-brand fw-bold d-flex align-items-center gap-2 mb-0">
            <img src={logoUrl} alt="OctoFit logo" className="app-logo" />
            <span>OctoFit Tracker</span>
          </span>
          <div className="navbar-nav d-flex flex-row flex-wrap gap-2 ms-lg-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `nav-link px-3 py-2 rounded-pill app-nav-link ${isActive ? 'active' : ''}`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </nav>

      <header className="container pt-4 pb-2">
        <div className="card border-0 shadow-sm app-hero-card">
          <div className="card-body py-4 px-4">
            <h1 className="display-6 fw-bold mb-2">Fitness Dashboard</h1>
            <p className="mb-0 text-secondary">Track users, workouts, teams, activities, and leaderboard data in one place.</p>
          </div>
        </div>
      </header>

      <main className="container pb-4">
        <Routes>
          <Route path="/" element={<Navigate to="/activities" replace />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}
