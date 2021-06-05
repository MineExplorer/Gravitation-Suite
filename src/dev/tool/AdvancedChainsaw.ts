class AdvancedChainsaw extends ElectricChainsaw {
	constructor() {
		super("advancedChainsaw", "advanced_chainsaw", {energyPerUse: 200, level: 4, efficiency: 16.2, damage: 8}, 45000, 2000, 2);
		this.setRarity(EnumRarity.UNCOMMON);
	}
}