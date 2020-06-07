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

app.get('/javascript', (req, res) => {
  res.sendFile(__dirname + '/public/javascript.html')
})

app.get('/ruby', (req, res) => {
  res.sendFile(__dirname + '/public/ruby.html')
})

app.get('/python', (req, res) => {
  res.sendFile(__dirname + '/public/python.html')
})

// tech namespace
const tech = io.of('/tech')

tech.on('connection', (socket) => {
  socket.on('join', (data) => {
    socket.join(data.room)
    tech.in(data.room).emit('message', `New User joined ${data.room} room!`)
  })

  // console.log('Inside tech.on("connection"), user connected')

  socket.on('message', (data) => {
    console.log(`Inside tech.on("connection") in socket.on("message"), message: ${data.msg}`)
    tech.in(data.room).emit('message', data.msg)
  })

  socket.on('disconnect', () => {
    console.log('Inside tech.on("connection") in socket.on("disconnect"), User Disconnected')

    // tech.emit is to display to client, So the below message is on browser(client)
    tech.emit('message', 'User disconnected')
  })

})
