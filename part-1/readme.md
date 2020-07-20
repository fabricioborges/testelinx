# Part-1
# Install

> yarn install

#Install PM2 

> yarn global add pm2

*Necessário para rodar a aplicação em clusters*

> pm2 start server.js *para execução*

# Necessário criar arquivo .env

*para as credenciais do mongo atlas, enviados por e-mail, e utilizado para definir a porta a qual a api vai rodar*

# Run

> yarn start ou node src/server.js

# Run Tests

> yarn jest
