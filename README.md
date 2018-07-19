# cb-queue  
Simple utility to queue async functions

[![npm version](https://img.shields.io/npm/v/cb-queue.svg)](https://www.npmjs.com/package/cb-queue)
[![license](https://img.shields.io/github/license/hammy2899/cb-queue.svg)](https://github.com/hammy2899/cb-queue/blob/master/LICENSE.md)


### Installation  
```  
$ npm install --save cb-queue  
```

#### Usage
```javascript  
const
  { Queue, QueueFunction } = require('cb-queue')
;

let
  queue = new Queue([
    new QueueFunction((success, error) => {
      setTimeout(() => {

        console.log('1');

        success('1');

      }, 100);
    }),
    new QueueFunction((success, error) => {
      setTimeout(() => {

        console.log('2');

        success('2');

      }, 1000);
    }),
    new QueueFunction((success, error) => {
      setTimeout(() => {

        console.log('3');

        success('3');

      }, 100);
    }),
  ])
;

queue
  .start()
  .then((result) => {

    console.log('Finished.');
    console.log('  Async function 1 args: ', result.getArguments(0));
    console.log('  Async function 2 args: ', result.getArguments(1));
    console.log('  Async function 3 args: ', result.getArguments(2));

  })
  .catch((errors) => {

    console.error(errors);

  })
;
```

Output:
```text
1
2
3
Finished.
  Async function 1 args:  [Arguments] { '0': '1' }
  Async function 2 args:  [Arguments] { '0': '2' }
  Async function 3 args:  [Arguments] { '0': '3' }
```