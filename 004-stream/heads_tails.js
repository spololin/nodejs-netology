import * as readline from 'node:readline/promises';
import {
    stdin as input,
    stdout as output,
} from 'node:process';
import {args} from './args.util.js';
import { checkLogDir, writeLog } from './log.utils.js';

const logFile = args?.log;
const stream = readline.createInterface({ input, output });
const hiddenValue = Math.floor(Math.random() * 2) + 1;

let answer = await stream.question('Орел (1) или решка (2)?\n');
answer = parseInt(answer);
stream.close();

console.log(answer === hiddenValue ? 'Угадал)))' : 'Не угадал(((');

if (logFile) {
    checkLogDir();
    writeLog(logFile, {hiddenValue, answer});
}
