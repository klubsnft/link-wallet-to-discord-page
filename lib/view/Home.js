"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const skydapp_browser_1 = require("skydapp-browser");
const Config_1 = __importDefault(require("../Config"));
const EthereumWallet_1 = __importDefault(require("../ethereum/EthereumWallet"));
const Kaikas_1 = __importDefault(require("../klaytn/Kaikas"));
const Klip_1 = __importDefault(require("../klaytn/Klip"));
const LINK_WALLET_TO_DISCORD_MSG = "Link wallet to Discord";
class Home {
    constructor() {
        skydapp_browser_1.BodyNode.append(this.container = (0, skydapp_browser_1.el)(".home-view", (0, skydapp_browser_1.el)("main", (0, skydapp_browser_1.el)("header", (0, skydapp_browser_1.el)("img", { src: "/images/logo/klubs.png", alt: "klubs" }), (0, skydapp_browser_1.el)("hr"), (0, skydapp_browser_1.el)("h1.title", "Connecting\nMy Wallet to"), (0, skydapp_browser_1.el)("h1.discord", "Discord"), (0, skydapp_browser_1.el)("p", "디스코드 지갑 연결"), (0, skydapp_browser_1.el)("hr")), (0, skydapp_browser_1.el)("article", (0, skydapp_browser_1.el)(".wallet-container", (0, skydapp_browser_1.el)("p", "You logged in as:"), this.discordAccountDisplay = (0, skydapp_browser_1.el)("p.address")), (0, skydapp_browser_1.el)("span", "To connect, click on the wallet icon"), (0, skydapp_browser_1.el)(".button-container", (0, skydapp_browser_1.el)("a.metamask", (0, skydapp_browser_1.el)(".tooltip", "메타마스크"), {
            click: async () => {
                if (this.code !== undefined) {
                    this.connectToMetamask(this.code);
                }
            },
        }), (0, skydapp_browser_1.el)("a.klaytn", (0, skydapp_browser_1.el)(".tooltip", "카이카스"), {
            click: async () => {
                if (this.code !== undefined) {
                    this.connectToKaikas(this.code);
                }
            },
        }), (0, skydapp_browser_1.el)("a.klip", (0, skydapp_browser_1.el)(".tooltip", "클립"), {
            click: async () => {
                if (this.code !== undefined) {
                    this.connectToKlip(this.code);
                }
            },
        }))))));
        this.load();
    }
    async load() {
        this.code = new URLSearchParams(window.location.search).get("code");
        if (this.code !== null) {
            try {
                await fetch(`${Config_1.default.apiURI}/discord/token?${new URLSearchParams({
                    code: this.code,
                    redirect_uri: `${window.location.protocol}//${window.location.host}`,
                })}`);
            }
            catch (error) {
                console.error(error);
                this.code = undefined;
            }
        }
        else {
            this.code = undefined;
        }
        if (this.code !== undefined) {
            try {
                const result = await fetch(`${Config_1.default.apiURI}/discord/me?${new URLSearchParams({
                    code: this.code,
                })}`);
                const discordUser = await result.json();
                this.discordAccountDisplay.empty().appendText(`${discordUser.username}#${discordUser.discriminator}`);
            }
            catch (error) {
                console.error(error);
            }
        }
        else {
            location.href = `https://discord.com/api/oauth2/authorize?client_id=${Config_1.default.applicationId}&redirect_uri=${encodeURIComponent(`${window.location.protocol}//${window.location.host}`)}&response_type=code&scope=identify`;
        }
    }
    async connectToMetamask(code) {
        if (await EthereumWallet_1.default.connected() !== true) {
            await EthereumWallet_1.default.connect();
        }
        const address = await EthereumWallet_1.default.loadAddress();
        if (address !== undefined) {
            const signedMessage = await EthereumWallet_1.default.signMessage(LINK_WALLET_TO_DISCORD_MSG);
            try {
                const result = await fetch(`${Config_1.default.apiURI}/link-wallet-to-discord/metamask`, {
                    method: "POST",
                    body: JSON.stringify({
                        code,
                        signedMessage,
                        address,
                    }),
                });
                if ((await result.json()).linked === true) {
                    alert((0, skydapp_browser_1.msg)("HOLDER_CHECK_SUCCESS_DESC"));
                }
                else {
                    alert((0, skydapp_browser_1.msg)("HOLDER_CHECK_FAIL_DESC"));
                }
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    async connectToKaikas(code) {
        if (await Kaikas_1.default.connected() !== true) {
            await Kaikas_1.default.connect();
        }
        const address = await Kaikas_1.default.loadAddress();
        if (address !== undefined) {
            const signedMessage = await Kaikas_1.default.signMessage(LINK_WALLET_TO_DISCORD_MSG);
            try {
                const result = await fetch(`${Config_1.default.apiURI}/link-wallet-to-discord/kaikas`, {
                    method: "POST",
                    body: JSON.stringify({
                        code,
                        signedMessage,
                        address,
                    }),
                });
                if ((await result.json()).linked === true) {
                    alert((0, skydapp_browser_1.msg)("HOLDER_CHECK_SUCCESS_DESC"));
                }
                else {
                    alert((0, skydapp_browser_1.msg)("HOLDER_CHECK_FAIL_DESC"));
                }
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    async connectToKlip(code) {
        if (Klip_1.default.connected !== true) {
            await Klip_1.default.connect();
        }
        if (Klip_1.default.address !== undefined) {
            try {
                const result = await fetch(`${Config_1.default.apiURI}/link-wallet-to-discord/klip`, {
                    method: "POST",
                    body: JSON.stringify({
                        code,
                        address: Klip_1.default.address,
                    }),
                });
                if ((await result.json()).linked === true) {
                    alert((0, skydapp_browser_1.msg)("HOLDER_CHECK_SUCCESS_DESC"));
                }
                else {
                    alert((0, skydapp_browser_1.msg)("HOLDER_CHECK_FAIL_DESC"));
                }
            }
            catch (error) {
                console.error(error);
            }
        }
    }
    changeParams(params, uri) { }
    close() {
        this.container.delete();
    }
}
exports.default = Home;
//# sourceMappingURL=Home.js.map