const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.Secret_API_KEY)
const redis_con = require('../db/redis_con')
const permission = require('../middleware/auth')
const manager = require('../middleware/manager')
const employee = require('../middleware/employee')
const admin = require('../middleware/admin')

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// Create Payment Intents
router.post('/stripe/v1/create_paymentIntent', permission, (req, res) => {
  let amount = req.body.amount
  let currency = req.body.currency
  let pmid = req.body.pmid
  let cusid = req.body.cusid
  let provider = req.body.provider

  stripe.paymentIntents.create({
    amount: amount,
    currency: currency,
    payment_method_types: ['card'],
    payment_method: pmid,
    customer: cusid,
    application_fee_amount: 12,
    transfer_data: {
      destination: provider
    }
  },
  (err, paymentIntent) => {
    // asynchronously called
    if(err){
      res.json({error: err})
    }
    else{
      res.json({paymentIntent: paymentIntent})
    }
  })
})

// Retrieve a Payment Intent
router.post('/stripe/v1/retrieve_paymentIntent', permission, (req, res) => {
  let pmid = req.body.pmid
  stripe.paymentIntents.retrieve(
    pmid,
    (err, paymentIntent) => {
      // asynchronously called
      if(err){
        res.json({error: err})
      }
      else{
        res.json({paymentIntent: paymentIntent})
      }
    }
  )
})

// Update a Payment Intent
router.post('/stripe/v1/update_paymentIntent', permission, (req, res) => {
  let pmid = req.body.pmid
  let orderid = req.body.orderid
  let product = req.body.product

  stripe.paymentIntents.update(
    pmid,
    {
      metadata: {
        order_id: orderid,
        product: product
      }
    },
    (err, paymentIntent) => {
      // asynchronously called
      if(err){
        res.json({error: err})
      }
      else{
        res.json({paymentIntent: paymentIntent})
      }
    }
  )
})

// Confirm a Payment Intent
router.post('/stripe/v1/confirm_paymentIntent', permission, (req, res) => {
  let piid = req.body.piid
  stripe.paymentIntents.confirm(
    piid,
    {payment_method: 'pm_card_visa'},
    (err, paymentIntent) => {
      // asynchronously called
      if(err){
        res.json({error: err})
      }
      else{
        res.json({paymentIntent: paymentIntent})
      }
    }
  )
})

// Cancel a Payment Intent
router.post('/stripe/v1/cancel_paymentIntent', permission, (req, res) => {
  let piid = req.body.piid
  stripe.paymentIntents.cancel(
    piid,
    (err, paymentIntent) => {
      // asynchronously called
      if(err){
        res.json({error: err})
      }
      else{
        res.json({paymentIntent: paymentIntent})
      }
    }
  )
})

// Create a PaymentMethod
router.post('/stripe/v1/create_payment', permission, (req, res) => {

  stripe.paymentMethods.create(
    {
      type: req.body.type,
      card: {
        number: req.body.number,
        exp_month: req.body.exp_month,
        exp_year: req.body.exp_year,
        cvc: req.body.cvc,
      },
    },
    (err, paymentMethod) => {
      // asynchronously called
      res.json({paymentMethod: paymentMethod})
    }
  )

})

// Retrieve a PaymentMethod
router.get('/stripe/v1/retrieve_payment/:pmid', permission, (req, res) => {
  let pmid = req.params.pmid
  stripe.paymentMethods.retrieve(
    pmid,
    (err, paymentMethod) => {
      // asynchronously called
      if(err){
        res.json({error: err})
      }
      else{
        res.json({paymentMethod: paymentMethod})
      }
    }
  )
})

// Update a PaymentMethod
router.post('/stripe/v1/update_payment', permission, (req, res) => {
  let pmid = req.body.pmid
  let obj= req.body.metadata

  stripe.paymentMethods.update(
    pmid,
    {metadata: {order_id: obj}},
    (err, paymentMethod) => {
      // asynchronously called
      if(err){
        res.json({error: err})
      }
      else{
        res.json({paymentMethod: paymentMethod})
      }
    }
  )
})

// List a Customer's PaymentMethods
router.post('/stripe/v1/list_payment_methods/', permission, (req, res) => {
  let cusid = req.body.cusid

  stripe.paymentMethods.list(
    {customer: cusid, type: 'card'},
    (err, paymentMethods) => {
      // asynchronously called
      res.json({paymentMethod: paymentMethods})
    }
  )
})

// Attach a PaymentMethod to a Customer
router.post('/stripe/v1/attach_payment_cus', permission, (req, res) => {
  let pmid = req.body.pmid
  let cusid = req.body.cusid
  stripe.paymentMethods.attach(
    pmid,
    {customer: cusid},
    (err, paymentMethod) => {
      // asynchronously called
      if(err){
        res.json({error: err})
      }
      else{
        res.json({paymentMethod: paymentMethod})
      }
    }
  )
})

