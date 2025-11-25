import React, { useState } from "react";
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    try {
      const res = await api.post('/login', { email, password });
      setSuccess("Connexion réussie !");
      // Stocker le token + email pour paiement
      if(res.data.token){
        localStorage.setItem('token', res.data.token);
      }
      if(res.data.user?.email){
        localStorage.setItem('user_email', res.data.user.email);
      } else {
        localStorage.setItem('user_email', email);
      }
      window.dispatchEvent(new CustomEvent('auth-change', { detail: { email: localStorage.getItem('user_email') || '' } }))
      setTimeout(()=>navigate('/'), 1200);
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Erreur serveur");
    }
  };

  return (
    <div className="container" style={{maxWidth: 400, marginTop: 40, background:'var(--main-bg)', borderRadius:16, boxShadow:'0 2px 16px #0002', padding:'2.5rem 2rem', color:'#fff'}}>
      <h2 style={{color:'#fff'}}>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" className="form-control mb-2" placeholder="Mot de passe" value={password} onChange={e=>setPassword(e.target.value)} required />
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <button className="btn btn-primary w-100" style={{minHeight:44, fontWeight:'bold', fontSize:'1.08rem', letterSpacing:0.2, borderRadius:8}} type="submit">Se connecter</button>
      </form>
      <footer style={{marginTop:32, textAlign:'center', color:'#aaa', fontSize:'0.97rem'}}>
        <div>Ce site est protégé par reCAPTCHA et Google.</div>
        <div><a href="#" style={{color:'#aaa', textDecoration:'underline'}}>Conditions d'utilisation</a> • <a href="#" style={{color:'#aaa', textDecoration:'underline'}}>Confidentialité</a></div>
        <div style={{marginTop:6, fontSize:'0.93rem'}}>&copy; {new Date().getFullYear()} BookStore. Tous droits réservés.</div>
      </footer>
    </div>
  );
}
