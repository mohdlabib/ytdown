const CheckUrl = require('./controllers/checkUrl')
const YoutubeScraper = require('./controllers/youtubeScraper')
const express = require('express')
const http = require('http')

const port = process.env.PORT || 3000
const app = express();

app.get('/', async (req, res) => {
    if (req.query.url) {
        const url = req.query.url
        let resultC = CheckUrl.validateUrl(url)

        if (resultC != false) {
            YoutubeScraper.scrape(resultC)
                .then(data => {
                    res.status(200).json({
                        status: true,
                        data,
                    })
                })
                .catch(err =>
                    res.status(500).json({
                        status: false,
                        message: err,
                    }));

        } else {
            res.status(404).json({
                status: false,
                message: 'Not Found.',
            });
        }

    } else {
        res.status(400).json({
            status: false,
            message: 'Bad Request.',
        });
    }
});

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server berjalan pada port ${port}`);
});