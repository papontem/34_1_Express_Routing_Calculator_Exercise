// script file to store our functions to execute desired operations
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
	for(numStr in numsTally){
		console.log(numStr);
		if(numsTally[numStr] == highestCount){
            // push the number string turned back into a number in the result array
			result.push(parseFloat(numStr))
		}
	}
	return result
}

module.exports = {
	mean,
	median,
	mode
};