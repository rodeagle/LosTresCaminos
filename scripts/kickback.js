"use strict";
import css_service from "./inject-css.min.js";
let module = {
    Render: function (selector, component, data) {
        console.log("data : " + data);
        let comp = new component();
        // process date with component function
        let element = data;
        if (comp.Init) { element = comp.Init(element);}
        // css
        if (comp.Css) {
            let cssTemplate = new component().Css();
            cssTemplate && css_service.Append(cssTemplate, element);
        }
        // bind new element with the component template;
        let html = new component().Template();
        let template = Handlebars.compile(html);
        let result = template(element);
        $(selector).html(result);
        console.log(result);
    }
};

export default module;
