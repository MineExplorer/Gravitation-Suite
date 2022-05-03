class GraviTool extends ElectricTool
implements IWrech, IModeSwitchable {
	constructor() {
		super("graviTool", "gravi_tool", 300000, 10000, 3);
		this.setToolParams({energyPerUse: 50, level: 4, efficiency: 16.2, blockMaterials: ["plant"]});
		this.setRarity(EnumRarity.UNCOMMON);
		ICore.UI.setButtonFor(this.id, "button_switch");
		ICore.Tool.registerWrench(this.id, this);

		ModAPI.addAPICallback("RedCore", (api: any) => {
			api.Machine.registerScrewdriver(this.id, {
				canBeUsed: (item: ItemInstance) => this.canBeUsedAsScrewdriver(item),
				useItem: (item: ItemStack, player: number) => this.useAsScrewdriver(item, player)
			});
		});
	}

	readMode(extra: ItemExtraData): number {
		if (!extra) return 0;
		return extra.getInt("mode");
	}

	onIconOverride(item: ItemInstance): Item.TextureData {
		const mode = this.readMode(item.extra);
		return {name: this.icon.name, meta: mode};
	}

	getModeName(mode: number): string {
		switch (mode) {
			case 0:
				return "mode.hoe"
			case 1:
				return "mode.treetap"
			case 2:
				return "mode.wrench"
			case 3:
				return "mode.screwdriver"
		}
	}

	onNameOverride(item: ItemInstance, name: string) {
		const mode = this.readMode(item.extra);
		name += ` (${Translation.translate(this.getModeName(mode))})`;
		return super.onNameOverride(item, name);
	}

	onModeSwitch(item: ItemInstance, player: number): void {
		const client = Network.getClientForPlayer(player);
		const extra = item.extra || new ItemExtraData();
		const mode = (extra.getInt("mode") + 1) % 4;
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
			case 3:
				BlockEngine.sendUnlocalizedMessage(client, "§5", "message.graviTool.screwdriver");
			break;
		}
		Entity.setCarriedItem(player, item.id, 1, item.data, extra);
		ICore.Sound.playSoundAtEntity(player, "ToolChange", 0.6);
	}

	isUseable(item: ItemInstance, damage: number): boolean {
		if (this.readMode(item.extra) < 2) return false;
		const energyStored = ChargeItemRegistry.getEnergyStored(item);
		return energyStored >= 100 * damage;
	}

	useItem(item: ItemStack, damage: number, player: number): void {
		ICore.Tool.useElectricItem(item, 100 * damage, player);
	}

	canBeUsedAsScrewdriver(item: ItemInstance): boolean {
		return this.readMode(item.extra) == 3 && ChargeItemRegistry.getEnergyStored(item) >= this.energyPerUse;
    }

	useAsScrewdriver(item: ItemStack, player: number): void {
        const energyStored = ChargeItemRegistry.getEnergyStored(item);
        ChargeItemRegistry.setEnergyStored(item, energyStored - this.energyPerUse);
        Entity.setCarriedItem(player, item.id, 1, item.data, item.extra);
    }

	onAttack(item: ItemInstance, victim: number, attacker: number): boolean {
		if (this.readMode(item.extra) == 0) {
			this.damage = 4;
			return super.onAttack(item, attacker, victim);
		}
		this.damage = 0;
		return true;
	}

	onDestroy(item: ItemInstance, coords: Callback.ItemUseCoordinates, block: Tile, player: number): boolean {
		if (this.readMode(item.extra) == 0) super.onDestroy(item, coords, block, player);
		return true;
	}

	calcDestroyTime(item: ItemInstance, coords: Callback.ItemUseCoordinates, block: Tile, params: {base: number, devider: number, modifier: number}, destroyTime: number): number {
		if (this.readMode(item.extra) == 0) {
			return super.calcDestroyTime(item, coords, block, params, destroyTime);
		}
		return params.base;
	}

	onItemUse(coords: Callback.ItemUseCoordinates, item: ItemStack, block: Tile, player: number): void {
		const mode = this.readMode(item.extra);
		if (mode == 0 && (block.id == 2 || block.id == 3 || block.id == 110 || block.id == 243) && coords.side != 0 && ICore.Tool.useElectricItem(item, 50, player)) {
			const region = WorldRegion.getForActor(player);
			region.setBlock(coords, 60, 0);
			region.playSound(coords.x + .5, coords.y + 1, coords.z + .5, "step.gravel", 1, 0.8);
		}
		else if (mode == 1 && block.id == BlockID.rubberTreeLogLatex && block.data >= 4 && block.data == coords.side + 2 && ICore.Tool.useElectricItem(item, 50, player)) {
			const region = WorldRegion.getForActor(player);
			ICore.Sound.playSoundAt(coords.vec.x, coords.vec.y, coords.vec.z, "Treetap.ogg");
			region.setBlock(coords, BlockID.rubberTreeLogLatex, block.data - 4);
			Entity.setVelocity(
				region.dropItem(
					coords.relative.x + 0.5,
					coords.relative.y + 0.5,
					coords.relative.z + 0.5,
					ItemID.latex, MathUtil.randomInt(1, 3), 0
				),
				(coords.relative.x - coords.x) * 0.25,
				(coords.relative.y - coords.y) * 0.25,
				(coords.relative.z - coords.z) * 0.25
			);
		}
	}
}