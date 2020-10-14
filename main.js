
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
            <div class="col-6 col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-3 product" style="position:relative">
                <img class="" style="object-fit: fill"  width="100%" height="100%" src="{{#if img-path}}{{img-path}}{{else}}/images/default-dish.png{{/if}}" loading="lazy">
                <div class="info-container">
                    <div>
                        <div class="p-2 font-weight-bold">
                            {{{title}}}
                        </div>
                    </div>
                    <div>
                        {{{description}}}
                    </div>
                    <div>
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
            <a class="btn btn-danger bt-block p-3 p-md-3 p-lg-5 chk-btn" href="tel:{{phone}}">CALL US NOW</a>
        `;
    }
}

function RenderDOM(id,element,data){
    let html = new element().template();
    let template = Handlebars.compile(html);
    let result = template(data);
    $(`#${id}`).html(result);
}

function Responsive() {
    $('#close-mobile-menu-btn').click(function () {
        $('.mobile-menu-content').removeClass('active');
        $('.backdrop-background-mobile').removeClass('active');
    });
    $('#open-mobile-menu-btn').click(function () {
        $('.mobile-menu-content').addClass('active');
        $('.backdrop-background-mobile').addClass('active');
    });
    $('.backdrop-background-mobile').click(function () {
        $('.mobile-menu-content').removeClass('active');
        $('.backdrop-background-mobile').removeClass('active');
    });
}

function init(){

    // render element to div container
    RenderDOM('address-display',Address,_location);
    // render call us now button
    RenderDOM('call-us-now',CallUsNowButton,_location);
    // render products 
    var appetizers = data.products.filter(x => _location.appetizers.includes(x.id));
    RenderDOM('appetizer-content', Products, { items: appetizers });
    // side orders
    var sideOrders = data.products.filter(x => _location.sideOrders.includes(x.id));
    RenderDOM('sides-content', Products, { items: sideOrders });
    // kids menu
    var kidsMenu = data.products.filter(x => _location.kids.includes(x.id));
    RenderDOM('kids-content', Products, { items: kidsMenu });
    // fajitas menu
    var fajitas = data.products.filter(x => _location.fajitas.includes(x.id));
    RenderDOM('fajitas-content', Products, { items: fajitas });
    // traditional menu
    var traditional = data.products.filter(x => _location.traditional.includes(x.id));
    RenderDOM('favorites-content', Products, { items: traditional });
    // steak menu
    var steak = data.products.filter(x => _location.steak.includes(x.id));
    RenderDOM('steak-content', Products, { items: steak });
    // render locations
    RenderDOM('locations-display',Locations, { locations : JsonObjectToArray( data.locations) });

    // init complete 
    document.getElementById('loading').classList.add("complete");

    Responsive();
}

document.addEventListener( "DOMContentLoaded", init);
 
