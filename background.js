function closeAll() {
	var storageItem = browser.storage.local.get("option");
	storageItem.then((res) => {
		var option = res.option || "allButCur";
		performAction(option);
	});
}

function performAction(option) {
	var action = closeAllTabs;
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
	var index = [];
	for (var tab of tabs) {
		if (!tab.active) {
			index.push(tab.id);
		}
	}
	browser.tabs.remove(index)
}

function closeAllTabs(tabs) {
	var index = [];
	for (var tab of tabs) {
		index.push(tab.id);
	}
	browser.tabs.remove(index)
}

function closeAllAndOpenNew(tabs) {
	browser.tabs.create({
		active: true
	});
	closeAllTabs(tabs);
}

function closeLeftTabs(tabs) {
	var index = [];
	for (var tab of tabs) {
		if (!tab.active) {
			index.push(tab.id);
		} else {
			break;
		}
	}
	browser.tabs.remove(index);
}

function closeRightTabs(tabs) {
	var index = [];
	var rtabs = tabs.reverse()
	for (var tab of rtabs) {
		if (!tab.active) {
			index.push(tab.id);
		} else {
			break;
		}
	}
	browser.tabs.remove(index);
}

function menuClicked(info, tab) {
	performAction(info.menuItemId);
}

browser.contextMenus.create({
	id: "all",
	title: "Close All Tabs",
	contexts: ["all"]
});

browser.contextMenus.create({
	id: "allButCur",
	title: "Close All Tabs Except Current",
	contexts: ["all"]
});

browser.contextMenus.create({
	id: "allNew",
	title: "Close All Tabs and Open New",
	contexts: ["all"]
});

browser.contextMenus.create({
	id: "right",
	title: "Close Tabs on the Right",
	contexts: ["all"]
});

browser.contextMenus.create({
	id: "left",
	title: "Close Tabs on the Left",
	contexts: ["all"]
});

browser.browserAction.onClicked.addListener(closeAll);

browser.contextMenus.onClicked.addListener(menuClicked);