import express from 'express';
import { chatsAnteriores } from '../chat/controllerChat.js';
const router = express.Router();

const publicPath = process.cwd()+'\\public';
const views = process.cwd()+'\\views';
router.get('/', function(req,res){
  res.status(200).sendFile(views+'/mensajeria/index.html');
});

router.get('/navidad', function(req,res){
  res.status(200).sendFile(views+'/page.html');
});
router.get('/notificaciones', function(req,res){
  res.status(200).sendFile(views+'/pages/chat.html');
});

router.get('/pru', async (req, res) => {
  const data = await chatsAnteriores(req.query)
  if(data.status === 'success'){
    res.status(200).render('templates/chat', {
      data: data.data,
      usuario: req.query.usuario || 'Invitado'
    });
  }else{
    res.status(200).render('pages/error',{
      msgerror: data.message
    });
  }
})


export default router;