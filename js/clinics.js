let clinics = JSON.parse(localStorage.getItem("clinics")) || [];

function addClinic() {
  const name = prompt("Klinika nomi");
  if (!name) return;

  const systems = prompt("Qaysi tizimlar yo‘q? (AI Bot, Platforma, Amo CRM)");

  clinics.push({
    name,
    systems,
    comment: ""
  });

  save();
}

function save() {
  localStorage.setItem("clinics", JSON.stringify(clinics));
  render();
}

function render() {
  univerTable.innerHTML = "";

  clinics.forEach(c => {
    univerTable.innerHTML += `
      <tr>
        <td>${c.name || ""}</td>
        <td>${c.systems || ""}</td>
        <td><input value="${c.comment || ""}"></td>
      </tr>
    `;
  });
}

function filterClinic() {
  const q = search.value.toLowerCase();

  [...univerTable.rows].forEach(r => {
    r.style.display = r.innerText.toLowerCase().includes(q) ? "" : "none";
  });
}

render();
