//spa.shell.js
//Shell module for SPA
/* jslint browser:true, continue: true, devel: true,
indent: 2, maxerr: 50, newcap: true, nomen: true,
plusplus: true, regexp: true, sloppy: true, vars: false,
white: true
*/
//global $, spa

spa.shell = (function (){
    //Begin Module Scope Var
    var
        configMap = {
            main_html: String()
            + '<div class="spa-shell-head">'
                + '<div class="spa-shell-head-logo"></div>'
                + '<div class="spall-shell-head-acct"></div>'
                + '<div class="spa-shell-head-search"></div>'
            + '</div>'
            + '<div class="spa-shell-main">'
                + '<div class="spall-shell-main-nav"></div>'
                + '<div class="spa-shell-main-content"></div>'
            + '</div>'
            + '<div class="spa-shell-foot"></div>'
            + '<div class="spa-shell-chat"></div>'
            + '<div class="spa-shell-modal"></div>'
        };
        stateMap = { $container:null},
        jqueryMap = {};
        setJqueryMap, initModule;
        
        //End Module Scope Variable
        
        //Begin Utility Method
        //End Utility Method
        
        //Begin DOM Methods
        //Begin DOM Method /setJqueryMap/
        
        setJqueryMap = function () {
            var $container = stateMap.$container;
            jqueryMap = { $container : $container};
        };
        //End DOM Method /setJquery Map/
        //End DOM Methods
        //Begin Event Handlers
        //End Event Handlers
        //Begin Public Methods
        //Begin Public Method /initModule/
        initModule = function($container){
            stateMap.$container = $container;
            $container.html(configMap.main_html);
            setJqueryMap();
        };
        //End Public method /initModule/
        return { initModule: initModule };
        //End public methods
}());