import React from 'react';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Support from './pages/Support';
import Signup from './pages/Signup';
import Layout from './pages/Layout';
import Payment from './pages/Payment';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Navbar from './components/Navbar';
import MainFooter from './components/MainFooter';
import { AuthProvider } from './pages/Auth';
import Footer from './components/Footer';
import { PrivateRoute } from './pages/PrivateRoute';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Chat from './pages/Chat'
import SessionSummary from './pages/SessionSummary';
import AllSessions from './pages/AllSessions';

function App() {
  return (
    <main>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/profile' element={<PrivateRoute>
              <Profile />
            </PrivateRoute>} />
            <Route path='/' element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<PrivateRoute>
              <Layout />
            </PrivateRoute>}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="chat" element={<Chat />} />
              <Route path="sessionSummary" element={<SessionSummary />} />
              <Route path="allsessions" element={<AllSessions />} />
              <Route path="support" element={<Support />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>

          <Footer/>
        </Router>
      </AuthProvider>

    </main>
  );
}

export default App;