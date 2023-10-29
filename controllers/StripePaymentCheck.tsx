export async function StripePaymentCheck(secret_key: any, payment_session_id: any) {
    try {
        const stripe = require('stripe')(secret_key);
        const session = await stripe.checkout.sessions.retrieve(payment_session_id);
        return session;
    } catch (err) {
        console.log(err);
    }
}