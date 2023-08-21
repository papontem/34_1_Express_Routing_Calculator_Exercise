const { mean,median,mode } = require("./operations");

describe("Tests For Express Calculator APIs operations",function(){
	
	beforeAll(function () {
		console.log("BEFORE ALL TESTs!");
	});

	test("Test mean", function () {
		// Test Logic
		let testArr = [10,0,5]
		let ressult = mean(testArr)
		// Expectations
		expect(ressult).toEqual(expect.any(Number))
		expect(ressult).toEqual(5)
	});
	test("Test median", function () {
		// Test Logic
		let testArr = [10,0,5]
		let ressult = median(testArr)
		// Expectations
		expect(ressult).toEqual(expect.any(Number))
		expect(ressult).toEqual(5)
		
	});
	test("Test mode", function () {
		// Test Logic
		let testArr = [5,10,0,5]
		let ressult = mode(testArr)
		// Expectations
		expect(ressult).toEqual(expect.any(Array))
		expect(ressult).toEqual([5])
		
	});
})