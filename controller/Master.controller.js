sap.ui.define([
	"sap/m/MessageToast",
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/f/Dashboard/controller/BaseController"

], function (MessageToast, Controller, JSONModel, BaseController) {
	"use strict";

	return BaseController.extend("sap.f.Dashboard.Master", {
		onInit: function () {
			var DepartmentView = sap.ui.xmlview("sap.f.Dashboard.view.Department");
			this.getView().byId("departmentContainer").addItem(DepartmentView);
			var AgeView = sap.ui.xmlview("sap.f.Dashboard.view.Age");
			this.getView().byId("ageContainer").addItem(AgeView);
			var CommitmentView = sap.ui.xmlview("sap.f.Dashboard.view.Commitment");
			this.getView().byId("commitmentContainer").addItem(CommitmentView);
			var PostGraduateView = sap.ui.xmlview("sap.f.Dashboard.view.PostGraduate");
			this.getView().byId("postgraduateContainer").addItem(PostGraduateView);
			var TrafficLightView = sap.ui.xmlview("sap.f.Dashboard.view.TrafficLight");
			this.getView().byId("trafficLightContainer").addItem(TrafficLightView);
			var EnglishLevelView = sap.ui.xmlview("sap.f.Dashboard.view.EnglishLevel");
			this.getView().byId("englishLevelContainer").addItem(EnglishLevelView);
		

		},

		onNavToProfessors: function () {
            this.getRouter().navTo('Professors');
        },

	});
});