# Multi-stage build for Go application
FROM node:23 AS builder
WORKDIR /ticketmonster

# Cache dependencies
COPY package*.json ./
RUN npm install

# Build binary
COPY . .

FROM node:23 AS production
WORKDIR /ticketmonster
COPY --from=builder /ticketmonster .
COPY .env.example .env
EXPOSE 3232
CMD ["npm", "start"]
