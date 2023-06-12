sap.ui.define([
    'sap/m/library',
    "sap/m/MessageToast",
    'sap/m/TablePersoController',
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Sorter",
    "sap/ui/model/Filter",
    "sap/f/Dashboard/mockdata/ProfessorsService",
	'sap/ui/core/util/Export',
	'sap/ui/core/util/ExportTypeCSV',
], function (mlibrary, MessageToast, TablePersoController, Controller, JSONModel, Sorter, Filter, ProfessorsService, Export, ExportTypeCSV) {
	"use strict";

	var ResetAllMode =  mlibrary.ResetAllMode;

	var ProfessorsController = Controller.extend("sap.f.Dashboard.controller.ProfessorsController", {

		onInit: function (oEvent) {

			var oRouter = this.getOwnerComponent().getRouter();
			oRouter.getRoute("Professors").attachMatched(this._onRouteMatched, this);
			
			this.createTable();

			var oModel = new JSONModel(sap.ui.require.toUrl("sap/f/Dashboard/mockdata/profesors.json"));
			var oGroupingModel = new JSONModel({ hasGrouping: false});
			this.getView().setModel(oModel);
			this.getView().setModel(oGroupingModel, 'Grouping');

			this._oTPC = new TablePersoController({
				table: this.byId("professorsTable"),
				//specify the first part of persistence ids e.g. 'demoApp-productsTable-dimensionsCol'
				componentName: "Dashboard",
				resetAllMode: ResetAllMode.ServiceReset,
				persoService: ProfessorsService
			}).activate();
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
/* 
		onToView2 : function () {
			this.getOwnerComponent().getTargets().display("Professors");
		}, */

		onNavBack: function () {
			window.location = 'http://10.10.3.93:5500/'
		},

		onPersoButtonPressed: function (oEvent) {
			this._oTPC.openDialog(); 
		},

		onTableGrouping : function(oEvent) {
			this._oTPC.setHasGrouping(oEvent.getSource().getSelected());
		},
		
		onExit: function () {
			this._oTPC.destroy();
		},

		onTablePersoRefresh : function() {
			ProfessorsService.resetPersData().done(
				function() {
					this._oTPC.refresh();
				}.bind(this)
			);
		},

		onDataExport : function(oEvent) {

			var oExport = new Export({

				// Type that will be used to generate the content. Own ExportType's can be created to support other formats
				exportType : new ExportTypeCSV({
					separatorChar : ";"
				}),

				// Pass in the model created above
				models : this.getView().getModel(),

				// binding information for the rows aggregation
				rows : {
					path : "/profesors"
				},

				// column definitions with column name and binding info for the content

				columns : [{
					name : "Nombre",
					template : {
						content : "{nombre}"
					}
				}, {
					name : "Apellido",
					template : {
						content : "{apellido}"
					}
				}, {
					name : "edad",
					template : {
						content : "{edad}"
					}
				}, 
				{
					name : "compromiso_desempeno",
					template : {
						content : "{compromiso_desempeno}"
					}
				},
				{
					name : "posgrados",
					template : {
						content : "{posgrados}"
					}
				},
				{
					name : "semaforo",
					template : {
						content : "{semaforo}"
					}
				},
				{
					name : "nivel_ingles",
					template : {
						content : "{nivel_ingles}"
					}
				}
			
			]
			});

			// download exported file
			oExport.saveFile().catch(function(oError) {
				MessageBox.error("Error when downloading data. Browser might not be supported!\n\n" + oError);
			}).then(function() {
				oExport.destroy();
			});
		}

	});

	return ProfessorsController;

});

