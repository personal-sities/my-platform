let universities = JSON.parse(localStorage.getItem("universities")) || [];

function addUniver() {
  const name = prompt("Universitet nomi");
  const systems = prompt("Qaysi tizimlar yo‘q? (AI Bot, Platforma, Amo CRM)");

  universities.push({
    name,
    systems,
    comment: ""
  });

  save();
}

function save() {
  localStorage.setItem("universities", JSON.stringify(universities));
  render();
}

function render() {
  univerTable.innerHTML = "";
  universities.forEach(u => {
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
