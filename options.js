var radio = document.form.option;

for (var i = 0; i < radio.length; i++) {
    radio[i].onclick = function () {
        saveOptions(this.value);
    };
}

function saveOptions(value) {
    browser.storage.local.set({
        "option": value
    });
}

function restoreOptions() {
    var storageItem = browser.storage.local.get("option");
    storageItem.then((res) => {
        if (res.option) {
            radio.value = res.option || "allButCur";
        }
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);