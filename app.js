const express = require('express');
const fs = require('fs/promises');
const path = require('path');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(5000, () => {
    console.log('Server listen 5000');
})

app.get('/users', async (req, res) => {
    const buffer = await fs.readFile(path.join(__dirname, 'dataBase', 'users.json'));
    const users = JSON.parse(buffer.toString());
    res.json(users);
});

app.get('/users/:userId', async (req, res) => {
    const {userId} = req.params;
    const buffer = await fs.readFile(path.join(__dirname, 'dataBase', 'users.json'));
    const users = JSON.parse(buffer.toString());
    const user = users.find((u) => u.id === +userId);

    if (!user) {
        return res.status(404).json(`User with id ${userId} not found`)
    }
    res.json(user);
});

app.post('/users', async (req, res) => {
    const userInfo = req.body;

    const buffer = await fs.readFile(path.join(__dirname, 'dataBase', 'users.json'));
    const users = JSON.parse(buffer.toString());

    const newUser = {...userInfo, id: users[users.length - 1].id + 1};
    users.push(newUser)

    await fs.writeFile(path.join(__dirname, 'dataBase', 'users.json'), JSON.stringify(users))

    res.status(201).json(newUser)
})

app.put('/users/:userId', async (req, res) => {
    const newUserInfo = req.body;
    const {userId} = req.params;

    const buffer = await fs.readFile(path.join(__dirname, 'dataBase', 'users.json'));
    const users = JSON.parse(buffer.toString());

    const index = users.findIndex((u) => u.id === +userId);
    console.log(index);
    if (index === -1) {
        return res.status(404).json(`User with is ${userId} not found`);
    }

    users[index] = {...users[index], ...newUserInfo};
    await fs.writeFile(path.join(__dirname, 'dataBase', 'users.json'), JSON.stringify(users));

    res.status(201).json(users[index]);
})

app.delete('/users/:userId', async (req, res) => {

    const {userId} = req.params;

    const buffer = await fs.readFile(path.join(__dirname, 'dataBase', 'users.json'));
    const users = JSON.parse(buffer.toString());

    const index = users.findIndex((u) => u.id === +userId);
    console.log(index);
    if (index === -1) {
        return res.status(404).json(`User with is ${userId} not found`);
    }

    users.splice(index, 1)
    await fs.writeFile(path.join(__dirname, 'dataBase', 'users.json'), JSON.stringify(users));

    res.status(201).json('deleted');
})