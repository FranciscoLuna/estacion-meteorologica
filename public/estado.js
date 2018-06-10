/* global angular */
/* global Highcharts*/
angular.module("DataManagementApp")
    .controller("EstadoCtrl", ["$scope", "$http", "$location", "$routeParams", function($scope, $http, $location, $routeParams) {

        $scope.datosEstado = {};
        var dataCache = {};

        $http
            .get("https://api.thingspeak.com/channels/510651/feeds.json?results=1")
            .then(function(response) {

                var datosRecientes = response.data.feeds[0];
                console.log(datosRecientes);
                $scope.datosEstado.temperatura = datosRecientes.field1;
                $scope.datosEstado.humedad = datosRecientes.field2;
                $scope.datosEstado.luminosidad = datosRecientes.field3;

                $scope.datosEstado.fecha = (new Date(datosRecientes.created_at)).toLocaleString();

                $scope.datosEstado.velocidad = calcSpeed(parseInt(datosRecientes.field4));

                Highcharts.chart('grafica_2_2', {

                        chart: {
                            type: 'gauge',
                            plotBackgroundColor: null,
                            plotBackgroundImage: null,
                            plotBorderWidth: 0,
                            plotShadow: false
                        },

                        title: {
                            text: 'Velocímetro'
                        },
                        subtitle: {
                            text: 'Inicio en fecha: ' + $scope.datosEstado.fecha + '. Fuente: ThinkSpeak'
                        },
                        pane: {
                            startAngle: -150,
                            endAngle: 150,
                            background: [{
                                backgroundColor: {
                                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                    stops: [
                                        [0, '#FFF'],
                                        [1, '#333']
                                    ]
                                },
                                borderWidth: 0,
                                outerRadius: '109%'
                            }, {
                                backgroundColor: {
                                    linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                                    stops: [
                                        [0, '#333'],
                                        [1, '#FFF']
                                    ]
                                },
                                borderWidth: 1,
                                outerRadius: '107%'
                            }, {
                                // default background
                            }, {
                                backgroundColor: '#DDD',
                                borderWidth: 0,
                                outerRadius: '105%',
                                innerRadius: '103%'
                            }]
                        },

                        // the value axis
                        yAxis: {
                            min: 0,
                            max: 255,

                            minorTickInterval: 'auto',
                            minorTickWidth: 1,
                            minorTickLength: 10,
                            minorTickPosition: 'inside',
                            minorTickColor: '#666',

                            tickPixelInterval: 30,
                            tickWidth: 2,
                            tickPosition: 'inside',
                            tickLength: 10,
                            tickColor: '#666',
                            labels: {
                                step: 2,
                                rotation: 'auto'
                            },
                            title: {
                                text: 'km/h'
                            },
                            plotBands: [{
                                from: 0,
                                to: 100,
                                color: '#55BF3B' // green
                            }, {
                                from: 100,
                                to: 190,
                                color: '#DDDF0D' // yellow
                            }, {
                                from: 190,
                                to: 255,
                                color: '#DF5353' // red
                            }]
                        },

                        series: [{
                            name: 'Speed',
                            data: [$scope.datosEstado.velocidad],
                            tooltip: {
                                valueSuffix: ' km/h'
                            }
                        }]

                    },
                    // Add some life
                    function(chart) {
                        if (!chart.renderer.forExport) {
                            setInterval(function() {

                                var point = chart.series[0].points[0];

                                $http.get("https://api.thingspeak.com/channels/510651/feeds.json?results=1")
                                    .then(function(response) {

                                        var datosRecientes = response.data.feeds[0];
                                        console.log(datosRecientes);
                                        $scope.datosEstado.temperatura = datosRecientes.field1;
                                        $scope.datosEstado.humedad = datosRecientes.field2;
                                        $scope.datosEstado.luminosidad = datosRecientes.field3;

                                        $scope.datosEstado.fecha = (new Date(datosRecientes.created_at)).toLocaleString();

                                        $scope.datosEstado.velocidad = calcSpeed(parseInt(datosRecientes.field4));


                                        chart.setTitle(null, { text: 'Último registro: ' + $scope.datosEstado.fecha + '. Fuente: ThinkSpeak' });
                                        point.update($scope.datosEstado.velocidad);
                                    });

                            }, 8000);
                        }
                    });
            });

        function calcSpeed(speedCode) {
            var res = 0;

            if (speedCode == 1) {
                res = 100;
            }
            else if (speedCode == 2) {
                res = 150;
            }
            else {
                res = 255;
            }

            return res;
        }

        /**/
    }]);
