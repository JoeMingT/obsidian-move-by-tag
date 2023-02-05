import { ManageFilesByTagModal } from "modals";
import { Modal } from "obsidian";

export function renderBasicButton(buttonText: string) {
    const button = document.createElement('button');
    button.className = `manage-by-tags-${buttonText.toLowerCase()}-button`;
    button.setText(`${buttonText}`);
    button.style.padding = "5px 10px";
    button.style.margin = "5px 10px";
    return button;

}