import {LitElement, html, css, unsafeCSS} from "lit-element";

export default class Header extends LitElement {

  render() {
    return html`
      <!-- BEGIN HEADER -->
      <div id="header">
        <div id="logo"> <a href="#"><img src="/assets/img/wireframe/logo.png" alt="" /></a> </div>
        <div id="ad"> <img src="/assets/img/ad-blank.png" alt="" /> </div>
      </div>
      <!-- END HEADER -->
    `;
  }

  createRenderRoot() {
    return this;
  }

}

if (!customElements.get('app-header')) {
  customElements.define('app-header', Header);
}
