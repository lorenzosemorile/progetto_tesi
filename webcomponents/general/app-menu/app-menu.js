import {LitElement, html, css, unsafeCSS} from "lit-element";

export default class Menu extends LitElement {

  render() {
    return html`
      <div id="nav">
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/lavoro">Lavoro</a></li>
          <li><a href="/salute">Salute</a></li>
          <li><a href="/scienza">Scienza</a></li>
          <li><a href="/sport">Sport</a></li>
          <li><a href="/intrattenimento">Intrattenimento</a></li>
          <li class="last"><a href="/tecnologia">Tecnologia</a></li>          
        </ul>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }

}

if (!customElements.get('app-menu')) {
  customElements.define('app-menu', Menu);
}
