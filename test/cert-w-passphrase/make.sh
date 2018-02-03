#!/bin/bash

C="US"
ST="New York"
L="Any"
O="CertTestingDevs"
OU="IT"
CN="localhost"

openssl req -new -x509 -days 9999 -config ca.cnf -keyout ca-key.pem -out ca-crt.pem

openssl genrsa -out server-key.pem 4096



if false; then
openssl req -nodes -newkey rsa:2048 \
  -keyout private.key \
  -out "$CN.csr" \
  -subj "/C=$C/ST=$ST/L=$L/O=$O/OU=$OU/CN=$CN"
fi  
