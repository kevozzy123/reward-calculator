# Reward Points Calculator

A retailer offers a rewards program to its customers, awarding points based on each recorded purchase.
A customer receives 2 points for every dollar spent over 100 dollars in each transaction, plus 1 point for every dollar spent over $50 in each transaction (e.g. a 120 purchase = 2x20 + 1x50 = 90 points).
Given a record of every transaction during a three month period, calculate the reward points earned for each customer per month and total.

## Instructions for running this project
First, download all the dependencies(I tried to keep this project as minimal as possible, therefore the only dependency to download is json-server)
```
npm install
```

Start json server
```
npm run json-server
```

In another terminal, run the project
```
npm start
```


## Folder Structure
```
├── src
│   ├── __tests__ 
│   ├── screens
│   ├── db
│   ├── utils
|
├── public
├── node_modules
├── package.json
├── package-lock.json 
└── .gitignore
```
**db**
Contains db.json file. This project uses json server to simulate sending requests to api endpoint.

**screens**
Contains the jsx and css files for this project, as well as the utility functions that won't be used by other components in forseeable future.

**\__tests__**
Contains the unit tests using Jest and React Testing Library.

**utils**
Contains the utility functions and custom hooks that is likely to be used across the entire application

