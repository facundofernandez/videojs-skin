"use strict";

// ICON: http://videojs.github.io/font/
// PLUGINS: http://videojs.com/plugins/
// Social Icon plugin: http://tastybytes.net/creating-a-video-js-plugin/

let configuraciones = {
    general: {
        border: false,
        color: "red",
        size: 0.5,
        fondoColor: "rgba(0,0,0,.3)"
    },
    botonPlay: {
        radius: 100,
        centrado: false,
        size: 50,
        height: 2,
        width: 2,
        bg: "red",
        hoverBg: "brown",
        shadow: false
    },
    controlBar: {
        style: "1",
        hide: false,
        btnVelocidad: false,
        size: 1,
        bg: "red",
        color: "#fff",
        sliderColor: "#fff"
    },
    socialMedia: {
        hide: true
    }
};

let player = videojs('my_video_1')
videojs('my_video_1').videoJsResolutionSwitcher({
    default: 'SD',
    dynamicLabel: true
  })

let socialMenu = createSocialElement({
    player: player,
    links: [
        {
            label: "facebook",
            class: "vjs-icon-facebook",
            handleClick: function () {
                console.log('click facebook');
                //window.open('http://www.facebook.com/sharer.php?u=http://www.guiarte.com/');
            }
        },
        {
            label: "facebook",
            class: "vjs-icon-facebook",
            handleClick: function () {
                console.log('click facebook');
                //window.open('http://www.facebook.com/sharer.php?u=http://www.guiarte.com/');
            }
        },
        {
            label: "facebook",
            class: "vjs-icon-facebook",
            handleClick: function () {
                console.log('click facebook');
                //window.open('http://www.facebook.com/sharer.php?u=http://www.guiarte.com/');
            }
        },
        {
            label: "twitter",
            class: "vjs-icon-twitter",
            handleClick: function () {
                console.log('click twitter');
                //window.open('http://www.facebook.com/sharer.php?u=http://www.guiarte.com/');
            }
        }
    ]
});

function createSocialElement(options) {
    //Creo componente botton
    let Button = videojs.getComponent('Button');
    let newButton = videojs.extend(Button, {
        constructor: function () {
            Button.apply(this, arguments);
            this.addClass("vjs-button-social");
            //this.controlText("c");
        },
        handleClick: function (e) {

            console.log("Open Links");
            let el = document.getElementsByClassName("vjs-menu-social")[0];

            el.classList.toggle("show");

        }
    });


    videojs.registerComponent("ButtonSocial", newButton);


    let Component = videojs.getComponent('Component');
    let linksContent = new Component(player);
    let div = linksContent.createEl('div', {
        className: "vjs-menu-social"
    });


    for (let elem of options.links) {

        let item = new Component(player).createEl('span', {
            className: elem.class
        });

        item.addEventListener("click", elem.handleClick);

        div.appendChild(item);
    }

    linksContent.el_ = div;

    options.player.addChild(linksContent);


    return options.player.addChild("ButtonSocial");

}


