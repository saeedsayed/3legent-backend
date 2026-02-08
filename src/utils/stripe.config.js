import Stripe from "stripe";
console.log("start stripe config 🤌")
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
console.log("stripe config done 👍")

export default stripe;
