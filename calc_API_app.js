/**Script dictating our Express Calculator Api routes */

// importing express
const express = require("express");

// importing our own custom errors
const ExpressError = require('./expressError')

// init our express app
const app = express();
// set app port
const port = 3000;
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
		
		// Pam: Grabs the value of the 'operation' parameter using Array.find(), else throw error
		const ope = OPERATIONS.find(ope => ope === req.params.operation);
		if (!ope) throw new ExpressError(`Error: ${req.params.operation} Is An Invalid Operation`, 404)
		
		
		console.log("Request Query:",req.query);
		console.log("Request Query Nums:",req.query.nums);

		// Pam: throw error if nums was not sent with operation request
		if (!req.query.nums) {
			throw new ExpressError("Bad Request: nums are required", 400);
		}

		const nums = req.query.nums.split(',');
		// Pam: throw error if any of the elements from nums is not a number
		if (nums.some(num => isNaN(num))) {
			throw new ExpressError(`Bad Request: nums = [${nums}] includes an element that is not a number`, 400);
		}

		let val;

		res.json({
			operation: ope,
			nums: nums,
			// value: val
			value: `TEMPORARY VALUE ${val}`

		});

	} catch (e) {
	// move to the next matching handler, for this app, were using our error handling app.use() middleware to catch this.
	next(e)
	}
});

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
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
