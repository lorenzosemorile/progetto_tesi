import {LitElement, html, css, unsafeCSS} from "lit-element";
import '../../general/app-header/app-header';
import '../../general/app-menu/app-menu';
import '../../general/app-main-headline/app-main-headline';
import '../../general/app-more-headlines/app-more-headlines';
import '../../general/app-hero/app-main-hero';
import '../../general/app-sidebar/app-sidebar';

export default class HardLayout extends LitElement {

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
    if (!this.data.articles) return false;
    return true;
  }

  render() {
    let more = this.data.articles.slice(2, 5);
    let sidebar = this.data.articles.slice(5, 8);
    return html`
      <app-header></app-header>
      <app-menu></app-menu>
      HARD
      <!-- BEGIN CONTENT WRAPPER -->
      <div id="content-wrapper">
        <!-- BEGIN MAIN -->
        <app-hero .data="${this.data.articles[0]}"></app-hero>
        <div id="main">
          <div id="headlines">            
            <app-main-headline .data="${this.data.articles[1]}"></app-main-headline>
            <app-more-headlines .data="${more}"></app-more-headlines>
          </div>
        </div>
        <!-- END MAIN -->
        <!-- BEGIN SIDEBARS -->
        <app-sidebar .data="${sidebar}"></app-sidebar>
        <!-- END SIDEBARS -->
      </div>
      <!-- END CONTENT WRAPPER -->
    `;
  }

  createRenderRoot() {
    return this;
  }

}

if (!customElements.get('app-layout-hard')) {
  customElements.define('app-layout-hard', HardLayout);
}
