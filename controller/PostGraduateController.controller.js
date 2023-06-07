sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (MessageToast, Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.f.Dashboard.controller.PostGraduateController", {


		onInit: function () {

			this.getView().setModel(new JSONModel({}), "posgrados");

		},

		onAfterRendering: async function () {

			this.crearGrafico(await this.segmentarPosgrados());

		},

		segmentarPosgrados: async function () {
			const requestUrl = sap.ui.require.toUrl("sap/f/Dashboard/mockdata/profesors.json");
			const response = await fetch(requestUrl);
			const result = await response.json();
			const profesores = result.profesors;

			const posgrados = {
				"0-4": 0,
				"5-9": 0,
				"10-14": 0,
				"15-20": 0,
			};

			for (let i = 0; i < profesores.length; i++) {
				if (profesores[i].posgrados >= 0 && profesores[i].posgrados < 4) {
					posgrados["0-4"]++;
				} else if (profesores[i].posgrados >= 4 && profesores[i].posgrados < 9) {
					posgrados["5-9"]++;
				} else if (profesores[i].posgrados >= 9 && profesores[i].posgrados < 14) {
					posgrados["10-14"]++;
				} else if (profesores[i].posgrados >= 14 && profesores[i].posgrados < 20) {
					posgrados["15-20"]++;
				}

			};

			var resultado = [posgrados["0-4"], posgrados["5-9"], posgrados["10-14"], posgrados["15-20"]];
			return resultado;
		},


		crearGrafico: function (arraySegmentacion) {
			const labels = ["0-4", "5-9", "10-14", "15-20"];
			const total = arraySegmentacion.reduce((a, b) => a + b);
			const arrayPorcentajes = arraySegmentacion.map(x => Math.round(x * 100 / total));
			const height = document.getElementById("__card1").offsetHeight*0.95
			const width = document.getElementById("__card3").offsetWidth*0.95

			var options= {
				chart: {
				  type: 'radialBar',
				  height: height,
				  width: width,
				},
				plotOptions: {
					radialBar: {
						size: undefined,
						inverseOrder: false,
						hollow: {
							margin: 5,
							size: '30%',
							background: 'transparent',

						},
						dataLabels: {
							showOn: "always",
							name: {
								offsetY: -10,
								show: true,
								fontSize: "15px"
							},
							value: {
								offsetY: -50,
								offsetX: 60,
								fontSize: "15px",
								show: true
							}
						},
						track: {
							show: false,
						},
						startAngle: -180,
						endAngle: 180,
						
					},
				},
				stroke: {
					lineCap: 'round'
				},
				series: arrayPorcentajes,
				colors: ['#7f3518', '#9d4121', '#c15126', '#e86123'],
				labels: labels,
				legend: {
					onItemClick: {
						toggleDataSeries: false,
					},
					inverseOrder: true,
					show: true,
					floating: true,
					position: 'left',
					offsetX: document.getElementById("__card2").offsetWidth*0.45,
					offsetY: document.getElementById("__card2").offsetHeight*0.47,
					labels: {
					  useSeriesColors: true,
					},
					formatter: function(seriesName, opts) {
						return seriesName + ":  " + arraySegmentacion[opts.seriesIndex] + "";
					},
				},
				
			}

			var chart = new ApexCharts(document.getElementById('myPostGraduate'), options);
			chart.render();

		},

	});
});