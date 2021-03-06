$(document).ready(function() {

     $(document).click(function() {
        $(".js-select-list").hide();
        $(".js-select").removeClass("is-active");
    });

    if ($(".js-counter").length) {
        $(".js-counter").countdown({
            until: new Date(2014, 11, 22, 23, 55),
            format: 'dhm',
            compact: true,
            layout: '{d<}<div class="counter__d"><span>{dn} {dl}</span></div>{d>}{h<}<div class="counter__h"><span>{hn} {hl}</span></div>{h>}' + 
            '{m<}<div class="counter__m"><span>{mn} {ml}</span></div>{m>}'
        });
    }

    $(".js-target").on("click", function (){
	 	var el = $(this).attr("href");
        $('html, body').animate({
            scrollTop: $("."+el).offset().top
        }, 500);
	 	return false;
    });
    $(".js-to-reg").on("click", function (){
	 	$(".js-reg .input-wrap").first().find("input").focus();
	 	return false;
    });

    $(".js-collapse-title").on("click", function (){
	 	$(this).toggleClass("is-inactive");
	 	$(this).parent().next().slideToggle("fast");
	 	return false;
    });

    function selectList() {
        var select = $(".js-select");
        var select_list = $(".js-select-list");
        $("body").on("click", ".js-select", function(event){
            if ($(this).hasClass("is-active")) {
                select.removeClass("is-active");
                select_list.hide();
            }
            else {
                select.removeClass("is-active");
                select_list.hide();
                $(this).find(".js-select-list").show();
                $(this).addClass("is-active");
            }
            event.stopPropagation();
        });
        $("body").on("click", ".js-select-list li", function(event){
            var id = $(this).attr("data-id");
            var text = $(this).text();
            $(this).parents(".js-select").find(".js-select-text").text(text);
            $(this).parents(".js-select").find(".js-select-input").val(id);
            $(this).parent().hide();
            $(this).parents(".js-select").removeClass("is-active");
            event.stopPropagation();
        });
    }  
    selectList();
    $("body").on("click", ".js-select", function(event){
        event.stopPropagation();
    });

    $(".js-input-file input").on("change",function(){
        var val = $(this).val();
        $(this).parent().find(".js-input-file-text").text(val);
    });


    // function tab() {
    //    $(".js-tab").each(function(){
    //         var tab_link = $(this).find("a");
    //         var tab_item = $(this).find("li");
    //         var tab_cont = $(this).parents(".js-tab-group").find(".js-tab-cont");
    //         tab_cont.hide();
    //         tab_item.first().addClass("is-active");
    //         $(this).parents(".js-tab-group").find(".js-tab1").show();
    //         tab_link.on("click", function() {
    //             var index = $(this).attr("href");
    //             tab_item.removeClass("is-active");
    //             $(this).parent().addClass("is-active");
    //             tab_cont.hide();
    //             $(this).parents(".js-tab-group").find("."+index).show();
    //             return false;
    //       });
    //    });
    // }
    // tab();

    $("body").on("click",".js-edit-news", function(){
        $(this).hide();
        $(this).parents(".js-news").find(".js-news-text").attr("contenteditable","true").addClass("input input_textarea");
        $(this).parents(".js-news").find(".js-news-title").attr("contenteditable","true").addClass("input");
        $(this).parents(".js-news").find(".js-news-btn").removeAttr("hidden");
    });
    if ($(".js-tab").length) {
        $(".js-tab").tabs({
            beforeActivate: function(event, ui) { 
                window.location.hash=ui.newPanel.selector; 
            },
            activate: function(event, ui) { 
                //google.load("visualization", "1", {packages:["corechart"]});
                //google.setOnLoadCallback(drawChart);
            },

        });  
    }

    
        
    var overlay = $(".js-overlay");
    var popup = $(".js-popup");
    overlay.on("click", function(){
        $(this).fadeOut("fast");
        popup.slideUp("fast"); 
    });
    popup.on("click", function(event){
        event.stopPropagation();
    });

    function tableHeight() {
        var tr = $(".js-table tbody tr");
        var tr_fixed = $(".js-table-fixed tbody tr");

        tr_fixed.each(function(){
            var index = $(this).index();
            $(this).addClass("js-tr"+index);
        });

        tr.each(function(){
            var index = $(this).index();
            $(this).addClass("js-tr"+index);
            var height = $(this).find("td:first").height();
            $(".js-table-fixed .js-tr"+index+" td").css({
                height: height
            });
        });

    }
    tableHeight();

    // if ($(".js-date").length) {
    //     $(".js-date").datepicker({
    //         dateFormat: 'yy-mm-dd',
    //         firstDay: 1,
    //         changeMonth: true,
    //         changeYear: true,
    //         showOtherMonths: true,
    //         //showTimezone: true,
    //         selectOtherMonths: true,
    //         yearRange: '-10:+3',
    //     });
    // }
    if ($(".js-date-from").length) {
        $(".js-date-from").datepicker({
            dateFormat: 'yy-mm-dd',
            firstDay: 1,
            changeMonth: true,
            changeYear: true,
            showOtherMonths: true,
            selectOtherMonths: true,
            yearRange: '-10:+3',
            onClose: function( selectedDate ) {
                $( ".js-date-to" ).datepicker( "option", "minDate", selectedDate );
            }
        });
    }
    if ($(".js-date-to").length) {
        $(".js-date-to").datepicker({
            dateFormat: 'yy-mm-dd',
            firstDay: 1,
            changeMonth: true,
            changeYear: true,
            showOtherMonths: true,
            selectOtherMonths: true,
            yearRange: '-10:+3',
            showButtonPanel: false,
            onClose: function( selectedDate ) {
                $( ".js-date-from" ).datepicker( "option", "maxDate", selectedDate );
            }
        });
    }

    $("body").prepend( '<div class="tooltip js-tooltip"><div class="tooltip__in"></div></div>' );
    var tooltip = $(".js-tooltip");

    $(".js-tooltip-key").hover(
        function(){
            var left = $(this).offset().left;
            var top = $(this).offset().top + $(this).height();
            var tooltip_html = $(this).attr("data-html");
            tooltip.css({
                left: left,
                top: top
            });
            tooltip.find(".tooltip__in").html(tooltip_html).fadeIn("fast");
            tooltip.fadeIn("fast");
        },
        function() {
            tooltip.hide();
        }
    );
    tooltip.hover(
        function(){
            tooltip.show();
        },
        function() {
            tooltip.hide(); 
        }
    );

});  