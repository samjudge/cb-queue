/**
 * Create a new queue function
 * 
 * @param {function} callback 
 */
function QueueFunction(callback) {

  this._callback = callback;

}

/**
 * Run the queued function
 * 
 * @param {function} done 
 */
QueueFunction.prototype.run = function() {

  return new Promise((resolve, reject) => {

    this._callback(resolve, reject);

  });

};


module.exports = QueueFunction;
