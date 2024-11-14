import * as fs from 'fs';
import * as url from 'url';
import * as path from 'path';

const __filename = url.fileURLToPath(import.meta.url);
const createLogLine = (data) => {
    const logObj = {
        date: new Date(),
        ...data
    }

    return `${JSON.stringify(logObj)}\n`;
}

export const dirname = path.join(path.dirname(__filename), "../");

export const checkLogDir = () => {
    const dirLogs = path.join(dirname, "logs");
    if (!fs.existsSync(dirLogs)) {
        fs.mkdirSync(dirLogs, (err) => {
            if (err) throw new Error(err);
        })
    }
}

export const writeLog = (logFile, data) => {
    const fileLog = path.join(dirname, "logs", logFile);
    fs.appendFile(fileLog, createLogLine(data), (err) => {
        if (err) throw new Error(err);
    })
}