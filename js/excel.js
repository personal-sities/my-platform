const SCRIPT_URL = "SIZNING_WEB_APP_URL_BU_YERGA";

document.querySelectorAll(".sheet-form").forEach(form => {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = {};
    const inputs = form.querySelectorAll("input, select, textarea");

    inputs.forEach(input => {
      if (input.name) {
        formData[input.name] = input.value;
      }
    });

    const data = {
      page: form.dataset.page,
      formData: formData
    };

    fetch(SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => res.json())
    .then(response => {
      alert("Ma'lumot saqlandi!");
      form.reset();
    })
    .catch(error => {
      alert("Xatolik yuz berdi!");
      console.error(error);
    });
  });
});
