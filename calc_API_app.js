/**Script dictating our Express Calculator Api routes */

// importing express
const express = require("express");

// IMPORTING METHODS OF CALCULATION
const { mean,median,mode } = require("./operations");

// importing our own custom errors
const ExpressError = require('./expressError')

// init our express app
const app = express();

// set app port
const port = 3000;

// Tell Express to parse all requests for json
app.use(express.json());

// Choice of Operations available
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

// PAM: merged operations routes into one.
app.get("/:operation", (req, res,next) => {
	try {
		
		// Pam: Grabs the value of the 'operation' parameter using Array.find(), else throw error
		const ope = OPERATIONS.find(ope => ope === req.params.operation);
		if (!ope) throw new ExpressError(`Error: ${req.params.operation} Is An Invalid Operation`, 404)
		
		
		// console.log("Request Query:",req.query);
		// console.log("Request Query Nums:",req.query.nums);

		// Pam: throw error if nums was not sent with operation request
		if (!req.query.nums) {
			throw new ExpressError("Bad Request: nums are required", 400);
		}

		// Pam: throw error if any of the elements from nums is empty, too many commas
		let nums = req.query.nums.split(',');
		if (nums.some(num => num === "")) {
			throw new ExpressError(`Bad Request: nums = [${nums}] includes an empty string (""), too many commas (,) `, 400);
		}
		// Pam: throw error if any of the elements from nums is not a number
		if (nums.some(num => isNaN(num))) {
			throw new ExpressError(`Bad Request: nums = [${nums}] includes an element that is not a number`, 400);
		}

		// Pam: turn nums elements into possible float numbers as all must be numbers for sure by now. 
		nums = nums.map(str => parseFloat(str))
		// console.log("Nums:", nums);

		//PAM: Calculate the desired operation
		let val;
		if( ope === "mean"){
			
			val = mean(nums)
		}
		if( ope === "median"){
			
			val = median(nums)
		}
		if( ope === "mode"){
			val = mode(nums)
		}

		res.json({
			operation: ope,
			// nums: nums,
			value: val
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