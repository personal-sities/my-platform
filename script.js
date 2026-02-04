function login() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;

    if (u === "admin" && p === "1234") {
        localStorage.setItem("auth", "true");
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("error").innerText = "❌ Login xato";
    }
}

function logout() {
    localStorage.removeItem("auth");
    window.location.href = "index.html";
}

function toggleDark() {
    document.body.classList.toggle("dark");
}

/* AUTH CHECK */
if (location.pathname.includes("dashboard")) {
    if (!localStorage.getItem("auth")) {
        window.location.href = "index.html";
    }

    const ctx = document.getElementById('myChart');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Yan', 'Fev', 'Mar', 'Apr'],
            datasets: [{
                label: 'Sales',
                data: [12, 19, 7, 15]
            }]
        }
    });
}
