"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
class KlipQRPopup extends skydapp_browser_1.Popup {
    constructor(dataURL) {
        super(".popup-background");
        this.append(this.content = (0, skydapp_browser_1.el)(".klip-qr-popup", (0, skydapp_browser_1.el)("h2", (0, skydapp_browser_1.msg)("KLIP_POPUP_TITLE")), (0, skydapp_browser_1.el)("hr"), (0, skydapp_browser_1.el)(".qr", (0, skydapp_browser_1.el)("img", { src: dataURL })), (0, skydapp_browser_1.el)("hr"), (0, skydapp_browser_1.el)("p", (0, skydapp_browser_1.msg)("KLIP_POPUP_DESC1")), (0, skydapp_browser_1.el)("p", (0, skydapp_browser_1.msg)("KLIP_POPUP_DESC2")), (0, skydapp_browser_1.el)("p", (0, skydapp_browser_1.msg)("KLIP_POPUP_DESC3")), (0, skydapp_browser_1.el)(".button-container", (0, skydapp_browser_1.el)("button", (0, skydapp_browser_1.msg)("CONFIRM_BUTTON"), {
            click: () => this.delete(),
        }))));
    }
}
exports.default = KlipQRPopup;
//# sourceMappingURL=KlipQRPopup.js.map