import {LitElement, html, css} from "lit-element";
import {write_cookie, read_cookie} from "../../utilities/cookies";

export default class SelectCookie extends LitElement {

  constructor() {
    super();
    this.cookie = read_cookie();

    this.profiles = [
      'soft',
      'medium',
      'hard'
    ];
  }

  static get styles(){
    return css`
      .select-cookie{
        position: absolute;
        top: 10px;
        left: 10px;
        width: 170px;
      }
    `
  }

  static get properties(){
    return {
      cookie : {
        type : Object
      }
    }
  }

  render() {
    return html`
      <!-- BEGIN SELECT -->
      <div class="select-cookie">
        ${this.renderSelect('layout')}
        ${this.renderSelect('data')}
      </div>
      <!-- END SELECT -->
    `;
  }

  renderSelect(type) {

    return html`
      <label>Scegli ${type}</label>
      <select @change=${this.writeCookie} data-type="${type}">
        <empty></empty>
        ${this.profiles.map(profile => {
          const selected = this.cookie[type] === profile;
          return html`
            <option ?selected=${selected} value="${profile}">${profile}</option>>
          `
        })}
      }
      </select>
    `
  }

  writeCookie(e){
    let element = e.currentTarget;
    let {type} = element.dataset;
    let value = element.options[element.selectedIndex].text;
    this.cookie[type] = value;
    window.location = 'http://localhost:8000/';
    write_cookie(this.cookie);
  }

}

if (!customElements.get('app-select-cookie')) {
  customElements.define('app-select-cookie', SelectCookie);
}
