class GraviTool extends ItemElectric
implements IWrech, IModeSwitchable {
	dropChance = 1;

	constructor() {
		super("graviTool", "gravi_tool", 300000, 10000, 3);
		this.setRarity(EnumRarity.UNCOMMON);
		ICore.Integration.addToolBooxValidItem(this.id);
		ICore.UI.setButtonFor(this.id, "button_switch");
		ICore.Tool.registerWrench(this.id, this);
	}

	readMode(extra: ItemExtraData): number {
		if (!extra) return 0;
		return extra.getInt("mode");
	}

	onIconOverride(item: ItemInstance): Item.TextureData {
		let mode = this.readMode(item.extra);
		return {name: this.icon.name, meta: mode};
	}

	getModeName(mode: number): string {
		switch (mode) {
			case 0:
				return "Hoe"
			case 1:
				return "Treetap"
			case 2:
				return "Wrench"
		}
	}

	onNameOverride(item: ItemInstance, name: string) {
		let mode = this.readMode(item.extra);
		name += ` (${Translation.translate(this.getModeName(mode))})`;
		return super.onNameOverride(item, name);
	}

	onModeSwitch(item: ItemInstance, player: number): void {
		let client = Network.getClientForPlayer(player);
		let extra = item.extra || new ItemExtraData();
		let mode = (extra.getInt("mode") + 1) % 3;
		extra.putInt("mode", mode);
		switch (mode) {
			case 0:
				BlockEngine.sendUnlocalizedMessage(client, "§2", "message.graviTool.hoe");
			break;
			case 1:
				BlockEngine.sendUnlocalizedMessage(client, "§6", "message.graviTool.treetap");
			break;
			case 2:
				BlockEngine.sendUnlocalizedMessage(client, "§b", "message.graviTool.wrench");
			break;
		}
		Entity.setCarriedItem(player, item.id, 1, item.data, extra);
		ICore.Sound.playSoundAtEntity(player, "ToolChange");
	}

	isUseable(item: ItemInstance, damage: number): boolean {
		if (this.readMode(item.extra) < 2) return false;
		let energyStored = ChargeItemRegistry.getEnergyStored(item);
		return energyStored >= 100 * damage;
	}

	useItem(item: ItemStack, damage: number, player: number): void {
		ICore.Tool.useElectricItem(item, 100 * damage, player);
	}

	onItemUse(coords: Callback.ItemUseCoordinates, item: ItemStack, block: Tile, player: number): void {
		let mode = this.readMode(item.extra);
		if (mode == 0 && (block.id == 2 || block.id == 3 || block.id == 110 || block.id == 243) && coords.side == 1 && ICore.Tool.useElectricItem(item, 50, player)) {
			let region = WorldRegion.getForActor(player);
			region.setBlock(coords, 60, 0);
			region.playSound(coords.x + .5, coords.y + 1, coords.z + .5, "step.gravel", 1, 0.8);
		}
		else if (mode == 1 && block.id == BlockID.rubberTreeLogLatex && block.data >= 4 && block.data == coords.side + 2 && ICore.Tool.useElectricItem(item, 50, player)) {
			let region = WorldRegion.getForActor(player);
			ICore.Sound.playSoundAt(coords.vec.x, coords.vec.y, coords.vec.z, "Treetap.ogg");
			region.setBlock(coords, BlockID.rubberTreeLogLatex, block.data - 4);
			Entity.setVelocity(
				region.dropItem(
					coords.relative.x + 0.5,
					coords.relative.y + 0.5,
					coords.relative.z + 0.5,
					ItemID.latex, randomInt(1, 3), 0
				),
				(coords.relative.x - coords.x) * 0.25,
				(coords.relative.y - coords.y) * 0.25,
				(coords.relative.z - coords.z) * 0.25
			);
		}
	}
}