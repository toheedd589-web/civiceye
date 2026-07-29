'use strict';

/* ===========================
   ROLE CONFIGURATION
=========================== */

const USER_ROLE = CivicEyeAuth.getRole() || "citizen";

const ROLE_SIDEBAR = {

    citizen: [
        "dashboard",
        "report-issue",
        "my-complaints",
        "notifications",
        "profile",
        "settings"
    ],

    officer: [
        "dashboard",
        "officer-hub",
        "notifications",
        "profile",
        "settings"
    ],

    admin: [
        "dashboard",
        "admin-dashboard",
        "officer-hub",
        "worker-dashboard",
        "notifications",
        "profile",
        "settings"
    ]

};