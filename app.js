"use strict";
let player = {
    theme: "default",
    poster: 'https://www.anipedia.net/imagenes/imagenes-de-aves.jpg'
};

let themes = ["default", "youtube"];

angular.module('MyApp', ['ngMaterial', 'ngMessages'])

    .controller('playersCtrl', function ($scope) {
        $scope.player = player;
        $scope.themes = themes;
        $scope.update = function () {
            let player = videojs('my_video_1');
            player.removeClass('vjs-skin-yutube');
            console.log(player);
            player.addClass('vjs-skin-' + $scope.themeSelected);
        };
        $scope.themeSelected = '';
        $scope.border = {
            radius: 50
        };
        $scope.updateBorder = function () {

        }
    })

    .controller('SwitchDemoCtrl', function ($scope) {
        $scope.data = {
            cb1: true
        };


    })


    .directive('videoJs', function () {
        return {
            restrict: 'E',
            controller: 'playersCtrl',
            templateUrl: 'components/video/video.html',
            link: function(scope, element, attr) {
                //console.log(scope, element, attr);
                //let btnPlay = element[0].getElementsByClassName('vjs-big-play-button');
                //console.log(btnPlay[0].style);
                /*btnPlay[0].css({
                    "border-radius": scope.border.radius + "%"
                });
                */
            }
        };
    });

