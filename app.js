"use strict";

let configuraciones = {
    general:{
        border: false,
        color: "red",
        size: 0.5
    },
    botonPlay : {
        radius: 100,
        centrado: false,
        size: 50,
        height: 2,
        width: 2,
        bg: "red",
        hoverBg: "brown",
        shadow: false
    },
    controlBar : {
        style:"1",
        hide: false,
        btnVelocidad: false,
        size: 1,
        bg: "red",
        color: "#fff",
        sliderColor: "#fff"
    }
}

angular.module('MyApp', ['ngMaterial','mdColorPicker'])

    .controller('playersCtrl', function ($scope) {

        $scope.general       = configuraciones.general;
        $scope.botonPlay     = configuraciones.botonPlay;
        $scope.controlBar    = configuraciones.controlBar;
        
        $scope.themes = "";
        
        $scope.update = function () {

        };

        $scope.updateCss = function () {

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

            let css = `
            .vjs-skin-default {
              
              ${$scope.general.border 
                ? `border: ${$scope.general.size}em ${$scope.general.color} solid;` 
                : ""
              }

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
            
                
                ${!$scope.controlBar.btnVelocidad ? `
                    .vjs-skin-default .vjs-playback-rate {
                    display:none; }
                ` : "" }
                
                .vjs-skin-default .vjs-play-progress, 
                .vjs-skin-default .vjs-volume-level {
                    background-color: ${$scope.controlBar.sliderColor};
                }
                
                .vjs-skin-default .vjs-big-play-button {
                    background-color: ${$scope.botonPlay.bg};
                    font-size: ${$scope.botonPlay.size}px;
                    line-height: ${$scope.botonPlay.height}em;
                    height: ${$scope.botonPlay.height}em;
                    width: ${$scope.botonPlay.width}em;
                    border: 0em solid #fff;
                    border-radius: ${$scope.botonPlay.radius}%;
                    
                    ${ $scope.botonPlay.shadow ? 
                        `box-shadow: -20px -10px 10px rgba(0, 0, 0, 0.3) inset, 10px 10px 10px rgba(0, 0, 0, 0.3);` 
                        : "" 
                    }

                    ${$scope.botonPlay.centrado ? `
                        left: 50%;
                        top: 50%;
                        margin-left: -1em;
                        margin-top: -1em;
                        ` : ""
                    }
                }


                ${$scope.controlBar.style === "1" ? `
                    .vjs-skin-default .vjs-progress-control .vjs-progress-holder {
                        margin: 0;
                    }
                    .vjs-skin-default .vjs-play-progress:before{
                        content:"";
                    }


                    .vjs-skin-default .vjs-progress-control {
                        position: absolute;
                        transform: translate(0,-100%);
                        width:100%;
                        align-items: flex-end;
                    }


                    .vjs-skin-default .vjs-spacer,.video-js .vjs-time-control {
                        display: flex;
                        flex: 0 1 auto
                    }

                    .vjs-skin-default .vjs-time-control {
                        padding:0 .5em;
                    }

                    .vjs-skin-default .vjs-spacer {
                        flex: 1 1 auto
                    }

                    .vjs-skin-default .vjs-time-divider {
                        padding:0;
                        min-width:0;
                    }
                    
                    .vjs-skin-default .vjs-remaining-time{
                        display:none;
                    }

                ` : "" }


                
                
              .vjs-skin-default:hover .vjs-has-started .vjs-control-bar {
                display: flex; }
                
              .vjs-skin-default:hover .vjs-big-play-button {

                background-color: ${$scope.botonPlay.hoverBg};
                color: rgba(255, 255, 255, 0.5); }
            
            div:not(.vjs-seeking):not(.vjs-waiting).video-js.vjs-paused.vjs-skin-default .vjs-big-play-button {
              display: block; }

            ${$scope.controlBar.hide ? `
              div:not(.vjs-seeking):not(.vjs-waiting).video-js.vjs-paused.vjs-skin-default .vjs-control-bar {
                display: none; }
              ` : "" 
            }
            
            
            div:not(.vjs-seeking):not(.vjs-waiting).video-js.vjs-paused.vjs-skin-default .vjs-text-track-display {
              background: rgba(43, 51, 63, 0.5);
              height: 100%; }
            `;

            style.innerHTML = css;

        };
        $scope.updateCss();

    });

