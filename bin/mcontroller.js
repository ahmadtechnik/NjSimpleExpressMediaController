#!/usr/bin/env node
const {Command} = require('commander');
const {exec} = require('child_process');
const path = require("path");
const program = new Command();

program
    .name('string-util')
    .description('CLI to some JavaScript string utilities')
    .version('0.0.0');

program.command('start')
    .description('Start server listening')
    .action((str, options) => {
        exec('node ' + path.join(__dirname, '/../dist/index.js'), (error, stdout, stderr) => {
            console.log(stdout)
        })
    });

program.parse();
