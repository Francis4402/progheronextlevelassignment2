
# Book-Shop-Api (Programming Hero Assignment 2)

### Project Api Link

Vecel-link : https://book-shop-green.vercel.app

## To Start the Project

Download the project.

```bash
run cmd : npm install
```
```bash
setup the .env 

NODE_ENV = development
PORT = 5000
DATABSE_URL = mongodb url

```
---

## Description

In this api project i used typescript, node js , mongodb & express. For the error detection i used eslint and prettierrc for formating text. In this api you can post data, update, delete and also get the data through the api . You can also order books through the api and calculate the revenue that calculates how many total revenue you got from the order price also in counts the quantity . If the quantity goes 0 inStock will update to false . If the inStock is false you cannot order the books .

## Api Routes

### For the books post and get data

```bash
/api/products
```


### Get a Specific Book , update and delete

```bash
/api/products/:productId
```

### For the orders post and get data

```bash
/api/orders 
```

### For the total revenue
```bash
/api/orders/revenue  
```