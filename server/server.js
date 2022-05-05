const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const port = 3000
const person = {
    name: 'jshuang2',
    age: 27,
    phone: '13610219462'
}
function sleep(wait) {
    return new Promise(resolve => {
        const timer = setTimeout(() => {
            resolve()
        }, wait)
    })
}
app.get('/user/info', async (req, res) => {
    await sleep(1500)
    res.json({
        code: 0,
        data: person,
        msg: ''
    })
})
app.post('/user/set-info', async (req, res) => {
    for(let i in req.body){
        if(person[i]){
            person[i] = req.body[i]
        }
    }
    await sleep(1500)
    res.json({
        code: 0,
        data: person,
        msg: ''
    })
})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`)
})