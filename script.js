function saveData(e) {
  e.preventDefault();
  let form = e.target;
  let date = new Date().toLocaleDateString("th-TH");

  let beforeText = form.beforeText.value;
  let afterText = form.afterText.value;

  let beforeImgFile = form.beforeImg.files[0];
  let afterImgFile = form.afterImg.files[0];

  let reader1 = new FileReader();
  let reader2 = new FileReader();

  reader1.onload = function(ev1) {
    let beforeImgData = ev1.target.result;

    reader2.onload = function(ev2) {
      let afterImgData = ev2.target.result;

      let records = JSON.parse(localStorage.getItem("cleanRecords")) || [];
      records.push({
        date,
        beforeText,
        beforeImg: beforeImgData,
        afterText,
        afterImg: afterImgData
      });
      localStorage.setItem("cleanRecords", JSON.stringify(records));

      alert("บันทึกเรียบร้อยแล้ว!");
      window.location.href = "report.html";
    };

    if (afterImgFile) {
      reader2.readAsDataURL(afterImgFile);
    } else {
      reader2.onload({ target: { result: "" } });
    }
  };

  if (beforeImgFile) {
    reader1.readAsDataURL(beforeImgFile);
  } else {
    reader1.onload({ target: { result: "" } });
    reader1.onload();
  }
}

function loadReport() {
  let records = JSON.parse(localStorage.getItem("cleanRecords")) || [];
  let container = document.getElementById("reportList");

  if (records.length === 0) {
    container.innerHTML = "<p>ยังไม่มีข้อมูล</p>";
    return;
  }

  container.innerHTML = records.map(r => `
    <div class="report-item">
      <h3>${r.date}</h3>
      <p><b>ก่อนทำ:</b> ${r.beforeText}</p>
      ${r.beforeImg ? `<img src="${r.beforeImg}" width="200">` : ""}
      <p><b>หลังทำ:</b> ${r.afterText}</p>
      ${r.afterImg ? `<img src="${r.afterImg}" width="200">` : ""}
      <hr>
    </div>
  `).join("");
}
