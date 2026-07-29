(function() {
    "use strict";

    function login(role, rememberMe) {
        const { STORAGE_KEYS, ROLES } = window.CE_CONSTANTS;
        const storage = window.CE_STORAGE;

        storage.setItem(STORAGE_KEYS.ROLE, role, rememberMe);
        storage.setItem(STORAGE_KEYS.REMEMBER_ME, rememberMe ? "true" : "false", rememberMe);
        
        let userDetails = { role: role };
        if (role === ROLES.CITIZEN) {
            userDetails.name = "Aditi Sharma";
            userDetails.id = "CTZ-88213";
            userDetails.initials = "AS";
        } else if (role === ROLES.OFFICER) {
            userDetails.name = "Rahul Kumar";
            userDetails.id = "OFC-44910";
            userDetails.initials = "RK";
        } else if (role === ROLES.ADMIN) {
            userDetails.name = "Municipal Administrator";
            userDetails.id = "ADM-00109";
            userDetails.initials = "MA";
        }
        storage.setItem(STORAGE_KEYS.USER, JSON.stringify(userDetails), rememberMe);
    }

    function logout() {
        const storage = window.CE_STORAGE;
        storage.clear();
        window.location.replace("index.html");
    }

    function getRole() {
        const { STORAGE_KEYS } = window.CE_CONSTANTS;
        const storage = window.CE_STORAGE;
        return storage.getItem(STORAGE_KEYS.ROLE);
    }

    function getUser() {
        const { STORAGE_KEYS } = window.CE_CONSTANTS;
        const storage = window.CE_STORAGE;
        const userStr = storage.getItem(STORAGE_KEYS.USER);
        return userStr ? JSON.parse(userStr) : null;
    }

    function isLoggedIn() {
        return !!getRole();
    }

    window.CE_AUTH = {
        login,
        logout,
        getRole,
        getUser,
        isLoggedIn
    };
})();
