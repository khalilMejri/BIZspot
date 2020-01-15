// Copyright IBM Corp. 2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var axios = require('axios')
var app = module.exports = loopback();
const env = require('dotenv').config({
  path: ".env"
});
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Fetch the Checkout Session to display the JSON result on the success page
app.get("/api/checkout-session", (req, res) => {
  const {
    sessionId
  } = req.query;
  stripe.checkout.sessions.retrieve(sessionId)
    .then((session, err) => {
      if (err) {

        return res.json({
          'error': 'error in retreiving the stripe session'
        });
      }
      res.json(session);
    })

});


app.get("/api/setup", (req, res) => {
  res.send({
    publicKey: process.env.STRIPE_PUBLISHABLE_KEY,
    silverPlan: process.env.SILVER_PLAN_ID,
    goldPlan: process.env.GOLD_PLAN_ID,
    platniumPlan: process.env.PLATNIUM_PLAN_ID
  });
});

// Webhook handler for asynchronous events.
/*app.post("/webhook",  (req, res) => {
  let eventType;
  // Check if webhook signing is configured.
  if (process.env.STRIPE_WEBHOOK_SECRET) {
    // Retrieve the event by verifying the signature using the raw body and secret.
    let event;
    let signature = req.headers["stripe-signature"];
    
    try {
      event = stripe.webhooks.constructEvent(
        req.rawBody,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed.`);
      return res.sendStatus(400);
    }
    // Extract the object from the event.
    data = event.data;
    eventType = event.type;
  } else {
    // Webhook signing is recommended, but if the secret is not configured in `config.js`,
    // retrieve the event data directly from the request body.
    data = req.body.data;
    eventType = req.body.type;
  }
  
  if (eventType === "checkout.session.completed") {
    console.log(`🔔  Payment received!`);
  }
  
  res.sendStatus(200);
});*/
app.start = function () {
  // start the web server
  return app.listen(function () {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function (err) {
  if (err) throw err;
  app.post("/api/create-checkout-session", (req, res) => {
    const domainURL = process.env.DOMAIN;
    const {
      planId
    } = req.body;

    // Create new Checkout Session for the order
    // Other optional params include:
    // [billing_address_collection] - to display billing address details on the page
    // [customer] - if you have an existing Stripe Customer ID
    // [customer_email] - lets you prefill the email input in the form
    // For full details see https://stripe.com/docs/api/checkout/sessions/create
    stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      subscription_data: {
        items: [{
          plan: planId
        }]
      },
      // ?session_id={CHECKOUT_SESSION_ID} means the redirect will have the session ID set as a query param
      success_url: `${domainURL}/create?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domainURL}/create`
    }).then((session, err) => {

      res.send({
        sessionId: session.id
      });
    });
  });
  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

app.get("/api/geocode", (req, res) => {
  const url = 'https://eu1.locationiq.com/v1/search.php'
  const { key, q, format } = req.query;
  axios.get(url, {
    params: {
      key, q, format
    }
  })
    .then(response => {

      res.json(response.data)
    })
    .catch(err => {
      res.status(404).json({ 'error': 'location not found' })
    })
})
app.get("/api/georeverse", (req, res) => {
  const url = 'https://eu1.locationiq.com/v1/reverse.php'
  const { key, lat, lon, format } = req.query;
  axios.get(url, {
    params: {
      key, lat, lon, format
    }
  })
    .then(response => {
      res.json(response.data)
    })
    .catch(err => {
      res.status(404).json({ 'error': 'location not found' })
    })
})

// app.use('/*', (req, res, next) => {
//   res.sendFile(path.resolve(__dirname, '../client/dist/BIZspot-frontend/index.html'));
// });
