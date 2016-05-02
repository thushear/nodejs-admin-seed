/**
 * Created by kongming on 2016/4/28.
 */

var paginator = function(pageIndex,pageSize,totalCount,callback){
   this.pageIndex = pageIndex;
    this.pageSize = pageSize;
    this.totalCount = totalCount;
    if(this.pageIndex < 1 ){
        this.pageIndex = 1;
    }
    if(pageSize < 1){
        this.pageSize = 10;
    }

    if(this.totalCount <0){
        this.totalCount = 0;
    }
    this.maxPageIndex = this.totalCount % this.pageSize == 0 ? this.totalCount % this.pageSize : this.totalCount % this.pageSize + 1;
    if(this.pageIndex > this.maxPageIndex && this.maxPageIndex != 0){
        this.pageIndex =  this.maxPageIndex;
    }


    this.start = (this.pageIndex - 1 )*this.pageSize;

    this.end = this.pageIndex*this.pageSize - 1;
    callback(this.start,this.end,this.pageIndex,this.maxPageIndex);
}

exports.paginator=paginator;
