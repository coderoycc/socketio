import { RedisClient } from "../db/redis.js";

export async function messageRegister(id, user, message) {
  try {
    const redis = await new RedisClient().connect();
    const now = new Date();
    const hour = `${now.getHours()<10?'0':''}${now.getHours()}:${now.getMinutes()<10?'0':''}${now.getMinutes()}`;
    let res = redis.exists(id);
    let objMessage = {
      user,
      message,
      hour
    }
    if (!res) {
      console.log('CREANDO NUEVO CHAT []')
      res = await redis.rPush(id, JSON.stringify(objMessage));
      if(res<=0) throw new Error('Error al agregar');
      const ahora = new Date();
      const finDia = new Date();
      finDia.setHours(23, 59, 59, 0);
      const segundos = Math.floor((finDia - ahora) / 1000);
      await redis.expire(id, segundos);
    } else {
      res = await redis.rPush(id, JSON.stringify(objMessage));
      if(res<=0) throw new Error('Error al agregar');
    }
  } catch (error) {
    console.log('[ERROR CREAR MENSAJE]: ')
  }
} 
/**
 * 
 * @param {int} id: ID del chat (md5 del subdominio) 
 * @returns un array con todos los mensajes cada uno en formato JSON
 */
export async function getMessages(id){
  try {
    const redis = await new RedisClient().connect();
    const messages = await redis.lRange(id, 0, -1);
    return messages;
  } catch (error) {
    console.log('[ERROR REDIS GET MESSAGE] ', error)
  }
  return '[]';
}