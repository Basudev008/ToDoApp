const { Console } = require('console');
const express = require('express');
const path = require('path');
const port = 8080;

const db = require('./config/mongoose');
const Item = require('./models/item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));


app.get('/', function(req, res){
    const months = ['Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ];

    Item.find({}, function(err, items){
        if(err){
            console.log('Error in fetching tasks',err);
            return;
        }

        return res.render('home', {
            tasks_list : items,
            months
        });
    })
    
})

app.post('/add-task', function(req, res){
    //console.log(req.body.due-date);
    Item.create(req.body, function(err, newItem){
        if(err){
            console.log('error in adding a task', err);
            return;
        }

        console.log('******', newItem);
        return res.redirect('back');
    })
})

app.post('/delete-tasks', function(req, res){
    console.log(req.body);
    console.log(req.body.id);
    Item.deleteMany({_id:{$in:req.body.id}}, function(err, items){
        if(err){
            console.log('Error in deleting task', err);
            return res.redirect('back');
        }
        return res.redirect('back');
    })
})

app.listen(port, function(err){
    if(err){
        console.log('Error', err);
    }
    console.log('Express server is running on port', port);
})

