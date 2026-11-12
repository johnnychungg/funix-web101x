/* ==========================================================
   main.js - JavaScript cho trang Digital CV
   1. Ẩn thông tin cá nhân: phải nhập email đúng định dạng mới xem được
   2. Ẩn/hiện thông tin nghề nghiệp bằng tiêu đề và nút View More / View Less
   ========================================================== */

/* ---------- 1. Ẩn thông tin cá nhân ---------- */

// Regex kiểm tra định dạng email
const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// Lấy các phần tử cần dùng trên trang
const emailBox = document.getElementById("email-box"); // container 1: form nhập email
const personalBox = document.getElementById("personal-box"); // container 2: thông tin cá nhân
const emailInput = document.getElementById("email-input");
const emailError = document.getElementById("email-error");
const emailSubmit = document.getElementById("email-submit");

// Kiểm tra email: rỗng hoặc sai định dạng thì hiện lỗi, hợp lệ thì hiện thông tin cá nhân
function handleEmailSubmit() {
  const email = emailInput.value.trim();

  if (email === "" || !EMAIL_REGEX.test(email)) {
    // Sai: thêm class is-invalid để Bootstrap hiện thông báo lỗi
    emailError.textContent = email === "" ? "Vui lòng nhập email." : "Email không hợp lệ.";
    emailInput.classList.add("is-invalid");
    return;
  }

  // Đúng: ẩn form, hiện thông tin cá nhân (đổi class hide)
  emailInput.classList.remove("is-invalid");
  emailBox.classList.add("hide");
  personalBox.classList.remove("hide");
}

// Bắt sự kiện click nút Submit
emailSubmit.addEventListener("click", handleEmailSubmit);

// Nhấn Enter trong ô nhập cũng gửi như bấm Submit
emailInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    handleEmailSubmit();
  }
});

/* ---------- 2. Ẩn/hiện thông tin nghề nghiệp ---------- */

// Mở hoặc đóng phần chi tiết của một mục nghề nghiệp
// item: thẻ .career-item (gồm .card-head, nút .view-btn và .career-detail)
function toggleCareer(item) {
  const head = item.firstElementChild; // .card-head chứa tiêu đề
  const button = head.nextElementSibling; // nút View More / View Less
  const detail = button.nextElementSibling; // phần chi tiết

  const isHidden = detail.classList.toggle("hide"); // true = vừa ẩn lại
  item.classList.toggle("open", !isHidden);
  button.textContent = isHidden ? "View More" : "View Less";
}

// Gắn click cho từng tiêu đề và từng nút; dùng DOM Traversal (parentElement) để tìm mục chứa nó
document.querySelectorAll(".card-title").forEach(function (title) {
  title.addEventListener("click", function () {
    // card-title -> card-head -> career-item
    toggleCareer(title.parentElement.parentElement);
  });
});

// Bấm vào icon bên phải tiêu đề cũng mở/đóng như bấm tiêu đề
document.querySelectorAll(".card-icon").forEach(function (icon) {
  icon.addEventListener("click", function () {
    toggleCareer(icon.parentElement.parentElement);
  });
});

document.querySelectorAll(".view-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    toggleCareer(button.parentElement);
  });
});
