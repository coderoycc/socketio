import express from 'express';
import {Server as WebSocketServer} from 'socket.io';
import http from 'http';
import cors from 'cors';
import { listenerNotificaciones } from './notificaciones/index.js';
import { listenerMensajeria } from './mensajeria/app.js';

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
app.set('publicPath', process.cwd()+'\\public');


app.get('/', function(req,res){
  res.status(200).sendFile(process.cwd()+'/src/mensajeria/index.html');

  // res.status(200).send('Servicio arriba');
});
app.get('/navidad', function(req,res){
  res.status(200).sendFile(app.get('publicPath')+'/page.html');
  console.log(app.get("publicPath"))
});


io.on('connection', (socket) => {
  console.log('Cliente contectado ', socket.id);

  listenerNotificaciones(socket);
  listenerMensajeria(io, socket);

  socket.on('disconnect', () => {
    console.log('Cliente desconectado ID: ', socket.id);
  });
});
const port = 3000
httpServer.listen(port);
console.log('Servidor iniciado en el puerto ', port);