import Phaser from "phaser";

export default class GameLoader extends Phaser.Scene {
	constructor() {
		super({ key: "GameLoader" });
	}
	preload() {
		this.load.image("menu_bg", "game/images/menuscreen.png");
		this.load.image("mainlogo", "game/images/mainlogo.png");
		this.load.audio("maintheme", "game/music/maintheme.mp3");
	}
	create() {
		//define UI color palette
		gameState.uiBackground = 0x78776f;
		gameState.trackBorder = 0xffffff;
		gameState.trackFill = gameState.uiBackground;
		gameState.widgetBorder = 0x080808;
		gameState.widgetForeground = 0xf2f2f2;
		gameState.widgetGlow = 0xffe845;
		gameState.widgetWarning = 0xff0000;
		gameState.widgetTextColor = "#080808";
		gameState.lightTextColor = "#f2f2f2";
		gameState.widgetFont = "LeagueSpartan";
		gameState.eventForeground = 0xffffff;
		gameState.eventTextColor = gameState.widgetTextColor;
		gameState.eventFont = "Courier New";
		gameState.superLineColor = 0x14df00;
		gameState.adminTextColor = "#decc37";
		gameState.engTextColor = "#c2640a";
		gameState.sciTextColor = "#00b9ff";
		gameState.opsTextColor = "#fe0000";
		gameState.greenTextColor = "#00c000";

		gameState.menu_bg = this.add.image(160, 0, "menu_bg");
		gameState.menu_bg.setOrigin(0, 0);

		gameState.mainlogo = this.add.image(333, 125, "mainlogo");
		gameState.mainlogo.setOrigin(0, 0);

		this.sound.play("maintheme", { seek: 22 });

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
					fill: "#FFFFFF",
				},
			})
			.setResolution(2);
		loadingText.setOrigin(0.5, 0.5);
		gameState.dateFormat = "MM/dd/yyyy";

		loader.on("progress", (value) => {
			console.log(value);
			progressBar.clear();
			progressBar.fillStyle(0xffffff, 1);
			progressBar.fillRect(400, 410, 480 * value, 40);
		});

		loader.on("fileprogress", (file) => {
			console.log(file.src);
			loadingText.setText(`Loading asset: ${file.src}`);
		});
		loader.on("complete", () => {
			console.log("complete");
			this.scene.stop("GameLoader");
			this.scene.start("MainMenu");
		});

		//example of how to load .json
		loader.json("events", "game/data/events.json");

		//example of how to load image
		loader.image("blank_portrait", "game/images/blank_portrait.png");

		//eample of how to load audio
		loader.audio(
			"super_trabant_crisis_sfx",
			"game/sfx/super_trabant_crisis_sfx.mp3",
		);

		loader.start();
	}
}
