import { BodyNode, DomNode, el } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";


export default class Home implements View {

    private container: DomNode;

    private walletAddressDisplay: DomNode;

    constructor() {
        BodyNode.append(
            this.container = el(".home-view",
                el("header",
                    el("img", { src: "/images/logo/klubs.png", alt: "klubs" }),
                    el("hr"),
                    el("h1.title", "Connecting\nMy Wallet to"),
                    el("h1.discord", "Discord"),
                    el("p", "디스코드 지갑 연결"),
                    el("hr"),
                ),
                el("article",
                    el(".wallet-container",
                        el("p", "You logged in as:"),
                        this.walletAddressDisplay = el("p.address", "YJ#8436"),
                    ),
                    el("span", "To connect, click on the wallet icon"),
                    el(".button-container",
                        el("a.metamask",
                            el(".tooltip", "메타마스크")
                        ),
                        el("a.klaytn",
                            el(".tooltip", "카이카스"),
                        ),
                        el("a.klip",
                            el(".tooltip", "클립"),
                        ),
                    ),
                ),
            )
        );
    }

    public changeParams(params: ViewParams, uri: string): void { }

    public close(): void {
        this.container.delete();
    }
}
