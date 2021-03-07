'use strict';
export class Products {
    Template(){
        return `
        <div class="row no-gutters">
            {{#each Categories}}
                <div class="category-item">
                    <div class="p-4"><h1>{{Title}}</h1></div>
                    {{{Header}}}
                    <div class="row no-gutters p-1">
                    {{#each Items}}
                        <div class="col-md-12 col-lg-6 col-xl-4 item-container p-2">
                            {{#if New}}<div class="is-new p-1 text-center">New!</div>{{/if}}
                            <div class="item-box row no-gutters" data-itemid="{{ID}}">
                                <div class="col-5">
                                    <img src="{{ImgPath}}" class="product-image"/>
                                </div>
                                <div class="col-7 p-1 item-text-box">
                                    <div class="d-flex text-center align-items-center justify-content-center"><h4>{{Title}}</h4></div>
                                    {{#if DiscountPrice}}
                                    <div class="text-center"><span class="pl-1 crossed">$ {{Price}}</span>$ {{DiscountPrice}}</div>
                                    {{/if}}
                                    {{#unless DiscountPrice}}
                                    <div class="d-flex text-center align-items-center justify-content-center"><h5>$ {{Price}}</h5></div>
                                    {{/unless}}
                                    <div class="icons"></div>
                                </div>
                            </div>
                        </div>
                    {{/each}}
                    </div>
                    {{{Footer}}}
                </div>
            {{/each}}
        </div>
        `;
    }
    Init(elements){
        elements.Categories.forEach((item)=>{
            item.Items.forEach((x)=>
                {
                    if(x.ImgPath == ""){
                        x.ImgPath = "/images/default-dish.png"; 
                    }
                }
            );
        });
        return elements;
    }
    Css(){
        return `

            .item-text-box{
                display: grid;
                grid-template-columns: auto;
                grid-template-rows: 40% 30% 30%;
                // background-color:#EEB78A;
            }
            .crossed {
                text-decoration:line-through;
            }
            .item-box-text{
                // white-space: nowrap;
	            // overflow: hidden;
            }
            .is-new{
                color: white;
                font-weight: bolder;
                position: absolute;
                width: 100px;
                z-index: 1;
                background-color: #F15B3F;
            }
            .category-item {
                //background-color:#EEB78A;
            }
            .item-container .item-box {
                // border : 1px solid gray;
                box-shadow: 0px 0px 12px 2px gray;
                height:200px;
                background-color:white;
            }
            .item-container .item-box:hover{
                // border : 1px solid black;
                cursor:pointer;
                // box-shadow: 0px 0px 12px 2px;
                // background-color:white;
            }
            .product-image{
                height:200px;
                width:100%;
            }
            .menu{
                background-color:#F7F7F7;
            }
        `;
    }
}



