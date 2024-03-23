const express = require("express");
const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 4000;

const mongoose = require("mongoose");
const dbURI = 'mongodb+srv://kerigan_17:test1234@atlascluster.s87stgu.mongodb.net/tasksList?retryWrites=true&w=majority'
const User = require("./models/user");
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then((result) => {
        console.log('connect db in port ' + PORT)
        app.listen(PORT)
    })
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(morgan('dev'));

app.get('/add-user', (req, res) => {
    const user = new User({
        login: 'new login',
        password: 'new password'
    });

    user.save()
        .then((result) => console.log(result))
        .catch((err) => console.log(err))
})
app.get("/users", (req, res) => {
    User.find()
        .then((result) => {console.log(result)})
        .catch((err) => console.log(err))
});

