"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
class Home {
    constructor() {
        skydapp_browser_1.BodyNode.append(this.container = (0, skydapp_browser_1.el)(".home-view", (0, skydapp_browser_1.el)("header", (0, skydapp_browser_1.el)("img", { src: "/images/logo/klubs.png", alt: "klubs" }), (0, skydapp_browser_1.el)("hr"), (0, skydapp_browser_1.el)("h1.title", "Connecting\nMy Wallet to"), (0, skydapp_browser_1.el)("h1.discord", "Discord"), (0, skydapp_browser_1.el)("p", "디스코드 지갑 연결"), (0, skydapp_browser_1.el)("hr")), (0, skydapp_browser_1.el)("article", (0, skydapp_browser_1.el)(".wallet-container", (0, skydapp_browser_1.el)("p", "You logged in as:"), this.walletAddressDisplay = (0, skydapp_browser_1.el)("p.address", "YJ#8436")), (0, skydapp_browser_1.el)("span", "To connect, click on the wallet icon"), (0, skydapp_browser_1.el)(".button-container", (0, skydapp_browser_1.el)("a.metamask", (0, skydapp_browser_1.el)(".tooltip", "메타마스크")), (0, skydapp_browser_1.el)("a.klaytn", (0, skydapp_browser_1.el)(".tooltip", "카이카스")), (0, skydapp_browser_1.el)("a.klip", (0, skydapp_browser_1.el)(".tooltip", "클립"))))));
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Home;
//# sourceMappingURL=Home.js.map