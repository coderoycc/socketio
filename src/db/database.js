import sql from 'mssql';

const config = {
  user: '',
  password: '',
  server: '192.168.110.38',
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
function dataConnection(domain) {
  pool = new sql.ConnectionPool({database:domain, ...config});
}

export async function getNotifications(subdominio, idUsuario){
  try {
    dataConnection(`webinventario_${subdominio}`);
    let sql = `SELECT count(*) as cantidad FROM tblNotificacion WHERE estado LIKE 'PENDIENTE' AND idUsuario = ${idUsuario}`;
    const notifications = await query(sql);
    console.log('[RES GET NOTIFICATIONS]',notifications);
    return notifications;
  } catch (error) {
    console.log('[ERROR GET NOTIFICATIONS]',error);
    return 0;
  }
}

