let params = new URLSearchParams(location.search);
var variable = params.get('variable');
var user = params.get('usuario') ?? 'Invitado';
var socket = io();
$("textarea").keydown(function (e) {
  if (e.key == 'Enter' && !e.shiftKey) {
    sendT();
    e.preventDefault();
  }
});
$("#send").click(sendT);

function goToBottom() {
  $("#goToDown").addClass('downDowny');
  $('.chatArea').scrollTop($('.chatArea')[0].scrollHeight);
}
$("#goToDown").click(function () {
  goToBottom();
});

function sendT(){// enviar mensaje
  const mensaje = $("#message").val();
  if (mensaje != "") {
    $("#message").val("");
    const data = {usuario:user, mensaje, id: variable}
    socket.emit("chat message", JSON.stringify(data));
    goToBottom();
  }
}
function decir(texto) {
  console.log(texto);
  speechSynthesis.speak(new SpeechSynthesisUtterance(texto));
}

socket.on('chat message', (msg) => {
  const {usuario, mensaje, id} = JSON.parse(msg);
  console.log(mensaje, usuario, id);
  const now = new Date();
  if (id == variable) {
    let cad = ``;
    if(usuario == user){
      cad = `<div class="message mMess">
      <div class="messArea">
        <p id="sname">${user} | <b>${now.getHours()<10?'0':''}${now.getHours()}:${now.getMinutes()<10?'0':''}${now.getMinutes()}</b></p>
        <div class="textM">${mensaje}</div>
      </div>
      <div class="prof" style="background-color: #ff7b54;">
        <p>${user.substring(0,1).toUpperCase()}</p>
      </div>
    </div>`
    }else{
      cad = `<div class="message">
      <div class="prof" style="background-color: #939b62;">
        <p>${usuario.substring(0,1).toUpperCase()}</p>
      </div>
      <div class="messArea">
        <p id="sname">${usuario} | <b>${now.getHours()<10?'0':''}${now.getHours()}:${now.getMinutes()<10?'0':''}${now.getMinutes()}</b></p>
        <div class="textM">${mensaje}</div>
      </div>
    </div>`
    }
    $(".chatMessages").append(cad);
    decir(mensaje);
    goToBottom();
  }
})
document.onload = goToBottom();
