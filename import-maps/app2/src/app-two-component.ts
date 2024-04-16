import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { interval } from "rxjs";

@customElement("map-app-two")
export class MyEl extends LitElement {
  constructor() {
    super();

    //emit value in sequence every 1 second
    interval(1000).subscribe(async (val) => {
      this.counter = val;
      this.requestUpdate()
    });
  }

  static styles = css`
    p {
      color: red;
    }
  `;

  @property()
  counter = 0;

  render() {
    return html`<p>Counter: ${this.counter}</p>`;
  }
}
