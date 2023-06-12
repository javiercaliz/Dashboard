sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (MessageToast, Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.f.Dashboard.controller.TrafficLightController", {

		onInit: function () {

			this.getView().setModel(new JSONModel({}), "semaforo");
			this.segmentarSemaforo();

		},

		onAfterRendering: async function () {


		},



		segmentarSemaforo: async function () {
			const requestUrl = sap.ui.require.toUrl("sap/f/Dashboard/mockdata/professors.json");
			const response = await fetch(requestUrl);
			const result = await response.json();
			const profesores = result.professors;

			const luces = {
				"Amarillo": 0,
				"Rojo": 0,
				"Verde": 0,
				"Azul": 0,
				"Gris": 0,
			};

			for (let i = 0; i < profesores.length; i++) {
				switch (profesores[i].semaforo) {
					case 'amarillo':
						luces["Amarillo"]++;
						break;
					case 'rojo':
						luces["Rojo"]++;
						break;
					case 'verde':
						luces["Verde"]++;
						break;
					case 'azul':
						luces["Azul"]++;
						break;
					case 'gris':
						luces["Gris"]++;
						break;
					default:
						break;
				}

			};

			this.getView().getModel("semaforo").setProperty("/rojo", luces["Rojo"]);
			this.getView().getModel("semaforo").setProperty("/amarillo", luces["Amarillo"]);
			this.getView().getModel("semaforo").setProperty("/verde", luces["Verde"]);
			this.getView().getModel("semaforo").setProperty("/azul", luces["Azul"]);
			this.getView().getModel("semaforo").setProperty("/gris", luces["Gris"]); 
 
			var resultado = [luces["Amarillo"], luces["Rojo"], luces["Verde"], luces["Azul"], luces["Gris"]]; 
			return resultado; 
		},


	});
});