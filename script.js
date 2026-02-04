// AUTH INIT
if (!localStorage.getItem("authData")) {
  localStorage.setItem("authData", JSON.stringify({
    login: "admin",
    password: "1234"
  }));
}
let employees = JSON.parse(localStorage.getItem("employees")) || [];

/* NAV */
function showPage(p) {
  document.getElementById("asosiy").style.display = p==="asosiy"?"block":"none";
  document.getElementById("sozlash").style.display = p==="sozlash"?"block":"none";
  if(p==="asosiy") renderAsosiy();
}

/* EMPLOYEE */
function addEmployee() {
  employees.push({
    id: Date.now(),
    name: empName.value,
    role: empRole.value,
    tasks: []
  });
  save();
  loadEmpSelect();
}

/* TASK */
function addTask() {
  let emp = employees.find(e=>e.id==taskEmp.value);
  emp.tasks.push({
    id: Date.now(),
    name: taskName.value,
    deadline: taskDeadline.value,
    done: false
  });
  save();
}

/* STATUS */
function taskStatus(t) {
  let d = new Date(t.deadline);
  let diff = (d - new Date()) / (1000*60*60*24);
  if(t.done) return "done";
  if(diff < 0) return "red";
  if(diff <= 1) return "yellow";
  return "green";
}

/* ASOSIY */
function renderAsosiy() {
  let box = document.getElementById("asosiyContent");
  box.innerHTML = "";

  employees.forEach(e=>{
    let total = e.tasks.length;
    let done = e.tasks.filter(t=>t.done).length;
    let late = e.tasks.filter(t=>taskStatus(t)==="red").length;

    let div = document.createElement("div");
    div.className="card";
    div.innerHTML = `
      <h4>${e.name} (${e.role})</h4>
      <p>📌 Jami: ${total}</p>
      <p>✅ Bajarilgan: ${done}</p>
      <p>⏰ O‘tgan: ${late}</p>
      <button onclick="showTasks(${e.id})">Vazifalar</button>
      <div id="tasks-${e.id}"></div>
    `;
    box.appendChild(div);
  });
}

/* TASK LIST */
function showTasks(id) {
  let emp = employees.find(e=>e.id===id);
  let box = document.getElementById("tasks-"+id);
  box.innerHTML = "";

  emp.tasks.forEach(t=>{
    let s = taskStatus(t);
    let div = document.createElement("div");
    div.className = "task "+s;
    div.innerHTML = `
      ${t.name} | ${t.deadline}
      <input type="checkbox" ${t.done?"checked":""}
      onchange="toggleDone(${emp.id},${t.id})">
    `;
    box.appendChild(div);
  });
}

/* DONE */
function toggleDone(eid,tid) {
  let e = employees.find(x=>x.id===eid);
  let t = e.tasks.find(x=>x.id===tid);
  t.done=!t.done;
  save();
  renderAsosiy();
}

/* SAVE */
function save(){
  localStorage.setItem("employees",JSON.stringify(employees));
  loadEmpSelect();
}

/* SELECT */
function loadEmpSelect(){
  taskEmp.innerHTML="";
  employees.forEach(e=>{
    taskEmp.innerHTML+=`<option value="${e.id}">${e.name}</option>`;
  });
}

/* EXCEL */
function exportCSV(){
  let csv="Hodim,Lavozim,Vazifa,Muddat,Holat\n";
  employees.forEach(e=>{
    e.tasks.forEach(t=>{
      csv+=`${e.name},${e.role},${t.name},${t.deadline},${taskStatus(t)}\n`;
    });
  });
  let a=document.createElement("a");
  a.href="data:text/csv;charset=utf-8,"+encodeURIComponent(csv);
  a.download="vazifalar.csv";
  a.click();
}

loadEmpSelect();
renderAsosiy();