// Detach a PaymentMethod to a Customer
router.post('/stripe/v1/detach_payment_cus', permission, (req, res) => {
  let pmid = req.body.pmid
  stripe.paymentMethods.detach(
    pmid,
    (err, paymentMethod) => {
      // asynchronously called
      res.json({paymentMethod: paymentMethod})
    }
  )
})

router.get("/stripe/stripe-key", permission, (req, res) => {
  res.json({ publishableKey: process.env.Stripe_API_KEY })
})

// Create Bank Acc.
router.post('/stripe/v1/create_bankAcc', permission, (req, res) => {
  let cusid = req.body.cusid
  let country = req.body.country
  let currency = req.body.currency
  let firstname = req.body.firstname
  let lastname = req.body.lastname
  let name = firstname + " " + lastname
  let type = req.body.type
  let routing_number = req.body.routing_number
  let acc_num = req.body.acc_num

  stripe.customers.createSource(
    cusid,
    {source: {
      object: 'bank_account',
      country: country,
      currency: currency,
      account_holder_name: name,
      account_holder_type: type,
      routing_number: routing_number,
      account_number: acc_num
    }},
    (err, bankAccount) => {
      // asynchronously called
      if(err){
        res.json({error: err})
      }
      else{
        res.json({bankAccount: bankAccount})
      }
      
    }
  )
})

// Retrieve Bank Acc.
router.post('/stripe/v1/retrieve_bankAcc', permission, (req, res) => {
  let cusid = req.body.cusid 
  let bankid = req.body.bankid
  stripe.customers.retrieveSource(
    cusid,
    bankid,
    (err, bankAccount) => {
      // asynchronously called
      if(err){
        res.json({error: err})
      }
      else{
        res.json({bankAccount: bankAccount})
      }
    }
  )
})

// Update Bank Acc.
router.post('/stripe/v1/update_bankAcc', permission, (req, res) => {
  let cusid = req.body.cusid
  let bankid = req.body.bankid
  let data = req.body.data // json format
  stripe.customers.updateSource(
    cusid,
    bankid,
    {metadata: {order_id: data}},
    (err, bankAccount) => {
      // asynchronously called
      if(err){
        res.json({error: err})
      }
      else{
        res.json({bankAccount: bankAccount})
      }
    }
  )
})

// Verify a bank account
router.post('/stripe/v1/verify_bankAcc', permission, (req, res) => {
  let cusid = req.body.cusid
  let bankid = req.body.bankid
  let val1 = req.body.val1
  let val2 = req.body.val2
  stripe.customers.verifySource(
    cusid,
    bankid,
    {amounts: [val1,val2]},
    (err, bankAccount) => {
      // asynchronously called
      if(err){
        res.json({error: err})
      }
      else{
        res.json({bankAccount: bankAccount})
      }
    }
  )
})

// Delete cx's bank account
router.delete('/stripe/v1/delete_bankAcc', permission, (req, res) => {
  let cusid = req.body.cusid
  let bankid = req.body.bankid
  stripe.customers.deleteSource(
    cusid,
    bankid,
    (err, confirmation) => {
      if(err){
        res.json({error: err})
      }
      else{
        res.json({confirmation: confirmation})
      }
    }
  )
})

// List cx's bank accounts
router.post('/stripe/v1/list_bankAccs', permission, (req, res) => {
  let cusid = req.body.cusid
  stripe.customers.listSources(
    cusid,
    {object: 'bank_account', limit: 100},
    (err, bankAccounts) => {
      // asynchronously called
      if(err){
        res.json({error: err})
      }
      else{
        res.json({bankAccounts: bankAccounts})
      }
    }
  )
})

// Create a subscription
router.post('/stripe/v1/create_subscription', permission, (req, res) => {
  let cusid = req.body.cusid
  let name = req.body.name
  let pmid = req.body.pmid
  stripe.subscriptions.create(
    {
      customer: cusid,
      items: [{plan: name}],
      default_payment_method: pmid
    },
    function(err, subscription) {
      // asynchronously called
      if(err){
        res.json({error: err})
      }
      else{
        res.json({subscription: subscription})
      }
    }
  )
})

// Retrieve a subscription
router.post('/stripe/v1/retrieve_subscription', permission, (req, res) => {
  let subid = req.body.subid
  stripe.subscriptions.retrieve(
    subid,
    (err, subscription) => {
      // asynchronously called
      if(err){
        res.json({error: err})
      }
      else{
        res.json({subscription: subscription})
      }
    }
  )
})

