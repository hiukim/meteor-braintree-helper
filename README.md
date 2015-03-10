# meteor-braintree-helper

#### A meteor package wrapped for the braintree ####
  - braintree npm 1.23.0 (server) - https://www.npmjs.com/package/braintree
  - braintree javascript client v2 (client) - https://js.braintreegateway.com/v2/braintree.js

#### Server-Side Usages ####
There are two possible usages:

i. `Braintree` object is directly ported from Npm braintree `Braintree = Npm.require('braintree');`, so you can use it to do basically anything.
  
ii. `BraintreeHelper` is a singleton helper object for calling braintree API. It provides `Meteor.wrapAsync` on the asynchronous API calls for convenience.

#### Sample Code for `BraintreeHelper` ####

i. In `Meteor.startup` (or any other places), connect braintree server, i.e.
```
Meteor.startup(function() {
  var config = {
    environment: Braintree.Environment.Sandbox, // OR production
    publicKey: 'YOUR PUBLIC KEY,
    privateKey: 'YOUR PRIVATE KEY',
    merchantId: 'YOUR MERCHANT ID'
  };
  BraintreeHelper.getInstance().connect(config);
});
```

ii. To create a client token, i.e.
```
  var options = {}; // fill it, if any
  var response = BraintreeHelper.getInstance().clientTokenGenerate(options);
  var clientToken = response.clientToken;
```

iii. To create a transaction, i.e.
```
  var options = {
    amount: 10,
    paymentMethodNonce: 'NONCE FROM CLIENT'
  };
  var response = BraintreeHelper.getInstance().transactionSale(options);
```

iv. Other API calls
Currently, only two API calls are wrapped with `Meteor.wrapAsync` (`gateway.clientToken.generate` and `gateway.transaction.sale`) as shown above in ii) and iii). You are welcome to contribute by wrapping up the other calls as well.

Or as a workaround, you can obtain the gateway object by `BraintreeHelper.getInstance().getGateway()`, which would allow you to call any other APIs asynchronously (of course you can still do `Meteor.wrapAsync` around them), i.e.

```
  var gateway = BraintreeHelper.getInstance().getGateway();
  gateway.clientToken.generate(); // The original API call for generating clientToken
```

#### Client-Side Usage ####
In client side, you can access the `braintree` object from the Braintree javascript client( https://js.braintreegateway.com/v2/braintree.js) directly. e.g.

```
  var clientToken = GET_CLIENT_TOKEN_FROM_SERVER(); // e.g. through Meteor.call()
  braintree.setup(clientToken, 'dropin', {
    container: 'dropin',
    paymentMethodNonceReceived: function(event, nonce) {
      // You can can send the nonce back to server to proceed with the payment, e.g. through Meteor.call()
    }
  }
```
For detailed explanation on the client/server interactions, please refer back to Braintree documentation. https://developers.braintreepayments.com/javascript+node/start/overview


