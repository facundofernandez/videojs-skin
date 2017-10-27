"use strict";


let player = {
    theme: "default",
    poster: 'https://www.anipedia.net/imagenes/imagenes-de-aves.jpg'
};

let themes = ["default", "youtube"];

angular.module('tabsDemoDynamicHeight', ['ngMaterial']);
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
            radius: 100,
            centrado: false,
            size: 50,
            height: 2,
            bg: "red",
            hoverBg: "brown",
            shadow: false
        };

        $scope.controlBar = {
            size: 1,
            bg: "red",
            color: "#fff"
        };

        $scope.updateBorder = function () {

            let head = document.getElementsByTagName('head')[0];
            let style = head.querySelector("#estilos");
            if (style) {
                console.log("existe");
            } else {
                console.log("no existe");
                let style = document.createElement('style');
                style.id = "estilos";
                style.type = 'text/css';
                head.appendChild(style);


            }

            style = head.querySelector("#estilos");
            console.log($scope.border.centrado);

            if($scope.border.shadow){
                $scope.border.shadowCss = `
                 box-shadow: -20px -10px 10px rgba(0, 0, 0, 0.3) inset, 10px 10px 10px rgba(0, 0, 0, 0.3);
                 `;
            }else{

                $scope.border.shadowCss = "";
            }

            if($scope.border.centrado){
                $scope.border.centradoCss = `/* Align center */
                left: 50%;
                top: 50%;
                margin-left: -1em;
                margin-top: -1em; `;
            }else{

                $scope.border.centradoCss = "";
            }

            let declarations = `
            .vjs-skin-default {
            
              border: 0.5em solid #2B333F;
              font-size: 0.7em;
              color: #fff; }
              
              .vjs-skin-default * {
                outline: none; }
                
              .vjs-skin-default .vjs-control-bar {
                font-size: ${$scope.controlBar.size}em;
                display: flex;
                background-color: ${$scope.controlBar.bg};
                color: ${$scope.controlBar.color} }
                
              .vjs-skin-default .vjs-menu-button .vjs-menu-content {
                background-color: rgba(43, 51, 63, 0.7); }
                
              .vjs-skin-default .vjs-progress-control .vjs-load-progress {
                background-color: #cccccc; }
                
              .vjs-skin-default .vjs-progress-control .vjs-slider {
                background-color: #ababab; }
                
                .vjs-skin-default .vjs-progress-control .vjs-slider-bar {
                  background-color: white; }
                  
              .vjs-skin-default .vjs-volume-level {
                background: #fff; }
                
              .vjs-skin-default .vjs-big-play-button {
                background-color: ${$scope.border.bg};
                font-size: ${$scope.border.size}px;
                line-height: ${$scope.border.height}em;
                height: ${$scope.border.height}em;
                width: ${$scope.border.height}em;
                border: 0em solid #fff;
                border-radius: ${$scope.border.radius}%;
                
                ${$scope.border.shadowCss}
                ${$scope.border.centradoCss}
                
                }
                
              .vjs-skin-default:hover .vjs-has-started .vjs-control-bar {
                display: flex; }
                
              .vjs-skin-default:hover .vjs-big-play-button {

                background-color: ${$scope.border.hoverBg};
                color: rgba(255, 255, 255, 0.5); }
            
            div:not(.vjs-seeking):not(.vjs-waiting).video-js.vjs-paused.vjs-skin-default .vjs-big-play-button {
              display: block; }
            
            div:not(.vjs-seeking):not(.vjs-waiting).video-js.vjs-paused.vjs-skin-default .vjs-control-bar {
              display: none; }
            
            div:not(.vjs-seeking):not(.vjs-waiting).video-js.vjs-paused.vjs-skin-default .vjs-text-track-display {
              background: rgba(43, 51, 63, 0.5);
              height: 100%; }
                        
                        
            
            
            `;

            console.log(style);
            style.innerHTML = declarations;

        };
        $scope.updateBorder();

    })


    .directive('videoJs', function () {
        return {
            restrict: 'E',
            controller: 'playersCtrl',
            templateUrl: 'components/video/video.html',
            link: function (scope, element, attr) {
                //console.log(scope, element, attr);
                //let btnPlay = element[0].getElementsByClassName('vjs-big-play-button');
                //console.log(btnPlay[0].style);
                let btnPlay = document.querySelector('.vjs-big-play-button');
                console.log(btnPlay);
                /*btnPlay[0].css({
                    "border-radius": scope.border.radius + "%"
                });
                */
            }
        };
    });

