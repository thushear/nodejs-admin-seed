'use strict';

/* Controllers */

angular.module('app.controllers', ["bw.paging"]).
    controller('IndexCtrl', function ($scope, $http) {

    }).
    controller('WelcomeCtrl', function ($scope, $http,$rootScope) {
        $rootScope.pageIndex = 1;
        $rootScope.totalPage = 1;
        $rootScope.pageSize = 10;
        $rootScope.totalCount = 1;

        $scope.doCtrlPagingAct = function (page) {
          console.log(page);
          var postdata = {"form":$scope.form,"page":page};
          $http.post('/api/doCtrlPagingAct',postdata).success(function (data) {
            $scope.keys = data.result;
            $rootScope.pageIndex = data.currentPage;
            $rootScope.totalCount = data.count;
          });
          $scope.deleteMember = function (member) {
            console.log(member);
            var postdata = {"form":$scope.form,"member":member};
            $http.post('/api/deleteMember',postdata).success(function (data) {

              $scope.doCtrlPagingAct(1);
            })
            ;
          };
        }

    }).
    controller('MyCtrl2', function ($scope) {
        // write Ctrl here

    });
