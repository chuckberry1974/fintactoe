var express = require('express')
var router = express.Router()
var stormpath = require('express-stormpath')
/* GET home page. */
router.get('/', stormpath.loginRequired, function (req, res, next) {
  res.render('dashboard', { title: 'Express' })
})

module.exports = router
