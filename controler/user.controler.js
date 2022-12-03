const {fileServices} = require('../services');
const fs = require("fs/promises");
const path = require("path");

module.exports = {
    getAllUsers: async (req, res) => {
    // const buffer = await fs.readFile(path.join(__dirname, 'dataBase', 'users.json'));
    // const users = JSON.parse(buffer.toString());
    const users = await fileServices.reader()
    res.json(users);
    },

    getUserById:async (req, res) => {
        const {userId} = req.params;
        const users = await fileServices.reader();
        const user = users.find((u) => u.id === +userId);

        // if (!user) {
        //     return res.status(404).json(`User with id ${userId} not found`)
        // }
        res.json(user);
    },
    post: async (req, res) => {
        const userInfo = req.body;

        const users = await fileServices.reader();

        const newUser = {...userInfo, id: users[users.length - 1].id + 1};
        users.push(newUser)

        await fileServices.writer(users);

        res.status(201).json(newUser);
    },
    put: async (req, res) => {
        const newUserInfo = req.body;
        const {userId} = req.params;

        const users = await fileServices.reader();

        const index = users.findIndex((u) => u.id === +userId);
        console.log(index);
        if (index === -1) {
            return res.status(404).json(`User with is ${userId} not found`);
        }

        users[index] = {...users[index], ...newUserInfo};
        await fileServices.writer(users);

        res.status(201).json(users[index]);
    },
    delete: async (req, res) => {

        const {userId} = req.params;

        const users = await fileServices.reader();

        const index = users.findIndex((u) => u.id === +userId);
        console.log(index);
        if (index === -1) {
            return res.status(404).json(`User with is ${userId} not found`);
        }

        users.splice(index, 1)
        await fileServices.writer(users)

        res.status(201).json('deleted');
    }

}
