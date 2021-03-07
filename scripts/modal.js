'use strict';
export default {
    template : `
    <div class="modal fade" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-xl" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    {{{body}}}
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
        </div>
    </div>
    `,
    Show : function(properties){
        let source = this.template;
        let template = Handlebars.compile(source);
        let html = template(properties);
        $('body').append(html);
        $('.modal').modal({backdrop: 'static', keyboard: false});

        $('[data-dismiss="modal"]').click(function(){
            // debugger;
            let res = $(this).parents('.modal');
            res.modal('hide');
            setTimeout(function(){
                res.empty();
                res.remove();
                $('.modal').modal('hide');
                // $('.modal-backdrop').remove();
                // $('.modal-backdrop').empty();
            },250);
        });
    }
}