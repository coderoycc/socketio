import { getMessages, messageRegister } from "./app.js";


messageRegister('1dce3fb2b449ebad9b7fb88fba34361a', 'Betto', 'Hola buenas tardes')

setTimeout(() => {
  messageRegister('1dce3fb2b449ebad9b7fb88fba34361a', 'Carlos', 'Como está')
}, 5000);

setTimeout(async () => {
  const res = await getMessages('1dce3fb2b449ebad9b7fb88fba34361a');
  console.log(res); 
}, 10000);