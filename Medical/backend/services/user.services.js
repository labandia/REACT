const bcrypt = require('bcryptjs')
const connection = require('../config/Connection');

const addUser = async (username, password, options, lname, fname, contact_no) => {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    return await connection.query("INSERT INTO tbl_users (username, password, options, fname, lname, contact_no) VALUES (?,?,?,?,?,?)", 
                    [username, hashPassword, options, fname, lname, contact_no]);
};

const getUser = async()=>{
    const query = 'SELECT * FROM tbl_users';
    const [users] = await connection.query(query);
    return users;
}


const getUserById = async(params)=>{
    const query = 'SELECT * FROM tbl_users WHERE user_id =?';
    const [users] = await connection.query(query, params);
    return users;
}

const deleteuser = async(params)=>{
    const query = 'DELETE FROM tbl_users WHERE user_id =?';
    const [users] = await connection.query(query, params);
    return users;
}


const updateusers = async(data)=>{
    const [users] = await connection.query('UPDATE tbl_users SET username=?, options=?, fname=?, lname=?, contact_no=? WHERE user_id = ?', 
    [data.username, data.options, data.fname, data.lname, data.contact_no, data.user_id]);
    return users;
}


const checkUser = async (username, password) => {
    const [users, _] = await connection.query('SELECT user_id, username, password, options FROM tbl_users WHERE username = ?', [username]);
    if (users.length === 0) {
        throw new Error('Username does not exists');
    }

    const user = users[0];

    const isPasswordMatched = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatched) {
        throw new Error('Password is not correct');
    }

    return { userId: user.user_id, role: user.options, username };
};


module.exports = {
    addUser,
    checkUser,
    getUser,
    getUserById,
    deleteuser,
    updateusers
}