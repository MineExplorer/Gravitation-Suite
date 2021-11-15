class AdvancedDrill extends ToolDrill
implements IModeSwitchable {
	constructor() {
		super("advancedDDrill", "advanced_diamond_drill", {energyPerUse: 160, level: 4, efficiency: 21.6, damage: 3}, 45000, 2000, 2);
		this.setRarity(EnumRarity.UNCOMMON);
		ICore.UI.setButtonFor(this.id, "button_switch");
	}

	getEnergyPerUse(item: ItemInstance): number {
		switch (this.readMode(item.extra)) {
			case 1:
				return 80;
			case 2:
				return 50;
			default:
				return this.energyPerUse;
		}
	}

	readMode(extra: ItemExtraData): number {
		if (!extra) return 0;
		return extra.getInt("mode");
	}

	getModeName(mode: number): string {
		switch (mode) {
			case 0:
				return "message.advancedDrill.normal";
			case 1:
				return "message.advancedDrill.lowPower";
			case 2:
				return "message.advancedDrill.fine";
			case 3:
				return "message.advancedDrill.bigHoles";
		}
	}

	getModeChatColor(mode: number): string {
		switch (mode) {
			case 0:
				return "§2";
			case 1:
				return "§6";
			case 2:
				return "§b";
			case 3:
				return "§5";
		}
	}

	onNameOverride(item: ItemInstance, name: string): string {
		name = super.onNameOverride(item, name);
		const mode = this.readMode(item.extra);
		const tooltip = this.getModeChatColor(mode) + Translation.translate("Mode: ") + Translation.translate(this.getModeName(mode));
		return name + "\n" + tooltip;
	}

	onModeSwitch(item: ItemInstance, player: number): void {
		const client = Network.getClientForPlayer(player);
		const extra = item.extra || new ItemExtraData();
		const mode = (extra.getInt("mode") + 1) % 4;
		extra.putInt("mode", mode);
		BlockEngine.sendUnlocalizedMessage(client, this.getModeChatColor(mode), "Mode: ", this.getModeName(mode));
		Entity.setCarriedItem(player, item.id, 1, item.data, extra);
	}

	getOperationRadius(side: number): Vector {
		const rad = {x: 1, y: 1, z: 1};
		if (side == BlockSide.EAST || side == BlockSide.WEST)
			rad.x = 0;
		if (side == BlockSide.UP || side == BlockSide.DOWN)
			rad.y = 0;
		if (side == BlockSide.NORTH || side == BlockSide.SOUTH)
			rad.z = 0;
		return rad;
	}

	calcDestroyTime(item: ItemInstance, coords: Callback.ItemUseCoordinates, block: Tile, params: {base: number, devider: number, modifier: number}, destroyTime: number): number {
		if (ChargeItemRegistry.getEnergyStored(item) >= this.getEnergyPerUse(item)) {
			const mode = this.readMode(item.extra);
			const material = ToolAPI.getBlockMaterialName(block.id);
			if (mode == 1) return destroyTime * 1.35;
			if (mode == 2) return destroyTime * 2.7;
			if (mode == 3 && (material == "dirt" || material == "stone")) {
				let maxDestroyTime = 0;
				const rad = this.getOperationRadius(coords.side);
				for (let xx = coords.x - rad.x; xx <= coords.x + rad.x; xx++)
				for (let yy = coords.y - rad.y; yy <= coords.y + rad.y; yy++)
				for (let zz = coords.z - rad.z; zz <= coords.z + rad.z; zz++) {
					const blockID = World.getBlockID(xx, yy, zz);
					const material = ToolAPI.getBlockMaterial(blockID);
					if (material && (material.name == "dirt" || material.name == "stone")) {
						let destroyTime = Block.getDestroyTime(blockID) / material.multiplier;
						if (ToolAPI.getBlockDestroyLevel(blockID) <= this.toolMaterial.level) {
							destroyTime /= this.toolMaterial.efficiency;
						}
						maxDestroyTime = Math.max(destroyTime, maxDestroyTime);
					}
				}
				return maxDestroyTime;
			}
			return destroyTime;
		}
		return params.base;
	}

	onDestroy(item: ItemInstance, coords: Callback.ItemUseCoordinates, block: Tile, player: number): boolean {
		this.playDestroySound(item, block, player);
		const region = WorldRegion.getForActor(player);
		const mode = this.readMode(item.extra);
		let material = ToolAPI.getBlockMaterialName(block.id);
		const energyStored = ChargeItemRegistry.getEnergyStored(item);
		if (mode == 3 && (material == "dirt" || material == "stone") && energyStored >= this.energyPerUse) {
			let consume = 0;
			const rad = this.getOperationRadius(coords.side);
			for (let xx = coords.x - rad.x; xx <= coords.x + rad.x; xx++)
			for (let yy = coords.y - rad.y; yy <= coords.y + rad.y; yy++)
			for (let zz = coords.z - rad.z; zz <= coords.z + rad.z; zz++) {
				if (xx == coords.x && yy == coords.y && zz == coords.z) {
					continue;
				}
				const blockID = region.getBlockId(xx, yy, zz);
				material = ToolAPI.getBlockMaterialName(blockID);
				if (material == "dirt" || material == "stone") {
					consume += this.energyPerUse;
					region.destroyBlock(xx, yy, zz, true, player);
					if (energyStored < consume + this.energyPerUse) {
						ICore.Tool.dischargeItem(item, consume, player);
						return true;
					}
				}
			}
			if (consume > 0) ICore.Tool.dischargeItem(item, consume, player);
		}
		return true;
	}
}
