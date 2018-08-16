/**
 * Create a new result
 * 
 * @param {Object[]} response_arguments
 * @returns {Result}
 */
function Result(response_arguments) {

  this._response_arguments = response_arguments;

}

/**
 * Get the response arguments for the function at the specified index
 * 
 * @param {number} index The index of the function
 */
Result.prototype.getArguments = function(index) {

  return this._response_arguments[index];

}


module.exports = Result;
