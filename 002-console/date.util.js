const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');
const args = yargs(hideBin(process.argv)).parse();
const currentDate = new Date();

const yearInArgv = args.y || args.year;
const monthInArgv = args.m || args.month;
const dateInArgv = args.d || args.date;

module.exports = {
    currentDate,
    yearInArgv,
    monthInArgv,
    dateInArgv
}