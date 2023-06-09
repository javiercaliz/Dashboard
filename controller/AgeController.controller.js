sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (MessageToast, Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.f.Dashboard.controller.AgeController", {

		onInit: function () {

			this.getView().setModel(new JSONModel({}), "edades");

		},

		onAfterRendering: async function () {

			this.crearGrafico(await this.segmentarEdades());
			this.clickOnValues();
			this.clickOnStrokes();

		},

		clickOnValues: function (){
			const that = this;
			const spanElements = document.querySelectorAll("span");
			spanElements.forEach(function (spanElement) {

				spanElement.addEventListener("click", function () {

					const computedStyle = getComputedStyle(this);
					const color = computedStyle.color;
					
					switch (color) {
						case "rgb(177, 205, 225)":
							that.toProfessorsView('>55');
							break;
						case "rgb(101, 152, 177)":
							that.toProfessorsView('46-55');
							break;
							case "rgb(16, 93, 151)":
								that.toProfessorsView('36-45');
								break;
								case "rgb(25, 59, 106)":
									that.toProfessorsView('25-35');
									break;
									case "rgb(18, 33, 73)":
							that.toProfessorsView('<25');
							break;
						default:
							break;
						}
					});
				});
			},
			
			clickOnStrokes: function (){
				const that = this;
				const pathElements = document.querySelectorAll("path");
			pathElements.forEach(function (pathElement) {
				
				pathElement.addEventListener("click", function () {
					
					const strokeColor  = pathElement.instance._stroke; 
					
					switch (strokeColor) {
						case "rgba(177,205,225,0.85)":
							that.toProfessorsView('>55');
							break;
						case "rgba(101,152,177,0.85)":
							that.toProfessorsView('46-55');
							break;
						case "rgba(16,93,151,0.85)":
							that.toProfessorsView('36-45');
							break;
						case "rgba(25,59,106,0.85)":
							that.toProfessorsView('25-35');
							break;
						case "rgba(18,33,73,0.85)":
							that.toProfessorsView('<25');
							break;
						default:
							break;
					}
				});
			});
		},

		segmentarEdades: async function () {
			const requestUrl = sap.ui.require.toUrl("sap/f/Dashboard/mockdata/profesors.json");
			const response = await fetch(requestUrl);
			const result = await response.json();
			const profesores = result.profesors;

			const edades = {
				"<25": 0,
				"25-35": 0,
				"36-45": 0,
				"46-55": 0,
				">55": 0,
			};

			for (let i = 0; i < profesores.length; i++) {

				if (profesores[i].edad < 25) {
					edades["<25"]++;
				};
				if (profesores[i].edad >= 25 && profesores[i].edad <= 35) {
					edades["25-35"]++;
				};
				if (profesores[i].edad >= 36 && profesores[i].edad <= 45) {
					edades["36-45"]++;
				};
				if (profesores[i].edad >= 46 && profesores[i].edad <= 55) {
					edades["46-55"]++;
				};
				if (profesores[i].edad > 55) {
					edades[">55"]++;
				};
			}

			var resultado = [edades["<25"], edades["25-35"], edades["36-45"], edades["46-55"], edades[">55"]];
			return resultado;
		},


		crearGrafico: function (arraySegmentacion) {
			const labels = ['Menos de 25', '25-35', '36-45', '46-55', 'Más de 55'];
			const total = arraySegmentacion.reduce((a, b) => a + b);
			const arrayPorcentajes = arraySegmentacion.map(x => Math.round(x * 100 / total));
			const height = document.getElementById("__card1").offsetHeight * .95
			const width = document.getElementById("__card1").offsetWidth * .95

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
						endAngle: 180

					},
				},
				stroke: {
					lineCap: 'round'
				},
				series: arrayPorcentajes,
				colors: ['#122149', '#193B6A', '#105D97', '#6598B1', '#B1CDE1'],
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

			var chart = new ApexCharts(document.getElementById('myAge'), options);
			chart.render();
		},

		toProfessorsView : function (oParams) {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);		  
			  // Navega a la misma vista con los nuevos parámetros de consulta
			  oRouter.navTo("Professors",oParams);
			  window.location.href+='?age='+oParams; //REVISAR AGREGAR PARAMS EN ROUTES EN EL MANIFEST
			
		}

	});
});