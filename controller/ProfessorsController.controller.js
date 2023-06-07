sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (MessageToast, Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.f.Dashboard.controller.ProfessorsController", {

		onInit: function (oEvent) {

			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("Professors").attachMatched(this._onRouteMatched, this);
			
			var oTable = this.getView().byId("professorsTable");
			var oTemplate = new sap.m.ColumnListItem({
				cells: [
					new sap.m.Text({text: "{profesors>nombre}"}),
					new sap.m.Text({text: "{profesors>apellido}"}),
					new sap.m.Text({text: "{profesors>edad}"}),
					new sap.m.Text({text: "{profesors>compromiso_desempeno}"}),
					new sap.m.Text({text: "{profesors>posgrados}"}),
					new sap.m.Text({text: "{profesors>semaforo}"}),
					new sap.m.Text({text: "{profesors>nivel_ingles}"})
				]
			});
			oTable.bindItems({
				path: "profesors>/profesors",
				template: oTemplate
			});
		},

		_onRouteMatched: function(oEvent) {
			var oParameters = oEvent.getParameter("arguments");
			var sEdad = oParameters.edad; // Aquí obtienes el valor del parámetro "id"
			// Realiza las operaciones necesarias con el parámetro recibido
			console.log(oParameters);
		  },

		onToView2 : function () {
			this.getOwnerComponent().getTargets().display("Professors");
		},

		onNavBack: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			var oParams = {};
			  
			  // Navega a la misma vista con los nuevos parámetros de consulta
			  oRouter.navTo("MasterView", true);
		}

	});
});
