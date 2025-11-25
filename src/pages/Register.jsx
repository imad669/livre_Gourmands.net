
import React, { useState } from "react";
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      const res = await api.post('/register', { email, password });
      setSuccess("Inscription réussie ! Vous pouvez vous connecter.");
      setTimeout(()=>navigate('/signin'), 1200);
    } catch (err) {
      setError(err.response?.data?.error || err.message || "Erreur serveur");
    }
  };

  return (
    <div className="container" style={{maxWidth: 400, marginTop: 40, background:'var(--main-bg)', borderRadius:16, boxShadow:'0 2px 16px #0002', padding:'2.5rem 2rem', color:'#fff'}}>
      <h2 style={{color:'#fff'}}>Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control mb-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input type="password" className="form-control mb-2" placeholder="Mot de passe" value={password} onChange={e=>setPassword(e.target.value)} required />
        <div style={{textAlign:'center', color:'#aaa', fontSize:'0.98rem', marginBottom: '-2px'}}>Entre ton mot de passe et confirme-le ci-dessous</div>
        <input type="password" className="form-control mb-2" placeholder="Confirmer le mot de passe" value={confirm} onChange={e=>setConfirm(e.target.value)} required />
        <div className="form-check mb-2" style={{textAlign:'left'}}>
          <input className="form-check-input" type="checkbox" id="rememberMe" checked={remember} onChange={e=>setRemember(e.target.checked)} />
          <label className="form-check-label" htmlFor="rememberMe" style={{color:'#eee'}}>Se souvenir de moi</label>
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}
        <button className="btn btn-primary w-100" style={{minHeight:44, fontWeight:'bold', fontSize:'1.08rem', letterSpacing:0.2, borderRadius:8}} type="submit">S'inscrire</button>
      </form>
      <div style={{margin:'18px 0', textAlign:'center'}}>
        <span style={{color:'#888'}}>ou</span>
      </div>
      <button className="btn btn-light w-100" style={{minHeight:44, border:'1px solid #ddd', display:'flex', alignItems:'center', justifyContent:'center', gap:8, color:'#222', fontWeight:600, fontSize:'1.08rem', borderRadius:8}} onClick={()=>alert('Connexion Google simulée')}>
        <img src="/images/image.png" alt="Google" style={{width:22, height:22, borderRadius:4}} />
        Se connecter avec Google
      </button>
      <footer style={{marginTop:32, textAlign:'center', color:'#aaa', fontSize:'0.97rem'}}>
        <div>Ce site est protégé par reCAPTCHA et Google.</div>
        <div><a href="#" style={{color:'#aaa', textDecoration:'underline'}}>Conditions d'utilisation</a> • <a href="#" style={{color:'#aaa', textDecoration:'underline'}}>Confidentialité</a></div>
        <div style={{marginTop:6, fontSize:'0.93rem'}}>&copy; {new Date().getFullYear()} BookStore. Tous droits réservés.</div>
      </footer>
    </div>
  );
}
