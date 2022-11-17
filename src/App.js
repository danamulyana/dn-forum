import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigator from './components/Navigation';
import LoginPage from './pages/LoginPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import './styles/app.css';

function App() {
  const {
    authUser = null,
  } = {};

  const onSignOut = () => {

  };

  if (authUser === null) {
    return (
      <main>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>
    );
  }

  return (
    <div className="container">
      <header className="App-header">
        <Navigator authUser={authUser} signOut={onSignOut} />
      </header>
    </div>
  );
}

export default App;
