import sql from 'mssql';

const config = {
  user: 'sa2',
  password: '123',
  server: '192.168.110.226',
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
}
let pool = null;
async function query(sql) {
  let res = []
  try {
    await pool.connect();
    const result = await pool.query(sql);
    res = result.recordset;
  } catch (error) {
    console.error('Error:', error);
  } finally {
    pool.close();
  }
  return res;
}
export function dataConnection(domain) {
  pool = new sql.ConnectionPool({database:domain, ...config});
}

export async function getNotifications(){
  try {
    let sql = `SELECT count(*) as cantidad FROM tblNotificacion WHERE estado LIKE 'PENDIENTE'`;
    const notifications = await query(sql);
    console.log('[RES GET NOTIFICATIONS]',notifications);
    return notifications;
  } catch (error) {
    console.log('[ERROR GET NOTIFICATIONS]',error);
    return 0;
  }
}

