const express = require('express');
const fs = require('fs/promises');
const app = express();
const PORT = 3000;

let balance = 5000;
let fileStorage = './Files/json/bank.json';

app.use(express.json());

app.get('/balance', async (req, res) => {

    try {
        jsonResponse = {
            message:'No hay Balances Disponibles'
        }

        data = await readJSON();
        if(data !== '') {
            jsonResponse = data;
        }
        res.json(jsonResponse);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500);
        res.json(error);
    }
})

app.post('/withdraw', async (req, res) => {

    try {
        jsonResponse = {};
        user = req.body.user;
        withdraw = req.body.withdraw;
    
        data = await readJSON();
        for (const iterator of data) {
            withdrawUser = iterator[user];
            
            if(withdrawUser) {
                console.log('finder user: ', withdrawUser);
                console.log('current balance: ', withdrawUser.balance);
    
                if(withdrawUser.balance > 0) {
                    withdrawUser.balance -= withdraw;
                    console.log('new Balance: ', withdrawUser.balance);
                    jsonResponse.withdraw = withdraw;
                }else{
                    jsonResponse.message = 'El usuario no posee balance positivo para retirar';
                    console.log('balance at 0');
                }
                jsonResponse.balance = withdrawUser.balance;
                
            }
        }
        await writeToJSON(data);
        res.json(jsonResponse);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500);
        res.json(error);
    }
})

app.post('/deposit', async (req, res) => {

    try {
        jsonResponse = {};
        user = req.body.user;
        deposit = req.body.deposit;
    
        data = await readJSON();
        for (const iterator of data) {
            depositUser = iterator[user];
            
            if(depositUser) {
                console.log('finder user: ', depositUser);
                console.log('current balance: ', depositUser.balance);
    
                depositUser.balance += deposit;
                console.log('new Balance: ', depositUser.balance);
                jsonResponse.deposit = deposit;
                jsonResponse.balance = depositUser.balance;
            }
        }
        await writeToJSON(data);
        res.json(jsonResponse);
    } catch (error) {
        console.error('Error: ', error);
        res.status(500);
        res.json(error);
    }
})

async function readJSON() {
    try {
        data = await fs.readFile(fileStorage, 'utf-8');
        data = JSON.parse(data);
        console.log('File content: ', data);
        return data;
    } catch (error) {
        console.error('Error reading file: ', error);
    }
}

async function writeToJSON(data) {
    try {
        await fs.writeFile(fileStorage, JSON.stringify(data), 'utf-8');
        console.log(`File ${fileStorage} Modified successfully`);
    } catch (error) {
        console.error('Error writing file: ', error);
    }
}

app.listen(PORT, () => {
    console.log(`Server is running in port: http://localhost:${PORT}`);
})