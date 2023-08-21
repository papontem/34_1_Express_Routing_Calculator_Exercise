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
The three base routes are /mean, /median, /mode. All accept GET requests at the moment. note: Currently by default app will run on port 3000. if you changed this make sure to also change the port value from the examples given.
### /mean
Example:
>http://localhost:3000/mean?nums=NUMS

### /median
Example:
>http://localhost:3000/median?nums=NUMS

### /mode
Example:
>http://localhost:3000/mode?nums=NUMS
