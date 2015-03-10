Braintree = Npm.require('braintree');

BraintreeHelper = function() {
}

BraintreeHelper.getInstance = function() {
  if (BraintreeHelper._instance === undefined) {
    BraintreeHelper._instance = new BraintreeHelper();
  }
  return BraintreeHelper._instance;
}

BraintreeHelper.prototype.connect = function(options) {
  this.gateway = new Braintree.connect(options);
}

BraintreeHelper.prototype.getGateway = function() {
  return this.gateway;
}

BraintreeHelper.prototype.clientTokenGenerate = function(options) {
  var wrappedCall = Meteor.wrapAsync(this.gateway.clientToken.generate, this.gateway.clientToken);
  return wrappedCall(options);
}

BraintreeHelper.prototype.transactionSale = function(options) {
  var wrappedCall = Meteor.wrapAsync(this.gateway.transaction.sale, this.gateway.transaction);
  return wrappedCall(options);
}

//TODO: wrap up all the API calls
