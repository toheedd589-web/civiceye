(function() {
    "use strict";

    const ROLES = {
        CITIZEN: 'citizen',
        OFFICER: 'officer',
        ADMIN: 'admin'
    };

    const STORAGE_KEYS = {
        ROLE: 'ce_role',
        USER: 'ce_user',
        REMEMBER_ME: 'ce_remember_me'
    };

    const DEFAULT_REDIRECTS = {
        [ROLES.CITIZEN]: 'civiceye-dashboard.html',
        [ROLES.OFFICER]: 'civiceye-officer-dashboard.html',
        [ROLES.ADMIN]: 'civiceye-admin-dashboard.html'
    };

    window.CE_CONSTANTS = {
        ROLES,
        STORAGE_KEYS,
        DEFAULT_REDIRECTS
    };
})();
