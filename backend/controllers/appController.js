const asyncHandler = require('express-async-handler')
const App = require('../models/appModel')
const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let apps = client.db("openedApps").collection("apps");

const currentDate = () => {
    let dt = new Date();
    year  = dt.getFullYear();
    month = dt.toLocaleString('en-us', { month: 'short' });
    day = dt.getDate().toString().padStart(2, "0");
    date_now = (month + "-" + day + "-" + year)
    return date_now
}

const getApps = asyncHandler( async (req,res) => {
    const date_now = currentDate() 
    console.log(date_now)

    client.connect(err =>{
        apps.find({"date" : date_now}).sort({"app" : 1}).toArray(function(err, docs) {
            res.status(200).json(docs)
        });

        apps.watch().
            on('change', data => {
                try {
                    new_timespan = data.updateDescription["updatedFields"].timespan
                    _id = data.documentKey['_id']
                    io.emit("Runtime Update", {new_timespan, _id})
                } catch (error) {
                    console.log(error)
                }
            })
    })
})

const getDates = asyncHandler(async (req, res) => {

    const date_now = currentDate() 
    var date_list = []

    client.connect(err => {
        apps.find({}).toArray(function(err, docs) {
            for (const d of docs){
                if (d.date != date_now){
                    date_list.push(d.date)
                }
            }

            date_list = [...new Set(date_list)]
            date_list.reverse()    
            res.status(200).json(date_list)
        });
    });
})

const getAppsOnDate = asyncHandler(async(req, res) => {
    const date = req.params.date;
    client.connect(err =>{
        apps.find({"date" : date}).sort({"app" : 1}).toArray(function(err, docs){
            if (docs != 0){
                res.status(200).json(docs)
            }else if (typeof docs !== 'undefined' && docs.length === 0) {
                res.sendStatus(404)
            }
        })
    })
})

const getAppData = asyncHandler(async(req, res) => {
    const app = req.params.app

    client.connect(err =>{
        apps.find({"app" : app}).toArray(function(err, docs){
            console.log(docs)
            docs.sort((a, b) => (a < b ? 1 : -1))
            if (docs != 0){
                res.status(200).json(docs)
            }else if (typeof docs !== 'undefined' && docs.length === 0) {
                res.sendStatus(404)
            }
        })

    })
})

const getAllData = asyncHandler(async(req, res) => {
    client.connect(err =>{
        apps.find({}).sort({"app" : 1}).toArray(function(err, docs) {
            res.status(200).json(docs)
        });
        apps.watch().
            on('change', data => {
                try {
                    new_timespan = data.updateDescription["updatedFields"].timespan
                    _id = data.documentKey['_id']
                    io.emit("Runtime Update", {new_timespan, _id})
                } catch (error) {
                    console.log(error)
                }
            })
    })
})

module.exports = {
    getApps,
    getDates,
    getAppsOnDate,
    getAppData,
    getAllData
}