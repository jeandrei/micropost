
#IMPORTANTISSIMO - SE ESTIVER RODANDO NO PROXMOX O CONTAINER ATIVE AS OPÇÕES keyctl e Nesting
#CASO CONTRÁRIO DARA UM ERRO 
#Service 'app' failed to build: OCI runtime create failed: container_linux.go:380: starting container process caused: proces



#DOCKERIGNORE
#o arquivo dockerignore define o que será ignorado na criação do container, ou seja não será copiado 
#node_modules npm-debug.log

#DOCKERFILE
#executa os comandos de criação do container

#DOCKER-COMPOSE
#arquivo com as instruçẽs para a criação dos containers

#imagem que será baixada podereia ser latest mas vamos definir que queremos a versão 10
#é bom definir a versão pois a latest sempre vai ser a última e uma atualização de versão pode 
#ferrar com o sistema
FROM node:12

#onde o app será armazenado no container
WORKDIR /usr/src/app

#copia o arquivo package.jason no diretório do app /usr/src/app pois em package.jason é onde tem as dependencias
#que serão instaladas com o comando npm install
COPY /app/package*.json ./

#instala o app npm install instala todas as dependências que estão no arquivo package.json
RUN npm install

#copia todo o resto da pasta raiz do app para a pasta do container docker
#copia tudo do localhost meu app para o container docker /usr/src/app
COPY /app ./

#expoe a porta do container que vai rodar o sistema
EXPOSE 3000

#da o comando de inicialização do sistema
#por padrão vai ter esse conteúdo no arquivo package.json
#"scripts": {
#"test": "echo \"Error: no test specified\" && exit 1"
#mude a linha "test": "echo \"Error: no test specified\" && exit 1" para 
#"start: node app.js"
CMD ["npm", "start"]
