class UltimateLappack extends ArmorBatpack {
	constructor() {
		super("ultimateLappack", "ultimate_lappack", 6e7, 100000, 4);
		this.setRarity(EnumRarity.RARE);
	}

	setArmorTexture(): void {
		this.texture = "armor/ultimateLappack.png";
	}
}