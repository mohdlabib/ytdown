FROM node:latest

ENV CHROME_BIN=/usr/bin/chromium-browser \
    CHROME_PATH=/usr/lib/chromium/ \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

RUN apt-get update && apt-get install -yq \
    wget \
    gnupg \
    ca-certificates \
    chromium-browser \
    fonts-liberation \
    fonts-roboto \
    libappindicator3-1 \
    libgbm-dev \
    libx11-xcb1 \
    libxcb-dri3-0 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxi6 \
    libxrandr2 \
    libxss1 \
    libxtst6 \
    lsb-release \
    xdg-utils

COPY . /app
WORKDIR /app

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]