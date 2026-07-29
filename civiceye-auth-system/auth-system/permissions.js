(function() {
    "use strict";

    function canAccess(role, pageName) {
        const { ROLES } = window.CE_CONSTANTS;

        const ROLE_PERMISSIONS = {
            [ROLES.CITIZEN]: [
                'index.html',
                'civiceye-dashboard.html',
                'civiceye-report-issue.html',
                'civiceye-my-complaints.html',
                'civiceye-complaint-details.html',
                'civiceye-notifications.html',
                'civiceye-profile.html',
                'civiceye-settings.html',
                'civiceye-ai-analysis.html'
            ],
            [ROLES.OFFICER]: [
                'index.html',
                'civiceye-officer-dashboard.html',
                'civiceye-complaint-details.html',
                'civiceye-notifications.html',
                'civiceye-profile.html',
                'civiceye-settings.html'
            ],
            [ROLES.ADMIN]: [
                'index.html',
                'civiceye-admin-dashboard.html',
                'civiceye-notifications.html',
                'civiceye-profile.html',
                'civiceye-settings.html'
            ]
        };

        if (!role) return false;
        
        const cleanPageName = pageName.split('?')[0].split('/').pop();
        
        const allowedPages = ROLE_PERMISSIONS[role] || [];
        return allowedPages.includes(cleanPageName);
    }

    window.CE_PERMISSIONS = {
        canAccess
    };
})();
