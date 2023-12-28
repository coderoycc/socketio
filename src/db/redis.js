import { createClient } from "redis";

// client.on('error', err => console.log('[Redis Client Error]', err));
export class RedisClient{
  client = null;
  constructor(){
    if(this.client != null) return ;
    try {
      this.client = createClient({
        socket: {
          host: 'localhost',
          port: 6379,
          tls: false,
        }
      });
      this.client.on('error', err => {
        this.client.quit();
        this.client = null;
        throw err;
      });
    } catch (error) {
      console.log('[Redis Client Error]', error);
    }
  }
  async connect(){
    return await this.client.connect();
  }
  async get(key){
    return await this.client.get(key);
  }

  async set(key, value){
    return await this.client.set(key, value);
  }

  async del(key){
    return await this.client.del(key);
  }

  async exists(key){
    return await this.client.exists(key);
  }

  async expire(key, time){
    return await this.client.expire(key, time);
  }

  async ttl(key){
    return await this.client.ttl(key);
  }

  async rPush(key, value){
    return await this.client.rPush(key, value);
  }

  async lRange(key, start, end){
    return await this.client.lRange(key, start, end);
  }

  async lTrim(key, start, end){
    return await this.client.lTrim(key, start, end);
  }

  async lLen(key){
    return await this.client.lLen(key);
  }
}