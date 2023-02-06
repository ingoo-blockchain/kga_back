# STEP 1
# FROM node:16 AS builder

# WORKDIR /app

# COPY . .

# RUN npm install -g npm@latest
# RUN npm install
# RUN npm run build

# STEP 2
FROM node:16-alpine

WORKDIR /app
COPY . .

RUN npm install -g npm@latest
RUN npm install
RUN npm run build

ENV NODE_ENV production
# COPY package*.json ./
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["npm","run","start:prod"]
