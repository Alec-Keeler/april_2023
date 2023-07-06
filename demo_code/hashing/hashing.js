const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const genToken = () => {
	const payload = {
		name: 'Alec',
		userId: 1
	}
	const token = jwt.sign(payload, 'password')
	console.log(token)
}

// genToken()

let ourToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWxlYyIsInVzZXJJZCI6MSwiaWF0IjoxNjg4NjYxNzEzfQ.MjzeCrLk13kHCUQzGaj7hYBWAWR7FgR9pP_Xj2tjgVQ'

const checkToken = (token) => {
	jwt.verify(token, 'password', (err, payload) => {
		if (err) {
			console.log(err)
		}
		console.log(payload)
	})
}

// checkToken(ourToken)

const hashPass = async(password) => {
	const hash = await bcrypt.hash(password, 12)
	console.log(hash)
}

// hashPass('password123')

const hash = '$2a$10$lpdFgsU4vijtJxmDfuaQS.NggPYcfu6SzSOnrJ/jzB1/G6vivw7dS'
// alg+CF+       salt(22char)     + hash

const compareHash = async(password, hash) => {
	const isPass = await bcrypt.compare(password, hash)
	console.log(isPass)
}

compareHash('password123', hash)