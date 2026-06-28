import Phaser from "phaser";

export default class GameLoader extends Phaser.Scene {
	constructor() {
		super({ key: "GameLoader" });
	}
	preload() {
		//this.load.image("menu_bg", "game/images/menuscreen.png");
		//this.load.image("mainlogo", "game/images/mainlogo.png");
		//this.load.audio("maintheme", "game/music/maintheme.mp3");
	}
	create() {
		//define UI color palette
		window.gameState.uiBackground = 0x78776f;
		window.gameState.trackBorder = 0xffffff;
		window.gameState.trackFill = window.gameState.uiBackground;
		window.gameState.widgetBorder = 0x080808;
		window.gameState.widgetForeground = 0xf2f2f2;
		window.gameState.widgetGlow = 0xffe845;
		window.gameState.widgetWarning = 0xff0000;
		window.gameState.widgetTextColor = "#080808";
		window.gameState.lightTextColor = "#f2f2f2";
		window.gameState.widgetFont = "LeagueSpartan";
		window.gameState.eventForeground = 0xffffff;
		window.gameState.eventTextColor = window.gameState.widgetTextColor;
		window.gameState.eventFont = "Courier New";
		window.gameState.superLineColor = 0x14df00;
		window.gameState.adminTextColor = "#decc37";
		window.gameState.engTextColor = "#c2640a";
		window.gameState.sciTextColor = "#00b9ff";
		window.gameState.opsTextColor = "#fe0000";
		window.gameState.greenTextColor = "#00c000";

		//window.gameState.menu_bg = this.add.image(160, 0, "menu_bg");
		//window.gameState.menu_bg.setOrigin(0, 0);

		//window.gameState.mainlogo = this.add.image(333, 125, "mainlogo");
		//window.gameState.mainlogo.setOrigin(0, 0);

		const loader = new Phaser.Loader.LoaderPlugin(this);

		const progressBar = this.add.graphics();
		const progressBox = this.add.graphics();
		progressBox.fillStyle(0x222222, 0.8);
		progressBox.fillRect(390, 400, 500, 60);

		const width = this.cameras.main.width;
		const loadingText = this.make
			.text({
				x: width / 2,
				y: 430,
				text: "Loading...",
				style: {
					font: "18px LeagueSpartan",
					color: "#FFFFFF",
				},
			})
			.setResolution(2);
		loadingText.setOrigin(0.5, 0.5);
		window.gameState.dateFormat = "MM/dd/yyyy";

		loader.on("progress", (value: any) => {
			console.log(value);
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(400, 410, 480 * value, 40);
		});

		loader.on("fileprogress", (file: any) => {
			console.log(file.src);
			loadingText.setText(`Loading asset: ${file.src}`);
		});
		loader.on("complete", () => {
			console.log("complete");
			this.scene.stop("GameLoader");
			this.scene.start("MainMenu");
		});

		//example of how to load .json
		loader.json("dialogues", "game/data/dialogues.json");
		loader.json("items", "game/data/items.json");
		loader.json("rooms", "game/data/rooms.json");
		loader.json("world_objects", "game/data/world_objects.json");

		//example of how to load image
		loader.image("example_image", "game/images/example_image.png");

		//eample of how to load audio
		loader.audio("example_audio", "game/sfx/example_audio.mp3");

		loader.start();
	}
}
