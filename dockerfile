# para imagem node
FROM node
#diretório que será usado
WORKDIR /usr/app/

COPY package.json ./

RUN npm install
#copia tudo para pasta raiz
COPY . .

EXPOSE 3333
#o comando para subir o server
CMD ["npm", "run", "dev"]