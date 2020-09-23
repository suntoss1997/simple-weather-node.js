const path= require('path');
const express=require('express');
const hbs=require('hbs');
const { request } = require('http');

const geocode=require('./utils/geocode');
const forecast=require('./utils/forecast');

//variable declaration

const creator='Santosh Acharya';

const app=express();

//Define paths for express config
const publicDirectory=path.join(__dirname, '../public');
const viewsPath=path.join(__dirname,'../templates/views');
const partialsPath=path.join(__dirname, '../templates/partials');



//Setup handlebars engine, views location and partial location
app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//setup  static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req,res)=>{
    res.render('index', {
        title: 'Weather',
        name: creator
    });
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About me',
        name: creator
    });
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help Page',
        helpMsg: 'I am here to help you, what do you require ?',
        name: creator
    });
})

app.get('/weather', (req,res)=>{

    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address,(error, {latitude, longitude, location}={})=>{
        if(error){
            return  res.send({error})
        }
        forecast(latitude, longitude, (error, foreCastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:foreCastData,
                location,
                address:req.query.address
            })
        })
    })

})

app.get('/products',  (req,res)=>{
    if(!req.query.search){
        return res.send({
            error: 'You must  provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products:[]
    })
})



app.get('/help/*', (req,res)=>{
    res.render('404', {
        title: '404 ERROR',
        name: creator,
        helpMsg: 'Help article not found !'
    });
})

app.get('*', (req, res)=>{
res.render('404', {
    title: '404 ERROR !',
    name: creator,
    helpMsg: '404 error ! Page not found !'
})
})


app.listen(3000, ()=>{
    console.log('Server is up on port 3000.');
});

//app.com
//app.com/help
//app.com/about
