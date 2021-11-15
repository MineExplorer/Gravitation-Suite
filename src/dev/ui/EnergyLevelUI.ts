namespace EnergyLevelUI {
	const data = [];

	export function setFor(id: number): void{
		data.push(id);
	}

	export function isEnabledFor(id: number): boolean {
		return data.indexOf(id) != -1;
	}

	export let container: UI.Container = null;
	export const window = getWindow();

	function getWindow(): UI.Window {
		const position = __config__.getString("energy_text.pos");
		const scale = __config__.getNumber("energy_text.scale").intValue();
		const posX = {left: 5, center: 500 - scale/2, right: 1000 - scale}[position];
		const posY = __config__.getNumber("energy_text.y").intValue();
		const window = new UI.Window({
			location: {
				x: posX,
				y: posY,
				width: scale,
				height: 30
			},
			drawing: [{type: "background", color: 0}],
			elements: {
				"text1": {type: "text", font: {size: 85, color: android.graphics.Color.WHITE}, x: 0, y: 0, width: 300, height: 30, text: "Energy level: "},
				"text2": {type: "text", font: {size: 85, color: android.graphics.Color.GREEN}, x: 725, y: 0, width: 300, height: 30, text: "100%"},
			}
		});
		window.setAsGameOverlay(true);
		return window;
	}

	function onUpdate(): void {
		const armor = Player.getArmorSlot(1);
		if (isEnabledFor(armor.id) && currentUIscreen == "in_game_play_screen") {
			if (!container || !container.isOpened()) {
				container = new UI.Container();
				container.openAs(window);
			}
			const maxCharge = ChargeItemRegistry.getMaxCharge(armor.id);
			const energyStored = ChargeItemRegistry.getEnergyStored(armor);
			const charge = Math.ceil(energyStored/maxCharge*100);
			const element = window.getContent().elements.text2 as UI.UITextElement;
			if (charge <= 1) {
				element.font.color = android.graphics.Color.RED;
			} else if (charge <= 10) {
				element.font.color = android.graphics.Color.YELLOW;
			} else {
				element.font.color = android.graphics.Color.GREEN;
			}
			container.setText("text2", charge + "%");
		}
		else if (container) {
			container.close();
			container = null;
		}
	}

	let currentUIscreen: string;
	Callback.addCallback("NativeGuiChanged", function(screenName) {
		currentUIscreen = screenName;
		if (screenName != "in_game_play_screen" && container) {
			container.close();
			container = null;
		}
	});

	Callback.addCallback("LocalTick", onUpdate);
}
