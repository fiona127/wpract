//spa.shell.js
//Shell module for SPA
/* jslint browser:true, continue: true, devel: true,
indent: 2, maxerr: 50, newcap: true, nomen: true,
plusplus: true, regexp: true, sloppy: true, vars: false,
white: true
*/
/*global $, spa*/

spa.shell = (function (){
    //Begin Module Scope Var
    var
        configMap = {
            anchor_schema_map:{
                chat: {open: true, closed: true}
            },
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
            + '<div class="spa-shell-modal"></div>',
            chat_extend_time: 250,
            chat_retract_time: 300,
            chat_extend_height: 450,
            chat_retract_height: 15
        },
        stateMap = { 
            $container:null,
            anchor_map: {},
            is_chat_retracted: true,
        },
        jqueryMap = {},
        copyAnchorMap, setJqueryMap, toggleChat, 
        changeAnchorPart, onHashchange, 
        onClickChat, initModule;
        
        //End Module Scope Variable
        
        //Begin Utility Method
        // Returns copy of stored anchor map; minimizes overhead
        copyAnchorMap = function () {
            return $.extend(true, {}, stateMap.anchor_map);
        };
        //End Utility Method
        
        //Begin DOM Methods /changeAnchorPart/
        //Purpose: Changes part of the URI ancor component
        //Arguments:
        // *arg_map - The map describing what part of the URI anchor we wanted changed. 
        //Returns: boolean
        // *true - the Anchor portion of the URI was update
        // *false - the Anchor portion of the URI could not be updated
        //Action:
        // The current anchor rep stored in stateMap.anchor_map.
        // See uriAnchor for a discussion of encoding
        // This method
        // * creates a copy of this map using copyAnchorMap().
        // * Modifies the key-values using arg_map.
        // * Manages the distinction between independent and dependent
        // values in the encoding.
        // *Attempts to chagne the URI using uriAnchor
        // * Returns true on success, and false on failure. 
        
        changeAnchorPart = function(arg_map){
            var
                anchor_map_revise = copyAnchorMap(),
                bool_return = true,
                key_name, key_name_dep;
                //Begin merge changes into anchor map
                KEYVAL:
                for (key_name in arg_map){
                    if (arg_map.hasOwnProperty(key_name)){
                        //skip dependent keys during iteration
                        if(key_name.indexOf('_')===0){ continue KEYVAL;}
                        
                        //update independent key value
                        anchor_map_revise[key_name] = arg_map[key_name];
                        
                        //update matching dependent key
                        key_name_dep = '_'+key_name;
                        if (arg_map[key_name_dep]){
                            anchor_map_revise[key_name_dep] = arg_map[key_name_dep];
                        }
                        else {
                            delete anchor_map_revise[key_name_dep];
                            delete anchor_map_revise['_s'+key_name_dep];
                        }
                    }
                }
                //End merge changes into anchor map
                
                // Begin attempt to update URI; revert if not successful
                try {
                    $.uriAnchor.setAnchor(anchor_map_revise);
                }
                catch (error){
                    //replace URI with existing state
                    $.uriAnchor.setAnchor(stateMap.anchor_map,null,true);
                    bool_return = false;
                }
                //end attempt to update URI
                return bool_return;
        };
        //End DOM /changeAnchorPart/
        
        //Begin DOM Method /setJqueryMap/
        
        setJqueryMap = function () {
            var $container = stateMap.$container;
            jqueryMap = { 
                $container : $container,
                $chat : $container.find('.spa-shell-chat')
            };
        };
        //End DOM Method /setJquery Map/
        
        //Begin DOM method /toggleChat/
        //Purpose: Extends or retracts chat slider
        //Arguments:
        // * do_extend - if true, extends slider; if false retracts
        // * callback - optional function to execute at end of animation
        //Settings:
        // *chat_extend_time, chat_retract_time
        // * chat_extend_height, chat_retract_height
        //Returns: boolean
        // *true - slider animation activated
        // *false - slider animation not activated
        
        
        toggleChat = function (do_extend, callback){
            var
                px_chat_ht = jqueryMap.$chat.height(),
                is_open = px_chat_ht === configMap.chat_extend_height,
                is_closed = px_chat_ht === configMap.chat_retract_height,
                is_sliding = ! is_open && ! is_closed;
            
            //avoid race condition
            if (is_sliding){ return false;}
            
            //Begin extend chat slider
            if (do_extend){
                jqueryMap.$chat.animate(
                    {height: configMap.chat_extend_height},
                    configMap.chat_extend_time,
                    function(){
                        if (callback){ callback(jqueryMap.$chat); }
                    }
                );
                return true;
            }
            //End extend chat slider
            
            //Begin retract chat slider
            jqueryMap.$chat.animate(
                {height: configMap.chat_retract_height},
                configMap.chat_retract_time,
                function () {
                    if (callback){ callback(jqueryMap.$chat); }
                }
            );
            return true;
            // End retract chat slider
        };
        
        //End DOM Methods /toggleChat/
        
        //Begin Event Handlers
        onClickChat = function(event){
            if (toggleChat(stateMap.is_chat_retracted)){
                $.uriAnchor.setAnchor({
                    chat : (stateMap.is_chat_retracted? 'open': 'closed')
                });
            }
            return false;
        };
        //Begin Event handler /onHashchange/
        //Purpose: Handles the hashchange event
        //Arguments:
        // * event - jQuery event object.
        //Settings : none
        //Returns: false
        //Action:
        // * Parses the URI anchor component
        // * compares proposed application state with current
        // * adjust the application only where propsed state differs
        //   from existing
        onHashchange = function (event){
            var
                anchor_map_previous = copyAnchorMap(),
                anchor_map_proposed, _s_chat_previous, _s_chat_proposed,
                s_chat_proposed;
                //attempt to parse anchor
            try { anchor_map_proposed = $.uriAnchor.makeAnchorMap();}
            catch (error){
                $.uriAnchor.setAnchor(anchor_map_previous, null, true);
                return false;
            }
            stateMap.anchor_map = anchor_map_proposed;
                
            //convenience vars
            _s_chat_previous = anchor_map_previous._s_chat;
            _s_chat_proposed = anchor_map_proposed._s_chat;
                
            //Begin adjust chat component if changed
            if (! anchor_map_previous || _s_chat_previous !== _s_chat_proposed){
                s_chat_proposed = anchor_map_proposed.chat;
                switch (s_chat_proposed) {
                    case 'open':
                        toggleChat(true);
                    break;
                    case 'closed':
                        toggleChat(false);
                    break;
                    default:
                        toggleChat(false);
                        delete anchor_map_proposed.chat;
                        $.uriAnchor.setAnchor(anchor_map_proposed, null, true);
                }
            }
            //End adjust chat component if changed
            return false;
        };
        //End Event handler /onHashchange/
        
        //Begin Event handler /onClickChat/
        onClickChat = function (event){
            changeAnchorPart({
                chat: (stateMap.is_chat_retracted? 'open': 'closed')
            });
            return false;
        };
        //End Event handler /onClickChat/
        
        //End Event Handlers
        
        //Begin Public Methods
        //Begin Public Method /initModule/
        initModule = function($container){
            // load HTML and map jQuery collections
            stateMap.$container = $container;
            $container.html(configMap.main_html);
            setJqueryMap();
            
            //test toggle
            setTimeout(function(){toggleChat(true); }, 3000);
            setTimeout(function(){toggleChat(false);}, 8000);
            
            //configure uriAnchor to use our schema
            $.uriAnchor.configModule({
                schema_map : configMap.anchor_schema_map
            });
            //configure and initialize feature modules
            spa.chat.configModule({}); //double check - could be error
            spa.chat.initModule(jqueryMap.$chat); //dc - error?
            
            //Handle URI anchor change events. 
            //This is done /after/ all feature modules are configured
            // and initialized, otherwise they will not be ready to 
            // handle the trigger event, which is used to ensure the
            // anchor is considered on-load
            
            $(window)
                .bind('hashchange', onHashchange)
                .trigger('hashchange');
        };
        //End Public method /initModule/
        return { initModule: initModule };
        //End public methods
}());