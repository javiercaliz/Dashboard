sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/Fragment",
    "sap/ui/core/util/Export",
    "sap/ui/core/util/ExportTypeCSV",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/Sorter",
    "sap/ui/Device",
    "sap/m/library",
    "sap/m/MessageToast",
    "sap/m/TablePersoController",
    "sap/f/Dashboard/mockdata/ProfessorsService",
  ],
  function (
    Controller, Fragment, Export, ExportTypeCSV, JSONModel, Filter, Sorter, Device, mlibrary, MessageToast, TablePersoController, ProfessorsService
  ) {
    "use strict";

    var ResetAllMode = mlibrary.ResetAllMode;

    var ProfessorsController = Controller.extend(
      "sap.f.Dashboard.controller.ProfessorsController",
      {
        onInit: function (oEvent) {
          var oRouter = this.getOwnerComponent().getRouter();
          oRouter
            .getRoute("Professors")
            .attachMatched(this._onRouteMatched, this);

          this._mViewSettingsDialogs = {};
          var oModel = new JSONModel(
            sap.ui.require.toUrl("sap/f/Dashboard/mockdata/professors.json"),
            "professors"
          );
          var oGroupingModel = new JSONModel({ hasGrouping: false });
          this.getView().setModel(oModel);
          this.getView().setModel(oGroupingModel, "Grouping");

          this._oTPC = new TablePersoController({
            table: this.byId("professorsTable"),
            componentName: "Dashboard",
            resetAllMode: ResetAllMode.ServiceReset,
            persoService: ProfessorsService,
          }).activate();
        },

        onAfterRendering: async function () {
          this.filtros();
        },

        filtros: function () {
          var oTable = this.getView().byId("professorsTable");
          //obten en una variable la url actual
          var url = window.location.href;

          if (url.includes("age=%3E55")) {
            for (var i = 0; i < oTable.getItems().length; i++) {
              if (oTable.getItems()[i].getCells()[2].getText() < 55) {
                oTable.getItems()[i].setVisible(false);
              }
            }
          }

          if (url.includes("46-55")) {
            for (var i = 0; i < oTable.getItems().length; i++) {
              if (
                oTable.getItems()[i].getCells()[2].getText() > 55 ||
                oTable.getItems()[i].getCells()[2].getText() < 46
              ) {
                oTable.getItems()[i].setVisible(false);
              }
            }
          }
          if (url.includes("36-45")) {
            for (var i = 0; i < oTable.getItems().length; i++) {
              if (
                oTable.getItems()[i].getCells()[2].getText() > 45 ||
                oTable.getItems()[i].getCells()[2].getText() < 36
              ) {
                oTable.getItems()[i].setVisible(false);
              }
            }
          }
          if (url.includes("25-35")) {
            for (var i = 0; i < oTable.getItems().length; i++) {
              if (
                oTable.getItems()[i].getCells()[2].getText() > 35 ||
                oTable.getItems()[i].getCells()[2].getText() < 25
              ) {
                oTable.getItems()[i].setVisible(false);
              }
            }
          }
          if (url.includes("age=%3C25")) {
            for (var i = 0; i < oTable.getItems().length; i++) {
              if (oTable.getItems()[i].getCells()[2].getText() > 25) {
                oTable.getItems()[i].setVisible(false);
              }
            }
          }
        },

        _onRouteMatched: function (oEvent) {
          var oParameters = oEvent.getParameter("arguments");
          var sEdad = oParameters.edad; // Aquí obtienes el valor del parámetro "id"
          // Realiza las operaciones necesarias con el parámetro recibido
        },
        /* 
		onToView2 : function () {
			this.getOwnerComponent().getTargets().display("Professors");
		}, */

        onNavBack: function () {
          window.location = "http://10.10.3.93:5500/";
        },

        onPersoButtonPressed: function (oEvent) {
          this._oTPC.openDialog();
        },

        onTableGrouping: function (oEvent) {
          this._oTPC.setHasGrouping(oEvent.getSource().getSelected());
        },

        onExit: function () {
          this._oTPC.destroy();
        },

        onTablePersoRefresh: function () {
          ProfessorsService.resetPersData().done(
            function () {
              this._oTPC.refresh();
            }.bind(this)
          );
        },

        onDataExport: function (oEvent) {
          var oExport = new Export({
            // Type that will be used to generate the content. Own ExportType's can be created to support other formats
            exportType: new ExportTypeCSV({
              separatorChar: ";",
            }),

            // Pass in the model created above
            models: this.getView().getModel(),

            // binding information for the rows aggregation
            rows: {
              path: "/professors",
            },

            // column definitions with column name and binding info for the content

            columns: [
              {
                name: "Nombre",
                template: {
                  content: "{nombre}",
                },
              },
              {
                name: "Apellido",
                template: {
                  content: "{apellido}",
                },
              },
              {
                name: "edad",
                template: {
                  content: "{edad}",
                },
              },
              {
                name: "compromiso_desempeno",
                template: {
                  content: "{compromiso_desempeno}",
                },
              },
              {
                name: "posgrados",
                template: {
                  content: "{posgrados}",
                },
              },
              {
                name: "semaforo",
                template: {
                  content: "{semaforo}",
                },
              },
              {
                name: "nivel_ingles",
                template: {
                  content: "{nivel_ingles}",
                },
              },
            ],
          });

          // download exported file
          oExport
            .saveFile()
            .catch(function (oError) {
              MessageBox.error(
                "Error when downloading data. Browser might not be supported!\n\n" +
                  oError
              );
            })
            .then(function () {
              oExport.destroy();
            });
        },

        resetGroupDialog: function (oEvent) {
          this.groupReset = true;
        },

        getViewSettingsDialog: function (sDialogFragmentName) {
          var pDialog = this._mViewSettingsDialogs[sDialogFragmentName];

          if (!pDialog) {
            pDialog = Fragment.load({
              id: this.getView().getId(),
              name: sDialogFragmentName,
              controller: this,
            }).then(function (oDialog) {
              if (Device.system.desktop) {
                oDialog.addStyleClass("sapUiSizeCompact");
              }
              return oDialog;
            });
            this._mViewSettingsDialogs[sDialogFragmentName] = pDialog;
          }
          return pDialog;
        },
        /* 
		handleSortButtonPressed: function () {
			this.getViewSettingsDialog("sap.m.sample.TableViewSettingsDialog.SortDialog")
				.then(function (oViewSettingsDialog) {
					oViewSettingsDialog.open();
				});
		}, */

        handleFilterButtonPressed: function () {
          this.getViewSettingsDialog("sap.f.Dashboard.view.FilterDialog").then(
            function (oViewSettingsDialog) {
              oViewSettingsDialog.open();
            }
          );
        },
        /* 
		handleGroupButtonPressed: function () {
			this.getViewSettingsDialog("sap.m.sample.TableViewSettingsDialog.GroupDialog")
				.then(function (oViewSettingsDialog) {
					oViewSettingsDialog.open();
				});
		},
	
		handleSortDialogConfirm: function (oEvent) {
			var oTable = this.byId("professorsTable"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				sPath,
				bDescending,
				aSorters = [];
	
			sPath = mParams.sortItem.getKey();
			bDescending = mParams.sortDescending;
			aSorters.push(new Sorter(sPath, bDescending));
	
			// apply the selected sort and group settings
			oBinding.sort(aSorters);
		}, */

        handleFilterDialogConfirm: function (oEvent) {
          var oTable = this.byId("professorsTable"),
            mParams = oEvent.getParameters(),
            oBinding = oTable.getBinding("/professors"),
            aFilters = [];

          mParams.filterItems.forEach(function (oItem) {
            var aSplit = oItem.getKey().split("___"),
              sPath = aSplit[0],
              sOperator = aSplit[1],
              sValue1 = aSplit[2],
              sValue2 = aSplit[3],
              oFilter = new Filter(sPath, sOperator, sValue1, sValue2);
            aFilters.push(oFilter);
          });

          // apply filter settings
          oBinding.filter(aFilters);

          // update filter bar
          this.byId("vsdFilterBar").setVisible(aFilters.length > 0);
          this.byId("vsdFilterLabel").setText(mParams.filterString);
        },

        /* 		handleGroupDialogConfirm: function (oEvent) {
			var oTable = this.byId("professorsTable"),
				mParams = oEvent.getParameters(),
				oBinding = oTable.getBinding("items"),
				sPath,
				bDescending,
				vGroup,
				aGroups = [];
	
			if (mParams.groupItem) {
				sPath = mParams.groupItem.getKey();
				bDescending = mParams.groupDescending;
				vGroup = this.mGroupFunctions[sPath];
				aGroups.push(new Sorter(sPath, bDescending, vGroup));
				// apply the selected group settings
				oBinding.sort(aGroups);
			} else if (this.groupReset) {
				oBinding.sort();
				this.groupReset = false;
			}
		}, */
      }
    );

    return ProfessorsController;
  }
);
