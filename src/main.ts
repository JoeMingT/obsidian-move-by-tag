import { DisplayTagsModal, ManageFilesByTagModal } from "./modals";
import { Plugin } from "obsidian";

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: "default",
};

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		this.addCommand({
			id: "display-all-tags-in-vault",
			name: "Display All Tags In Vault",
			callback: () => {
				new DisplayTagsModal(this.app).open();
			},
		});

		this.addCommand({
			id: "manage-files-by-tags",
			name: "Manage Files By Tags",
			callback: () => {
				new ManageFilesByTagModal(this.app).open();
			},
		});
	}

	onunload() {}

	async loadSettings() {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}
