class GraviChestplate extends ArmorQuantumSuit {
	constructor() {
		super("graviChestplate", "gravi_chestplate", {type: "chestplate", defence: 9, knockbackResistance: 2, texture: "graviChestplate"}, false);
		this.setRarity(EnumRarity.EPIC);
		this.maxCharge = 6e7;
		this.transferLimit = 100000;
		this.canProvideEnergy = true;
		ChargeItemRegistry.addToCreative(this.id, this.maxCharge);
		EnergyLevelUI.setFor(this.id);
		ICore.UI.setButtonFor(this.id, "gravi_engine");
	}

	onTick(item: ItemInstance, index: number, player: number): ItemInstance {
		const flyEnabled = item.extra? item.extra.getBoolean("fly") : false;
		const energyStored = ChargeItemRegistry.getEnergyStored(item);
		if (energyStored > 0) {
			Entity.setFire(player, 0, true);
			let discharged = false;
			if (World.getThreadTime() % 20 == 0 && flyEnabled) {
				ChargeItemRegistry.setEnergyStored(item, Math.max(energyStored - 50000, 0));
				discharged = true;
			}
			if (ArmorBatpack.chargeCarriedItem(this, item, player) || discharged) {
				return item;
			}
		}
		else if (flyEnabled) {
			item.extra.putBoolean("fly", false);
			Game.message("§4" + Translation.translate("message.graviChestPlate.shutdown"));
			return item;
		}
		return null;
	}
}

let canFly = false;
Callback.addCallback("LocalTick", function() {
	const armor = Player.getArmorSlot(1);
	if (Game.getGameMode() != 1) {
		if (armor.id == ItemID.graviChestplate && armor.extra && armor.extra.getBoolean("fly")) {
			Player.setFlyingEnabled(true);
			canFly = true;
		}
		else if (canFly) {
			Player.setFlyingEnabled(false);
			Player.setFlying(false);
			canFly = false;
		}
	}
});
