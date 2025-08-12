const pool = require('../config/database')
async function getAllUsers() {
    try{
        const result = await pool.query('SELECT * FROM users;')
        console.log(result.rows);
    } catch (err) {
        console.error('erro:', err);
    }
};

async function insertProfilePicture(imageName, imagePath, imageSize) {
    try {
        const sql = "insert into profile_pictures (image_name, image_path, image_size) VALUES ($1, $2, $3) RETURNING *;";
        const result = await pool.query(sql, [imageName, imagePath, imageSize]);
        console.log('profile picture inserida: ', result.rows[0]);
    } catch (err) {
        console.error('erro ao inserir profile picture: ', err)
    }
}

async function inserUser(idProfilePicPath, emailUser, username, hoursPlayed, passwordHash) {
    try {
        const sql = "insert into users (id_profile_pic_path, email_user, username, hours_played, password_hash) VALUES($1, $2, $3, $4, $5) RETURNING *;"
        const result = await pool.query(sql, [idProfilePicPath, emailUser, username, hoursPlayed, passwordHash])
        console.log("usario inserido: ", result.rows[0])
    } catch (err) {
        console.error('erro ao inserir usuario: ', err)
    }
}


// insertProfilePicture('teste', 'C:/user/teste', 0)
// inserUser(1, 'dicetale@gmail.com', 'diceteste', 70, 'aaaaaaaaaaaaaaaaaaaaaaaa')
getAllUsers();
