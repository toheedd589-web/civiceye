'use strict';
async function loadDashboard() {
    const role = CivicEyeAuth.getRole();
    const container = document.getElementById("dashboard-container");
    if (!container) return;
    let file = "";
    switch (role) {
    case "citizen":
        file = "dashboards/citizen-dashboard.html";
        break;
    case "officer":
        file = "dashboards/officer-dashboard.html";
        break;
    case "admin":
        file = "dashboards/admin-dashboard.html";
        break;
    default:
        file = "dashboards/citizen-dashboard.html";
        break;}
    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error("Failed to load dashboard.");
        }
        const html = await response.text();
        container.innerHTML = html;
    } catch (err) {
        console.error(err);
        container.innerHTML = `
            <div style="
                padding:40px;
                text-align:center;
                color:red;
                font-size:18px;
                font-weight:600;
            ">
                Failed to load dashboard.
            </div>
        `;

    }

}