import { BodyNode, DomNode, el } from "skydapp-browser";
import { View, ViewParams } from "skydapp-common";


export default class Home implements View {

    private container: DomNode;

    private walletAddressDisplay: DomNode;

    constructor() {
        BodyNode.append(
            this.container = el(".home-view",
                el("header",
                    el("h1", "CONNECT DISCORD WALLET"),
                    this.walletAddressDisplay = el("p", "Logged in as: "),
                ),
                el("article",
                    el("img", { src: "/images/logo/klubs.svg", alt: "KLUBS LOGO" }),
                    el(".button-container",
                        el("a", "메타마스크 연결"),
                        el("a", "카이카스 연결"),
                        el("a", "클립 연결"),
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
