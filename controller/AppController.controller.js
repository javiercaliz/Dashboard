sap.ui.define([
	"sap/f/Dashboard/controller/BaseController",
	"sap/base/Log"
], function (BaseController, Log) {
	"use strict";

	return BaseController.extend("sap.f.Dashboard.controller.AppController", {

		onInit: function () {
			Log.setLevel(Log.Level.INFO);
			var oRouter =  this.getRouter();

			oRouter.attachBypassed(function(oEvent){
				var sHash = oEvent.getParameter('hash');
				Log.info("Sorry, but the hash '" + sHash + "' is invalid.", "The resource was not found.");
			});

			oRouter.attachRouteMatched(function (oEvent){
				var sRouteName = oEvent.getParameter("name");
				Log.info("User accessed route " + sRouteName + ", timestamp = " + Date.now());
			});

		},



	});

});

