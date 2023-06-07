sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (MessageToast, Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.f.Dashboard.controller.EnglishLevelController", {
		onInit: function () {

			this.getView().setModel(new JSONModel({}), "nivelesIngles");

 			this.contarNivelesIngles();
			
		},

		contarNivelesIngles: async function () {
			const requestUrl = sap.ui.require.toUrl("sap/f/Dashboard/mockdata/profesors.json");
			const response = await fetch(requestUrl);
			const result = await response.json();
			const profesores = result.profesors;

			const niveles = {
				"A1": 0,
				"A2": 0,
				"B1": 0,
				"B2": 0,
				"C1": 0,
				"C2": 0,
				"sin info": 0
			};

			for (let i = 0; i < profesores.length; i++) {
				const nivelIngles = profesores[i].nivel_ingles;
				niveles[nivelIngles]++;
			}

			this.getView().getModel("nivelesIngles").setProperty("/nivelA1", niveles['A1']);
			this.getView().getModel("nivelesIngles").setProperty("/nivelA2", niveles['A2']);
			this.getView().getModel("nivelesIngles").setProperty("/nivelB1", niveles['B1']);
			this.getView().getModel("nivelesIngles").setProperty("/nivelB2", niveles['B2']);
			this.getView().getModel("nivelesIngles").setProperty("/nivelC1", niveles['C1']);
			this.getView().getModel("nivelesIngles").setProperty("/nivelC2", niveles['C2']);
			this.getView().getModel("nivelesIngles").setProperty("/nivelSinInfo", niveles['sin info']);

			
		}
	});
});
