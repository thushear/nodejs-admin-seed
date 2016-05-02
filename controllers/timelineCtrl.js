/**
 * Created by kongming on 2016/4/26.
 */

var cache = require('../common/cache');
var paginator = require('../common/paginator');

exports.deleteMember  = function (req,res) {

  console.log("body = " + req.body);
  var member = req.body.member;
  var key = req.body.form.key;
  cache.zrem(key,member,function (err,data) {
     if(data && data == 1){
       res.json({
         success:true
       });
     }else {
       res.json({
         success:false
       });
     }
  })


}


exports.doCtrlPagingAct = function(req,res){
  //console.log(req);
  try {
    console.log("body = " + req.body);
    var key = req.body.form.key;
    var pageIndex = req.body.page || 1;
    var pageSize = 10;


    var count = 0;
    cache.zcard(key, function (err, data) {
      if (err) {
        console.log(err);
        count = 1;
        return;
      }
      count = data;
      var begin = 0;
      var stop = 0;
      var totalPage = 1;
      paginator.paginator(pageIndex, pageSize, count, function (start,end,paegIndex,maxPageIndex) {
        begin = start;
        stop = end;
        pageIndex = paegIndex;
        totalPage = maxPageIndex;
      });

      cache.zrevrange(key, begin, stop, function (err, data) {

        res.json({
          result: data,
          currentPage: pageIndex,
          totalPage:totalPage,
          count:count
        });
      });

    });

  } catch (e) {
    console.log(e);
  }

};

