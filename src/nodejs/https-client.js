var fs = require('fs');
var https = require('https');

const cert_dir = '../../test/client/'

var options = { 
    hostname: 'localhost', 
    port: 4433, 
    path: '/', 
    method: 'GET', 
    key: fs.readFileSync(cert_dir+'client-key.pem'), 
    cert: fs.readFileSync(cert_dir+'client-crt.pem'), 
    ca: fs.readFileSync(cert_dir+'ca-crt.pem')
};

var req = https.request(options, function(res) { 
    res.on('data', function(data) { 
        process.stdout.write(data); 
    }); 
}); 

req.end(); 

req.on('error', function(e) { 
    console.error(e); 
});
