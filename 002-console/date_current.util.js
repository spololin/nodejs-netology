#!/usr/bin/env node

const {currentDate, dateInArgv, monthInArgv, yearInArgv} = require("./date.util");

console.log(process);

if (yearInArgv) {
    console.log(currentDate.getFullYear());
} else if (monthInArgv) {
    console.log(currentDate.getMonth() + 1);
} else if (dateInArgv) {
    console.log(currentDate.getDate())
} else {
    console.log(currentDate.toISOString())
}
