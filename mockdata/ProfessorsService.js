sap.ui.define(['sap/ui/thirdparty/jquery'],
	function(jQuery) {
	"use strict";

	// Very simple page-context personalization
	// persistence service, not for professorive use!
	var ProfessorsService = {

		oData : {
			_persoSchemaVersion: "1.0",
			aColumns : [
				{
					id: "Dashboard-professorsTable-nombre",
					order: 0,
					text: "Nombre",
					visible: true
				},
				{
					id: "Dashboard-professorsTable-apellido",
					order: 1,
					text: "Apellido",
					visible: true
				},
				{
					id: "Dashboard-professorsTable-e",
					order: 2,
					text: "Edad",
					visible: true
				},
				{
					id: "Dashboard-professorsTable-compromiso_desempeno",
					order: 3,
					text: "Compromiso de Desempeño",
					visible: true
				},
				{
					id: "Dashboard-professorsTable-cantidad_posgrados",
					order: 4,
					text: "Cantidad de Posgrados",
					visible: true
				},
				{
					id: "Dashboard-professorsTable-semaforo",
					order: 5,
					text: "Semáforo",
					visible: true
				},
				{
					id: "Dashboard-professorsTable-nivel_ingles",
					order: 5,
					text: "Nivel de Inglés",
					visible: true
				}
			]
		},

		/* oResetData : {
			_persoSchemaVersion: "1.0",
			aColumns : [
				{
					id: "Dashboard-professorsTable-professorCol",
					order: 0,
					text: "professor",
					visible: true
				},
				{
					id: "Dashboard-professorsTable-supplierCol",
					order: 1,
					text: "Supplier",
					visible: false
				},
				{
					id: "Dashboard-professorsTable-dimensionsCol",
					order: 4,
					text: "Dimensions",
					visible: false
				},
				{
					id: "Dashboard-professorsTable-weightCol",
					order: 2,
					text: "Weight",
					visible: false
				},
				{
					id: "Dashboard-professorsTable-priceCol",
					order: 3,
					text: "Price",
					visible: false
				}
			]
		}, */


		getPersData : function () {
			var oDeferred = new jQuery.Deferred();
			if (!this._oBundle) {
				this._oBundle = this.oData;
			}
			oDeferred.resolve(this._oBundle);
			// setTimeout(function() {
			// 	oDeferred.resolve(this._oBundle);
			// }.bind(this), 2000);
			return oDeferred.promise();
		},

		setPersData : function (oBundle) {
			var oDeferred = new jQuery.Deferred();
			this._oBundle = oBundle;
			oDeferred.resolve();
			return oDeferred.promise();
		},

		getResetPersData : function () {
			var oDeferred = new jQuery.Deferred();

			// oDeferred.resolve(this.oResetData);

			setTimeout(function() {
				oDeferred.resolve(this.oResetData);
			}.bind(this), 2000);

			return oDeferred.promise();
		},

		resetPersData : function () {
			var oDeferred = new jQuery.Deferred();

			//set personalization
			this._oBundle = this.oResetData;

			//reset personalization, i.e. display table as defined
			//this._oBundle = null;

			oDeferred.resolve();

			// setTimeout(function() {
			// 	this._oBundle = this.oResetData;
			// 	oDeferred.resolve();
			// }.bind(this), 2000);

			return oDeferred.promise();
		},

		//this caption callback will modify the TablePersoDialog' entry for the 'Weight' column
		//to 'Weight (Important!)', but will leave all other column names as they are.
		getCaption : function (oColumn) {
			if (oColumn.getHeader() && oColumn.getHeader().getText) {
				if (oColumn.getHeader().getText() === "Weight") {
					return "Weight (Important!)";
				}
			}
			return null;
		},

		getGroup : function(oColumn) {
			if ( oColumn.getId().indexOf('nombre') != -1 ||
					oColumn.getId().indexOf('apellido') != -1) {
				return "Primary Group";
			}
			return "Secondary Group";
		}
	};

	return ProfessorsService;

});
