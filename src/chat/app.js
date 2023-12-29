import { messageRegister } from './modelChat.js';
export function listenerChat(io, socket) {
  /**
   * Los mensajes llegar de la forma
   * {usuario, mensaje, id}
   * id: es el md5 del sudmoninio 
   */
  socket.on('chat message', msg => {
    console.log('[NUEVO MENSAJE]: ', msg)
    const {usuario, mensaje, id} = JSON.parse(msg);
    messageRegister(id, usuario, mensaje);
    io.emit('chat message', msg);
  });
}

// https://notificaciones.webinventario.com/?variable=1dce3fb2b449ebad9b7fb88fba34361a&pin=sabor&sms=BUENOS%20D%C3%8DAS&usuario=ADMIN