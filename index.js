
const express = require("express");

const app = express();
const path = require("path");

// this tells where to look for the views folder.Its set to the currnt file dir/views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

const comments = [
    {
        username: 'Todd',
        comment: 'lol that is so funny'

    },
    {
        username: 'Wodd',
        comment: 'no that is no so funny'

    }, {
        username: 'Modd',
        comment: 'that might be funny'

    }, {
        username: 'Lodd',
        comment: 'not funny'

    },
]
app.get('/comments',(req,res)=>{
    // passign all the comments to index.ejs file
    res.render('comments/index.ejs',{comments})
})
app.listen(3000, () => {
    console.log("Listning on 3000");
});

