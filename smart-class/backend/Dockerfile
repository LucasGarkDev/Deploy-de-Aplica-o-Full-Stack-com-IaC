# smart-class/backend/Dockerfile
# === Etapa base ===
FROM node:20-alpine

# Diretório de trabalho dentro do container
WORKDIR /app

# Copiar apenas arquivos de dependência primeiro (cache de build)
COPY package*.json ./

# Instalar dependências (apenas produção)
RUN npm ci --omit=dev

# Copiar restante do código
COPY . .

# Gerar o Prisma Client dentro do container
RUN npx prisma generate

# Variáveis padrão
ENV NODE_ENV=production \
    PORT=5000

# Expor a porta utilizada pelo backend
EXPOSE 5000

# 🔥 Comando de inicialização com migrações automáticas
CMD ["sh", "-c", "npx prisma migrate deploy && npm start"]
