export function listenerMensajeria(io, socket) {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
}

// https://notificaciones.webinventario.com/?variable=1dce3fb2b449ebad9b7fb88fba34361a&pin=sabor&sms=BUENOS%20D%C3%8DAS&usuario=ADMIN