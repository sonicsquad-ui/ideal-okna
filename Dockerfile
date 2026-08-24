FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npx prisma generate
RUN npx prisma db push --accept-data-loss || true
RUN node scripts/seed.js || true
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
