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

// Choice of Operations available
const OPERATIONS = ['mean', 'median', 'mode']

// METHODS OF CALCULATION
/**
 *  Calculates the mean (avg) of an array of numbers
 * @param {Array[Number]} arr - array of numbers 
 */
function mean(arr){
	// console.log("GETTING THE MEAN");
	let arrLen = arr.length
	let result = 0;

	arr.forEach(num => {
		result += num;
	})

	result = result / arrLen
	return result 
}

/**
 *  Calculates the median (midpoint) of an array of numbers
 * @param {Array[Number]} arr - array of numbers 
 */
function median(arr) {
	// console.log("GETTING THE MEDIAN");
	// console.log("Array:", arr);

	let arrLen = arr.length;
	let result;

	// sort array in place, in increasing order
	arr.sort((a, b) => a - b);
	// console.log("Array:", arr);
	// console.log("Array length:", arrLen);
	
	// get the index in the middle, right index if there are two numbers in the middle
	let middleIndex = Math.floor(arrLen / 2);
	// console.log("Middle Index:", middleIndex);

	// if arr is of odd-length, else it has two elements in the middle
	if (arrLen % 2 === 1) {
		result =  arr[middleIndex];
		return result;
	} else {
		let leftNum = arr[middleIndex - 1];
		let rightNum = arr[middleIndex];
		result = (leftNum + rightNum) / 2 ;
		return result;
	}
}
/**
 *  Calculates the mdoe (most frequent) of an array of numbers
 * @param {Array[Number]} arr - array of numbers 
 */
function mode(arr) {
	// console.log("GETTING THE MODE");
	arrLen = arr.length
	let result = [];
	let highestCount = 0;
	let numsTally = {}

	// creat dictionary object that keeps count of each number, and updates the highest count as we iterate through them
	arr.forEach(num => {
		// console.log("Current Num:",num);

		if(!numsTally[num]){
			numsTally[num] = 1;
		} else {
			numsTally[num] +=1;
		}
		// check to update highest num count
		if (numsTally[num] > highestCount){
			highestCount = numsTally[num]
			// console.log("Updated Highest Number Count:", highestCount);
		}
		// console.log("Updated Nums Dic:",numsTally);
	})
	// console.log("Final Nums Dic:",numsTally);

	// now find which number or numbers who have the highest count
	for(num in numsTally){
		console.log(num);
		if(numsTally[num] == highestCount){
			result.push(num)
		}
	}
	return result
}

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
		
		
		// console.log("Request Query:",req.query);
		// console.log("Request Query Nums:",req.query.nums);

		// Pam: throw error if nums was not sent with operation request
		if (!req.query.nums) {
			throw new ExpressError("Bad Request: nums are required", 400);
		}

		// Pam: throw error if any of the elements from nums is empty, too many commas
		let nums = req.query.nums.split(',');
		if (nums.some(num => num === "")) {
			throw new ExpressError(`Bad Request: nums = [${nums}] includes an empty string "", too many commas `, 400);
		}
		// Pam: throw error if any of the elements from nums is not a number
		if (nums.some(num => isNaN(num))) {
			throw new ExpressError(`Bad Request: nums = [${nums}] includes an element that is not a number`, 400);
		}

		// Pam: turn nums elements into numbers as all must be numbers sure by now. 
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
