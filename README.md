<p align="center">
  <h3 align="center">Vintage Cars Gallery Server</h3>
  <p align="center">
    A Next.js Web App to view a collection of vintage cars
  </p>
  <p align="center">
    <a href="https://www.typescriptlang.org/">
      <img src="https://img.shields.io/badge/types-typescript-%23007ACC?style=for-the-badge&logo=typescript" alt="Built with Typescript">
    </a>
    <a href="#">
      <img src="https://img.shields.io/badge/schemas-GraphQL-%23E434AA?style=for-the-badge&logo=graphql" alt="Built with Chakra UI">
    </a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About The Project](#about-the-project)
  - [Built With](#built-with)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Run App](#run-app)
  - [Preview](#preview)

<!-- ABOUT THE PROJECT -->

## About The Project

This repo was created with Fasitfy, using Typescript. I also chose to use Postgraphile for it's rapid prototyping capabilities, auto generating schemas from the postgres tables.

### Built With

-   [Typescript](https://www.typescriptlang.org/)
-   [Fastify](https://www.fastify.io/)
-   [PostGraphile](https://www.graphile.org/postgraphile/introduction/)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

`yarn` installed on your local machine.

### Installation

#### 1. Clone the repo

```sh
git clone https://github.com/TGlide/car-gallery-server/
cd car-gallery-server
```

#### 2. Install Yarn dependencies

```sh
yarn
```

#### 3. Create postgres db and tables

Create your local postgres database, and run the following sql command to create a table for cars:

```
CREATE TABLE public.car (
	id serial NOT NULL,
	"name" text NOT NULL,
	images _text NOT NULL,
	created_at timestamp NULL DEFAULT now(),
	"year" int4 NULL,
	CONSTRAINT car_pkey PRIMARY KEY (id)
);
```

#### 4. Setup environment variables

Create a `.env.local` file with the following variables:
```
  DATABASE_URL=postgres://user:password@host:port/databse // remember to change to reflect your use case!
  ENVIRONMENT=development
```


## Usage

### Run App

```sh
yarn build && y start
```


