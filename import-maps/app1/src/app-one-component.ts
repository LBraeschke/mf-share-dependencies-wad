import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { interval } from "rxjs";

@customElement("map-app-one")
export class MyEl extends LitElement {
  constructor() {
    super();

    //emit value in sequence every 1 second
    interval(1000).subscribe(async (val) => {
      this.animateCounter(val);
    });
  }

  static styles = css`
    .counter-container {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100px;
      font-size: 2.5rem;
      font-family: "Segoe UI", Arial, sans-serif;
      background: linear-gradient(90deg, #ffecd2 0%, #fcb69f 100%);
      border-radius: 16px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
      margin: 32px auto;
      width: fit-content;
      position: relative;
      overflow: hidden;
    }
    .counter {
      color: #fff;
      background: linear-gradient(90deg, #2193b0 0%, #6dd5ed 100%);
      padding: 0.5em 1.2em;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(33, 147, 176, 0.15);
      animation: pop 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55);
      transition: background 0.3s;
      font-weight: bold;
      letter-spacing: 2px;
      position: relative;
      z-index: 1;
    }
    @keyframes pop {
      0% {
        transform: scale(1);
      }
      40% {
        transform: scale(1.3);
      }
      60% {
        transform: scale(0.95);
      }
      100% {
        transform: scale(1);
      }
    }
    .sparkle {
      position: absolute;
      width: 16px;
      height: 16px;
      pointer-events: none;
      animation: sparkle 0.7s linear forwards;
      z-index: 2;
    }
    @keyframes sparkle {
      0% {
        opacity: 1;
        transform: scale(0.5) rotate(0deg);
      }
      80% {
        opacity: 1;
      }
      100% {
        opacity: 0;
        transform: scale(1.5) rotate(180deg);
      }
    }
  `;

  @property()
  counter = 0;

  @property({ type: Array })
  sparkles: Array<{ id: number; x: number; y: number }> = [];

  private sparkleId = 0;

  private animateCounter(newVal: number) {
    this.counter = newVal;
    this.requestUpdate();

    // Add sparkles at random positions
    for (let i = 0; i < 3; i++) {
      const x = 60 + Math.random() * 200;
      const y = 20 + Math.random() * 60;
      const id = this.sparkleId++;
      this.sparkles = [...this.sparkles, { id, x, y }];
      setTimeout(() => {
        this.sparkles = this.sparkles.filter((s) => s.id !== id);
      }, 700);
    }
  }

  render() {
    return html`
      <div class="counter-container">
        <span class="counter">Counter: ${this.counter}</span>
        ${this.sparkles.map(
          (s) => html`
            <svg
              class="sparkle"
              style="left:${s.x}px;top:${s.y}px"
              viewBox="0 0 16 16"
              fill="gold"
            >
              <polygon points="8,0 10,6 16,8 10,10 8,16 6,10 0,8 6,6" />
            </svg>
          `
        )}
      </div>
    `;
  }
}
