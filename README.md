# Express Youtube API
This is a simple Express server written in TypeScript. It defines a single route that accepts a URL parameter and Quality parameter. The URL parameter is the URL of a YouTube video and the Quality parameter is the quality of the video to download. The server will download the video and return the video as a response.

## Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

- Docker - [Download & Install Docker](https://www.docker.com/products/docker-desktop)

## Deploy to Google Cloud Run

[![Run on Google Cloud](https://deploy.cloud.run/button.svg)](https://deploy.cloud.run)

Then visit your application with `?url=` parameter to download a video:

    https://<YOUR-APP-URL>/?url=https://www.youtube.com/watch?v=jHjFxJVeCQs