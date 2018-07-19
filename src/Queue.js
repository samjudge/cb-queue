const
  Result        = require('./Result'),
  QueueFunction = require('./QueueFunction')
;


/**
 * Create a queue of functions
 * 
 * @param {Function[]} functions The array of functions
 * @returns {Queue}
 */
function Queue(functions) {

  this._functions = functions;

}

/**
 * Start running through the queued functions
 * 
 * @returns {Promise<Result, any[]>}
 */
Queue.prototype.start = function() {

  return new Promise((resolve, reject) => {

    let
      responses = [],
      errors    = [],
      complete  = -1,
      perform   = () => {

        complete++;

        let
          queued_function = this._functions[complete]
        ;
        
        if(queued_function !== undefined) {

          if(queued_function.constructor.name === 'QueueFunction') {

            queued_function
              .run()
              .then(function() {

                responses.push(arguments);

                perform();

              })
              .catch(function() {

                errors.push(arguments);

                perform();

              })
            ;

          } else {
  
            // current might not be a function or be instance of
            // QueueFunction but there may still be functions to run
            perform();
  
          }

        } else {

          // all functions are ran therefore the
          // .start() method should resolve or
          // reject depending on errors 

          if(errors.length > 0) {

            reject(errors);

          } else {

            resolve(new Result(responses));

          }

        }

      }
    ;

    // start the queue
    perform();

  });

};


module.exports = Queue;
