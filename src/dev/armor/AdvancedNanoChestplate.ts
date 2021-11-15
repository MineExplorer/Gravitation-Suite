class AdvancedNanoChestplate extends ArmorNanoSuit {
	constructor() {
		super("advNanoChestplate", "advanced_nano_chestplate", {type: "chestplate", defence: 8, texture: "advNanoChestplate"}, false);
		this.maxCharge = 3000000;
		this.transferLimit = 10000;
		this.tier = 4;
		ChargeItemRegistry.addToCreative(this.id, this.maxCharge);
		ICore.UI.setButtonFor(this.id, "button_fly");
		ICore.UI.setButtonFor(this.id, "button_hover");
		EnergyLevelUI.setFor(this.id);
	}

	onTick(item: ItemInstance, index: number, playerUid: number): ItemInstance {
		let stack = null;
		if (World.getThreadTime() % 20 == 0) {
			const carried = Entity.getCarriedItem(playerUid);
			if (ChargeItemRegistry.isValidItem(carried.id, "Eu", this.tier)) {
				const energyStored = ChargeItemRegistry.getEnergyStored(item);
				const energyAdd = ChargeItemRegistry.addEnergyTo(carried, "Eu", Math.min(energyStored, this.transferLimit*20), this.tier);
				if (energyAdd > 0) {
					ChargeItemRegistry.setEnergyStored(item, energyStored - energyAdd);
					Entity.setCarriedItem(playerUid, carried.id, 1, carried.data, carried.extra);
					stack = item;
				}
			}
		}
		return JetpackProvider.onTick(item, playerUid) || stack;
	}
}