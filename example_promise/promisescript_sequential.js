//Creating a promise method. The promise will get resolved when timer times out after 6 seconds.
let myPromise6s = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve("Promise resolved with 6s delay")
    },6000)})
let myPromise3s = new Promise((resolve,reject) => {
    setTimeout(() => {
        resolve("Promise resolved with 3s delay")
    },3000)})

    //Console log before calling the promise
console.log("Before calling promise");

//Call the promise and wait for it to be resolved and then print a message.

// This will be executed second
myPromise6s.then((successMessage) => {
    console.log("From Callback " + successMessage)
});

// This will be executed first
myPromise3s.then((successMessage) => {
    console.log("From Callback " + successMessage)
});

//Console log after calling the promise
  console.log("After calling promise");