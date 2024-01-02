import express from 'express';
import {Server as WebSocketServer} from 'socket.io';
import http from 'http';
import cors from 'cors';
import { listenerNotificaciones } from './notificaciones/index.js';
import { listenerChat } from './chat/app.js';
import bodyParser from 'body-parser';
import routes from './routes/routes.js';
import { listenerKaraokola } from './karaokola/karaokola.js';

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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('public'));
app.set('publicPath', process.cwd()+'\\public');
app.set('views', process.cwd()+'\\views');
app.set('view engine', 'ejs');

// Servidor web (rutas)
app.use('/', routes);


// Servidor Socker
io.on('connection', (socket) => {
  console.log('Cliente contectado ', socket.id);
  // Listener de socket
  listenerNotificaciones(socket);
  listenerChat(io, socket);
  listenerKaraokola(io, socket);
  socket.on('disconnect', () => {
    console.log('Cliente desconectado ID: ', socket.id);
  });
});
const port = 3000
httpServer.listen(port);
console.log('Servidor iniciado en el puerto ', port);