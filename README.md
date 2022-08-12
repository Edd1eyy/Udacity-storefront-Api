# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `npm i` in your terminal at the project root.

## Required Technologies

Your application must make use of the following libraries:

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## setup

after creating the datasets and running migrations


List of databases
Name | Owner | Encoding | Collate | Ctype | Access privileges
---------------+----------+----------+----------------------------+----------------------------+-----------------------
postgres | postgres | UTF8 | English_United States.1252 | English_United States.1252 |
postgres_test | postgres | UTF8 | English_United States.1252 | English_United States.1252 |



List of relations
Schema | Name | Type | Owner
--------+----------------+-------+----------
public | migrations | table | postgres
public | order_products | table | postgres
public | orders | table | postgres
public | products | table | postgres
public | users | table | postgres

## running

after getting the server live on local host, use postman to do get, post and update requests
