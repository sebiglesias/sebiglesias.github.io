(function () {
    var STORAGE_KEY = 'theme-preference';
    var THEMES = ['system', 'light', 'dark'];

    var ICONS = {
        system: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M0 4s0-2 2-2h12s2 0 2 2v6s0 2-2 2h-4q.168.591.25 1.5H11a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1h.75Q5.832 12.591 6 12H2s-2 0-2-2zm1.398-.855a.76.76 0 0 0-.254.302A1.46 1.46 0 0 0 1 4v6c0 .325.078.502.145.602.07.105.17.188.302.254a1.46 1.46 0 0 0 .538.143L2.5 11h11l.515-.001a1.46 1.46 0 0 0 .538-.143.76.76 0 0 0 .302-.254A1.46 1.46 0 0 0 15 10V4a1.46 1.46 0 0 0-.145-.602.76.76 0 0 0-.302-.254 1.46 1.46 0 0 0-.538-.143L13.5 3h-11l-.515.001a1.46 1.46 0 0 0-.538.143z"/></svg>',
        light: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/></svg>',
        dark: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/></svg>'
    };

    var LABELS = {
        system: 'System',
        light: 'Light',
        dark: 'Dark'
    };

    function getPreference() {
        return localStorage.getItem(STORAGE_KEY) || 'system';
    }

    function getEffectiveTheme(preference) {
        if (preference === 'system') {
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        return preference;
    }

    function applyTheme(preference) {
        document.documentElement.dataset.theme = getEffectiveTheme(preference);
        updateButton(preference);
    }

    function updateButton(preference) {
        var btn = document.getElementById('theme-toggle');
        if (!btn) return;
        btn.innerHTML = ICONS[preference];
        btn.title = LABELS[preference] + ' theme — click to cycle';
        btn.setAttribute('aria-label', 'Current theme: ' + LABELS[preference] + '. Click to change.');
    }

    window.__themeToggle = function () {
        var current = getPreference();
        var next = THEMES[(THEMES.indexOf(current) + 1) % THEMES.length];
        localStorage.setItem(STORAGE_KEY, next);
        applyTheme(next);
    };

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
        if (getPreference() === 'system') {
            applyTheme('system');
        }
    });

    document.addEventListener('DOMContentLoaded', function () {
        updateButton(getPreference());
    });
}());
