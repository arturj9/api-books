# Use uma imagem base do Node.js
FROM node:20.11.0

# Crie e defina o diretório de trabalho dentro do contêiner
WORKDIR /usr/app

# Copie o arquivo package.json e o arquivo package-lock.json (se existirem)
COPY package*.json ./

# Instale as dependências do Node.js
RUN npm install

# Copie o restante do código-fonte da aplicação
COPY . .

RUN npx prisma generate

# Exponha a porta que a aplicação vai ouvir
EXPOSE 8080

CMD ["npm", "run", "dev"]
