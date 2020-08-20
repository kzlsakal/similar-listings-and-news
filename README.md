# ReBurke / similar-listings-and-news

[![CI Status](https://circleci.com/gh/HRR47-FEC-Burke/similar-listings-and-news.svg?style=shield)](https://circleci.com/gh/HRR47-FEC-Burke/similar-listings-and-news)

> A module that shows similar listings and related news on a product page

## Related Projects

  - https://github.com/HRR47-FEC-Burke/seller-reviews
  - https://github.com/HRR47-FEC-Burke/sidebar
  - https://github.com/HRR47-FEC-Burke/main-photo

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#Requirements)
3. [Development](#Development)
4. [Production](#Production)
5. [Deployment](#Deployment)
6. [Screenshot](#screenshot)

## Usage

> Example URL: http://localhost:3005/item/25
>
> Please set up the environment variables for seamless functionality
>
> You may set CLOUD_IMG_URL to serve from a local directory during development

## Requirements

- Node.js v12.18.1
  - https://nodejs.org/

- MongoDB v4.2.8
  - https://www.mongodb.com/

- ### Environment Variables
  - To retrieve images:
    - `CLOUD_IMG_URL=<your-cloud-static-url>`
  - Optional:
    - `MONGODB_URL=<your-mongo-db-url>`
    - `PORT=<your-server-port>`
    - `URL=<your-origin-url>`

## Development

All commands from within the repository's root directory.

### Installing Dependencies

```sh
npm install
```

### Seeding Database

Seed database with 101 listings:

```sh
npm run seed
```

Seed with a custom amount:

```sh
npm run seed amount=<custom-amount>
```

### Development Server

On two separate terminal windows:

```sh
npm run build:watch
```

```sh
npm run start:watch
```

### Testing

```sh
npm test
```

## Production

### Environment Setup
> If npm installation is made in production mode or the dev dependencies are
> pruned, environment variables need to be set in the shell since dotenv is a
> dev dependency.

### Webpack Production Build

```sh
npm run build
```

### Node Express Server

```sh
npm start
```
> When you start the server with $ `npm run start:dev` instead, the service is
> designed to serve up to 100 images from your cloud. When the item id 101 is
> requested, it serves the address of image id 1.

## Deployment

### Hosting The Bundle on Cloud
> Requires the dev dependencies to be installed

- Create the grunt-aws.json file at $HOME/.aws directory
  ```sh
  {
    "accessKeyId": "<your-access-keyId>",
    "secretAccessKey": "<your-access-secret>",
    "bucket": "<your-bucket-name>",
    "path": "<optional-path>/" || ""
  }
  ```
- Add `CLOUD_BUNDLE_URL=<your-bucket-url[-path]>` to the environment variables

- Run `grunt upload` on the terminal

### Docker
> [Requires Docker v19.03.12](https://docs.docker.com/engine/install/) and
> [Docker Compose v1.26.2](https://docs.docker.com/compose/install/)

- Create the .env.docker file to set up container environment
  ```sh
  CLOUD_IMG_URL=<your-cloud-static-url>
  CLOUD_BUNDLE_URL=[your-cloud-js-bundle-url]
  MONGODB_URL=mongodb://reburke:sln@mongo:27017/reburke-sln?authSource=admin
  PORT=3005
  URL=<your-origin-url>
  ```

- Run $ `docker-compose up -d` to start running the service on port 80

> docker-compose.yml file uses the npm start:dev command. The service is
> designed to serve up to 100 images from your cloud. When the item id 101 is
> viewed, it serves the image id 1. To change this behavior, change the
> `npm run start:dev` to `npm run start` before using docker-compose up.

> docker-compose.yml file seeds the database with 100 items when the container
> starts. To change this behavior, you can remove the `npm run seed` command
> or change it to `npm run seed amount=<seeding-amount>`.

> Dockerfile is included for the build but it will require you to setup your
> environment variables, volumes and network in the shell. It will not work
> out-of-the-box since the service is a multi-container module. Use Docker
> Compose instead if Docker Run if you are not sure how to set these up.

## Screenshot

![Screenshot](./docs/screenshot.png?raw=true "Screenshot")
![Article](./docs/article-modal.png?raw=true "Article Modal Pop-Up")
![Mobile](./docs/mobile.png?raw=true "Mobile View")
