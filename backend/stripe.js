const express = require('express');
const router = express.Router();
const Stripe = require('stripe');
// Clé secrète Stripe fournie par l'utilisateur
const stripe = Stripe('sk_test_51SWfdz5MCZfwlwVIBMEA3c2GFui48LAw65zNyc6HrTPwB0N5OOKr4ON1PwzG2X3IMHw0gvFl8klJgu0tkBWQG3K9007CRrRlbi');

router.post('/create-checkout-session', async (req, res) => {
  const { amount, email } = req.body;
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'cad',
          product_data: { name: 'Achat GastroLivres', description: 'Paiement du panier sur livresgourmands.net' },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      customer_email: email,
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
    });
    res.json({ id: session.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
