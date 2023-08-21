/**Script dictating our Express Calculator Api routes */

// importing express
const express = require("express");

// importing our own custom errors
const ExpressError = require('./expressError')

// init our express app
const app = express();

// Tell Express to parse all requests for json
app.use(express.json());

const OPERATIONS = ['mean', 'median', 'mode']


/**ROUTES */

app.get("/", (req, res,next) => {
	res.json({
		status: "Calc Api is Live",
	});
});
app.get("/status", (req, res,next) => {
	res.json({
		status: "Calc Api is Live",
	});
});

/**
	The three base GET requests routes: 
	/mean
	/median 
	/mode.
 */


// PAM: merged operations routes into one.
app.get("/:operation", (req, res,next) => {
	try {
		// const user = USERS.find(u => u.username === req.params.username);
		// if (!user) throw new ExpressError("invalid username", 404)
		// return res.send({ user })

		// Pam: Grabs the value of the 'operation' parameter using Array.find(), else throw error
		const ope = OPERATIONS.find(ope => ope === req.params.operation);
		if (!ope) throw new ExpressError(`Error: ${req.params.operation} Is An Invalid Operation`, 404)

		let val;

		// console.log(req.query);
		console.log(req.query.nums);
		res.json({
			operation: ope,
			nums: req.query.nums,
			value: `TEMPORARY VALUE ${val}`
		});

	} catch (e) {
	// move to the next matching handler, for this app, were using our error handling app.use() middleware to catch this.
	next(e)
	}
});



// Each route takes a query key of nums which is a comma-separated list of numbers. 
//For example, if I want to get the mean of 1, 3, 5, and 7, that would look like be a GET request to /mean?nums=1,3,5,7.

// The response of each operation should be JSON which looks like this:

// response: {
//   operation: "mean",
//   value: 4
// }

// The app should “gracefully” handle the following errors:

//         Passing in an invalid number (NaN errors). For instance, /mean?nums=foo,2,3 should respond with a 400 Bad Request status code and a response that saying something like: foo is not a number.
//         Empty input: /mean without passing any nums should respond with a 400 Bad Request status code saying something like nums are required.

// Make sure you have unit tests for mean, median and mode.



// If no other route matches, respond with a 404
// app.use((req, res, next) => {
// 	const e = new ExpressError("Page Not Found", 404)
// 	next(e)
// })

// Error handler
app.use(function (err, req, res, next) { 
	// the default status is 500 Internal Server Error
	let status = err.status || 500;
	let message = err.msg;
  
	// set the status and alert the user
	return res.status(status).json({
	  error: { message, status }
	});
});

// app listen loop
app.listen(3000, () => {
	console.log("Server running on port 3000");
});
