class Papertrail {
    track = function(event_name){
        if(!event_name) return

        var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
        var isFirefox = typeof InstallTrigger !== 'undefined';
        var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification));
        var isIE = /*@cc_on!@*/false || !!document.documentMode;
        var isEdge = !isIE && !!window.StyleMedia;
        var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);

        fetch('https://ipinfo.io?token=b3e4e057a30c33', {
        headers : { 
            'Accept': 'application/json'
        }}).then(res=>res.json()).then(response=>{

            /*
                Anonymous analytics:
                Time (and date), country, region, city, browser, OS

                Authenticated analytics:
                Username, all anonymous analytics
            */

            let eventData = {};
            
            eventData.name = event_name;
            eventData.time = Date().split(' ').splice(0, 5).join(' ');
            eventData.country = response.country;
            eventData.region = response.region;
            eventData.city = response.city
            if (isOpera + isFirefox + isSafari + isIE + isChrome == 1){
                if(isOpera){
                    eventData.browser = 'Opera'
                }else if(isFirefox){
                    eventData.browser = 'Firefox'
                }else if(isSafari){
                    eventData.browser = 'Safari'
                }else if(isIE){
                    eventData.browser = 'Internet Explorer'
                }else if(isEdge){
                    eventData.browser = 'Edge'
                }else if(isChrome){
                    eventData.browser = 'Chrome'
                }
            }else{
                eventData.browser = 'Unknown'
            }

            var isMac = navigator.appVersion.indexOf("Mac") != -1
            var isWindows = navigator.appVersion.indexOf("Windows") != -1
            var isLinux = navigator.appVersion.indexOf("Linux") != -1
            if (isMac + isWindows + isLinux == 1){
                if(isMac){
                    eventData.os = 'Mac OS X'
                }else if(isWindows){
                    eventData.os = 'Windows'
                }else if(isLinux){
                    eventData.os = 'Linux'
                }
            }else{
                eventData.os = 'Unknown'
            }

            console.log("Anonymous event payload:");
            
            fetch('http://localhost:3000/recordevent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(eventData) // body data type must match "Content-Type" header
            });

        });
    }
}