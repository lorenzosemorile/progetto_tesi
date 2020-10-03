import {LitElement, html, css, unsafeCSS} from "lit-element";
import '../../general/app-header/app-header';
import '../../general/app-menu/app-menu';
import "../../general/app-main-headline/app-main-headline";

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
    let list = this.data.articles.slice(0, 10);
    return html`
      <style>
        #main, #headlines {
          width: 100%;
        }
      </style>
      <app-header .profile=${'soft'}></app-header>
      <app-menu></app-menu>
      <!-- BEGIN CONTENT WRAPPER -->
      <div id="content-wrapper">
        <!-- BEGIN MAIN -->
        <div id="main">
          <div id="headlines">
            <app-main-headline-list .data=${this.data.articles}></app-main-headline-list>            
          </div>
        </div>
        <!-- END MAIN -->        
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
