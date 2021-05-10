'use strict';
export class Products {
    Template(){
        return `
        <div class="row no-gutters">
            {{#each Categories}}
                <div class="category-item">
                    <div class="p-4"><h1>{{Title}}</h1></div>
                    <div class="p-2">
                        {{{Header}}}
                    </div>
                    <div class="row no-gutters p-1">
                    {{#each Items}}
                        <div class="col-md-12 item-container p-2">
                            {{#if New}}<div class="is-new p-1">New!</div>{{/if}}
                            <div class="item-box row no-gutters" data-itemid="{{ID}}">
                                <div class="col-12 text-center p-2 pl-3">
                                    <h5 class="site-main-color">{{Title}}</h5>
                                </div>
                                <div class="col-3 p-2">
                                    {{#if ImgPath}}
                                    <img src="{{ImgPath}}" class="product-image"/>
                                    {{/if}}
                                </div>
                                <div class="col-9 p-1 text-left">
                                    <p>{{{Description}}}</p>
                                </div>
                                <div class="col-12 text-right">
                                    {{#if DiscountPrice}}
                                    <div><span class="pl-1 crossed">$ {{Price}}</span>$ {{DiscountPrice}}</div>
                                    {{/if}}
                                    {{#unless DiscountPrice}}
                                    {{#if Price}}<div class="pr-2"><h5>$ {{Price}}</h5></div>{{/if}}
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
                grid-template-rows: 30% 70%;
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
                // box-shadow: 0px 0px 12px 2px gray;
                // height:200px;
                //background-color:white;
                border-bottom:solid #C91E00 1px;
            }
            .item-container .item-box:hover{
                cursor:pointer;
            }
            .product-image{
                height:100px;
                width:100%;
            }
            .menu{
                background-color:#F7F7F7;
            }
        `;
    }
}



