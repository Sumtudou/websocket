const msgBox = document.getElementById('msg-need-send')
const sendBtn = document.getElementById('send-btn')
const exit = document.getElementById('exit')
const receiveBox = document.getElementById('receive-box')

const webSocket = new WebSocket('ws://127.0.0.1:3000/websocket/test') //传入的URL
webSocket.onopen = (e) => {
  console.log(`WebSocket connect state： ${webSocket.readyState}`)
}

//Run when the client receives the server data
//data is a object
webSocket.onmessage = data => {  
  receiveBox.innerHTML += `<p style="font-size: 23px;">${data.data}</p>`
  receiveBox.scrollTo({
    top: receiveBox.scrollHeight,
    behavior: "smooth"
  })
}
//Run before connection is closed
webSocket.onclose = data => {
  console.log('WebSocket has been closed')
  console.log(data);
}


sendBtn.onclick = () => {
  //send message to server
  webSocket.send(msgBox.value)
  msgBox.value = ""
}
exit.onclick = () => {
  // The client closes the connection
  webSocket.close()
}
