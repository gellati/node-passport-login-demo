# server dockerfile
FROM alpine:3.11.2
COPY package.json app/
WORKDIR /app
RUN apk update && apk add --update nodejs npm && npm install
ADD src /app/src
EXPOSE 5000
CMD ["npm", "run", "start"]