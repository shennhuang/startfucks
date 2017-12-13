使用 OpenSSL 自行生成SSL證書

生成私鑰
* `openssl genrsa -out private-key.pem 1024`

使用私鑰生成CSR證書簽名
* `openssl req -new -key private-key.pem -out csr.pem`

使用私鑰和CSR簽名生成證書文件
* `openssl x509 -req -days 3650 -in csr.pem -signkey private-key.pem -out cert.pem`