import {LitElement, html, css, unsafeCSS} from "lit-element";
import '../../general/app-header/app-header';
import '../../general/app-menu/app-menu';
import '../../general/app-main-headline/app-main-headline';
import '../../general/app-more-headlines/app-more-headlines';
import '../../general/app-sidebar/app-sidebar';

export default class SoftLayout extends LitElement {

  constructor(){
    super();
    this.data = null;
  }

  static get properties() {
    return {
      data: {type: Object}
    }
  };

  shouldUpdate(){
    if (!this.data) return false;
    return true;
  }

  render() {
    return html`
      <app-header></app-header>
      <app-menu></app-menu>
      SOFT
      <!-- BEGIN CONTENT WRAPPER -->
      <div id="content-wrapper">
        <!-- BEGIN MAIN -->
        <div id="main">
          <div id="headlines">
            <app-main-headline .data=${this.data}></app-main-headline>
            <app-more-headlines></app-more-headlines>
          </div>
        </div>
        <!-- END MAIN -->
        <!-- BEGIN SIDEBARS -->
        <app-sidebar></app-sidebar>
        <!-- END SIDEBARS -->
      </div>
      <!-- END CONTENT WRAPPER -->
    `;
  }

  createRenderRoot() {
    return this;
  }

}

if (!customElements.get('app-layout-soft')) {
  customElements.define('app-layout-soft', SoftLayout);
}