// Update a subscription
router.post('/stripe/v1/update_subscription', permission, (req, res) => {
  let subid = req.body.subid
  let data = req.body.data
  stripe.subscriptions.update(
    subid,
    {metadata: {order_id: data}},
    (err, subscription) => {
      // asynchronously called
      if(err){
        res.json({error: err})
      }
      else{
        res.json({subscription: subscription})
      }
    }
  )
})

// Cancel a subscription
router.delete('/stripe/v1/cancel_subscription', permission, (req, res) => {
  let subid = req.body.subid
  stripe.subscriptions.del(
    subid,
    (err, confirmation) => {
      // asynchronously called
      if(err){
        res.json({error: err})
      }
      else{
        res.json({confirmation: confirmation})
      }
    }
  )
})

// List subscriptions
router.get('/stripe/v1/list_subscriptions', permission, (req, res) => {
  stripe.subscriptions.list(
    {limit: 100},
    (err, subscriptions) => {
      // asynchronously called
      if(err){
        res.json({error: err})
      }
      else{
        res.json({subscriptions: subscriptions})
      }
    }
  )
})

// Create a plan
router.post('/stripe/v1/create_plan', permission, (req, res) => {
  
  let amount = req.body.amount
  let currency = req.body.currency
  let interval = req.body.interval
  let name = req.body.name

  stripe.plans.create(
    {
      amount: amount,
      currency: currency,
      interval: interval,
      product: {name: name},
    },
    (err, plan) => {
      // asynchronously called
      if(err){
        res.json({error: err})
      }
      else{
        res.json({plan: plan})
      }
    }
  )
})

// Retrieve a plan
router.post('/stripe/v1/retrieve_plan', permission, (req, res) => {
  let plid = req.body.plid
  stripe.plans.retrieve(
    plid,
    (err, plan) => {
      if(err){
        res.json({error: err})
      }
      else{
        res.json({plan: plan})
      }
    }
  )
})

// Update a plan
router.post('/stripe/v1/update_plan', permission, (req, res) => {
  let plid = req.body.plid
  let data = req.body.data
  stripe.plans.update(
    plid,
    {metadata: {order_id: data}},
    (err, plan) => {
      // asynchronously called
      if(err){
        res.json({error: err})
      }
      else{
        res.json({plan: plan})
      }
    }
  )
})

// Delete a plan
router.delete('/stripe/v1/delete_plan', permission, (req, res) => {
  let plid = req.body.plid
  stripe.plans.del(
    plid,
    (err, confirmation) => {
      if(err){
        res.json({error: err})
      }
      else{
        res.json({confirmation: confirmation})
      }
    }
  )
})

// Get all plans
router.get('/stripe/v1/plans', permission, (req, res) => {
  stripe.plans.list(
    {limit: 100},
    (err, plans) => {
      if(err){
        res.json({error: err})
      }
      else{
        res.json({plans: plans})
      }
    }
  )
})

router.post('/stripe/v1/create_payout', permission, (req, res) => {
  let amt = req.body.amount
  let cur = req.body.currency
  let baid = req.body.baid
  stripe.payouts.create({
      amount: amt, 
      currency: cur,
      destination: baid
    },
    (err, payout) => {
      // asynchronously called
      if(err){
        res.json({error: err})
      }
      else{
        res.json({payout: payout})
      }
    }
  )
})

router.post('/stripe/v1/retrieve_payout', permission, (req, res) => {
  let poid = req.body.poid
  stripe.payouts.retrieve(
    poid,
    (err, payout) => {
      if(err){
        res.json({error: err})
      }
      else{
        res.json({payout: payout})
      }
    }
  )
})

router.post('/stripe/v1/update_payout', permission, (req, res) => {
  let poid = req.body.poid
  let val = req.body.value
  stripe.payouts.update(
    poid,
    {
      metadata: {
        order_id: val
      }
    },
    (err, payout) => {
      if(err){
        res.json({error: err})
      }
      else{
        res.json({payout: payout})
      }
    }
  )
})

router.get('/stripe/v1/list_payouts', permission, (req, res) => {
  stripe.payouts.list(
    {limit: 3},
    (err, payouts) => {
      if(err){
        res.json({error: err})
      }
      else{
        res.json({payouts: payouts})
      }
    }
  )
})

router.delete('/stripe/v1/cancel_payout', permission, (req, res) => {
  let poid = req.body.poid
  stripe.payouts.cancel(
    poid,
    (err, payout) => {
      if(err){
        res.json({error: err})
      }
      else{
        res.json({payout: payout})
      }
    }
  )
})  

