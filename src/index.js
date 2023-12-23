import express from 'express';
import {Server as WebSocketServer} from 'socket.io';
import http from 'http';
import cors from 'cors';
import { dataConnection, getNotifications } from './db/database.js';

const app = express();

const httpServer = http.createServer(app);
const io = new WebSocketServer(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
  }
});
app.use(cors());
app.use(express.static('public'));
app.get('/', function(req,res){
  res.status(200).send('Servicio arriba');
});
io.on('connection', (socket) => {
  console.log('Cliente contectado ', socket.id);

  socket.on('join', (message) => {// union a un grupo (subdominio)
    console.log('Cliente se unio a la sala ', message);
    socket.join(message);
    socket.emit('message', 'Se unio a la sala ' + message);
    socket.to(message).emit('message', 'Se unio a la sala ' + message);
  });

  socket.on('notify', async (message) => { // se creo un nuevo registro en la base
    socket.emit('message', message);
    const subdominio = message.split(',')[0];
    dataConnection(`webinventario_${subdominio}`)
    const notifications = await getNotifications(subdominio);
    socket.to(subdominio).emit('notifications', notifications);
  });


  socket.on('getNotify', async (message) => { // mensaje individual 
    var subdominio = message.split(',')[0];
    dataConnection(`webinventario_${subdominio}`)
    const notifications = await getNotifications(subdominio);
    socket.emit('notifications', notifications);
  })


  socket.on('disconnect', () => {
    console.log('Cliente desconectado ID: ', socket.id);
  })
});
const port = 3000
httpServer.listen(port);
console.log('Servidor iniciado en el puerto ', port);