# Appymeal Backend

## Build Instructions
The server must be running docker and docker compose, this application uses docker compose for the build. Run these commands to build and run the application.


- git clone https://github.com/mhanberry1/appymeal-backend.git
- cd /appymeal-backend
- docker-compose up --build


## Software Stack
Bginx - used as a reverse proxy server  
Nodejs - runtime environment that executes JavaScript code  
Expressjs - a web application framework  

Redis - an in memory data structure used as the database

## Additional Notes
This is the api for the appymeal app it can only be accessed by the appymeal client because it sits behind an Nginx reverse proxy

## Stripe Payments
Ther are two types of users that will be accessing the these routes, that would be the buyer and the provider (restaurant).
These are the steps for each of those types of users

### Provider:

- Register the restaurant using this endpoint: Add Restaurant `http://localhost/api/restaurant/add`
- Create a stripe connected account: Stripe Create Account `http://localhost/stripe/v1/create_account`
- Add the restaurants bank account and attach connected account: Stripe Create Ex. Bank Acc. `http://localhost/stripe/v1/create_ex_bank_acc`


### Customer:

If the customer does not already have a payment method, take these steps first.

- Create a payment method using this endpoint: Stripe Create Payment Method `http://localhost/stripe/v1/create_payment`
- Attach the customer to the payment method: Stripe Attach Payment Method to Customer `http://localhost/stripe/v1/attach_payment_cus`


If the customer already has a payment method, take these steps.

- Get the customer's payment method: Stripe Retrieve a Payment Method `http://localhost/stripe/v1/retrieve_payment/{PAYMENT_METHOD_ID}`
- Get the provider's account ID: Stripe Retrieve Account `http://localhost/stripe/v1/retrieve_account`
- Create a payment intent: Stripe Create Payment Intent `http://localhost/stripe/v1/create_paymentIntent`
- Confirm the payment to the provider: Stripe Confirm Payment Intent `http://localhost/stripe/v1/confirm_paymentIntent`


