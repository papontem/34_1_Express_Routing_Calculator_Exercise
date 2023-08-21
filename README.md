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
4. to start the server use the command:
```
$ node calc_API.js
```
5. then you make get requets to our calculator api on port 3000 of your localhost.

## Route Requests
The three base routes are /mean, /median, /mode. All accept GET requests at the moment. Currently app will run on port 3000 when run
### /mean
Example:
>http://localhost:3000/mean?nums=NUMS

### /median
Example:
>http://localhost:3000/median?nums=NUMS

### /mode
Example:
>http://localhost:3000/mode?nums=NUMS
