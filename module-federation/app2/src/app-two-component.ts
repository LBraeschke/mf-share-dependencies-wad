type Scope = unknown;
import { Task } from "@lit/task";
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { interval } from "rxjs";
declare const __webpack_init_sharing__: (shareScope: string) => Promise<void>;
declare const __webpack_share_scopes__: { default: Scope };

@customElement("mf-app-two")
export class MyEl extends LitElement {
  private _getDataTask = new Task(this, {
    task: loadCounter,
    args: () => [],
  });

  constructor() {
    super();

    // lib has to be used other wise it will not be distributed
    // https://github.com/webpack/webpack/issues/15164
    interval(1000).subscribe(async (val) => {
      this.requestUpdate();
    });
  }

  @property()
  counter = 0;

  render() {
    return html`<p>Shared Counter : <mf-shared-counter></mf-shared-counter></p>`;
  }
}
async function loadCounter() {
  await __webpack_init_sharing__("default");
  const script = document.createElement("script");
  script.src = "../app1/dist/counter.js";

  script.onload = async () => {
    const container = (window as any)["app1"];
    await container.init(__webpack_share_scopes__.default);
    (await container.get("./Counter"))();
  };

  document.body.appendChild(script);
}
