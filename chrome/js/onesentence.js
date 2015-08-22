var observeDOM = (function(){
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver,
        eventListenerSupported = window.addEventListener;

    return function(obj, callback){
        if( MutationObserver ){
            // define a new observer
            var obs = new MutationObserver(function(mutations, observer){
                if( mutations[0].addedNodes.length || mutations[0].removedNodes.length )
                    callback();
            });
            // have the observer observe foo for changes in children
            obs.observe( obj, { childList:true, subtree:true });
        }
        else if( eventListenerSupported ){
            obj.addEventListener('DOMNodeInserted', callback, false);
            obj.addEventListener('DOMNodeRemoved', callback, false);
        }
    }
})();


function main() {
    console.log(document.body); 
    observeDOM(document.body, function() {
        var wpvs = $("._wpv").each(function() {
            var obj = this;
            if (obj.innerHTML.indexOf("一句話") != -1 || obj.innerHTML.indexOf("經典語錄大賽") != -1) {
                console.log(obj.innerHTML);
                obj.closest(".fbpnormal").remove();
            }
        }); 
    });
}
// window.onload = main;
$(document).ready(main);
