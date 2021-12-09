const path = require('path');
const express = require('express');
const jobs = require('./jobs.json');
const { append } = require('express/lib/response');

const app = express();
const port = 80;

app.use(express.json());

app.get('/JobCategoryCount', (req, res) => {
    let categories = {};
    for (const prop in jobs) {
        for (const val in jobs[prop].categories) {
            let category = jobs[prop].categories[val];
            if (category in categories) categories[category]++;
            else categories[category] = 1;
        }
    }
    res.send(categories)
})

app.get('/JobsByCategory/:category', (req, res) => {
    let foundJobs = [];
    let category = req.params.category;
    for (const prop in jobs) {
        for (const val in jobs[prop].categories) {
            let jobCat = jobs[prop].categories[val];
            if (jobCat === category) {
                foundJobs.push(prop);
                break;
            }   
        }
    }
    res.send(foundJobs)
})

app.get('/JobsByCity', (req, res) => {
    let foundJobs = [];
    let city = req.query.city;
    for (const prop in jobs) {
        let cityString = jobs[prop].title;
        if (cityString.search(city) !== -1) 
            foundJobs.push(prop);
    }
    res.send(foundJobs)
})

app.listen(port, () => {console.log("Server listening at port " + port)});