import { getNotifications } from '../db/database.js';

export function listenerNotificaciones(socket){
  socket.on('join', (message) => {// union a un grupo (subdominio) --> dominio*id_usuario
    console.log('Cliente se unio a la sala ', message);
    socket.join(message);
    socket.emit('message', 'Se unio a la sala ' + message);
    socket.to(message).emit('message', 'Se unio a la sala ' + message);
  });

  socket.on('notify', async (message) => { // se creo un nuevo registro en la base
    socket.emit('message', message);
    const subdominio = message.split('*')[0];
    const idUsuario = message.split('*')[1];
    const notifications = await getNotifications(subdominio, idUsuario);
    socket.to(message).emit('notifications', notifications);
  });

  socket.on('getNotify', async (message) => { // message = subdominio,id_usuario
    console.log('GET   ', message)
    var subdominio = message.split('*')[0];
    var idUsuario = message.split('*')[1];
    const notifications = await getNotifications(subdominio, idUsuario);
    socket.emit('notifications', notifications);
  })
}