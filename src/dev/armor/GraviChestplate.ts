class GraviChestplate extends ArmorQuantumSuit {
	constructor() {
		super("graviChestplate", "gravi_chestplate", {type: "chestplate", defence: 9, texture: "graviChestplate"}, false);
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
			if (World.getThreadTime() % 20 == 0) {
				let newEnergyStored = energyStored;
				if (flyEnabled) {
					newEnergyStored = Math.max(newEnergyStored - 50000, 0);
				}
				const carried = Entity.getCarriedItem(player);
				if (ChargeItemRegistry.isValidItem(carried.id, "Eu", this.tier)) {
					const energyAdd = ChargeItemRegistry.addEnergyTo(carried, "Eu", Math.min(newEnergyStored, this.transferLimit*20), this.tier);
					if (energyAdd > 0) {
						newEnergyStored -= energyAdd
						Entity.setCarriedItem(player, carried.id, 1, carried.data, carried.extra);
					}
				}
				if (energyStored != newEnergyStored) {
					ChargeItemRegistry.setEnergyStored(item, newEnergyStored);
					return item;
				}
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
