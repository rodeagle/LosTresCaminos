//import tables from "/easytables.js";
"use strict";
import { CallUsNowButton } from "../components/CallUsNowButton.js";
import restaurant from "./data.min.js";
import modal from "./modal.js";
import K from './kickback.js';
import { Products } from "../components/Products.min.js";
import { Locations } from '../components/Locations.min.js';
import css_service from "../scripts/inject-css.min.js";
import { AddressLight } from "../components/AddressLight.min.js";


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

var settings = {
    width : window.screen.width,
    height : window.innerHeight
};

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
        $(this).stopPropagation();
        $(this).preventDefault();
    });
    $('.item-box').click(function(){
        var itemid = $(this).data('itemid');
        var item = restaurant.data.Items.filter(x=>x.ID == itemid)[0];
        var body = `
            <div class="p-1">
                <h2 class="text-center">${item.Title}</h2>
                <div class="text-center modal-image">
                    <img src="${item.ImgPath}"/>
                </div>
            </div>
        `;
        modal.Show({ body });
    });
}

function init(){
    //// render element to div container
    //RenderDOM('address-display',Address,_location);
    //// render call us now button
    //RenderDOM('call-us-now',CallUsNowButton,_location);
    //// render products 
    //var appetizers = data.products.filter(x => _location.appetizers.includes(x.id));
    //RenderDOM('appetizer-content', Products, { items: appetizers });

    // Set styles
    let style = `
        .parallax-1{
            background-size : 100% {{height}}px !important; 
        }
        .parallax-2{
            background-size: 100% {{height}}px !important;
        }
        .parallax-3{
            background-size: 100% {{height}}px !important;
        }
    `;

        //.parallax-2{
        //    background-size : 100% 700px !important; 
        //}
        //.parallax-3{
        //    background-size : 100% 700px !important; 
        //}

    css_service.Append(style, settings);

    //// render locations
    //RenderDOM('locations-display',Locations, { locations : JsonObjectToArray( data.locations) });
    // using new module kickback crappy local react like module without bundler/transpiler
    let data = restaurant.data;
    data.Categories;
    // set the discount prices
    data.Items.forEach((item) => {
        let discount = data.Discounts.filter(x => x.ItemID == item.ID);
        if (discount) {
            switch (new Date().getDay()) {
                case 0:
                    discount = discount.Sunday ? discount : null; break;
                case 1:
                    discount = discount.Monday ? discount : null; break;
                case 2:
                    discount = discount.Tuesday ? discount : null; break;
                case 3:
                    discount = discount.Wednesday ? discount : null; break;
                case 4:
                    discount = discount.Thursday ? discount : null; break;
                case 5:
                    discount = discount.Friday ? discount : null; break;
                case 6:
                    discount = discount.Saturday ? discount : null; break;
                default: discount = null;
            }
        }
        if (discount) {
            item['DiscountPrice'] = discount.DiscountPrice;
        }
    });
    // set the items for the categories
    data.Categories.forEach((item) => {
        item["Items"] = data.Items.filter((product => product.CategoryID == item.CategoryID));
    });
    // render objects
    K.Render('#call-us-now', CallUsNowButton, data.Settings);
    K.Render('#product-list', Products, data);
    // K.Render('#locations-display',Locations,data.Settings);
    // set locations addresses
    data.Settings.Phone = "<a href='tel:2178262666'>(217)-466-5824</a>";
    K.Render('#location-paris',AddressLight,data.Settings);
    let model = {
        Hours : "SUN - THR 11:00AM - 9:00PM <br> FRI - SAT 11:00AM - 10:00PM"
    };
    // marshall
    model.Street = "1802 IL-1";
    model.City = "Marshall";
    model.State = "IL";
    model.ZipCode = "62441";
    model.Phone = "<a href='tel:2178262666'>(217)-826-2666</a>";
    K.Render('#location-marshall',AddressLight,model);
    // martinsville
    model.Street = "229 Grand Valley Blvd";
    model.City = "Martinsville";
    model.State = "IN";
    model.ZipCode = "46151";
    model.Phone = "<a href='tel:7653491502'>(765)-349-1502</a>";
    K.Render('#location-martinsville',AddressLight,model);
    // evansville
    model.Street = "12100 US-41";
    model.City = "Evansville";
    model.State = "IN";
    model.ZipCode = "47725";
    model.Phone = "<a href='tel:8128688550'>(812)-868-8550</a>";
    K.Render('#location-evansville',AddressLight,model);
    // terraghaute
    model.Street = "51475 US Hwy 41";
    model.City = "Terra Haute";
    model.State = "IN";
    model.ZipCode = "47802";
    model.Phone = "<a href='tel:8122980643'>(812)-298-0643</a>";
    K.Render('#location-terrahaute',AddressLight,model);
    // peru1
    model.Street = "172 N Broadway";
    model.City = "Peru";
    model.State = "IN";
    model.ZipCode = "46970";
    model.Phone = "<a href='tel:7654727005'>(765)-472-7005</a>";
    K.Render('#location-peru',AddressLight,model);
    // peru2
    model.Street = "913 W Main St #1740";
    model.City = "Peru";
    model.State = "IN";
    model.ZipCode = "46970";
    model.Phone = "<a href='tel:7654723711'>(765)-472-3711</a>";
    K.Render('#location-peru2',AddressLight,model);
    // init complete 
    document.getElementById('loading').classList.add("complete");
    window.restaurant = data;
    Responsive();
}
// init call on dom complete load
document.addEventListener( "DOMContentLoaded", init);
 
