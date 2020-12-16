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
    let hero_article = this.data.articles[0];
    let main_article = this.data.articles[1];
    let more = this.data.articles.slice(2, 5); // 3 articoli
    let sidebar = this.data.articles.slice(5, 8); // 3 articoli
    let recommended = this.data.articles.slice(8, 11); // 3 articoli
    return html`
      <app-header .profile=${'hard'}></app-header>
      <app-menu></app-menu>
      <!-- BEGIN CONTENT WRAPPER -->
      <div id="content-wrapper">
        <!-- BEGIN MAIN -->
        <app-hero .data="${hero_article}"></app-hero>
        <div id="main">
          <div id="headlines">            
            <app-main-headline .data="${main_article}"></app-main-headline>
            <app-more-headlines .data="${more}"></app-more-headlines>
          </div>
        </div>
        <!-- END MAIN -->
        <!-- BEGIN SIDEBARS -->
        <app-sidebar .data="${sidebar}"></app-sidebar>
        <!-- END SIDEBARS -->
      </div>
      <!-- END CONTENT WRAPPER -->
      <div id="extras">
        <div id="recommended">
          <h2 class="heading">Recommended Stories</h2>
          <ul>
            ${recommended.map(article => {
              return html`
                <li><a href="${article.url}">${article.title}</a></li>  
              `
            })}
          </ul>
        </div>
        <div id="programs">
          <h2 class="heading">What's On Tonight</h2>
          <img src="/assets/img/rick.jpg" alt="" /> <img src="/assets/img/cbc.png" alt="" /> 
        </div>
        <div id="cartoon">
          <h2 class="heading">Humour</h2>
          <img src="/assets/img/cartoon.jpg" alt="" /> 
        </div>
      </div>
    `;
  }

  createRenderRoot() {
    return this;
  }

}

if (!customElements.get('app-layout-hard')) {
  customElements.define('app-layout-hard', HardLayout);
}
