class GraviEngineButton extends ICore.UI.AbstractButton {
	constructor() {
		super("gravi_engine", "armor", {
			position: 1,
			bitmap: "button_gravi_off",
			scale: 50,
		});
	}

	onClick(player: number) {
		let client = Network.getClientForPlayer(player);
		let armor = Entity.getArmorSlot(player, 1);
		let extra = armor.extra || new ItemExtraData();
		if (extra.getBoolean("fly")) {
			extra.putBoolean("fly", false);
			BlockEngine.sendUnlocalizedMessage(client, "message.graviChestPlate.disabled", "§4");
		}
		else if (ChargeItemRegistry.getEnergyStored(armor) >= 2500) {
			extra.putBoolean("fly", true);
			BlockEngine.sendUnlocalizedMessage(client, "message.graviChestPlate.enabled", "§2");
		}
		else {
			BlockEngine.sendUnlocalizedMessage(client, "message.graviChestPlate.lowEnergy");
		}
		Entity.setArmorSlot(player, 1, armor.id, 1, armor.data, extra);
	}

	onUpdate(element: UI.UIButtonElement) {
		let extra = Player.getArmorSlot(1).extra;
		if (extra && extra.getBoolean("fly") ){
			element.bitmap = "button_gravi_on";
		} else {
			element.bitmap = "button_gravi_off";
		}
	}
}

ICore.UI.registerButton(new GraviEngineButton());