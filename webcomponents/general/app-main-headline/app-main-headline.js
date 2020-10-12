import {LitElement, html, css, unsafeCSS} from "lit-element";
var search = require('youtube-search');
import {date_format} from "../../utilities/date";

export default class MainHeadline extends LitElement {

  constructor(){
    super();
    this.data = null;
    this.videos = null;
  }

  static get properties() {
    return {
      data: {type: Object},
      videos: {type: Object}
    }
  };

  async get_video() {

    let param = '';
    param = this.data.title.split(' ');
    param = param.slice(0, 3);
    param = param.join(' ');

    var opts = {
      maxResults: 3,
      key: 'AIzaSyAgL1fR92j2dr5MoJY_Q_qu1N-HdDrYC8E'
    };

    await search(param, opts, (err, results) => {
      if(err) return console.log(err);
      this.videos = results;
    });

  }

  shouldUpdate(){
    if (!this.data) return false;
    if (!this.videos){
      this.get_video();
    }
    return true;
  }

  render() {
    const article = this.data;
    const date = date_format(article.publishedAt);

    return html`
      <div id="main-headline">
        <h2 class="heading">IN PRIMO PIANO</h2>
        <img src="${article.urlToImage}" alt="" width="400"/>
        <h1><a href="${article.url}">${article.title}</a></h1>
        <h5>${article.description}</h5>
        <p class="author">${article.source.name} | <span>${date}</span></p>
        ${article.author && html`<p class="author">di ${article.author}</p>` || ''}
        <p>${article.content}</p>
        <p><a href="${article.url}">Full story &raquo;</a></p>
        ${this.videos && this.renderVideo() || ''}
      </div>
    `;
  }

  renderVideo(){
    const video = this.videos[0];
    const date = date_format(video.publishedAt);
    return video && html`
      <h2 class="heading">Video Correlato</h2>
      <object width="400" height="300">
        <param name="movie" value="http://www.youtube.com/v/${video.id}" />
        <param name="allowFullScreen" value="true" />
        <param name="allowscriptaccess" value="never" />
        <embed src="http://www.youtube.com/v/${video.id}" type="application/x-shockwave-flash" allowscriptaccess="never" allowfullscreen="true" width="400" height="300"></embed>
      </object>
      <h2><a href="#">${video.title}</a></h2>
      <p>${video.description}</p>
      <p class="author"><span>${date}</span></p>      
    ` || '';

  }

  createRenderRoot(){
    return this;
  }

}

export class MainHeadlineList extends MainHeadline {

  constructor(){
    super();
  }

  static get styles() {
    return css`
      #main-headline-list {
        width: 100%;
        min-height: 300px;
      }
      a {
        color: #000;
      }      
    `;
  }

  shouldUpdate(){
    if (!this.data) return false;
    return true;
  }

  render() {
    return html`
      <div id="main-headline-list">
        ${this.data.map((article, i) => {
          const date = date_format(article.publishedAt);
          return html`
            <h1><a href="${article.url}">${article.title}</a></h1>
            <h5>${article.description}</h5>
            <p class="author">${article.source.name} | <span>${date}</span></p>
            ${article.author && html`<p class="author">di ${article.author}</p>` || ''}
            ${this.data[i+1] ? html`<hr>` : ''}                       
          `
        })}     
      </div>
    `;
  }

  createRenderRoot(){
    return this.attachShadow({mode: 'open'});
  }

}

if (!customElements.get('app-main-headline')) {
  customElements.define('app-main-headline', MainHeadline);
}

if (!customElements.get('app-main-headline-list')) {
  customElements.define('app-main-headline-list', MainHeadlineList);
}
