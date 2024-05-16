import mysql from "mysql2/promise";



var pool = mysql.createPool({
	host: 'localhost',
	user: 'moti',
	port: 3306,
	password: '2272',
	database: 'everest',
	acquireTimeout: 20000
})


export async function getLastDate(){
    const connection = await pool.getConnection(); 
    var query = "select DATE_FORMAT(max(dt), '%Y-%m-%d') as dt from dashboard";
    const [dt] = await connection.execute(query); 
    return dt[0].dt;
}


