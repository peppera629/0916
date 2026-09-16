document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const hoursEl = document.getElementById('time-hours');
    const minutesEl = document.getElementById('time-minutes');
    const secondsEl = document.getElementById('time-seconds');
    const ampmEl = document.getElementById('time-ampm');
    const dateEl = document.getElementById('date-text');
    const timezoneEl = document.getElementById('timezone');
    const locationTextEl = document.getElementById('location-text');
    const btnCopy = document.getElementById('btn-copy-time');
    const toastEl = document.getElementById('toast');
    const yearEl = document.getElementById('year');

    // Update Year
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Get Timezone String
    function getTimezoneOffsetString() {
        const offset = -new Date().getTimezoneOffset();
        const diff = offset >= 0 ? '+' : '-';
        const pad = (num) => String(Math.floor(Math.abs(num))).padStart(2, '0');
        const hours = pad(offset / 60);
        const mins = pad(offset % 60);
        return `UTC${diff}${hours}:${mins}`;
    }

    // Set Timezone Text
    const tzString = getTimezoneOffsetString();
    if (timezoneEl) timezoneEl.textContent = tzString;
    if (locationTextEl) locationTextEl.textContent = `Local Time Zone (${tzString})`;

    // Main Clock Update Function
    function updateClock() {
        const now = new Date();

        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // 12-Hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 becomes 12
        const hoursFormatted = String(hours).padStart(2, '0');

        if (hoursEl) hoursEl.textContent = hoursFormatted;
        if (minutesEl) minutesEl.textContent = minutes;
        if (secondsEl) secondsEl.textContent = seconds;
        if (ampmEl) ampmEl.textContent = ampm;

        // Date formatting: Wednesday, September 16, 2026
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const dateString = now.toLocaleDateString('en-US', options);
        if (dateEl) dateEl.textContent = dateString;
    }

    // Initial call & Interval
    updateClock();
    setInterval(updateClock, 1000);

    // Copy Current Time Action
    if (btnCopy) {
        btnCopy.addEventListener('click', () => {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
            const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
            const copyText = `Mick Wang's Local Time: ${timeStr} (${tzString}) on ${dateStr}`;

            navigator.clipboard.writeText(copyText).then(() => {
                showToast();
            }).catch(() => {
                // Fallback for clipboard
                const textarea = document.createElement('textarea');
                textarea.value = copyText;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                showToast();
            });
        });
    }

    function showToast() {
        if (!toastEl) return;
        toastEl.classList.add('show');
        setTimeout(() => {
            toastEl.classList.remove('show');
        }, 2500);
    }
});
