
let clinics = JSON.parse(localStorage.getItem("clinics")) || [];

function addUniver() {
  const name = prompt("Klinika nomi");
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
  clinics.forEach(u => {
    univerTable.innerHTML += `
      <tr>
        <td>${u.name}</td>
        <td>${u.systems}</td>
        <td><input value="${u.comment}"></td>
      </tr>
    `;
  });
}

function filterUniver() {
  const q = search.value.toLowerCase();
  [...univerTable.rows].forEach(r => {
    r.style.display = r.innerText.toLowerCase().includes(q) ? "" : "none";
  });
}

render();
