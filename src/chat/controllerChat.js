import { getMessages } from "./modelChat.js";
export async function chatsAnteriores(data){
  // Obtenemos los datos de
  const response = {
    status: 'error',
    data: [],
    message: 'Error inesperado intente más tarde',
  }
  if(data.variable){
    response.data = await getMessages(data.variable);
    response.status = 'success';
  }else{
    response.message = 'Parámetros faltantes para continuar al chat'
  }
  return response;
}