/* global angular */
angular.module("DataManagementApp", ["ngRoute", "ngAnimate", "ui.bootstrap"]).config(function($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "main.html"
        })
        .when("/graficas", {
            templateUrl: "grafica.html",
            controller: "GraficaCtrl"
        }).when("/estado", {
            templateUrl: "estado.html",
            controller: "EstadoCtrl"
        });
        
       
    console.log("App initialized and configured");
});