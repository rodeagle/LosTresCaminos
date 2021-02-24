'use strict';
export class CallUsNowButton {
    Template() {
        return `
            <a class="btn btn-danger bt-block p-3 p-md-3 p-lg-5 chk-btn" href="tel:{{Phone}}">CALL US NOW</a>
        `;
    }
    Init(element) {
        // run code that can effect styles 
        // process element
        return element;
    }
    Css() {
        // wip css custom
    }
}