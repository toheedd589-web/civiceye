(function() {
    "use strict";

    // Define all possible page definitions
    const ALL_PAGES = {
        dashboard: { 
            label: 'Dashboard',     
            href: 'civiceye-dashboard.html',
            icon: '<rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/><rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/><rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/><rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/>' 
        },
        'officer-dashboard': {
            label: 'Dashboard',
            href: 'civiceye-officer-dashboard.html',
            icon: '<rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/><rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/><rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/><rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/>'
        },
        'admin-dashboard': {
            label: 'Dashboard',
            href: 'civiceye-admin-dashboard.html',
            icon: '<rect x="3" y="3" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/><rect x="13" y="3" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/><rect x="3" y="13" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/><rect x="13" y="13" width="8" height="8" rx="2" stroke="currentColor" stroke-width="2"/>'
        },
        'report-issue': { 
            label: 'Report Issue',  
            href: 'civiceye-report-issue.html',
            icon: '<path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>' 
        },
        'my-complaints': { 
            label: 'My Complaints', 
            href: 'civiceye-my-complaints.html',
            icon: '<path d="M6 4h9l5 5v11a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>' 
        },
        notifications: { 
            label: 'Notifications', 
            href: 'civiceye-notifications.html',
            icon: '<path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><path d="M13.7 21a2 2 0 0 1-3.4 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' 
        },
        profile: { 
            label: 'Profile',       
            href: 'civiceye-profile.html',
            icon: '<circle cx="12" cy="8" r="3.5" stroke="currentColor" stroke-width="2"/><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' 
        },
        settings: { 
            label: 'Settings',      
            href: 'civiceye-settings.html',
            icon: '<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="2"/><path d="M19.4 13.5a7.9 7.9 0 0 0 0-3l2-1.6-2-3.4-2.4.8a7.9 7.9 0 0 0-2.6-1.5L14 2h-4l-.4 2.8a7.9 7.9 0 0 0-2.6 1.5l-2.4-.8-2 3.4 2 1.6a7.9 7.9 0 0 0 0 3l-2 1.6 2 3.4 2.4-.8a7.9 7.9 0 0 0 2.6 1.5L10 22h4l.4-2.8a7.9 7.9 0 0 0 2.6-1.5l2.4.8 2-3.4-2-1.6Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>' 
        },
        'complaint-details': { 
            label: 'Complaint Details', 
            href: 'civiceye-complaint-details.html', 
            icon: '' 
        },
        'ai-analysis': {
            label: 'AI Analysis',
            href: 'civiceye-ai-analysis.html',
            icon: ''
        }
    };

    // Sidebar items mapping per role
    const { ROLES } = window.CE_CONSTANTS;
    const ROLE_SIDEBARS = {
        [ROLES.CITIZEN]: ['dashboard', 'report-issue', 'my-complaints', 'notifications', 'profile', 'settings'],
        [ROLES.OFFICER]: ['officer-dashboard', 'notifications', 'profile', 'settings'],
        [ROLES.ADMIN]: ['admin-dashboard', 'notifications', 'profile', 'settings']
    };

    function getNavigationConfig() {
        const auth = window.CE_AUTH;
        const role = auth.getRole();
        
        if (!role) return { PAGES: {}, SIDEBAR_ORDER: [] };

        const sidebarKeys = ROLE_SIDEBARS[role] || [];
        const PAGES = {};
        
        // Setup default dashboard mapping based on role
        if (role === ROLES.CITIZEN) {
            PAGES['dashboard'] = ALL_PAGES['dashboard'];
        } else if (role === ROLES.OFFICER) {
            PAGES['dashboard'] = ALL_PAGES['officer-dashboard'];
        } else if (role === ROLES.ADMIN) {
            PAGES['dashboard'] = ALL_PAGES['admin-dashboard'];
        }

        // Add role-specific pages
        sidebarKeys.forEach(function(key) {
            if (key === 'officer-dashboard' || key === 'admin-dashboard') {
                return;
            }
            PAGES[key] = ALL_PAGES[key];
        });

        // Add hidden child pages only if role is permitted
        if (role === ROLES.CITIZEN) {
            PAGES['complaint-details'] = ALL_PAGES['complaint-details'];
            PAGES['ai-analysis'] = ALL_PAGES['ai-analysis'];
        } else if (role === ROLES.OFFICER) {
            PAGES['complaint-details'] = ALL_PAGES['complaint-details'];
        }

        // Sidebar items in correct order
        const SIDEBAR_ORDER = sidebarKeys.map(function(key) {
            if (key === 'officer-dashboard' || key === 'admin-dashboard') {
                return 'dashboard';
            }
            return key;
        });

        return {
            PAGES,
            SIDEBAR_ORDER
        };
    }

    function el(html) {
        var wrap = document.createElement('div');
        wrap.innerHTML = html.trim();
        return wrap.firstElementChild;
    }

    function mountLoader() {
        var existing = document.getElementById('ce-page-loader');
        if (existing) return existing;
        var loader = el(
            '<div id="ce-page-loader" class="ce-page-loader" aria-hidden="true">' +
                '<div class="flex flex-col items-center gap-3.5">' +
                    '<span class="ce-loader-badge">' +
                        '<svg width="22" height="22" viewBox="0 0 24 24" fill="none">' +
                            '<path d="M1.5 12C3.7 7.2 7.5 4.7 12 4.7c4.5 0 8.3 2.5 10.5 7.3-2.2 4.8-6 7.3-10.5 7.3-4.5 0-8.3-2.5-10.5-7.3Z" stroke="#ECFDF5" stroke-width="1.6" stroke-linejoin="round"/>' +
                            '<circle cx="12" cy="12" r="3.1" fill="#0E9F6E"/>' +
                        '</svg>' +
                    '</span>' +
                    '<span class="text-[12.5px] font-semibold text-[var(--ce-ink-soft)]">Loading CivicEye...</span>' +
                '</div>' +
            '</div>'
        );
        document.body.insertBefore(loader, document.body.firstChild);
        return loader;
    }

    function hideLoader() {
        var loader = document.getElementById('ce-page-loader');
        if (!loader) return;
        window.setTimeout(function () { loader.classList.add('is-hidden'); }, 220);
    }

    function navigate(href) {
        if (!href) return;
        var loader = document.getElementById('ce-page-loader');
        var content = document.getElementById('ce-shell-content');
        if (content) content.classList.add('is-leaving');
        if (loader) loader.classList.remove('is-hidden');
        window.setTimeout(function () { window.location.href = href; }, 260);
    }

    function renderHeader(activeKey, sidebarMode) {
        var mount = document.getElementById('ce-shell-header-mount');
        if (!mount) return;
        var toggleVisibilityClass = sidebarMode === 'floating' ? '' : 'lg:hidden';
        
        const auth = window.CE_AUTH;
        const config = getNavigationConfig();
        const PAGES = config.PAGES;
        const user = auth.getUser() || { name: 'Guest', initials: 'G' };
        const role = auth.getRole();
        const isCitizen = role === window.CE_CONSTANTS.ROLES.CITIZEN;

        const homeHref = PAGES.dashboard ? PAGES.dashboard.href : 'index.html';
        const notifHref = PAGES.notifications ? PAGES.notifications.href : '#';

        // Check if there is an unread count
        const DUMMY_UNREAD_COUNT = 4;

        var header = el(
            '<header class="ce-shell-header">' +
                '<div class="max-w-[1400px] mx-auto px-5 md:px-8 h-16 md:h-[68px] flex items-center justify-between gap-3">' +
                    '<div class="flex items-center gap-2.5 min-w-0">' +
                        '<button type="button" id="ce-shell-sidebar-toggle" aria-label="Open menu" aria-expanded="false" aria-controls="ce-shell-sidebar" class="ce-ghost-btn ' + toggleVisibilityClass + ' h-10 w-10 shrink-0 rounded-full border border-[var(--ce-border)] bg-white flex items-center justify-center">' +
                            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" stroke="#0B1220" stroke-width="2" stroke-linecap="round"/></svg>' +
                        '</button>' +
                        '<button type="button" class="ce-shell-logo-btn flex items-center gap-2 shrink-0" data-ce-href="' + homeHref + '" aria-label="CivicEye — dashboard">' +
                            '<span class="h-8 w-8 rounded-lg bg-[var(--ce-ink)] flex items-center justify-center">' +
                                '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M1.5 12C3.7 7.2 7.5 4.7 12 4.7c4.5 0 8.3 2.5 10.5 7.3-2.2 4.8-6 7.3-10.5 7.3-4.5 0-8.3-2.5-10.5-7.3Z" stroke="#ECFDF5" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="12" r="3.1" fill="#0E9F6E"/></svg>' +
                            '</span>' +
                            '<span class="hidden sm:block text-[15px] font-extrabold tracking-tight text-[var(--ce-ink)]">Civic<span class="text-[var(--ce-emerald)]">Eye</span>' + 
                            (role === 'officer' ? ' <span class="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-bold ml-1">OFFICER HUB</span>' : '') +
                            (role === 'admin' ? ' <span class="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-bold ml-1">ADMIN</span>' : '') +
                            '</span>' +
                        '</button>' +
                    '</div>' +

                    // Search bar ONLY generated for citizen role
                    (isCitizen ? 
                    '<div class="hidden md:block flex-1 max-w-xs">' +
                        '<label for="ce-shell-search" class="sr-only">Search complaints</label>' +
                        '<div class="relative">' +
                            '<svg class="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="7" stroke="#94A3B8" stroke-width="2"/><path d="M20 20l-3.5-3.5" stroke="#94A3B8" stroke-width="2" stroke-linecap="round"/></svg>' +
                            '<input id="ce-shell-search" type="search" placeholder="Search complaints…" class="w-full h-9 pl-9 pr-3 rounded-lg border border-[var(--ce-border)] bg-white text-[13px] placeholder:text-slate-400 focus:border-[var(--ce-emerald)] transition-colors" />' +
                        '</div>' +
                    '</div>' : '') +

                    '<div class="flex items-center gap-2 shrink-0">' +
                        (PAGES.notifications ? 
                        '<button type="button" class="ce-shell-notif-btn ce-ghost-btn relative h-10 w-10 rounded-full border border-[var(--ce-border)] bg-white flex items-center justify-center" data-ce-href="' + notifHref + '" aria-label="Notifications">' +
                            '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9Z" stroke="#0B1220" stroke-width="2" stroke-linejoin="round"/><path d="M13.7 21a2 2 0 0 1-3.4 0" stroke="#0B1220" stroke-width="2" stroke-linecap="round"/></svg>' +
                            (DUMMY_UNREAD_COUNT > 0 ? '<span class="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500"></span>' : '') +
                        '</button>' : '') +

                        '<div class="relative">' +
                            '<button type="button" id="ce-shell-profile-btn" aria-haspopup="true" aria-expanded="false" class="ce-ghost-btn h-10 px-1.5 rounded-full border border-[var(--ce-border)] bg-white flex items-center gap-1">' +
                                '<span class="h-7 w-7 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[11px] font-bold">' + user.initials + '</span>' +
                                '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 9l6 6 6-6" stroke="#0B1220" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                            '</button>' +
                            '<div id="ce-shell-profile-menu" role="menu" aria-label="Profile menu" class="ce-shell-profile-menu absolute right-0 mt-2 w-48 rounded-xl border border-[var(--ce-border)] bg-white shadow-xl p-1.5 z-50">' +
                                (PAGES.profile ? '<button type="button" role="menuitem" class="w-full text-left px-3 py-2 rounded-lg text-[13.5px] font-medium text-[var(--ce-ink)] hover:bg-slate-50" data-ce-href="' + PAGES.profile.href + '">My Profile</button>' : '') +
                                (PAGES.settings ? '<button type="button" role="menuitem" class="w-full text-left px-3 py-2 rounded-lg text-[13.5px] font-medium text-[var(--ce-ink)] hover:bg-slate-50" data-ce-href="' + PAGES.settings.href + '">Settings</button>' : '') +
                                '<div class="h-px bg-[var(--ce-border)] my-1"></div>' +
                                '<button type="button" role="menuitem" class="w-full text-left px-3 py-2 rounded-lg text-[13.5px] font-semibold text-red-600 hover:bg-red-50" id="ce-shell-logout-btn">Log Out</button>' +
                            '</div>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</header>'
        );

        mount.replaceWith(header);

        var searchInput = header.querySelector('#ce-shell-search');
        if (searchInput) {
            searchInput.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' && searchInput.value.trim() && PAGES['my-complaints']) {
                    navigate(PAGES['my-complaints'].href + '?search=' + encodeURIComponent(searchInput.value.trim()));
                }
            });
        }

        var profileBtn = header.querySelector('#ce-shell-profile-btn');
        var profileMenu = header.querySelector('#ce-shell-profile-menu');
        function closeProfileMenu() {
            profileMenu.classList.remove('is-open');
            profileBtn.setAttribute('aria-expanded', 'false');
        }
        profileBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            var isOpen = profileMenu.classList.toggle('is-open');
            profileBtn.setAttribute('aria-expanded', String(isOpen));
        });
        document.addEventListener('click', function (e) {
            if (!e.target.closest('#ce-shell-profile-menu') && !e.target.closest('#ce-shell-profile-btn')) closeProfileMenu();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeProfileMenu();
        });

        var logoutBtn = header.querySelector('#ce-shell-logout-btn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', function () {
                auth.logout();
            });
        }
    }

    function renderSidebar(activeKey, sidebarMode) {
        var mount = document.getElementById('ce-shell-sidebar-mount');
        if (!mount) return;

        const config = getNavigationConfig();
        const PAGES = config.PAGES;
        const SIDEBAR_ORDER = config.SIDEBAR_ORDER;

        var navItemsHtml = SIDEBAR_ORDER.map(function (key) {
            var page = PAGES[key];
            var isActive = key === activeKey;
            return '' +
                '<button type="button" class="ce-shell-nav-item ce-rippleable w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-[13.5px] font-semibold text-[var(--ce-ink)] text-left" ' +
                'data-ce-href="' + page.href + '"' + (isActive ? ' aria-current="page"' : '') + '>' +
                    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" stroke="currentColor">' + page.icon + '</svg>' +
                    page.label +
                '</button>';
        }).join('');

        var isFloating = sidebarMode === 'floating';
        var desktopClasses = isFloating ? '' : ' lg:static lg:z-auto lg:w-[220px] lg:shrink-0 lg:p-0 lg:sticky lg:top-6 lg:h-auto';
        var floatingClass = isFloating ? ' ce-shell-sidebar--floating' : '';

        var backdrop = el('<div id="ce-shell-sidebar-backdrop" class="ce-shell-sidebar-backdrop' + (isFloating ? '' : ' lg:hidden') + '"></div>');
        var sidebar = el(
            '<aside id="ce-shell-sidebar" class="ce-shell-sidebar' + floatingClass + ' fixed top-0 left-0 z-50 h-full w-[78%] max-w-xs overflow-y-auto bg-white p-4 flex flex-col gap-1.5' + desktopClasses + '" aria-label="Primary navigation">' +
                '<div class="flex items-center justify-between mb-2' + (isFloating ? '' : ' lg:hidden') + '">' +
                    '<span class="text-[15px] font-extrabold tracking-tight text-[var(--ce-ink)]">Civic<span class="text-[var(--ce-emerald)]">Eye</span></span>' +
                    '<button type="button" id="ce-shell-sidebar-close" aria-label="Close menu" class="ce-ghost-btn h-9 w-9 rounded-full flex items-center justify-center border border-[var(--ce-border)]">' +
                        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 6L18 18M18 6L6 18" stroke="#0B1220" stroke-width="2" stroke-linecap="round"/></svg>' +
                    '</button>' +
                '</div>' +
                '<div class="lg:rounded-2xl lg:border lg:border-[var(--ce-border)] lg:bg-white lg:p-2.5 flex flex-col gap-1">' +
                    navItemsHtml +
                '</div>' +
            '</aside>'
        );

        mount.replaceWith(sidebar);
        document.body.appendChild(backdrop);

        var toggleBtn = document.getElementById('ce-shell-sidebar-toggle');
        var closeBtn = sidebar.querySelector('#ce-shell-sidebar-close');

        function openSidebar() {
            sidebar.classList.add('is-open');
            backdrop.classList.add('is-open');
            if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'true');
            document.body.style.overflow = 'hidden';
            closeBtn.focus();
        }
        function closeSidebar() {
            sidebar.classList.remove('is-open');
            backdrop.classList.remove('is-open');
            if (toggleBtn) toggleBtn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
            if (toggleBtn) toggleBtn.focus();
        }
        if (toggleBtn) toggleBtn.addEventListener('click', openSidebar);
        closeBtn.addEventListener('click', closeSidebar);
        backdrop.addEventListener('click', closeSidebar);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && sidebar.classList.contains('is-open')) closeSidebar();
        });
        window.addEventListener('resize', function () {
            if (!isFloating && window.innerWidth >= 1024 && sidebar.classList.contains('is-open')) closeSidebar();
        });

        sidebar.addEventListener('click', function (e) {
            if (e.target.closest('[data-ce-href]')) closeSidebar();
        });
    }

    function renderBreadcrumb(trail) {
        var mount = document.getElementById('ce-shell-breadcrumb-mount');
        if (!mount || !trail || !trail.length) return;

        var html = trail.map(function (crumb, i) {
            var isLast = i === trail.length - 1;
            var sep = i > 0 ? '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true" class="mx-1 shrink-0"><path d="M9 6l6 6-6 6" stroke="#94A3B8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' : '';
            if (isLast || !crumb.href) {
                return sep + '<span class="text-[12.5px] font-semibold text-[var(--ce-ink)]" aria-current="page">' + crumb.label + '</span>';
            }
            return sep + '<button type="button" class="text-[12.5px] font-medium text-[var(--ce-ink-soft)]" data-ce-href="' + crumb.href + '">' + crumb.label + '</button>';
        }).join('');

        var nav = el('<nav aria-label="Breadcrumb" class="ce-shell-breadcrumb flex items-center flex-wrap mb-4">' + html + '</nav>');
        mount.replaceWith(nav);
    }

    function wireNavigation() {
        document.addEventListener('click', function (e) {
            var trigger = e.target.closest('[data-ce-href]');
            if (!trigger) return;
            e.preventDefault();
            navigate(trigger.getAttribute('data-ce-href'));
        });
    }

    window.CivicEyeShell = {
        PAGES: {},
        navigate: navigate,
        init: function (config) {
            config = config || {};
            
            const navConf = getNavigationConfig();
            this.PAGES = navConf.PAGES;
            
            mountLoader();
            renderHeader(config.activeKey, config.sidebarMode);
            renderSidebar(config.activeKey, config.sidebarMode);
            renderBreadcrumb(config.breadcrumb);
            wireNavigation();

            var params = new URLSearchParams(window.location.search);
            var searchTerm = params.get('search');
            var searchBox = document.getElementById('ce-shell-search');
            if (searchTerm && searchBox) searchBox.value = searchTerm;

            window.addEventListener('pageshow', hideLoader);
            window.setTimeout(hideLoader, 60);
        }
    };
})();
