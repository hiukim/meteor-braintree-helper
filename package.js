Package.describe({
  name: 'hiukim:braintree-helper',
  version: '1.0.1',
  // Brief, one-line summary of the package.
  summary: 'Just a braintree helper',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/hiukim/meteor-braintree-helper.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0.3.2');
  api.addFiles('braintree-client-v2.js', 'client');
  api.addFiles('hiukim:braintree-helper.js', 'server');
  api.export('BraintreeHelper','server');
  api.export('Braintree','server');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('hiukim:braintree-helper');
  api.addFiles('hiukim:braintree-tests.js');
});

Npm.depends({
  braintree: '1.23.0'
});
