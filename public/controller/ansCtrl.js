/**
 * @ngdoc controller
 * @name home:homeCtrl
 *
 * @description
 *
 *
 * @requires $scope
 * */
var answers=[
    {
        title:"目前工资税后6k，听说程序员工资高，想转行做程序员，是否明智？",
        content:"高端黑啊，短短几句话把程序员的优点缺点都暗暗讽刺了。",
        up:4
    },
    {
        title:"你见过最人性化的设计是什么？",
        content:"lalalalalal。",
        up:5
    },
    {
        title:"怎样做才能不虚度大学的时光？",
        content:"少喝鸡汤，多学习。",
        up:144
    },
];
angular.module('home')
    .controller('ansCtrl', function($scope){
        $scope.answers=answers;

});
