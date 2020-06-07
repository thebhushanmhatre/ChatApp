const app = require('express')()

const server = require('http').Server(app)

const io = require('socket.io')(server)

const port = 3000

server.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

// tech namespace
const tech = io.of('/tech')

tech.on('connection', (socket) => {
  console.log('Inside tech.on("connection"), user connected')

  socket.on('message', (msg) => {
    console.log(`Inside tech.on("connection") in socket.on("message"), message: ${msg}`)
    tech.emit('message', msg)
  })

  socket.on('disconnect', () => {
    console.log('Inside tech.on("connection") in socket.on("disconnect"), User Disconnected')

    // tech.emit is to display to client, So the below message is on browser(client)
    tech.emit('message', 'User disconnected')
  })

})
