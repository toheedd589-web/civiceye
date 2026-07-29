(function() {
    "use strict";

    function guardPage() {
        const auth = window.CE_AUTH;
        const permissions = window.CE_PERMISSIONS;
        const routeConfig = window.CE_ROUTE_CONFIG;

        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const isLoggedIn = auth.isLoggedIn();
        const role = auth.getRole();

        // 1. Public page check
        if (routeConfig.isPublic(currentPage)) {
            if (isLoggedIn && currentPage === 'index.html') {
                const redirectPath = routeConfig.getRedirectPath(role);
                window.location.replace(redirectPath);
            }
            return;
        }

        // 2. Protected page checks
        if (!isLoggedIn) {
            window.location.replace('index.html');
            return;
        }

        // 3. Permission checks
        if (!permissions.canAccess(role, currentPage)) {
            const redirectPath = routeConfig.getRedirectPath(role);
            window.location.replace(redirectPath);
        }
    }

    guardPage();

    window.CE_ROLE_GUARD = {
        guardPage
    };
})();
