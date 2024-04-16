import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("mf-app-one")
export class MyEl extends LitElement {
  constructor() {
    super();
  }

  static styles = css`
    p {
      color: blue;
    }
  `;

  render() {
    return html`<div>Works!</div> `;
  }
}
