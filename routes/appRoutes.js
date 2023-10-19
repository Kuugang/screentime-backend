const express = require("express");
const router = express.Router()
const { getApps, getDates, getAppsOnDate, getAppData, getAllData } = require('../controllers/appController')

router.route('/').get(getApps)
router.route('/dates').get(getDates)
router.route('/dates/:date').get(getAppsOnDate)
router.route('/data').get(getAllData)
router.route('/:app').get(getAppData)

module.exports = router