router.post('/stripe/v1/create_account', permission, manager, (req, res) => {
  let bus_name = req.body.bus_name
  let type = req.body.type
  let country = req.body.country
  let email = req.body.email
  
  stripe.accounts.create(
  {
    type: type,
    country: country,
    email: email,
    requested_capabilities: [
      'card_payments',
      'transfers',
      'legacy_payments'
    ],
    business_type: 'company'
  },
  (err, account) => {
    if(err){
      res.json({error: err})
    }
    else{
      // Find the restaurant's obj and update it
      // with the stripe ID
      redis_con.get(bus_name)
      .then(data => {
        if(data !== null){
          redis_con.client.hmset(data, [
            'stripeID', account['id']
          ], (err, reply) => {
            if(err){
              res.status(422).json({error: 'The stripe ID was not updated'})
            }
            else{
              res.json({account: account})
            }
          })
        }
        else{
          res.status(422).json({error: 'This restaurant does not exist'})
        }
      })
    }
  })
})

router.post('/stripe/v1/retrieve_account', permission, manager, (req, res) => {
  let accid = req.body.accid
  stripe.accounts.retrieve(
    accid,
    (err, account) => {
      if(err){
        res.json({error: err})
      }
      else{
        res.json({account: account})
      }
    }
  )
})

router.post('/stripe/v1/update_account', permission, manager, (req, res) => {
  let accid = req.body.accid
  let value = req.body.value
  stripe.accounts.update(
    accid,
    {metadata: {order_id: value}},
    (err, account) => {
      if(err){
        res.json({error: err})
      }
      else{
        res.json({account: account})
      }
    }
  )
})

router.delete('/stripe/v1/delete_account', permission, manager, (req, res) => {
  let accid = req.body.accid
  stripe.accounts.del(
    accid,
    (err, confirmation) => {
      if(err){
        res.json({error: err})
      }
      else{
        res.json({confirmation: confirmation})
      }
    }
  )
})

router.post('/stripe/v1/reject_account', permission, manager, (req, res) => {
  let accid = req.body.accid
  stripe.accounts.reject(
    accid,
    {reason: 'fraud'},
    (err, account) => {
      if(err){
        res.json({error: err})
      }
      else{
        res.json({account, account})
      }
    }
  )
})

router.get('/stripe/v1/list_accounts', permission, manager, (req, res) => {
  stripe.accounts.list(
    {limit: 100},
    (err, accounts) => {
      if(err){
        res.json({error: err})
      }
      else{
        res.json({accounts: accounts})
      }
    }
  )
})

router.post('/stripe/v1/create_ex_bank_acc', permission, manager, (req, res) => {
  let accid = req.body.accid
  let accNum = req.body.accNum
  let currency = req.body.currency
  let country = req.body.country
  let route = req.body.routing_num
  stripe.accounts.createExternalAccount(
    accid,
    {
      external_account: {
        object: 'bank_account',
        country: country,
        currency: currency,
        routing_number: route,
        account_number: accNum
      }
    },
    (err, bankAccount) => {
      // asynchronously called
      if(err){
        res.json({error: err})
      }
      else{
        res.json({bankAccount: bankAccount})
      }
    }
  )
})

router.post('/stripe/v1/retrieve_ex_bank_acc', permission, manager, (req, res) => {
  let accid = req.body.accid
  let baid = req.body.baid
  stripe.accounts.retrieveExternalAccount(
    accid,
    baid,
    (err, bankAccount) => {
      // asynchronously called
      if(err){
        res.status(422).json({error: err})
      }
      else{
        res.json({bankAccount: bankAccount})
      }
    }
  )
})

router.post('/stripe/v1/update_ex_bank_acc', permission, manager, (req, res) => {
  let accid = req.body.accid
  let baid = req.body.baid
  let data = req.body.data
  stripe.accounts.updateExternalAccount(
    accid,
    baid,
    {metadata: {order_id: data}},
    (err, bankAccount) => {
      if(err){
        res.status(422).json({error: err})
      }
      else{
        res.json({bankAccount: bankAccount})
      }
    }
  )
})

router.delete('/stripe/v1/delete_ex_bank_acc', permission, manager, (req, res) => {
  let accid = req.body.accid
  let baid = req.body.baid
  stripe.accounts.deleteExternalAccount(
    accid,
    baid,
    (err, confirmation) => {
      if(err){
        res.status(422).json({error: err})
      }
      else{
        res.json({confirmation: confirmation})
      }
    }
  )
})

router.post('/stripe/v1/list_ex_bank_acc', permission, manager, (req, res) => {
  let accid = req.body.accid
  stripe.accounts.listExternalAccounts(
    accid,
    {object: 'bank_account', limit: 100},
    (err, accountBankAccounts) => {
      if(err){
        res.status(422).json({error: err})
      }
      else{
        res.json({accountBankAccounts: accountBankAccounts})
      }
    }
  )
})

module.exports = router