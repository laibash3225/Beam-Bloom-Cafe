document.addEventListener("DOMContentLoaded", () => {
    // -------------------------
    // Dark / Light Mode
    // -------------------------
    const themeButton = document.getElementById("theme-toggle");

    if (themeButton) {
        themeButton.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");

            const isDark = document.body.classList.contains("dark-mode");
            themeButton.textContent = isDark ? "☀️" : "🌙";
            themeButton.setAttribute(
                "aria-label",
                isDark ? "Switch to light mode" : "Switch to dark mode"
            );
        });
    }

    // -------------------------
    // Order Calculator
    // -------------------------
    const items = document.querySelectorAll(".menu-check");
    const total = document.getElementById("total");

    function calculateTotal() {
        let sum = 0;

        items.forEach(item => {
            if (item.checked) {
                sum += Number(item.dataset.price);
            }
        });

        total.textContent = `Total: $${sum.toFixed(2)}`;
    }

    items.forEach(item => {
        item.addEventListener("change", calculateTotal);
    });

    // -------------------------
    // Menu Category Filter
    // -------------------------
    const filters = document.querySelectorAll(".filter-btn");
    const rows = document.querySelectorAll("#menu-table tbody tr");

    filters.forEach(button => {
        button.addEventListener("click", () => {
            filters.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const category = button.dataset.category;

            rows.forEach(row => {
                const shouldShow =
                    category === "all" || row.dataset.category === category;

                row.style.display = shouldShow ? "" : "none";
            });
        });
    });

    // -------------------------
    // Read More / Read Less
    // -------------------------
    const readMore = document.getElementById("read-more");
    const extra = document.getElementById("extra-story");

    if (readMore && extra) {
        readMore.addEventListener("click", () => {
            const isHidden = extra.classList.toggle("hidden");
            readMore.textContent = isHidden ? "Read More" : "Read Less";
        });
    }

    // -------------------------
    // Dynamic Opening Status
    // -------------------------
    const status = document.getElementById("opening-status");

    function updateStatus() {
        if (!status) return;

        const now = new Date();
        const day = now.getDay();
        const hour = now.getHours();
        const minutes = now.getMinutes();
        const currentTime = hour * 60 + minutes;

        let opening;
        let closing;

        if (day >= 1 && day <= 5) {
            opening = 7 * 60;
            closing = 19 * 60;
        } else if (day === 6) {
            opening = 8 * 60;
            closing = 20 * 60;
        } else {
            opening = 8 * 60;
            closing = 16 * 60;
        }

        const isOpen = currentTime >= opening && currentTime < closing;

        if (isOpen) {
            status.textContent = "● We are Open!";
            status.classList.add("open");
            status.classList.remove("closed");
        } else {
            status.textContent = "● We are Closed";
            status.classList.add("closed");
            status.classList.remove("open");
        }
    }

    updateStatus();
    setInterval(updateStatus, 60000);

    // -------------------------
    // Birth Year Discount
    // -------------------------
    const birthYear = document.getElementById("birth-year");
    const discount = document.getElementById("discount-message");

    birthYear.addEventListener("input", () => {
        const value = birthYear.value.trim();

        if (!value) {
            discount.textContent = "";
            return;
        }

        const year = Number(value);
        const current = new Date().getFullYear();

        if (!Number.isInteger(year) || year < 1900 || year > current) {
            discount.textContent = "Please enter a valid birth year.";
            discount.className = "error-message";
            return;
        }

        const age = current - year;

        if (age >= 60) {
            discount.textContent = "You qualify for a senior discount!";
            discount.className = "success-message";
        } else if (age >= 18 && age <= 25) {
            discount.textContent = "You qualify for a student discount!";
            discount.className = "success-message";
        } else {
            discount.textContent = "You do not qualify for a special discount.";
            discount.className = "notice-message";
        }
    });

    // -------------------------
    // Character Counter
    // -------------------------
    const notes = document.getElementById("special-notes");
    const count = document.getElementById("character-count");

    notes.addEventListener("input", () => {
        const remaining = 100 - notes.value.length;
        count.textContent = `${remaining} characters remaining`;
    });

    // -------------------------
    // Reservation Form
    // -------------------------
    const form = document.getElementById("contact-form");
    const message = document.getElementById("form-message");

    form.addEventListener("submit", event => {
        event.preventDefault();

        const name = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const guests = document.getElementById("guests").value;
        const seating = document.querySelector('input[name="seat"]:checked');

        if (!name || !email || !guests || !seating) {
            message.textContent = "Please complete all required fields.";
            message.className = "error-message";
            return;
        }

        message.textContent =
            `Thank you, ${name}! Your table request for ${guests} guest(s) has been received. We will contact you at ${email}.`;
        message.className = "success-message";

        form.reset();

        count.textContent = "100 characters remaining";
        discount.textContent = "";
    });
});
