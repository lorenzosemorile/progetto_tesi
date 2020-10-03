import {LitElement, html} from "lit-element";
import '../app-select-cookie/app-select-cookie';

export default class Header extends LitElement {

  static get properties(){
    return {
      profile : {
        type : Object
      }
    }
  }

  render() {
    return html`
      <!-- BEGIN HEADER -->
      <div id="header">
        <div id="logo"> <a href="#"><img src="/assets/img/wireframe/logo.png" alt="" /></a> </div>
        <div id="ad"><img src="/assets/img/ad-blank.png" alt="" /> </div>
        <app-select-cookie></app-select-cookie>
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
