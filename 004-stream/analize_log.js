import { args } from './utils/args.util.js';
import * as fs from 'fs';
import * as path from 'path';
import { dirname } from './utils/log.utils.js'

const logFile = args?.log;
const logPath = path.join(dirname, "logs", logFile);
let lines;
console.log(logPath);

const stream = fs.createReadStream(logPath, { encoding: "utf-8" });

stream.on('error', function (err) {
    console.log(`Ошибка чтения файла ${logFile}: ${err.message}`);
});

stream.on('data', (chunk) => {
    lines = chunk.split('\n').filter(l => l).map(l => JSON.parse(l.trim()));
});

stream.on('end', () => {
    stream.close();
    
    const total = lines.length;
    const win = lines.filter(l => l.hiddenValue === l.answer).length;

    console.log(`Всего игр: ${total}`);
    console.log(`Выигрышей: ${win}`);
    console.log(`Проигрышей: ${total - win}`);
    console.log(`Выиграно ${Math.floor(win / total * 100)}% партий`);
});    