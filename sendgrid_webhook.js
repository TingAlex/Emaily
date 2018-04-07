var localtunnel = require('localtunnel');
localtunnel(5000, { subdomain: 'tingalex29' }, function(err, tunnel) {
  console.log('LT running')
});