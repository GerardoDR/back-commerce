# MOCK UP E-COMMERCE

~~site deployed: [ heroku app ]~~

## HOW TO RUN IT?

Runs on Node.js version 16.17

1. clone this repository

```
git clone git@github.com:GerardoDR/back-commerce.git
```

2. Install node dependencies:
```
cd back-commerce
```
```
npm i
```
will install the following npm packages:

- "bcrypt": "^5.0.1",
- "ejs": "^3.1.8",
- "express": "^4.18.1",
- "express-flash": "^0.0.2",
- "express-session": "^1.17.3",
- "mongoose": "^6.3.4",
- "multer": "^1.4.5-lts.1",
- "nodemailer": "^6.7.7",
- "passport": "^0.6.0",
- "passport-local": "^1.0.0",
- "socket.io": "^4.5.2",
- "socket.io-msgpack-parser": "^3.0.1",
- "twilio": "^3.80.0",
- "winston": "^3.8.1"

And, the following dev dependencies:

- "dotenv": "^16.0.1",
- "nodemon": "^2.0.20"

3. Load you .env (more on this below)
4. Run it:
```
node server.js
```
## IMPORTANT
1. TO ACCESS ADMIN FEATURES (ADD NEW PRODUCTS), YOU HAVE TO CREATE A USER IN YOUR MONGO DB COLLECTION WITH THE FIELD **admin** WITH BOOLEAN VALUE **true**

## FEATURES AND ENDPOINTS:

- ENV
  1. You will be able to load enviromental variables on /src/config/globals.js.
  2. These will be available when NODE_ENV is different from "production" through dotenv dependency
  3. In this default case you will have to place a ".env" file on the root directory that contains your enviromental variables.<br>
  example format-><br> TIEMPO_EXPIRACION=600000<br>MYDBPASSWORD=GHTY4586

- CRUD
  1. Products, chats, orders and carts are managed by requests, they require an active session (user logged in requests)
  
- CHAT
  1. Uses Socket.io with modified parser: "socket.io-msgpack-parser": "^3.0.1".

- MONGO DB
  1. Uses mongoose (^6.3.4) to link persistence on mongo DB for products, chats, carts and orders.

- MAILING SERVICE
  1. Uses nodemailer (^6.7.7) for automatic mailing on user registration and order placement.
  
- WHATSAPP AND SMS SERVICE
  1. Uses Twilio (^3.80.0) for automatic messages on order placement.
  
## WIP / KNOWN ISSUES

1. No autoscroll on chat,
2. Not enough validation for phone number on registration page,
3. More error handling,
4. Product by id page,
5. Not able to see own messages, public chat,
6. ...

