export function createTitle(titleStr: string) {
    const title = document.createElement("h1");
    title.innerHTML = `
        <strong>${titleStr}</strong>
    `

    return title;
}