# 1. 빌드 단계
FROM node:20.18.0 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

ARG REACT_APP_API_URL
ARG REACT_APP_BACKEND_PORT

COPY . .

RUN REACT_APP_API_URL=${REACT_APP_API_URL} REACT_APP_BACKEND_PORT=${REACT_APP_BACKEND_PORT} npm run build

FROM node:20.18.0 AS runtime

WORKDIR /usr/src/app

RUN npm install -g serve

COPY --from=builder /app/build /usr/src/app/build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
