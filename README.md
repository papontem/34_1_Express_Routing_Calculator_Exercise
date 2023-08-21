# 34_1_Express_Routing_Calculator_Exercise
## Public repo of exercise for unit 34.1: Express Routing Calculator Exercise
We will complete the task of creating an Express.js application designed for performing three statistical operations on an arbitrary set of numbers:

- **Mean** (Average)
- **Median** (Midpoint)
- **Mode** (Most Frequent)

Each of these operations is invoked through a dedicated route in the Express.js application.

## How To Run
To set up and run the application locally, follow these steps:

1. Download a clone of this repo to your local machine.
2. Navigate to the repository's directory using your terminal.
3. Install the projects dependencies with the following command:
```
$ npm install
```
4. To start the server use the command:
```
$ node calc_API.js
```
5. Then you make get requests to our calculator api on port 3000 of your localhost. But you can change this whenever you like by changing the value of port in calc_API_app.js.
```
// init our express app
const app = express();

// set app port
const port = 3000; <<<<<<

// Tell Express to parse all requests for json
app.use(express.json());
```

## Route Requests
The three base routes are /mean, /median, /mode. All accept GET requests at the moment. note: Currently by default app will run on port 3000. if you changed this make sure to also change the port value from the examples given. the nums query must be included, and each number must be seperated by a comma (,) .
### /mean
Example:
>http://localhost:3000/mean?nums=1,2,3

Example JSON Response:
```
{
  "operation": "mean",
  "value": 2
}
```
### /median
Example:
>http://localhost:3000/median?nums=1,2,3,4

Example JSON Response:
```
{
  "operation": "median",
  "value": 2.5
}
```

### /mode
Example:
>http://localhost:3000/mode?nums=4,33,4,5,4

Example JSON Response:
```
{
  "operation": "mode",
  "value": [
    4
  ]
}
```
Example:
>http://localhost:3000/mode?nums=11,22,11,22

Example JSON Response:
```
{
  "operation": "mode",
  "value": [
    11,
    22
  ]
}
```
### - /  and - /status 
Example:
>http://localhost:3000/

>http://localhost:3000/status

Example JSON Response:
```
{
  "status": "Calc Api is Live"
}
```
#### Errors
Custom errors for when a user make a bad request still work in progress.
#### Missing Nums Query
>http://localhost:3000/mode

>http://localhost:3000/mode?

>http://localhost:3000/mode?nums

>http://localhost:3000/mode?nums=

Response:
```
{
  "error": {
    "message": "Bad Request: nums are required",
    "status": 400
  }
}
```
#### Input Empty Strings (too many commas)
>http://localhost:3000/mode?nums=,

Response:
```
{
  "error": {
    "message": "Bad Request: nums = [,] includes an empty string (\"\"), too many commas (,) ",
    "status": 400
  }
}
```

#### Input Non-Number Elements
>http://localhost:3000/mode?nums=HECK,10,99

Response:
```
{
  "error": {
    "message": "Bad Request: nums = [HECK,10,99] includes an element that is not a number",
    "status": 400
  }
}
```
