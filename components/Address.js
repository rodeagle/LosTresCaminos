'use strict';
export class Address{
    Template(){
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