import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

// Configuration Firebase (remplace les valeurs par les variables d'environnement dans .env)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

function Login() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook pour la redirection

  // Fonction de connexion
  const login = () => {
    setMessage(''); // Réinitialiser le message avant la tentative de connexion
    signInWithEmailAndPassword(auth, loginEmail, loginPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        setMessage(`Connexion réussie : ${user.email}`);
        console.log('Connexion réussie:', user.email);
        navigate('/home'); // Redirection vers la page Home
      })
      .catch((error) => {
        console.error('Erreur lors de la connexion:', error.message);
        setMessage(`Erreur de connexion : ${error.message}`);
      });
  };

  return (
    <div>
      <h2>Connexion</h2>
      <input
        type="email"
        placeholder="Email"
        value={loginEmail}
        onChange={(e) => setLoginEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={loginPassword}
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <button onClick={login}>Se connecter</button>
      <div id="message">{message && <p>{message}</p>}</div>

      <p>Pas encore inscrit ? <button onClick={() => navigate('/signup')}>Créer un compte</button></p>
    </div>
  );
}

function Signup() {
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook pour la redirection

  // Fonction d'inscription
  const signUp = () => {
    setMessage(''); // Réinitialiser le message avant la tentative d'inscription
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredential) => {
        const user = userCredential.user;
        setMessage(`Inscription réussie : ${user.email}`);
        console.log('Inscription réussie:', user.email);
        navigate('/home'); // Redirection vers la page Home après l'inscription
      })
      .catch((error) => {
        console.error('Erreur lors de l\'inscription:', error.message);
        setMessage(`Erreur d'inscription : ${error.message}`);
      });
  };

  return (
    <div>
      <h2>Inscription</h2>
      <input
        type="email"
        placeholder="Email"
        value={signupEmail}
        onChange={(e) => setSignupEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={signupPassword}
        onChange={(e) => setSignupPassword(e.target.value)}
      />
      <button onClick={signUp}>S'inscrire</button>
      <div id="message">{message && <p>{message}</p>}</div>

      <p>Déjà inscrit ? <button onClick={() => navigate('/')}>Se connecter</button></p>
    </div>
  );
}

function Home() {
  return (
    <div>
      <h1>Bienvenue sur la page d'accueil</h1>
      <p>Ceci est la page pour les utilisateurs connectés.</p>
    </div>
  );
}

export default App;
