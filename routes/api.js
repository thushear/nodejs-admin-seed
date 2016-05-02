/**
 * Created by kongming on 2016/4/26.
 */
var express = require('express');
var timeLineCtrl = require('../controllers/timelineCtrl');
var router = express.Router();


/*  api */

router.post('/doCtrlPagingAct',timeLineCtrl.doCtrlPagingAct);
router.post('/deleteMember',timeLineCtrl.deleteMember);
module.exports = router;
