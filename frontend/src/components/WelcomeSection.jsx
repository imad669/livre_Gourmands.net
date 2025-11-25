import React from "react";
import './WelcomeSection.css';

export default function WelcomeSection() {
  return (
    <section className="welcome-section">
      <video className="welcome-bg" src="/images/welcome.mp4" autoPlay loop muted playsInline />
      <div className="welcome-overlay">
        <h1>Bienvenue sur Livres Gourmands</h1>
        <p>Découvrez, commandez et partagez la passion des livres culinaires !
        <br />Faites défiler pour explorer notre sélection.</p>
      </div>
    </section>
  );
}
