class Vajra extends ElectricTool
implements IModeSwitchable {
	damage = 5;

	constructor() {
		super("vajra", "vajra", {energyPerUse: 3333, level: 100, efficiency: 1, damage: 20}, ["stone", "dirt", "wood"], 1e7, 20000, 4);
		this.setRarity(EnumRarity.EPIC);
		ICore.UI.setButtonFor(this.id, "button_switch");
	}

	onModeSwitch(item: ItemInstance, player: number): void {
		let client = Network.getClientForPlayer(player);
		let extra = item.extra || new ItemExtraData();
		let silktouchMode = !extra.getBoolean("silktouch");
		extra.putBoolean("silktouch", silktouchMode);
		if (silktouchMode) {
			BlockEngine.sendUnlocalizedMessage(client, "§2", "message.silktouch.enabled");
		}
		else {
			BlockEngine.sendUnlocalizedMessage(client, "§4", "message.silktouch.disabled");
		}
		Entity.setCarriedItem(player, item.id, 1, item.data, extra);
	}

	onNameOverride(item: ItemInstance, name: string): string {
		name = super.onNameOverride(item, name);
		if (item.extra?.getBoolean("silktouch")) {
			name += "\n" + Translation.translate("message.silktouch.enabled");
		}
		return name;
	}

	modifyEnchant(enchant: ToolAPI.EnchantData, item: ItemInstance): void {
		if (item.extra?.getBoolean("silktouch")) {
			enchant.silk = true;
		}
	}

	onDestroy(item: ItemInstance, coords: Callback.ItemUseCoordinates, block: Tile, player: number): boolean {
		if (item.extra?.getBoolean("silktouch") && ToolAPI.getBlockMaterialName(block.id) == "plant") {
			if (ICore.Tool.dischargeItem(item, this.energyPerUse, player)) {
				let region = WorldRegion.getForActor(player);
				region.destroyBlock(coords);
				if (block.id == 175) block.data = block.data%8;
				region.dropItem(coords.x + .5, coords.y + .5, coords.z + .5, block.id, 1, block.data);
			}
			return true;
		}
		return super.onDestroy(item, coords, block, player);
	}

	calcDestroyTime(item: ItemInstance, coords: Callback.ItemUseCoordinates, block: Tile, params: {base: number, devider: number, modifier: number}, destroyTime: number): number {
		if (ChargeItemRegistry.getEnergyStored(item) >= this.energyPerUse && ToolAPI.getBlockMaterialName(block.id) != "unbreaking") {
			return 0;
		}
		return params.base;
	}
}
