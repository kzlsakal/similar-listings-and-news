# ReBurke / similar-listings-and-news

[![CI Status](https://circleci.com/gh/HRR47-FEC-Burke/similar-listings-and-news.svg?style=shield)](https://circleci.com/gh/HRR47-FEC-Burke/similar-listings-and-news)

> A module that shows similar listings and related news on a product page

## Related Projects

  - https://github.com/HRR47-FEC-Burke/seller-reviews
  - https://github.com/HRR47-FEC-Burke/sidebar
  - https://github.com/HRR47-FEC-Burke/main-photo

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
4. [Production](#production)
5. [Screenshot](#screenshot)

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

- Add `SERVICE_MODE=production` to the environment variables
- Add the deployment address to client/config.jsx

### Webpack Production Build

```sh
npm run build
```

### Node Express Server

```sh
npm start
```

### Hosting The Bundle on Cloud

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

## Screenshot

![Screenshot](./docs/screenshot.png?raw=true "Screenshot")
![Article](./docs/article-modal.png?raw=true "Article Modal Pop-Up")
![Mobile](./docs/mobile.png?raw=true "Mobile View")
