let staff = JSON.parse(localStorage.getItem("staff")) || [];

function addStaff() {
  const name = prompt("Ism familiya");
  const job = prompt("Lavozimi");
  const place = prompt("Ish joyi");

  staff.push({ name, job, place, tasks: [] });
  save();
}

function save() {
  localStorage.setItem("staff", JSON.stringify(staff));
  render();
}

function render() {
  staffList.innerHTML = "";
  staff.forEach(s => {
    staffList.innerHTML += `
      <div class="card">
        <div>
          <b>${s.name}</b><br>
          ${s.job}<br>
          ${s.place}
        </div>
      </div>
    `;
  });
}

render();
