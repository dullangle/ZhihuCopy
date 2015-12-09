/**
 * @ngdoc controller
 * @name home:queCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */

var questions=[
    {
        title:"没有 MacBook 如何学习 iOS 开发？",
        view:1587
    },
    {
        title:"你见过最人性化的设计是什么？",
        view:149
    }
];
angular.module('home')
    .controller('queCtrl', function($scope){
        $scope.questions=questions;
});
