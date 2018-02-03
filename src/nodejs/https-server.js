var fs = require('fs'); 
var https = require('https'); 

const cert_dir = '../../test/server/';

var options = { 
    key: fs.readFileSync(cert_dir+'server-key.pem'), 
    cert: fs.readFileSync(cert_dir+'server-crt.pem'), 
    ca: fs.readFileSync(cert_dir+'ca-crt.pem'), 
    requestCert: true, 
    rejectUnauthorized: true
}; 

https.createServer(options, function (req, res) { 
    console.log(new Date()+' '+ 
        req.connection.remoteAddress+' '+ 
        req.socket.getPeerCertificate().subject.CN+' '+ 
        req.method+' '+req.url); 
    res.writeHead(200);
    let cn = req.socket.getPeerCertificate().subject.CN;
    res.end(`hello ${cn}\n`); 
}).listen(4433, () => {
    console.log('server running');
});
