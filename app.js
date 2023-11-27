const express = require('express');

const app = express();

const blogRoutes = require('./routes/blogRoutes');

const morgan = require('morgan');

const mongoose = require('mongoose');

const dbURI = 'mongodb+srv://<username>:<password>@nibin.bzqmvb3.mongodb.net/nodetuts?retryWrites=true&w=majority';
mongoose.connect(dbURI)
.then(() => {
    console.log('connected to db');
    app.listen(3000);
})
.catch((err) => console.log(err));
//register view engine


app.set('view engine', 'ejs')
app.set('views', 'views')


// middleware and static files

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'));

app.get('/', (req, res) => {
    // res.send('<p>homepage</p>');
    // res.sendFile('./views/index.html',{root: __dirname});
    res.redirect('blogs')
})

app.get('/about', (req, res) => {
    // res.send('<p>about page</p>');
    // res.sendFile('./views/about.html',{root: __dirname});
    res.render('about', {title: 'about us'});
})


app.get('/about-us', (req, res) => {
    // res.send('<p>about page</p>');
    res.redirect('/about')
})

app.use('/blogs', blogRoutes);

app.use((req, res) => {
    // res.status(404).sendFile('./views/404.html', {root: __dirname})

    res.status(404).render('404', {title: 'page not found'});
})