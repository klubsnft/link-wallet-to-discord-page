import { BodyNode, DomNode, el, msg } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";
import Config from "../Config";
import EthereumWallet from "../ethereum/EthereumWallet";
import Kaikas from "../klaytn/Kaikas";
import Klip from "../klaytn/Klip";

const LINK_WALLET_TO_DISCORD_MSG = "Link wallet to Discord";

export default class MeeCats implements View {

    private code: string | undefined;

    private container: DomNode;
    private discordAccountDisplay: DomNode;

    constructor() {
        BodyNode.append(this.container = el(".meecats-view",
            el("header",
                el("img", { src: "/images/view/meecat/logo_meecats.png", alt: "meeCats" }),
            ),
            el("section",
                el(".img-container",
                    el("img", { src: "/images/view/meecat/title.png", alt: "meeCats" }),
                ),
                el("h6", "AMOUNT"),
                this.discordAccountDisplay = el("p.address"),
                el("p.connect",
                    el(".line"),
                    el("p", "CONNECT"),
                    el(".line"),
                ),
                el(".button-container",
                    el("a",
                        el("img", { src: "/images/view/meecat/btn_metamask.png", alt: "metamask" }),
                        el("p", "Metamask"),
                        {
                            click: async () => {
                                if (this.code !== undefined) {
                                    this.connectToMetamask(this.code);
                                }
                            },
                        },
                    ),
                    el("a",
                        el("img", { src: "/images/view/meecat/btn_kaikas.png", alt: "kaikas" }),
                        el("p", "Kaikas"),
                        {
                            click: async () => {
                                if (this.code !== undefined) {
                                    this.connectToKaikas(this.code);
                                }
                            },
                        },
                    ),
                    el("a",
                        el("img", { src: "/images/view/meecat/btn_klip.png", alt: "klip" }),
                        el("p", "Klip"),
                        {
                            click: async () => {
                                if (this.code !== undefined) {
                                    this.connectToKlip(this.code);
                                }
                            },
                        },
                    ),
                ),
                el("span", "Powered by ", el("a", "KLUBS", { href: "https://klu.bs" }))
            ),
        ));
        this.load();
    }

    private async load() {

        this.code = new URLSearchParams(window.location.search).get("code")!;
        if (this.code !== null) {
            try {
                await fetch(`${Config.apiURI}/discord/token?${new URLSearchParams({
                    code: this.code,
                    redirect_uri: `${window.location.protocol}//${window.location.host}/meecats`,
                })}`);
            } catch (error) {
                console.error(error);
                this.code = undefined;
            }
        } else {
            this.code = undefined;
        }

        if (this.code !== undefined) {
            try {
                const result = await fetch(`${Config.apiURI}/discord/me?${new URLSearchParams({
                    code: this.code,
                })}`);
                const discordUser = await result.json();
                this.discordAccountDisplay.empty().appendText(`${discordUser.username}#${discordUser.discriminator}`);
            } catch (error) {
                console.error(error);
            }
        }

        else {
            location.href = `https://discord.com/api/oauth2/authorize?client_id=${Config.applicationId}&redirect_uri=${encodeURIComponent(`${window.location.protocol}//${window.location.host}/meecats`)}&response_type=code&scope=identify`;
        }
    }

    private async connectToMetamask(code: string) {
        if (await EthereumWallet.connected() !== true) {
            await EthereumWallet.connect();
        }
        const address = await EthereumWallet.loadAddress();
        if (address !== undefined) {
            const signedMessage = await EthereumWallet.signMessage(LINK_WALLET_TO_DISCORD_MSG);
            try {
                const result = await fetch(`${Config.apiURI}/link-wallet-to-discord/metamask`, {
                    method: "POST",
                    body: JSON.stringify({
                        code,
                        signedMessage,
                        address,
                    }),
                });
                if ((await result.json()).linked === true) {
                    alert(msg("HOLDER_CHECK_SUCCESS_DESC"));
                } else {
                    alert(msg("HOLDER_CHECK_FAIL_DESC"));
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    private async connectToKaikas(code: string) {
        if (await Kaikas.connected() !== true) {
            await Kaikas.connect();
        }
        const address = await Kaikas.loadAddress();
        if (address !== undefined) {
            const signedMessage = await Kaikas.signMessage(LINK_WALLET_TO_DISCORD_MSG);
            try {
                const result = await fetch(`${Config.apiURI}/link-wallet-to-discord/kaikas`, {
                    method: "POST",
                    body: JSON.stringify({
                        code,
                        signedMessage,
                        address,
                    }),
                });
                if ((await result.json()).linked === true) {
                    alert(msg("HOLDER_CHECK_SUCCESS_DESC"));
                } else {
                    alert(msg("HOLDER_CHECK_FAIL_DESC"));
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    private async connectToKlip(code: string) {
        if (Klip.connected !== true) {
            await Klip.connect();
        }
        if (Klip.address !== undefined) {
            try {
                const result = await fetch(`${Config.apiURI}/link-wallet-to-discord/klip`, {
                    method: "POST",
                    body: JSON.stringify({
                        code,
                        address: Klip.address,
                    }),
                });
                if ((await result.json()).linked === true) {
                    alert(msg("HOLDER_CHECK_SUCCESS_DESC"));
                } else {
                    alert(msg("HOLDER_CHECK_FAIL_DESC"));
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
