class AdvancedJetpack extends ArmorBatpack {
	constructor() {
		super("advJetpack", "advanced_jetpack", 3000000, 10000, 4);
		this.setRarity(EnumRarity.UNCOMMON);
		ICore.UI.setButtonFor(this.id, "button_fly");
		ICore.UI.setButtonFor(this.id, "button_hover");
		EnergyLevelUI.setFor(this.id);
	}

	setArmorTexture(): void {
		this.texture = "armor/advJetpack.png";
	}

	onHurt(params: {attacker: number, damage: number, type: number}, item: ItemInstance, index: number, playerUid: number): ItemInstance {
		if (BlockEngine.getMainGameVersion() >= 16 && params.type == 5 && !EntityHelper.isOnGround(playerUid)) {
			Game.prevent();
		}
		return super.onHurt(params, item, index, playerUid);
	}

	onTick(item: ItemInstance, index: number, playerUid: number): ItemInstance {
		const stack = super.onTick(item, index, playerUid);
		return JetpackProvider.onTick(item, playerUid) || stack;
	}
}