const oNhap = document.getElementById("oNhap");
const nutThem = document.getElementById("nutThem");
const danhSach = document.getElementById("danhSach");

let cacViec = JSON.parse(localStorage.getItem("cacViec")) || [];

function luu() {
  localStorage.setItem("cacViec", JSON.stringify(cacViec));
}

function veLai() {
  danhSach.innerHTML = "";

  cacViec.forEach(function (viec, viTri) {
    const li = document.createElement("li");
    if (viec.xong) {
      li.classList.add("xong");
    }

    const span = document.createElement("span");
    span.textContent = viec.noiDung;
    span.addEventListener("click", function () {
      viec.xong = !viec.xong;
      luu();
      veLai();
    });

    const nutXoa = document.createElement("button");
    nutXoa.textContent = "✕";
    nutXoa.addEventListener("click", function () {
      cacViec.splice(viTri, 1);
      luu();
      veLai();
    });

    li.appendChild(span);
    li.appendChild(nutXoa);
    danhSach.appendChild(li);
  });
}

function themViec() {
  const noiDung = oNhap.value;

  if (noiDung === "") {
    return;
  }

  cacViec.push({ noiDung: noiDung, xong: false });
  luu();
  veLai();

  oNhap.value = "";
}

nutThem.addEventListener("click", themViec);

oNhap.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    themViec();
  }
});

veLai();