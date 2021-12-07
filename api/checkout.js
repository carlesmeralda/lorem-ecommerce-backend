const HttpError = require('../models/http-error')
const stripe = require('../stripe')

const createCheckoutSession = async (req, res, next) => {
  const domainUrl = process.env.WEB_APP_URL
  const { line_items, customer_email } = req.body

  //check req body has line items and email

  if (!line_items || !customer_email) {
    return next(new HttpError('Missing required session parameters', 400))
  }

  let session
  try {
    session = await stripe.checkout.sessions.create({
      payment_methods_types: ['card'],
      mode: 'payment',
      line_items,
      customer_email,
      success_url: `${domainUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainUrl}/canceled`,
      shipping_address_collection: { allowed_countries: ['GB', 'US'] },
    })
    res.status(200).json({ sessionID: session.id })
  } catch (err) {
    return next(
      new HttpError('An error occured, unable to create session', 400)
    )
  }
}

module.exports = createCheckoutSession
