import {get} from 'node:http';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
const args = yargs(hideBin(process.argv)).parse();
const apiKey = process.env.WETHERSTACK_KEY;
const url = `http://api.weatherstack.com/current?access_key=${apiKey}&query=${args.city}`;
const city = args?.city;

if (!city) {
    console.error('Не передан город в параметре city');
} else {
    get(url, (res) => {
        const {statusCode} = res;

        if (statusCode !== 200) {
            console.log(`statusCode: ${statusCode}`);
            return;
        }

        res.setEncoding('utf8');
        let rowData = '';
        res.on('data', (chunk) => rowData += chunk);
        res.on('end', () => {
            let parseData = JSON.parse(rowData);
            console.log(`Текущая температура в городе ${args.city} составляет ${parseData.current.temperature} градусов`);
        })
    }).on('error', (err) => {
        console.error(err);
    })
}

