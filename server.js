const http = require('http')
const express = require('express')
const socketIo = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/data')
})

app.get('/users', (req, res) => {
	const users = [
		{ id: 1, name: 'John' },
		{ id: 2, name: 'Jane' },
		{ id: 3, name: 'Doe' },
	]

	res.json(users)
})

io.on('connection', socket => {
	console.log('Пользователь подключен')

	socket.emit('message', 'Привет! Вы подключились к серверу Socket.io')
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
	console.log(`Сервер запущен на порте ${PORT}`)
})
