ConfigureMultiplayer({
	isClientOnly: false
});

ModAPI.addAPICallback("ICore", function(api){
  Launch({
	  ICore: api,
    randomInt: api.requireGlobal("randomInt"),
    JetpackProvider: api.requireGlobal("JetpackProvider"),
    ArmorBatpack: api.requireGlobal("ArmorBatpack"),
    ArmorNanoSuit: api.requireGlobal("ArmorNanoSuit"),
    ArmorQuantumSuit: api.requireGlobal("ArmorQuantumSuit"),
    ItemElectric: api.requireGlobal("ItemElectric"),
    ElectricTool: api.requireGlobal("ElectricTool"),
    ElectricChainsaw: api.requireGlobal("ElectricChainsaw"),
    ToolDrill: api.requireGlobal("ToolDrill"),
  });
});