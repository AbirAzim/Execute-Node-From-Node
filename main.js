#!/usr/bin/env node

'use strict'

let http = require('http')
let fs = require('fs');
let exec = require('child_process').exec,
    child;


/*
* Catch Data from Client
*/
let data = fs.readFileSync(__dirname+'/files/data.txt', 'utf-8')
fs.writeFileSync(__dirname+'/output/out.js', data) // make a node js file and write to it

/*
* Execute The the external noode file
*/
child = exec('node output/out.js {{args}}',
  (error, stdout, stderr)=> {
    let result = {
      output: stdout,
      stdErr: stderr
    }
    fs.writeFileSync(__dirname+'/files/res.txt', JSON.stringify(result));
    if (error !== null) {
      console.log('exec error: ' + error);
    }
});

/*
* Creating Server
*/
let server = http.createServer((req,res)=>{
  let contents = fs.readFileSync(__dirname+'/files/res.txt', 'utf-8')
  res.writeHead(200,{'Content-type': 'application/json'})
  res.end(contents)
})

server.listen(8080);