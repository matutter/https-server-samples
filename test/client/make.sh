#!/bin/bash

openssl genrsa -out client-key.pem 4096

openssl req -new -config client.cnf -key client-key.pem -out client-csr.pem

status=$?
if [ $status -ne 0 ]; then
  echo 'failed to make client csr, exiting...'
  exit $status
fi

ca_crt=`find .. -name ca-crt.pem`
ca_key=`find .. -name ca-key.pem`
ln -s $ca_crt ca-crt.pem
ln -s $ca_key ca-key.pem

openssl x509 -req -extfile client.cnf \
  -days 999 \
  -passin "pass:password" \
  -in client-csr.pem \
  -CA ca-crt.pem \
  -CAkey ca-key.pem \
  -CAcreateserial -out client-crt.pem

openssl verify -CAfile ca-crt.pem client-crt.pem

