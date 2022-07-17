#!/usr/bin/env node
const {Command} = require('commander');
const {spawn} = require('child_process');
const path = require("path");
const program = new Command();

program
    .name('mcontroller')
    .description('Control and modify simple media player controller')
    .version('0.0.1');

program.command('start')
    .description('Start server listening')
    .alias('st')
    .option('-bg', 'to start server in background or separate process')
    .action((str, options) => {
        console.log(`this command will run the script.`);

        spawn('node', [path.join(__dirname, '/../dist/index.js'), '&'], {
            detached: str.Bg, stdio: 'ignore'
        }).unref();

        process.exit(0);
    });

program.parse();
