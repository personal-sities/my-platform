let schools = JSON.parse(localStorage.getItem("schools")) || [];

function addSchool() {
  const name = prompt("Maktab nomi");
  if (!name) return;

  const systems = prompt("Qaysi tizimlar yo‘q? (AI Bot, Platforma, Amo CRM)");

  schools.push({
    name,
    systems,
    comment: ""
  });

  save();
}

function save() {
  localStorage.setItem("schools", JSON.stringify(schools));
  render();
}

function render() {
  univerTable.innerHTML = "";

  schools.forEach(s => {
    univerTable.innerHTML += `
      <tr>
        <td>${s.name || ""}</td>
        <td>${s.systems || ""}</td>
        <td><input value="${s.comment || ""}"></td>
      </tr>
    `;
  });
}

function filterSchool() {
  const q = search.value.toLowerCase();

  [...univerTable.rows].forEach(r => {
    r.style.display = r.innerText.toLowerCase().includes(q) ? "" : "none";
  });
}

render();
