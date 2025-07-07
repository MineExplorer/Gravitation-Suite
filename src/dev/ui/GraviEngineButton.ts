class GraviEngineButton extends ICore.UI.AbstractButton {
	constructor() {
		super("gravi_engine", "armor", {
			position: 1,
			bitmap: "button_gravi_off",
			scale: 50,
		});
	}

	onClick(player: number) {
		const client = Network.getClientForPlayer(player);
		const armor = Entity.getArmorSlot(player, 1);
		const extra = armor.extra || new ItemExtraData();
		if (extra.getBoolean("fly")) {
			extra.putBoolean("fly", false);
			BlockEngine.sendMessage(client, "§4", "message.graviChestPlate.disabled");
		}
		else if (ChargeItemRegistry.getEnergyStored(armor) >= 2500) {
			extra.putBoolean("fly", true);
			BlockEngine.sendMessage(client, "§2", "message.graviChestPlate.enabled");
		}
		else {
			BlockEngine.sendMessage(client, "message.graviChestPlate.lowEnergy");
		}
		Entity.setArmorSlot(player, 1, armor.id, 1, armor.data, extra);
	}

	onUpdate(element: UI.UIButtonElement) {
		const extra = Player.getArmorSlot(1).extra;
		if (extra && extra.getBoolean("fly")) {
			element.bitmap = "button_gravi_on";
		} else {
			element.bitmap = "button_gravi_off";
		}
	}
}

ICore.UI.registerButton(new GraviEngineButton());