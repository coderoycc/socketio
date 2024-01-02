import { RedisClient } from "../db/redis.js";
/**
 * @returns JSON con la lista [{id,tipo,detalle},{},{}]
 */
export async function getListKaraokola(){
  try {
    const redis = await new RedisClient().connect();
    const list = await redis.get('karaokola');
    return `[${list}]`;
  } catch (error) {
    console.log('[ERROR KARAOKOLA] get list', error)
  }
  return '[]';
}

/**
 * @param {string} data JSON de la forma {id, tipo, detalle} 
 * @returns {int} respuesta de redis
 */
export async function appendItem(data){
  try {
    const redis = await new RedisClient().connect();
    let list = await redis.get('karaokola');
    if(list) // cuando existe la lista
      list = list.concat(`,${data}`);
    return await redis.set('karaokola', list);
  } catch (error) {
    console.log('[ERROR KARAOKOLA] append item', error)
  }
  return 0;
}

/**
 * 
 * @param {string} data JSON de la forma [{id, tipo, detalle},{}...]
 * @returns {int} respuesta de redis 
 */
export async function refreshList(data){
  try {
    const redis = await new RedisClient().connect();
    let clean = data.replace('[','').replace(']','');
    return await redis.set('karaokola', clean);
  } catch (error) {
    console.log('[ERROR KARAOKOLA] refresh list', error)
  }
  return 0;
}