
const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT;
// Config Mail
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.MAIL_USER, // generated ethereal user
        pass: process.env.MAIL_PASS // generated ethereal password
    },
});

transporter.verify().then(() => {
    console.log("Listo para enviar los correos!");
})

// Settings
app.set("view engine", ".hbs");
app.set('views', path.join(__dirname, 'views'));

// Handlebars config
app.engine('.hbs', hbs({
    defaultLayout: "main",
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: ".hbs",
})
);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({
    extended: false
}));

app.get('/', (req, res) => {
    res.render("home",{
        ruta:'/assets/css/StyleInicio.css'
    });
});

app.get('/Servicios', (req, res) => {
    res.render('servicios',{
        ruta:'/assets/css/StyleS.css'
    });
});

app.get('/Productos', (req, res) => {
    res.render('productos',{
        ruta:'/assets/css/StyleProductos.css'
    });
});

app.get('/Nosotros', (req, res) => {
    res.render('nosotros',{
        ruta:'/assets/css/StylesN.css'
    });
});

app.get('/Contacto', (req, res) => {
    res.render('contacto',{
        ruta:'/assets/css/StyleC.css'
    });
});

app.post('/Contacto', async(req, res) => {
    // send mail with defined transport object
    await transporter.sendMail({
        from: process.env.MAIL_USER, // sender address
        to: process.env.MAIL_USER, // list of receivers
        subject: `${req.body.nombre} requiere de su atencion acerca de ${req.body.asunto}`, // Subject line
        html: `<h1>Nombre: ${req.body.nombre}</h1>
        <h1>E-mail: ${req.body.email}</h1>
        <h1>Telefono: ${req.body.number}</h1>
        <h1>Solicita la siguiente informacion:</h1>
        <h1>${req.body.mensaje}</h1>`, // html body
    });

    res.redirect('/');
})

app.use((req, res) => {
    res.render('404');
});

app.listen(PORT, () => {
    console.log(`Server at http://localhost:${PORT}`);
});