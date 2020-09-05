
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function JsonObjectToArray(obj){
    return Object.keys(obj)
    .map(function(key) {
        return obj[key];
    });
}


var local = getUrlParameter('location');

local = !local ? 'paris' : local; 

console.log(data);

var _location = data.locations[local];

console.log(_location);

class Address{
    template(){
        return `
            <div class="text-center text-light font-weight-bold">
                {{street}}<br>
                {{city}} {{state}} {{zipcode}} <br>
                {{phone}} <br><br>
                {{{hours}}}
            </div>
        `;
    }
}

class AddressLight {
    template(){
        return `
            <div class="text-center">
                {{street}}<br>
                {{city}} {{state}} {{zipcode}} <br>
                {{phone}} <br><br> 
                {{{hours}}}
            </div>
        `;
    }
}

class Locations{
    template(){
        return `
            {{#each locations}}
                <hr>
                <div class="p-5">
                    ${new AddressLight().template()}
                </div>
            {{/each}}
        `;
    }
}

class Products {
    template(){
        return `
        {{#each items}}
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-3 product" style="position:relative">
                <img class="" style="object-fit: fill"  width="100%" height="100%" src="{{img-path}}">
                <div class="info-container" style="display:grid;grid-template-columns:auto;grid-template-rows:7vh 20vh 6vh; position:absolute;z-index:10;top:0;left:0;">
                    <div style="grid-column: 1/2;">
                        <div class="p-2 font-weight-bold">
                            {{title}}
                        </div>
                    </div>
                    <div style="grid-column:1/2;">
                        {{description}}
                    </div>
                    <div style="grid-column:1/2">
                        <div class="font-weight-bold">
                        {{#if discount-price}}
                            <div class="discounted-price">
                                $ {{discount-price}} <span class="cross-out">$ {{price}}</span>
                            <div>
                            {{else}}
                            <div class="normal-price">
                                $ {{price}}
                            </div>
                        {{/if}}
                    </div>
                    </div>
                </div>
            </div>
        {{/each}}
        `;
    }
}

class CallUsNowButton{
    template(){
        return `
            <a class="btn btn-danger p-5 chk-btn" href="tel:{{phone}}">CALL US NOW</a>
        `;
    }
}

function RenderDOM(id,element,data){
    let html = new element().template();
    let template = Handlebars.compile(html);
    let result = template(data);
    document.getElementById(id).innerHTML = result;
}

function init(){

    // render element to div container
    RenderDOM('address-display',Address,_location);
    // render call us now button
    RenderDOM('call-us-now',CallUsNowButton,_location);
    // render products 
    var _items = data.products.filter(x => _location.appetizers.includes(x.id));
    RenderDOM('appetizer-content',Products, { items : _items });
    // render locations
    console.log(JsonObjectToArray(data.locations));
    console.log(new Locations().template());
    RenderDOM('locations-display',Locations, { locations : JsonObjectToArray( data.locations) });

    // init complete 
    document.getElementById('loading').classList.add("complete");

}

document.addEventListener( "DOMContentLoaded", init);
 
