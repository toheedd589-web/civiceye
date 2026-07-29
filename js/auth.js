/*
==========================================
CivicEye Authentication Manager
==========================================
Frontend Role-Based Authentication
==========================================
*/

(function () {
    "use strict";

    const STORAGE_KEY = "ce_role";

    // ==========================
    // Login
    // ==========================
    function login(role, rememberMe) {

        // Always save for current session
        sessionStorage.setItem(STORAGE_KEY, role);

        // Save permanently only if Remember Me is checked
        if (rememberMe) {
            localStorage.setItem(STORAGE_KEY, role);
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }

    // ==========================
    // Current Role
    // ==========================
    function getRole() {
        return (
            sessionStorage.getItem(STORAGE_KEY) ||
            localStorage.getItem(STORAGE_KEY)
        );
    }

    // ==========================
    // Logged In?
    // ==========================
    function isLoggedIn() {
        return getRole() !== null;
    }

    // ==========================
    // Logout
    // ==========================
    function logout() {

        sessionStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_KEY);

        window.location.replace("index.html");
    }

    // ==========================
    // Protect Page
    // ==========================
    function checkRole(requiredRole) {

        const role = getRole();

        // Not logged in
        if (!role) {
            window.location.replace("index.html");
            return;
        }

        // Wrong role
        if (role !== requiredRole) {
            alert("Access Denied!");
            window.location.replace("index.html");
        }
    }

    // ==========================
    // Public API
    // ==========================
    window.CivicEyeAuth = {
        login,
        logout,
        getRole,
        isLoggedIn,
        checkRole
    };

})();