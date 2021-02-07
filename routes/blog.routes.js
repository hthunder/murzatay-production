const { Router } = require('express');
const router = Router();
const Article = require('../models/article.model');
const User = require('../models/user.model');
const nodemailer = require('nodemailer');

router.get('/', async (req, res) => {
    const articles = await Article.find().sort('-createdAt').limit(2).lean();
    res.render('index', {
        layout: false,
        isLoggedIn: req.isLoggedIn,
        articles
    });
});

router.post('/mails', async (req, res) => {
    const email = req.body.email;
    const question = req.body.question;
    const referer = req.headers.referer;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nosov.yura.web@gmail.com',
            pass: process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from: 'Nosov.yura.web@gmail.com',
        to: 'Nosov_yura@inbox.ru',
        subject: 'форма обратной связи',
        text: `Текст обращения: ${question}\nemail для обратной связи: ${email}`
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    })

    return res.redirect(referer);
})

router.get('/about', (req, res) => {
    res.render('about', {
        layout: false,
        isLoggedIn: req.isLoggedIn
    });
});

router.get('/my-page', async (req, res) => {
    if (!req.isLoggedIn) {
        return res.redirect('/');
    } else {
        const errors = req.cookies['errors'];
        res.clearCookie('errors');
        const user = await User.findOne({ _id: req.userId })
            .select('-password')
            .lean();
        const articles = await Article.find({
            _id: { $in: user.favourites }
        }).lean();

        res.render('my-page', {
            layout: false,
            user,
            errors,
            articles,
            isLoggedIn: req.isLoggedIn
        });
    }
});

module.exports = router;
