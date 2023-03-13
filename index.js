
const exp = require("constants");
const express = require("express");
const crypto = require('node:crypto');
const methodOverride = require('method-override')

const uuid = crypto.randomUUID;
const app = express();
const path = require("path");

// this tells where to look for the views folder.Its set to the currnt file dir/views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.urlencoded({ extended: true }))
// this will replace the HTTP action in out form to one we need e.g ?_method=PATCH will treat the post request of form as patch request
app.use(methodOverride('_method'))
let comments = [
    {   
        id: uuid({disableEntropyCache : true}),
        username: 'Todd',
        comment: 'lol that is so funny'

    },
    {
        id:crypto.randomUUID({disableEntropyCache : true}),
        username: 'Wodd',
        comment: 'no that is no so funny'

    }, {
        id:uuid({disableEntropyCache : true}),
        username: 'Modd',
        comment: 'that might be funny'

    }, {
        id:uuid({disableEntropyCache : true}),
        username: 'Lodd',
        comment: 'not funny'

    },
]
app.get('/comments',(req,res)=>{
    // passign all the comments to index.ejs file
    res.render('comments/index.ejs',{comments})
})
app.post('/comments',(req,res)=>{
    const{username,comment} = req.body
    comments.push({id:uuid({disableEntropyCache : true}),username, comment})
    // res.send("IT WORKED")
    res.redirect('/comments')
})
app.get('/comments/new',(req,res)=>{
    // renders a form to add a new comment which will be send using a POST request
    res.render('comments/new.ejs')
})
app.get('/comments/:id',(req,res)=>{
    const {id} = req.params;
    // find the relevent comment form id
    const comment  = comments.find(c => c.id === id)
    res.render('comments/show.ejs',{comment})
})
app.get('/comments/:id/edit',(req,res)=>{
    const {id} = req.params;
    const comment  = comments.find(c => c.id === id)
    res.render('comments/edit.ejs',{comment})

})
app.patch('/comments/:id',(req,res)=>{
    const {id} = req.params;
    const foundComment  = comments.find(c => c.id === id)
    const newCommentText = req.body.comment
    foundComment.comment = newCommentText 
    res.redirect('/comments')
})
app.delete('/comments/:id',(req,res)=>{
    const {id} = req.params;
    comments = comments.filter(c => c.id !== id) 
    res.redirect('/comments')
})
app.listen(3000, () => {
    console.log("Listning on 3000");
});

