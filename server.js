require('./models/db');
const employeeController = require('./controller/employeeController');
const productsController = require('./controller/productsController');
const productController = require('./controller/productController');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressHandlebars = require('express-handlebars');

var app = express();
app.use(bodyParser.urlencoded({
    extended:false
}));
app.use(bodyParser.json());

app.set('views',path.join(__dirname,'/views/'))
app.engine('hbs',expressHandlebars({
    extname:'hbs',
    defaultLayout:'main',
    layoutsDir:__dirname + '/views/layouts/',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}))
app.set('view engine','hbs');
app.set('views','./views/')

app.get('/',(req,res) => {
    res.render('index');
})

app.use('/employee', employeeController);
app.use('/product', productsController)
app.use('/catalog', productController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Our app is running on port ${ PORT }');
});
