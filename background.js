function closeAll() {
	var storageItem = browser.storage.local.get("option");
	storageItem.then((res) => {
		var option = res.option || "allButCur";
		performAction(option);
	});
}

function performAction(option) {
	switch (option) {
		case "all":
			action = closeAllTabs;
			break;

		case "allButCur":
			action = closeAllExceptActive;
			break;

		case "allNew":
			action = closeAllAndOpenNew;
			break;

		case "left":
			action = closeLeftTabs;
			break;

		case "right":
			action = closeRightTabs;
			break;
	}
	browser.tabs.query({
		currentWindow: true,
		pinned: false
	}, action);
}

function closeAllExceptActive(tabs) {
	var indices = [];
	for (var tab of tabs) {
		if (!tab.active) {
			indices.push(tab.id);
		}
	}
	if (indices.length) {
		browser.tabs.remove(indices)
	}
}

function closeAllTabs(tabs) {
	var indices = [];
	for (var tab of tabs) {
		indices.push(tab.id);
	}
	if (indices.length) {
		browser.tabs.remove(indices)
	}
}

function closeAllAndOpenNew(tabs) {
	browser.tabs.create({
		active: true
	});
	closeAllTabs(tabs);
}

function closeLeftTabs(tabs) {
	var indices = [];
	for (var tab of tabs) {
		if (!tab.active) {
			indices.push(tab.id);
		} else {
			break;
		}
	}
	if (indices.length) {
		browser.tabs.remove(indices)
	}
}

function closeRightTabs(tabs) {
	var indices = [];
	var rtabs = tabs.reverse()
	for (var tab of rtabs) {
		if (!tab.active) {
			indices.push(tab.id);
		} else {
			break;
		}
	}
	if (indices.length) {
		browser.tabs.remove(indices)
	}
}

function menuClicked(info, tab) {
	performAction(info.menuItemId);
}

browser.contextMenus.create({
	id: "all",
	title: "Close All Tabs",
	contexts: ["page", "tab"]
});

browser.contextMenus.create({
	id: "allButCur",
	title: "Close Other Tabs",
	contexts: ["page", "tab"]
});

browser.contextMenus.create({
	id: "allNew",
	title: "Close All Tabs and Open New",
	contexts: ["page", "tab"]
});

browser.contextMenus.create({
	id: "right",
	title: "Close Tabs to the Right",
	contexts: ["page", "tab"]
});

browser.contextMenus.create({
	id: "left",
	title: "Close Tabs to the Left",
	contexts: ["page", "tab"]
});

browser.browserAction.onClicked.addListener(closeAll);

browser.contextMenus.onClicked.addListener(menuClicked);