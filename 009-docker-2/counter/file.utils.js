const fs = require("fs");
const fsPromises = require("node:fs/promises");
const path = require("path");

const dir = path.join(__dirname, "counter");
const fileDb = path.join(dir, "db_counter.txt");

const initCounter = () => {
    try {
        const fileContent = fs.readFileSync(fileDb, {encoding: "utf8"});
        return JSON.parse(fileContent)
    } catch (e) {
        fs.appendFileSync(fileDb, "{}", {encoding: "utf8"})
        return {}
    }
}

const saveCounter = (counter) => {
    return fsPromises.writeFile(fileDb, JSON.stringify(counter) + "\n", {encoding: "utf8"})
}

module.exports = {initCounter, saveCounter}
