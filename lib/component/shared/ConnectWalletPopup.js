"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const Klip_1 = __importDefault(require("../../klaytn/Klip"));
class ConnectWalletPopup extends skydapp_browser_1.Popup {
    constructor(callback) {
        super(".popup-background");
        this.append(this.content = (0, skydapp_browser_1.el)(".connect-wallet-popup", (0, skydapp_browser_1.el)("h2", (0, skydapp_browser_1.msg)("CONNECT_WALLET_TITLE")), (0, skydapp_browser_1.el)("hr"), (0, skydapp_browser_1.el)("p", (0, skydapp_browser_1.msg)("CONNECT_WALLET_DESC")), (0, skydapp_browser_1.el)(".button-container", (0, skydapp_browser_1.el)("a.connect-kaikas-button", (0, skydapp_browser_1.el)("img", { src: "/images/logo/kaikas.svg" }), (0, skydapp_browser_1.msg)("CONNECT_WALLET_BUTTON1"), { href: "https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi", target: "_blank" }), (0, skydapp_browser_1.el)("a.connect-klip-button", (0, skydapp_browser_1.el)("img", { src: "/images/logo/klip.svg" }), (0, skydapp_browser_1.msg)("CONNECT_WALLET_BUTTON2"), {
            click: async () => {
                await Klip_1.default.connect();
                callback();
                this.delete();
            },
        }), (0, skydapp_browser_1.el)("a.button.cancel-button", (0, skydapp_browser_1.msg)("CONNECT_WALLET_BUTTON3"), {
            click: () => this.delete(),
        }))));
    }
}
exports.default = ConnectWalletPopup;
//# sourceMappingURL=ConnectWalletPopup.js.map