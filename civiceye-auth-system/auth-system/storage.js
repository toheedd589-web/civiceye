(function() {
    "use strict";
    
    function getItem(key) {
        return sessionStorage.getItem(key) || localStorage.getItem(key);
    }
    
    function setItem(key, value, persist) {
        sessionStorage.setItem(key, value);
        if (persist) {
            localStorage.setItem(key, value);
        } else {
            localStorage.removeItem(key);
        }
    }
    
    function removeItem(key) {
        sessionStorage.removeItem(key);
        localStorage.removeItem(key);
    }
    
    function clear() {
        const keysToClear = Object.values(window.CE_CONSTANTS.STORAGE_KEYS);
        keysToClear.forEach(function(key) {
            sessionStorage.removeItem(key);
            localStorage.removeItem(key);
        });
    }

    window.CE_STORAGE = {
        getItem,
        setItem,
        removeItem,
        clear
    };
})();
