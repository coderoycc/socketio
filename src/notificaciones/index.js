import { dataConnection, getNotifications } from '../db/database.js';

export function listenerNotificaciones(socket){
  socket.on('join', (message) => {// union a un grupo (subdominio)
    console.log('Cliente se unio a la sala ', message);
    socket.join(message);
    socket.emit('message', 'Se unio a la sala ' + message);
    socket.to(message).emit('message', 'Se unio a la sala ' + message);
  });

  socket.on('notify', async (message) => { // se creo un nuevo registro en la base
    socket.emit('message', message);
    console.log('[Nueva notificacion para]: '+message)
    const subdominio = message.split(',')[0];
    dataConnection(`webinventario_${subdominio}`)
    const notifications = await getNotifications(subdominio);
    socket.to(subdominio).emit('newNotification', notifications);
  });


  socket.on('getNotify', async (message) => { // mensaje individual 
    var subdominio = message.split(',')[0];
    dataConnection(`webinventario_${subdominio}`)
    const notifications = await getNotifications(subdominio);
    socket.emit('notifications', notifications);
  })
}