/* global angular */
/* global Highcharts*/
angular.module("DataManagementApp")
    .controller("GraficaCtrl", ["$scope", "$http", "$location", "$routeParams", function($scope, $http, $location, $routeParams) {

        $scope.data = {};

        $http.get("https://api.thingspeak.com/channels/510651/feeds.json").then(function(response) {

            $scope.data = response.data;

            var fecha = [];
            var hora = [];
            var listField1 = [];
            var listField2 = [];
            var listField3 = [];

            var fechaAux;

            for (var i = 0; i < $scope.data.feeds.length; i++) {

                listField1.push(parseFloat($scope.data.feeds[i]["field1"]));
                listField2.push(parseFloat($scope.data.feeds[i]["field2"]));
                listField3.push(parseFloat($scope.data.feeds[i]["field3"]));
                fechaAux = new Date($scope.data.feeds[i]["created_at"]);
                fecha.push(fechaAux);
                hora.push(fechaAux.getHours() + ":" + fechaAux.getMinutes());
            }

            Highcharts.chart('grafica_1', {
                chart: {
                    zoomType: 'xy'
                },

                title: {
                    text: 'Resultados diarios de la estación meteorológica'
                },

                subtitle: {
                    text: 'Inicio en fecha: ' + fecha[0].toLocaleString() + '. Fuente: ThinkSpeak'
                },

                xAxis: {
                    categories: hora,
                    title: {
                        text: 'Hora'
                    }
                },

                yAxis: [{ // Primary yAxis
                    labels: {
                        format: '{value}°C',
                        style: {
                            color: "#FF6666"
                        }
                    },
                    title: {
                        text: 'Temperatura',
                        style: {
                            color: "#FF6666"
                        }
                    },
                    opposite: true

                }, { // Secondary yAxis
                    gridLineWidth: 0,
                    title: {
                        text: 'Iluminancia',
                        style: {
                            color: "#FFBB00"
                        }
                    },
                    labels: {
                        format: '{value} lx',
                        style: {
                            color: "#FFBB00"
                        }
                    }

                }, { // Tertiary yAxis
                    gridLineWidth: 0,
                    title: {
                        text: 'Humedad',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    labels: {
                        format: '{value} %',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    opposite: true
                }],

                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle',
                    backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                },

                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        }
                    }
                },

                series: [{
                    name: 'Temperatura',

                    data: listField1,
                    color: "#FF6666"

                }, {
                    name: 'Iluminancia',
                    yAxis: 1,
                    data: listField3,
                    color: "#FFBB00"

                }, {
                    name: 'Humedad',
                    yAxis: 2,
                    data: listField2,
                    color: Highcharts.getOptions().colors[0]

                }],

                responsive: {
                    rules: [{
                        condition: {
                            maxWidth: 500
                        },
                        chartOptions: {
                            legend: {
                                layout: 'horizontal',
                                align: 'center',
                                verticalAlign: 'bottom'
                            }
                        }
                    }]
                }

            });

        });


        
        /**/
    }]);
