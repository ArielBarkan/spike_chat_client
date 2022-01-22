

// replace the value of <chatServer> with the path to your nodejs chat server
var chatServer = "http://localhost:3000";

var socket;
var userName;
var chatArea = document.getElementById('chat');


var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.src = chatServer + '/socket.io/socket.io.js';
head.appendChild(script);



function join() {
  userName = document.getElementById("userName").value || 'Ariel';
  if (!userName) {
    alert("Please provide user name");
    return;
  }
  socket = io(chatServer).on('messageFromServer', (msg) => {
    chatArea.insertAdjacentHTML('beforeend', msg + "<br>");
  });
  document.getElementById("chat-block").style.visibility = 'visible';
  document.getElementById('leave-block').style.visibility = 'visible';
  document.getElementById("join-block").style.visibility = 'hidden';
  console.log(userName);

}


function init() {
  document.getElementById("userName").value = "";
  chatArea.innerHTML = "";
  document.getElementById("chat-message").value = "";
  document.getElementById("join-block").style.visibility = 'visible';
  document.getElementById("chat-block").style.visibility = 'hidden';
  document.getElementById("leave-block").style.visibility = 'hidden';
}

function send() {
  var msg = document.getElementById('chat-message').value;
  if (msg) {
    socket.emit('send', userName, msg);
    document.getElementById('chat-message').value = "";
  }

}

function leave() {
  socket.disconnect(true);
  init()
}
init();