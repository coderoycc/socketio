import { appendItem, getListKaraokola, refreshList } from './model.karaokola.js';
export function listenerKaraokola(io, socket) {
  
  socket.on('getkaraokola', async (msg) => {
    console.log('[KARAOKOLA LISTA]');
    const canciones = await getListKaraokola();
    io.emit('refreshkaraokola', canciones);
  })
  
  /**
   * Los mensajes llegan de la forma
   * { id, tipo, detalle } (JSON)
   * id: identificador de cancion 
   * tipo: karaoke o musica 
  */
  socket.on('addkaraokola', async (msg) => {
    console.log('[Nuevo]: ', msg)
    await appendItem(msg);
    const canciones = await getListKaraokola();
    io.emit('refreshkaraokola', canciones);
  });

  /**
   * JSON [{id,tipo,detalle},{...},...]
   */
  socket.on('refreskaraokola', async (msg) => {
    console.log('[NUEVO ORDEN]')
    await refreshList(msg);
    io.emit('refreshkaraokola', msg);
  });

  /**
   * Envia un JSON con todos los elementos restantes
   * JSON [{id,tipo,detalle}, {...},... ]
   */
  socket.on('deletekaraokola', async () => {
    console.log('[Eliminar cancion]')
    await refreshList(msg);
    io.emit('refreshkaraokola', msg);
  });
}