angular.module('MyApp', ['ngMaterial', 'mdColorPicker'])

    .controller('playersCtrl', ['$scope', 'theme', '$mdDialog', function ($scope, srvTheme, $mdDialog) {


        $scope.general = configuraciones.general;
        $scope.botonPlay = configuraciones.botonPlay;
        $scope.controlBar = configuraciones.controlBar;
        $scope.socialMedia = configuraciones.socialMedia;

        $scope.themes = srvTheme.get();

        $scope.changeTheme = function (theme) {
            let head = document.getElementsByTagName('head')[0];
            let style = head.querySelector("#estilos");
            console.log(theme);
            $scope.general = theme.json.general;
            $scope.botonPlay = theme.json.botonPlay;
            $scope.controlBar = theme.json.controlBar
            style.innerHTML = theme.css;

        };

        $scope.updateCss = function () {

            let head = document.getElementsByTagName('head')[0];
            let style = head.querySelector("#estilos");
            if (style) {
                console.log("existe");
            } else {

                let style = document.createElement('style');
                style.id = "estilos";
                style.type = 'text/css';
                head.appendChild(style);
            }
            style = head.querySelector("#estilos");

            let css = `
            .vjs-skin-default {
                overflow: hidden;
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

                    .vjs-skin-default.vjs-has-started.vjs-user-inactive.vjs-playing .vjs-control-bar{
                        opacity: 1;
                        transition:all .2s;
                        height: 0;
                      }

                ` : "" }


                
                
              .vjs-skin-default:hover .vjs-has-started .vjs-control-bar {
                display: flex; }
                
              .vjs-skin-default:hover .vjs-big-play-button {

                background-color: ${$scope.botonPlay.hoverBg};
                color: rgba(255, 255, 255, 0.5); }
            
            div:not(.vjs-seeking):not(.vjs-waiting).video-js.vjs-paused.vjs-skin-default .vjs-big-play-button {
              display: block; }
              
              div:not(.vjs-seeking):not(.vjs-waiting).video-js.vjs-paused.vjs-skin-default .vjs-button-social {
              display: block; }

            ${$scope.controlBar.hide ? `
              div:not(.vjs-seeking):not(.vjs-waiting).video-js.vjs-paused.vjs-skin-default .vjs-control-bar {
                display: none; }
              ` : ""
                }
            
            
            div:not(.vjs-seeking):not(.vjs-waiting).video-js.vjs-paused.vjs-skin-default .vjs-text-track-display {
              background: ${$scope.general.fondoColor};
              height: 100%; }
              
            ${$scope.socialMedia.hide ? `
              div:not(.vjs-seeking):not(.vjs-waiting).video-js.vjs-paused.vjs-skin-default .vjs-button-social {
                display: none; }
              div:not(.vjs-seeking):not(.vjs-waiting).video-js.vjs-paused.vjs-skin-default .vjs-menu-social {
                display: none; }  
                
              ` : ""
                }
            
            .vjs-skin-default .vjs-menu-social:not(.show) + .vjs-button-social:before{
                content: "\f10f";
                background: ${$scope.controlBar.bg};
              }
`;

            style.innerHTML = css;

            return css;

        };
        $scope.updateCss();

        $scope.descargarCss = function () {
            let head = document.getElementsByTagName('head')[0];
            let style = head.querySelector("#estilos");
            let blob = new Blob([style.innerHTML], {type: "text/plain;charset=utf-8"});
            saveAs(blob, "vjs-skin-default.css");
        };

        $scope.showPrompt = function (ev) {

            // Appending dialog to document.body to cover sidenav in docs app
            let confirm = $mdDialog.prompt()
                .title('Elija nombre del theme.')
                //.textContent('Elija nombre del theme.')
                .placeholder('Nombre de Theme')
                .targetEvent(ev)
                .ok('Guardar')
                .cancel('Cancelar');

            $mdDialog.show(confirm).then(function (result) {
                let theme = {
                    json: {
                        general: $scope.general,
                        botonPlay: $scope.botonPlay,
                        controlBar: $scope.controlBar
                    },
                    css: $scope.updateCss(),
                    nombre: result
                };
                console.log(theme);
                if (result !== undefined && result !== "") {
                    srvTheme.save(theme);
                    $scope.themes = srvTheme.get();
                }

            }, function () {


            });
        };


    }])
    .factory('theme', ['$window', function (win) {

        if (!localStorage.getItem("themes")) {
            localStorage.setItem("themes", "[]");
        }

        return {
            get: function () {
                console.log("get");
                return JSON.parse(localStorage.getItem("themes"));
            },
            save: function (theme) {
                let themes = this.get();
                themes.push(theme);
                console.log("save", theme.json);
                localStorage.setItem("themes", JSON.stringify(themes));
            }
        }
    }]);


angular.bootstrap(document, ['MyApp']);
