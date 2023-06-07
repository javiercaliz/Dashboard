sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (MessageToast, Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.f.Dashboard.controller.CommitmentController", {


		onInit: function () {

			this.getView().setModel(new JSONModel({}), "compromiso_desempeno");

		},

		onAfterRendering: async function () {

			this.crearGrafico(await this.segmentarCompromiso());

		},

		segmentarCompromiso: async function () {
			const requestUrl = sap.ui.require.toUrl("sap/f/Dashboard/mockdata/profesors.json");
			const response = await fetch(requestUrl);
			const result = await response.json();
			const profesores = result.profesors;

			const compromiso = {
				"Nivel 1": 0,
				"Nivel 2": 0,
				"Nivel 3": 0,
				"Nivel 4": 0,
				"Nivel 5": 0
			};

			for (let i = 0; i < profesores.length; i++) {

				switch (profesores[i].compromiso_desempeno) {
					case 1:
						compromiso["Nivel 1"]++;
						break;
					case 2:
						compromiso["Nivel 2"]++;
						break;
					case 3:
						compromiso["Nivel 3"]++;
						break;
					case 4:
						compromiso["Nivel 4"]++;
						break;
					case 5:
						compromiso["Nivel 5"]++;
						break;
					default:
						break;
				}
			};

			var resultado = [compromiso["Nivel 1"], compromiso["Nivel 2"], compromiso["Nivel 3"], compromiso["Nivel 4"], compromiso["Nivel 5"]];
			return resultado;
		},


		crearGrafico: function (arraySegmentacion) {
			const labels = ["Nivel 1", "Nivel 2", "Nivel 3", "Nivel 4", "Nivel 5"];
			const total = arraySegmentacion.reduce((a, b) => a + b);
			const arrayPorcentajes = arraySegmentacion.map(x => Math.round(x * 100 / total));
			const height = document.getElementById("__card2").offsetHeight * 0.95
			const width = document.getElementById("__card2").offsetWidth * 0.95

			var options = {
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
							size: '20%',
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
				colors: ['#4a2b70', '#623f97', '#7053a2', '#8a74b5', '#a08cc2'],
				labels: labels,
				legend: {
					onItemClick: {
						toggleDataSeries: false,
					},
					inverseOrder: true,
					show: true,
					floating: true,
					position: 'left',
					offsetX: document.getElementById("__card2").offsetWidth * 0.45,
					offsetY: document.getElementById("__card2").offsetHeight * 0.45,
					labels: {
						useSeriesColors: true,
					},
					formatter: function (seriesName, opts) {
						return seriesName + ":  " + arraySegmentacion[opts.seriesIndex] + "";
					},
				},

			}

			var chart = new ApexCharts(document.getElementById('myCommitment'), options);
			chart.render();

		},

	});
});