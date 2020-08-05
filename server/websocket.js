const express = require('express');
const expressWs = require('express-ws')
const router = express.Router()
expressWs(router);


router.ws('/test', (webSocket, req) => {
  webSocket.send('connect success')
  let interval
  interval = setInterval(() => {
    if (webSocket.readyState === webSocket.OPEN) {
      webSocket.send(Math.random().toFixed(2)*100)
    } else {
      clearInterval(interval)
    }
  }, 1000)

  // Monitor data sent by the client
  webSocket.on('message', receivedMsg => {
    console.log(receivedMsg);
    webSocket.send("==received== "+receivedMsg)
  })
})

module.exports = router
