sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], function (MessageToast, Controller, JSONModel) {
	"use strict";

	return Controller.extend("sap.f.Dashboard.controller.DepartmentController", {
		onInit: function () {
			var oDepartmentsModel = new JSONModel(sap.ui.require.toUrl("sap/f/Dashboard/mockdata/departments.json"));
				

			this.getView().setModel(oDepartmentsModel, "departments");
	
		},
		onBookPress: function() {
			MessageToast.show("By pressing the 'Book' button a new application can be opened where the actual booking happens. This can be in the same window, in a new tab or in a dialog.");
		}
		
	});
});