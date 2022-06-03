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
		const stack = ArmorBatpack.chargeCarriedItem(this, item, playerUid);
		return JetpackProvider.onTick(item, playerUid) || stack;
	}
}