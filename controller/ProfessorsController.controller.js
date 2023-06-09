sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
    "sap/ui/model/Sorter",
	"sap/ui/model/Filter"
], function (MessageToast, Controller, JSONModel, Sorter, Filter) {
	"use strict";

	return Controller.extend("sap.f.Dashboard.controller.ProfessorsController", {

		onInit: function (oEvent) {

			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("Professors").attachMatched(this._onRouteMatched, this);
			
			this.createTable();
		},

		onAfterRendering: async function () {
			this.filtros();
			
		},


		createTable: async function(){
			var oTable = this.getView().byId("professorsTable");
			var oSorter = new Sorter("profesors>nombre", false);
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
				template: oTemplate,
				sorter: oSorter,
			});
			
		},

		filtros: function(){ 
			var oTable = this.getView().byId("professorsTable");
			//obten en una variable la url actual
			var url = window.location.href;

			if (url.includes("age=%3E55")) { 
				for (var i = 0; i < oTable.getItems().length; i++) {
					if (oTable.getItems()[i].getCells()[2].getText() < 55) {
						oTable.getItems()[i].setVisible(false);
					}
				}
			};

			if (url.includes("46-55") ) { 
				for (var i = 0; i < oTable.getItems().length; i++) {
					if (oTable.getItems()[i].getCells()[2].getText() > 55 || oTable.getItems()[i].getCells()[2].getText() < 46) {
						oTable.getItems()[i].setVisible(false);
					}
				}
			};
			if (url.includes("36-45") ) { 
				for (var i = 0; i < oTable.getItems().length; i++) {
					if (oTable.getItems()[i].getCells()[2].getText() > 45 || oTable.getItems()[i].getCells()[2].getText() < 36) {
						oTable.getItems()[i].setVisible(false);
					}
				}
			};
			if (url.includes("25-35") ) { 
				for (var i = 0; i < oTable.getItems().length; i++) {
					if (oTable.getItems()[i].getCells()[2].getText() > 35 || oTable.getItems()[i].getCells()[2].getText() < 25) {
						oTable.getItems()[i].setVisible(false);
					}
				}
			};
			if (url.includes("age=%3C25") ) { 
				for (var i = 0; i < oTable.getItems().length; i++) {
					if (oTable.getItems()[i].getCells()[2].getText() > 25) {
						oTable.getItems()[i].setVisible(false);
					}
				}
			};
				
			

		},

		_onRouteMatched: function(oEvent) {
			var oParameters = oEvent.getParameter("arguments");
			var sEdad = oParameters.edad; // Aquí obtienes el valor del parámetro "id"
			// Realiza las operaciones necesarias con el parámetro recibido
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
