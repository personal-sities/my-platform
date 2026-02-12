
let schools = JSON.parse(localStorage.getItem("schools")) || [];

function addUniver() {
  const name = prompt("Xususiy maktablar nomi");
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
  schools.forEach(u => {
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