export function renderSearchBar() {
    const searchBar = document.createElement("input");
    searchBar.style.width = "100%";
    searchBar.type = "search";
    searchBar.placeholder = "Search...";
    return searchBar;
}