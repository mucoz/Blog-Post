const express = require('express')

const app = new express()
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const expressSession = require('express-session')
const flash = require('connect-flash')
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:true})

//Global variable
global.loggedIn = null

//Controllers
const newPostController = require('./controllers/newPost')
const homeController = require('./controllers/home')
const getPostController = require('./controllers/getPost')
const storePostController = require('./controllers/storePost')
const searchPostController = require('./controllers/searchPost')
const aboutController = require('./controllers/about')
const contactController = require('./controllers/contact')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')
const notfoundController = require('./controllers/notfound')

app.set('view engine', 'ejs')
//Middlewares
app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())
app.use(expressSession({
        secret: 'keyboard cat'
}))

app.use(flash())



//Custom Middlewares
const validateMiddleWare = require('./middlewares/validationMiddleware')
const authMiddleware = require('./middlewares/authMiddleware')
const redirectIfAuthenticatedMiddleware = require('./middlewares/redirectIfAuthenticatedMiddleware')
const storeUserIDMiddleware = require('./middlewares/storeUserIDMiddleware')

app.use('/posts/store', validateMiddleWare)
app.use("*", storeUserIDMiddleware)
//Routing
app.get('/', homeController)

app.get('/about', aboutController)

app.get('/contact', contactController)

app.get('/posts/new', authMiddleware, newPostController)

app.get('/post/:id', getPostController)

app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)

app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginController)

app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)

app.post('/users/login', redirectIfAuthenticatedMiddleware, loginUserController)

app.get('/auth/logout', logoutController)

app.post('/search', searchPostController)

app.post('/posts/store', authMiddleware, storePostController)

app.use(notfoundController)

app.listen(4000, ()=>{
        console.log('App listening on port 4000')
})
