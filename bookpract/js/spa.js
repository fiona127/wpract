//spa.js
//Root namespace module

/* jlint browser:true, continue:true,
devel:true, indent:2, maxerr:50, 
newcap:true, nomen:true, plusplus:true,
regexp: true, sloppy: true, vars:false,
white: true */

var spa = (function(){
    'use  strict';
    var initModule = function($container){
        spa.model.initModule();
        spa.shell.initModule($container);
    };
    return {initModule: initModule};
}());



/*var spa = (function ($) {
//Module scope  ariables
    var 
    // set constants
    configMap = {
        extended_height: 434,
        extended_title: 'Click to retract',
        retracted_height: 16,
        retracted_title: 'Click to extend',
        template_html: '<div class="spa-slider"><\/div>'
    },
    //Declare all other module scope variables
    $chatSlider, 
    toggleSlider, onClickSlider, initModule;
            
    toggleSlider = function () {
        var
            slider_height = $chatSlider.height();
            //extend slider if fully retracted
            if (slider_height === configMap.retracted_height){
                $chatSlider
                    .animate({height:configMap.extended_height})
                    .attr('title', configMap.extended_title);
                return true;
            }
                //retract slider if fully extended
            else if (slider_height === configMap.extended_height){
                $chatSlider
                    .animate({height: configMap.retracted_height})
                    .attr('title', configMap.retracted_title);
                return true;
            }
                //no action if slider is in transition
        return false;
    }
}
onClickSlider = function (event) {
    toggleSlider();
    return false;
};

initModule = function ($container) {
    //render html
    $container.html(configMap.template_html);
    $chatSlider = $container.find('.spa-slider');
    //initialize slider height and title
    //bind the user click event to the event handler
    $chatSlider
        .attr('title', configMap.retracted_title)
        .click(onClickSlider);
    return true;
};
return {initModule:initModule};
} (jQuery));
        //Start spa once DOM is ready
jQuery(document).ready(
    function () {spa.initModule(jQuery('#spa'));}
);*/