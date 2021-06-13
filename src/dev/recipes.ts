Callback.addCallback("PreLoaded", function() {
	Recipes.addShaped({id: ItemID.advJetpack, count: 1, data: Item.getMaxDamage(ItemID.advJetpack)}, [
		"cjc",
		"bab",
		"oxo"
	], ['x', ItemID.circuitAdvanced, 0, 'j', ItemID.jetpack, -1, 'a', ItemID.lappack, -1, 'b', ItemID.engineBoost, 0, 'c', ItemID.carbonPlate, 0, 'o', ItemID.cableOptic, 0], ChargeItemRegistry.transferEnergy);

	Recipes.addShaped({id: ItemID.advNanoChestplate, count: 1, data: Item.getMaxDamage(ItemID.advNanoChestplate)}, [
		"cjc",
		"cnc",
		"oxo"
	], ['x', ItemID.circuitAdvanced, 0, 'n', ItemID.nanoChestplate, -1, 'j', ItemID.advJetpack, -1, 'c', ItemID.carbonPlate, 0, 'o', ItemID.cableOptic, 0], ChargeItemRegistry.transferEnergy);

	if (__config__.getBool("change_quantum_suit_recipe")) {
		Recipes.deleteRecipe({id: ItemID.quantumChestplate, count: 1, data: Item.getMaxDamage(ItemID.quantumChestplate)})
		Recipes.addShaped({id: ItemID.quantumChestplate, count: 1, data: Item.getMaxDamage(ItemID.quantumChestplate)}, [
			"bnb",
			"a#a",
			"aba"
		], ['#', ItemID.storageLapotronCrystal, -1, 'n', ItemID.advNanoChestplate, -1, 'a', ItemID.plateReinforcedIridium, 0, 'b', ItemID.plateAlloy, 0], ChargeItemRegistry.transferEnergy);
	}

	Recipes.addShaped({id: ItemID.ultimateLappack, count: 1, data: Item.getMaxDamage(ItemID.ultimateLappack)}, [
		"aba",
		"aea",
		"asa"
	], ['a', ItemID.storageLapotronCrystal, -1, 'e', ItemID.lappack, -1, 'b', ItemID.plateReinforcedIridium, 0, 's', ItemID.superconductor, 0], ChargeItemRegistry.transferEnergy);

	Recipes.addShaped({id: ItemID.graviChestplate, count: 1, data: Item.getMaxDamage(ItemID.graviChestplate)}, [
		"sqs",
		"gxg",
		"sus"
	], ['x', BlockID.transformerHV, 0, 'q', ItemID.quantumChestplate, -1, 'u', ItemID.ultimateLappack, -1, 'g', ItemID.graviEngine, 0, 's', ItemID.superconductor, 0], ChargeItemRegistry.transferEnergy);

	Recipes.addShaped({id: ItemID.graviTool, count: 1, data: Item.getMaxDamage(ItemID.graviTool)}, [
		"aha",
		"beb",
		"wct"
	], ['e', ItemID.storageCrystal, -1, 'h', ItemID.electricHoe, -1, 't', ItemID.electricTreetap, -1, 'w', ItemID.electricWrench, -1, 'a', ItemID.carbonPlate, 0, 'b', ItemID.plateAlloy, 0, 'c', ItemID.circuitAdvanced, 0], ChargeItemRegistry.transferEnergy);

	Recipes.addShaped({id: ItemID.advancedChainsaw, count: 1, data: Item.getMaxDamage(ItemID.advancedChainsaw)}, [
		" d ",
		"asa",
		"cac"
	], ['s', ItemID.chainsaw, -1, 'a', ItemID.upgradeOverclocker, -1, 'c', ItemID.circuitBasic, -1, 'd', 264, 0], ChargeItemRegistry.transferEnergy);

	Recipes.addShaped({id: ItemID.advancedDDrill, count: 1, data: Item.getMaxDamage(ItemID.advancedDDrill)}, [
		"ada",
		"cac"
	], ['d', ItemID.diamondDrill, -1, 'a', ItemID.upgradeOverclocker, -1, 'c', ItemID.circuitBasic, -1], ChargeItemRegistry.transferEnergy);

	if (__config__.getBool("change_iridium_drill_recipe")) {
		Recipes.deleteRecipe({id: ItemID.iridiumDrill, count: 1, data: Item.getMaxDamage(ItemID.iridiumDrill)});
		Recipes.addShaped({id: ItemID.iridiumDrill, count: 1, data: Item.getMaxDamage(ItemID.iridiumDrill)}, [
			" a ",
			"ada",
			" e "
		], ['d', ItemID.advancedDDrill, -1, 'e', ItemID.storageCrystal, -1, 'a', ItemID.plateReinforcedIridium, 0], ChargeItemRegistry.transferEnergy);
	}

	Recipes.addShaped({id: ItemID.vajra, count: 1, data: Item.getMaxDamage(ItemID.vajra)}, [
		"mem",
		"c#c",
		"axa"
	], ['#', ItemID.vajraCore, 0, 'x', ItemID.storageLapotronCrystal, -1, 'e', ItemID.storageCrystal, -1, 'a', ItemID.plateAlloy, 0, 'b', ItemID.carbonPlate, 0, 'm', ItemID.plateIron, 0], ChargeItemRegistry.transferEnergy);
});
