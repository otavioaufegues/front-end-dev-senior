# docker/react/Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copiamos os arquivos de dependências primeiro para aproveitar o cache do Docker
COPY frontend/package*.json ./

RUN npm install

# Copiamos o resto dos arquivos
COPY frontend/ ./

EXPOSE 5173

# Comando para rodar o Vite com acesso externo
CMD ["npm", "run", "dev", "--", "--host"]