sap.ui.define([
	"sap/ui/core/UIComponent"
], function (UIComponent) {
	"use strict";

	return UIComponent.extend("sap.f.Dashboard.Component", {

		metadata: {
			manifest: "json"
		},

		init: function(){
			UIComponent.prototype.init.apply(this, arguments);
			this.getRouter().initialize();
			this.getTargets().display("MasterView");
		}

	});
});