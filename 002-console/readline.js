import * as readline from 'node:readline/promises';
import {
    stdin as input,
    stdout as output,
} from 'node:process';

const stream = readline.createInterface({input,output});
const hiddenValue = Math.floor(Math.random() * 101);
console.log(hiddenValue);


const getAnswer = async (question = '') => {    
    let answerQ = await stream.question(question);
    return parseInt(answerQ);
}

let answer = await getAnswer('Загадано число в диапазоне от 0 до 100\n');
while (answer !== hiddenValue) {
    console.log(answer < hiddenValue ? 'Больше': 'Меньше');
    answer = await getAnswer();
}

stream.close();
console.log(`Отгадано число: ${answer}`);