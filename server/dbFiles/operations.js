const sql = require('mssql');
const config = require('../config');
const sqlConfig = config.db;


const addUser = async (User) => {
    try {
        await sql.connect(sqlConfig);
        const result = await sql.query(
            `INSERT INTO "User" VALUES ( ${User.isAdmin}, '${User.firstName}', '${User.lastName}',
             '${User.email}', '${User.hash}', '${User.image}')
             SELECT TOP 1 * FROM "User" ORDER BY id DESC`
        );
        console.log(result.recordset);
        return result.recordset
    } catch (err) {
        console.log(err);
        return false;
    }
}

const getUsers = async () => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` SELECT * FROM "User" `
        );
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

const findUser = async (userId) => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` SELECT * FROM "User" WHERE id = ${userId} `
        );
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}


const addTask = async (Task) => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            `INSERT INTO Task VALUES ('${Task.text}', '${Task.status}', '${Task.priority}', '${Task.userId}')
             SELECT TOP 1 * FROM Task ORDER BY id DESC`
        );
        console.log(result.recordset);
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

const getTasks = async () => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` SELECT * FROM Task `
        );
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

const deleteTask = async (id) => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` DELETE FROM Task WHERE id = ${id} `
        );
        console.log(result);
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

const findTask = async (id) => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` SELECT * FROM Task WHERE id = ${id} `
        );
        //console.log(result.recordset);
        return result.recordset;
    } catch(err) {
        console.log(err);
    }
}

const editTask = async (id, text, priority, status) => {
    try{
        await sql.connect(sqlConfig);
        const result = await sql.query(
            ` UPDATE Task SET text = '${text}', priority = '${priority}', status = '${status}' WHERE id = ${id}
              SELECT * FROM Task WHERE id = ${id}`
        );
        console.log(result.recordset);
        return result.recordset[0];
    } catch(err) {
        console.log(err);
    }
}


module.exports = {
    addUser,
    getUsers,
    findUser,
    addTask,
    deleteTask,
    getTasks,
    findTask,
    editTask
}