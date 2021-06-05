ItemRegistry.createItem("superconductorCover", {name: "superconductor_cover", icon: "superconductor_cover"});
ItemRegistry.createItem("superconductor", {name: "superconductor", icon: "superconductor"});
ItemRegistry.createItem("engineBoost", {name: "engine_booster", icon: "engine_boost"});
ItemRegistry.createItem("coolingCore", {name: "cooling_core", icon: "cooling_core"});
ItemRegistry.createItem("graviEngine", {name: "gravitation_engine", icon: "gravi_engine"});
ItemRegistry.createItem("magnetron", {name: "magnetron", icon: "magnetron", stack: 1});
ItemRegistry.createItem("vajraCore", {name: "vajra_core", icon: "vajra_core", stack: 1});

Recipes.addShaped({id: ItemID.superconductorCover, count: 3, data: 0}, [
	"aba",
	"ccc",
	"aba"
], ['a', ItemID.plateAlloy, 0, 'b', ItemID.plateReinforcedIridium, 0, 'c', ItemID.carbonPlate, 0]);

Recipes.addShaped({id: ItemID.superconductor, count: 3, data: 0}, [
	"ccc",
	"oao",
	"ccc"
], ['a', 266, 0, 'c', ItemID.superconductorCover, 0, 'o', ItemID.cableOptic, 0]);

Recipes.addShaped({id: ItemID.coolingCore, count: 1, data: 0}, [
	"chc",
	"pbp",
	"chc"
], ['b', ItemID.plateReinforcedIridium, 0, 'c', ItemID.coolantCell6, 1, 'h', ItemID.heatExchangerAdv, 1, 'p', ItemID.reactorPlatingHeat, 0]);

Recipes.addShaped({id: ItemID.engineBoost, count: 1, data: 0}, [
	"gag",
	"cbc",
	"aha"
], ['a', ItemID.plateAlloy, 0, 'b', ItemID.upgradeOverclocker, 0, 'c', ItemID.circuitBasic, 0, 'h', ItemID.heatVentAdv, 1, 'g', 348, 0]);

Recipes.addShaped({id: ItemID.graviEngine, count: 1, data: 0}, [
	"csc",
	"xax",
	"csc"
], ['x', ItemID.coolingCore, 0, 's', ItemID.superconductor, 0, 'a', BlockID.transformerHV, 0, 'c', BlockID.teslaCoil, 0]);

Recipes.addShaped({id: ItemID.magnetron, count: 1, data: 0}, [
	"aba",
	"bsb",
	"aba"
], ['s', ItemID.superconductor, 0, 'a', ItemID.plateIron, 0, 'b', ItemID.plateCopper, 0]);

Recipes.addShaped({id: ItemID.vajraCore, count: 1, data: 0}, [
	" m ",
	"rcr",
	"sxs"
], ['x', BlockID.transformerHV, 0, 'm', ItemID.magnetron, 0, 's', ItemID.superconductor, 0, 'c', BlockID.teslaCoil, 0, 'r', ItemID.plateReinforcedIridium, 0]);
