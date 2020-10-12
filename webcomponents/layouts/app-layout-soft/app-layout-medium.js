import {LitElement, html} from "lit-element";
import '../../general/app-header/app-header';
import '../../general/app-menu/app-menu';
import '../../general/app-main-headline/app-main-headline';
import '../../general/app-more-headlines/app-more-headlines';
import '../../general/app-sidebar/app-sidebar';

export default class MediumLayout extends LitElement {

  constructor(){
    super();
    this.data = null;
  }

  static get properties() {
    return {
      data: {type: Object}
    }
  };

  render() {
    let main_article = this.data.articles[0];
    let more = this.data.articles.slice(1, 6);
    return html`
      <style>
        #main {
          width: 980px;
          margin: 0;
        }        
        #headlines{
          float: left;
          width: 980px;
        }
        #more-headlines{
          width: 540px;
        }  
      </style>
      <app-header .profile=${'medium'}></app-header>
      <app-menu></app-menu>      
      <!-- BEGIN CONTENT WRAPPER -->
      <div id="content-wrapper">
        <!-- BEGIN MAIN -->
        <div id="main">
          <div id="headlines">            
            <app-main-headline .data="${main_article}"></app-main-headline>
            <app-more-headlines .data="${more}"></app-more-headlines>
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

if (!customElements.get('app-layout-medium')) {
  customElements.define('app-layout-medium', MediumLayout);
}
