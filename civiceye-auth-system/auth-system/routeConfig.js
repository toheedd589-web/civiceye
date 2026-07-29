(function() {
    "use strict";

    const PUBLIC_PAGES = ['index.html', 'civiceye-navbar.html'];

    function isPublic(pageName) {
        const cleanPageName = pageName.split('?')[0].split('/').pop();
        return PUBLIC_PAGES.includes(cleanPageName);
    }

    function getRedirectPath(role) {
        const { DEFAULT_REDIRECTS } = window.CE_CONSTANTS;
        return DEFAULT_REDIRECTS[role] || 'index.html';
    }

    window.CE_ROUTE_CONFIG = {
        isPublic,
        getRedirectPath
    };
})();
