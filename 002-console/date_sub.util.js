#!/usr/bin/env node

const {currentDate, dateInArgv, monthInArgv, yearInArgv} = require("./date.util");

if (yearInArgv) {
    console.log(new Date(currentDate.setFullYear(currentDate.getFullYear() - yearInArgv)));
} else if (dateInArgv) {
    console.log(new Date(currentDate.setDate(currentDate.getDate() - dateInArgv)));
} else if (monthInArgv) {
    console.log(new Date(currentDate.setMonth(currentDate.getMonth() - monthInArgv)));
}