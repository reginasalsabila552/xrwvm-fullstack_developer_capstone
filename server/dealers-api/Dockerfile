FROM node:18-bullseye-slim
WORKDIR /app
COPY package.json .
RUN npm install --omit=dev
COPY app_memory.js .
COPY data ./data
EXPOSE 3030
CMD ["node", "app_memory.js"]
