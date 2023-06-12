    resetGroupDialog: function(oEvent) {
        this.groupReset =  true;
    },

    getViewSettingsDialog: function (sDialogFragmentName) {
        var pDialog = this._mViewSettingsDialogs[sDialogFragmentName];

        if (!pDialog) {
            pDialog = Fragment.load({
                id: this.getView().getId(),
                name: sDialogFragmentName,
                controller: this
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

    handleSortButtonPressed: function () {
        this.getViewSettingsDialog("sap.m.sample.TableViewSettingsDialog.SortDialog")
            .then(function (oViewSettingsDialog) {
                oViewSettingsDialog.open();
            });
    },

    handleFilterButtonPressed: function () {
        this.getViewSettingsDialog("sap.m.sample.TableViewSettingsDialog.FilterDialog")
            .then(function (oViewSettingsDialog) {
                oViewSettingsDialog.open();
            });
    },

    handleGroupButtonPressed: function () {
        this.getViewSettingsDialog("sap.m.sample.TableViewSettingsDialog.GroupDialog")
            .then(function (oViewSettingsDialog) {
                oViewSettingsDialog.open();
            });
    },

    handleSortDialogConfirm: function (oEvent) {
        var oTable = this.byId("idProductsTable"),
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
    },

    handleFilterDialogConfirm: function (oEvent) {
        var oTable = this.byId("idProductsTable"),
            mParams = oEvent.getParameters(),
            oBinding = oTable.getBinding("items"),
            aFilters = [];

        mParams.filterItems.forEach(function(oItem) {
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

    handleGroupDialogConfirm: function (oEvent) {
        var oTable = this.byId("idProductsTable"),
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
    },

    onToggleContextMenu: function (oEvent) {
        var oToggleButton = oEvent.getSource();
        if (oEvent.getParameter("pressed")) {
            oToggleButton.setTooltip("Disable Custom Context Menu");
            this.byId("idProductsTable").setContextMenu(new Menu({
                items: [
                    new MenuItem({text: "{Name}"}),
                    new MenuItem({text: "{ProductId}"})
                ]
            }));
        } else {
            oToggleButton.setTooltip("Enable Custom Context Menu");
            this.byId("idProductsTable").destroyContextMenu();
        }
    },

