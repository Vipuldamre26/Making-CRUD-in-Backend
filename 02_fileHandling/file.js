const fs = require('fs');
const os = require('os');

// Syncronous way to write file and sync oprations also called blocking oprations
// fs.writeFileSync('./test1.txt', 'Hey there');


// Asyncronous way to write file and async also called non-blocking oprations 
// fs.writeFile('./test2.txt', 'hello from async', (err) => { 'error' })


// Syncronous way to read file and it require to variable for result 
const result = fs.readFileSync('./contact.txt', 'utf-8');
console.log(result);


// Ansyncronous way to read file and it does not require variable, but we can use variable externally and it require callback function for error handling and result 
let fileData;
fs.readFile('contact.txt', 'utf-8', (err, result) => {
    if(err){
        console.log(err);
    }
    else{
        fileData = result;
        console.log(result); 
        console.log('fileData', fileData);
    }
})


// adding data to existing file without override 
fs.appendFileSync('./test1.txt', new Date().getDate().toLocaleString());
fs.appendFileSync("./test2.txt", `Hey there\n`);




console.log(os.cpus().length);