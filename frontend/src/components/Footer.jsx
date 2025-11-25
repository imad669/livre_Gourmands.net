import React from "react";
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{background:'#181c24', color:'#fff', padding:'2.5rem 0 1.5rem 0', marginTop:40}}>
      <div className="container-custom" style={{maxWidth:'100%', width:'95vw', margin:'0 auto', textAlign:'left', display:'flex', flexWrap:'wrap', justifyContent:'space-between', gap:32, alignItems:'flex-start'}}>
        <div style={{minWidth:180, flex:1}}>
          <h4 style={{fontWeight:'bold', marginBottom:12, color:'#ffb347', fontFamily:'var(--logoFont, Segoe UI)'}}>GastroLivres</h4>
          <ul style={{padding:0, margin:0, listStyle:'none', lineHeight:2}}>
            <li><Link to="/commander" style={{color:'#fff', textDecoration:'none'}}>Commander</Link></li>
            <li><Link to="/avis" style={{color:'#fff', textDecoration:'none'}}>Avis clients</Link></li>
            <li><Link to="/livraison" style={{color:'#fff', textDecoration:'none'}}>Livraison</Link></li>
          </ul>
        </div>
        <div style={{minWidth:180, flex:1}}>
          <h4 style={{fontWeight:'bold', marginBottom:12, color:'#ffb347'}}>Réseaux sociaux</h4>
          <ul style={{padding:0, margin:0, listStyle:'none', lineHeight:2}}>
            <li><a href="#" style={{color:'#fff', textDecoration:'none'}}><i className="fa-brands fa-facebook" style={{marginRight:8}}></i>Facebook</a></li>
            <li><a href="#" style={{color:'#fff', textDecoration:'none'}}><i className="fa-brands fa-instagram" style={{marginRight:8}}></i>Instagram</a></li>
            <li><a href="#" style={{color:'#fff', textDecoration:'none'}}><i className="fa-brands fa-x-twitter" style={{marginRight:8}}></i>Twitter</a></li>
            <li><a href="#" style={{color:'#fff', textDecoration:'none'}}><i className="fa-brands fa-youtube" style={{marginRight:8}}></i>YouTube</a></li>
          </ul>
        </div>
        <div style={{minWidth:180, flex:1}}>
          <h4 style={{fontWeight:'bold', marginBottom:12, color:'#ffb347'}}>Aide & Contact</h4>
          <ul style={{padding:0, margin:0, listStyle:'none', lineHeight:2}}>
            <li><Link to="/contact" style={{color:'#fff', textDecoration:'none'}}>Contact</Link></li>
            <li><Link to="/faq" style={{color:'#fff', textDecoration:'none'}}>FAQ</Link></li>
            <li><Link to="/conditions" style={{color:'#fff', textDecoration:'none'}}>Conditions</Link></li>
            <li><Link to="/mentions" style={{color:'#fff', textDecoration:'none'}}>Mentions légales</Link></li>
          </ul>
        </div>
        <div style={{minWidth:260, flex:2, textAlign:'center', display:'flex', flexDirection:'column', alignItems:'center'}}>
          <div style={{marginBottom:16, width:'100%', textAlign:'left'}}>
            <strong>Contact :</strong> <a href="mailto:contact@livresgourmands.net" style={{color:'#ffb347'}}>contact@livresgourmands.net</a>
          </div>
          <form style={{width:'100%', maxWidth:420}} onSubmit={e=>{e.preventDefault();alert('Message envoyé (simulation)')}}>
            <input type="email" className="form-control mb-2" placeholder="Votre email" required style={{width:'100%'}} />
            <textarea className="form-control mb-2" placeholder="Votre message" rows={2} required style={{width:'100%'}} />
            <button className="btn btn-warning w-100" style={{minHeight:44, fontWeight:'bold', fontSize:'1.08rem'}} type="submit">Envoyer</button>
          </form>
        </div>
      </div>
      <div style={{marginTop:32, fontSize:'0.95rem', color:'#bbb', textAlign:'center'}}>
        &copy; {new Date().getFullYear()} GastroLivres. Tous droits réservés.
      </div>
    </footer>
  );
}
