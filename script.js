document.querySelectorAll(".option").forEach(function(option) {
  option.addEventListener("click", function() {
    document.querySelectorAll(".option").forEach(function(el) {
      el.classList.remove("active");
    });
    this.classList.add("active");
    generateQRCode();

    // Thêm hiệu ứng chạy viên khi tùy chọn được chọn
    setTimeout(function() {
      option.classList.remove("active"); // Xóa lớp active để hiệu ứng chạy viên không được áp dụng liên tục
    }, 500); // Thời gian phù hợp với thời gian của animation
  });
});
 











document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".bank-option").forEach(function(option) {
    option.addEventListener("mouseover", function() {
      document.querySelectorAll(".bank-option").forEach(function(el) {
        el.classList.remove("active");
      });
      this.classList.add("active");
      updateAccountNumber();
    });
  });

  document.querySelectorAll(".option").forEach(function(option) {
    option.addEventListener("click", function() {
      document.querySelectorAll(".option").forEach(function(el) {
        el.classList.remove("active");
      });
      this.classList.add("active");
      generateQRCode();
    });
  });

  document.getElementById("generateQRCodeButton").addEventListener("click", function() {
    generateQRCode();
  });

  updateAccountNumber();
});

function updateAccountNumber() {
  var bankSelect = document.querySelector(".bank-option.active");
  if (bankSelect) {
    var bankAbbreviation = bankSelect.dataset.value;
    var accountNumberInput = document.getElementById("accountNumber");
    var accountNumbers = {
      "vcb": "0891000650891",
      "mb": "00010302003",
      "tcb": "234586868686",
      "tpb": "00005161486",
"icb": "104881468669",
"slhd": "Chụt chụt chụt 😘"
    };
    accountNumberInput.value = accountNumbers[bankAbbreviation] || "Đang cập nhật...";
  }
}

function generateQRCode() {
  var bankSelect = document.querySelector(".bank-option.active");
  if (bankSelect) {
    var bankAbbreviation = bankSelect.dataset.value;
    var bankFullName = bankSelect.querySelector(".bank-name").textContent; // Lấy tên ngân hàng từ thẻ span
    var fullName = document.getElementById("fullName").value;
    var accountNumber = document.getElementById("accountNumber").value;
    var amount = document.getElementById("amount").value;
    var option = document.querySelector(".option.active").value;
    var transferContent = document.getElementById("transferContent").value;

    // Xử lý logic tương ứng với từng option
    var link;
    if (option === "qr_only" || option === "compact" || option === "compact2") {
      link = `https://img.vietqr.io/image/${bankAbbreviation}-${accountNumber}-${option}.png?amount=${amount}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(fullName)}`;
    } else {
      // Xử lý mặc định cho các option khác
      link = `https://img.vietqr.io/image/${bankAbbreviation}-${accountNumber}-${option}.png?amount=${amount}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(fullName)}`;
    }

    // Thêm nút "Mở ứng dụng" và "Huỷ" vào thông báo
    Swal.fire({
      position: 'top',
      title: 'Quét QR Code',
      text: `Để thanh toán tới ${bankFullName}`,
      imageUrl: link,
      imageAlt: 'QR Code',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Mở ứng dụng',
      cancelButtonText: 'Hủy',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        // Lấy chữ viết tắt của ngân hàng
        const appLink = `https://dl.vietqr.io/pay?app=${bankAbbreviation}`;
        // Mở ứng dụng với link đã tạo
        window.open(appLink, '_blank');
      },
      allowOutsideClick: () => !Swal.isLoading(),
      // Thêm nút "Sao chép" vào trong thông báo
      onRender: () => {
        $('.swal2-actions').prepend(
          '<button id="copyAccountNumberButton" class="swal2-confirm swal2-styled" aria-label="" aria-disabled="false" type="button" style="background-color: rgb(78, 115, 223); border-left-color: rgb(78, 115, 223); border-right-color: rgb(78, 115, 223);">Sao chép</button>'
        );
        $('#copyAccountNumberButton').on('click', copyAccountNumber);
      }
    });

    // Hiển thị hình ảnh trong #qrcode-container
    var qrcodeContainer = document.getElementById("qrcode-container");
    qrcodeContainer.innerHTML = "";
    var qrcode = new QRCode(document.getElementById("qrcode"), link);
    qrcodeContainer.style.opacity = 1;
  }
}

function copyAccountNumber() {
  var accountNumberInput = document.getElementById("accountNumber");
  var bankSelect = document.querySelector(".bank-option.active");
  var bankLogoSrc = bankSelect.querySelector("img").src;
  var bankFullName = bankSelect.querySelector(".bank-name").textContent;
  var copiedAccountNumber = `${accountNumberInput.value} 🏦 Ngân hàng: <div class="black-text">${bankFullName}</div>`;
  
  // Tạo hình ảnh logo ngân hàng
  var bankLogo = document.createElement("img");
  bankLogo.src = bankLogoSrc;
  bankLogo.style.width = "120px";
  bankLogo.style.verticalAlign = "middle";
  bankLogo.style.marginRight = "30px";

  // Thêm hình ảnh và thông tin số tài khoản vào thông báo
  Swal.fire({
    position: 'top',
    title: 'Đã sao chép số tài khoản!',
    html: `
      <div style="display: flex; align-items: center; justify-content: center;">
        <img src="${bankLogoSrc}" style="width: 120px; margin-right: 30px;">
        <div>
          <span>${copiedAccountNumber}</span>
        </div>
      </div>
    `,
    showCloseButton: true, 
    timer: 2000
  });

  // Sao chép số tài khoản vào clipboard
  accountNumberInput.select();
  document.execCommand("copy");
}


document.querySelectorAll(".bank-option").forEach(function(option) {
  option.addEventListener("click", function() {
      document.querySelectorAll(".bank-option").forEach(function(el) {
          el.classList.remove("active");
      });
      this.classList.add("active");
      updateAccountNumber();
  });
});










document.addEventListener("DOMContentLoaded", function() {
  var showBankTableBtn = document.getElementById("showBankTableBtn");
  var hideBankTableBtn = document.getElementById("hideBankTableBtn");
  var bankTable = document.getElementById("bankTable");

  showBankTableBtn.addEventListener("click", function() {
      bankTable.style.display = "table"; // Hiển thị bảng ngân hàng
      showBankTableBtn.style.display = "none"; // Ẩn nút "Xem danh sách ngân hàng"
      hideBankTableBtn.style.display = "block"; // Hiển thị nút "Ẩn danh sách ngân hàng"
  });

  hideBankTableBtn.addEventListener("click", function() {
      bankTable.style.display = "none"; // Ẩn bảng ngân hàng
      showBankTableBtn.style.display = "block"; // Hiển thị nút "Xem danh sách ngân hàng"
      hideBankTableBtn.style.display = "none"; // Ẩn nút "Ẩn danh sách ngân hàng"
  });
});
document.getElementById("showBankTableBtn").addEventListener("click", function() {
  document.getElementById("bankTable").classList.add("show");
});






document.querySelectorAll(".option").forEach(function(option) {
  option.addEventListener("click", function() {
    document.querySelectorAll(".option").forEach(function(el) {
      el.classList.remove("active");
    });
    this.classList.add("active");
    generateQRCode();

    // Thêm hiệu ứng chạy viên khi tùy chọn được chọn
    setTimeout(function() {
      option.classList.remove("active"); // Xóa lớp active để hiệu ứng chạy viên không được áp dụng liên tục
    }, 500); // Thời gian phù hợp với thời gian của animation
  });
});
 












document.addEventListener("DOMContentLoaded", function() {
  document.querySelectorAll(".bank-option").forEach(function(option) {
    option.addEventListener("mouseover", function() {
      document.querySelectorAll(".bank-option").forEach(function(el) {
        el.classList.remove("active");
      });
      this.classList.add("active");
      updateAccountNumber();
    });
  });

  document.querySelectorAll(".option").forEach(function(option) {
    option.addEventListener("click", function() {
      document.querySelectorAll(".option").forEach(function(el) {
        el.classList.remove("active");
      });
      this.classList.add("active");
      generateQRCode();
    });
  });

  document.getElementById("generateQRCodeButton").addEventListener("click", function() {
    generateQRCode();
  });

  updateAccountNumber();
});

function updateAccountNumber() {
  var bankSelect = document.querySelector(".bank-option.active");
  if (bankSelect) {
    var bankAbbreviation = bankSelect.dataset.value;
    var accountNumberInput = document.getElementById("accountNumber");
    var accountNumbers = {
      "vcb": "0891000650891",
      "mb": "00010302003",
      "tcb": "234586868686",
      "tpb": "00005161486",
"icb": "104881468669",
"slhd": "Chụt chụt chụt 😘"
    };
    accountNumberInput.value = accountNumbers[bankAbbreviation] || "Đang cập nhật...";
  }
}

function generateQRCode() {
  var bankSelect = document.querySelector(".bank-option.active");
  if (bankSelect) {
    var bankAbbreviation = bankSelect.dataset.value;
    var bankFullName = bankSelect.querySelector(".bank-name").textContent; // Lấy tên ngân hàng từ thẻ span
    var fullName = document.getElementById("fullName").value;
    var accountNumber = document.getElementById("accountNumber").value;
    var amount = document.getElementById("amount").value;
    var option = document.querySelector(".option.active").value;
    var transferContent = document.getElementById("transferContent").value;

    // Xử lý logic tương ứng với từng option
    var link;
    if (option === "qr_only" || option === "compact" || option === "compact2") {
      link = `https://img.vietqr.io/image/${bankAbbreviation}-${accountNumber}-${option}.png?amount=${amount}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(fullName)}`;
    } else {
      // Xử lý mặc định cho các option khác
      link = `https://img.vietqr.io/image/${bankAbbreviation}-${accountNumber}-${option}.png?amount=${amount}&addInfo=${encodeURIComponent(transferContent)}&accountName=${encodeURIComponent(fullName)}`;
    }

    // Thêm nút "Mở ứng dụng" và "Huỷ" vào thông báo
    Swal.fire({
      position: 'top',
      title: 'Quét QR Code',
      text: `Để thanh toán tới ${bankFullName}`,
      imageUrl: link,
      imageAlt: 'QR Code',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Mở ứng dụng',
      cancelButtonText: 'Hủy',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        // Lấy chữ viết tắt của ngân hàng
        const appLink = `https://dl.vietqr.io/pay?app=${bankAbbreviation}`;
        // Mở ứng dụng với link đã tạo
        window.open(appLink, '_blank');
      },
      allowOutsideClick: () => !Swal.isLoading(),
      // Thêm nút "Sao chép" vào trong thông báo
      onRender: () => {
        $('.swal2-actions').prepend(
          '<button id="copyAccountNumberButton" class="swal2-confirm swal2-styled" aria-label="" aria-disabled="false" type="button" style="background-color: rgb(78, 115, 223); border-left-color: rgb(78, 115, 223); border-right-color: rgb(78, 115, 223);">Sao chép</button>'
        );
        $('#copyAccountNumberButton').on('click', copyAccountNumber);
      }
    });

    // Hiển thị hình ảnh trong #qrcode-container
    var qrcodeContainer = document.getElementById("qrcode-container");
    qrcodeContainer.innerHTML = "";
    var qrcode = new QRCode(document.getElementById("qrcode"), link);
    qrcodeContainer.style.opacity = 1;
  }
}

function copyAccountNumber() {
  var accountNumberInput = document.getElementById("accountNumber");
  var bankSelect = document.querySelector(".bank-option.active");
  var bankLogoSrc = bankSelect.querySelector("img").src;
  var bankFullName = bankSelect.querySelector(".bank-name").textContent;
  var copiedAccountNumber = `${accountNumberInput.value} 🏦 Ngân hàng: <div class="black-text">${bankFullName}</div>`;
  
  // Tạo hình ảnh logo ngân hàng
  var bankLogo = document.createElement("img");
  bankLogo.src = bankLogoSrc;
  bankLogo.style.width = "120px";
  bankLogo.style.verticalAlign = "middle";
  bankLogo.style.marginRight = "30px";

  // Thêm hình ảnh và thông tin số tài khoản vào thông báo
  Swal.fire({
    position: 'top',
    title: 'Đã sao chép số tài khoản!',
    html: `
      <div style="display: flex; align-items: center; justify-content: center;">
        <img src="${bankLogoSrc}" style="width: 120px; margin-right: 30px;">
        <div>
          <span>${copiedAccountNumber}</span>
        </div>
      </div>
    `,
    showCloseButton: true, 
    timer: 2000
  });

  // Sao chép số tài khoản vào clipboard
  accountNumberInput.select();
  document.execCommand("copy");
}


document.querySelectorAll(".bank-option").forEach(function(option) {
  option.addEventListener("click", function() {
      document.querySelectorAll(".bank-option").forEach(function(el) {
          el.classList.remove("active");
      });
      this.classList.add("active");
      updateAccountNumber();
  });
});










document.addEventListener("DOMContentLoaded", function() {
  var showBankTableBtn = document.getElementById("showBankTableBtn");
  var hideBankTableBtn = document.getElementById("hideBankTableBtn");
  var bankTable = document.getElementById("bankTable");

  showBankTableBtn.addEventListener("click", function() {
      bankTable.style.display = "table"; // Hiển thị bảng ngân hàng
      showBankTableBtn.style.display = "none"; // Ẩn nút "Xem danh sách ngân hàng"
      hideBankTableBtn.style.display = "block"; // Hiển thị nút "Ẩn danh sách ngân hàng"
  });

  hideBankTableBtn.addEventListener("click", function() {
      bankTable.style.display = "none"; // Ẩn bảng ngân hàng
      showBankTableBtn.style.display = "block"; // Hiển thị nút "Xem danh sách ngân hàng"
      hideBankTableBtn.style.display = "none"; // Ẩn nút "Ẩn danh sách ngân hàng"
  });
});
document.getElementById("showBankTableBtn").addEventListener("click", function() {
  document.getElementById("bankTable").classList.add("show");
});






document.addEventListener("DOMContentLoaded", function() {
  // Mảng chứa thông tin của 6 ngân hàng
  var banks = [
    { stt: 1, logo: "https://vietqr.net/portal-service/resources/icons/VCB.png", recipient: "Sơn Lý Hồng Đức", accountNumber: "0891000650891", status: "Đang hoạt động" },
    { stt: 2, logo: "https://vietqr.net/portal-service/resources/icons/MB.png", recipient: "Sơn Lý Hồng Đức", accountNumber: "00010302003", status: "Đang hoạt động" },
    { stt: 3, logo: "https://vietqr.net/portal-service/resources/icons/TCB.png", recipient: "Sơn Lý Hồng Đức", accountNumber: "234586868686", status: "Đang hoạt động" },
    { stt: 4, logo: "https://vietqr.net/portal-service/resources/icons/TPB.png", recipient: "Sơn Lý Hồng Đức", accountNumber: "00005161486", status: "Không hoạt động" },
    { stt: 5, logo: "https://vietqr.net/portal-service/resources/icons/ICB.png", recipient: "Sơn Lý Hồng Đức", accountNumber: "104881468669", status: "Không hoạt động" },
    { stt: 6, logo: "https://duccodedao.github.io/Images/logobank.png", recipient: "Sơn Lý Hồng Đức", accountNumber: "Chụt chụt chụt 😘", status: "Bảo trì" }
  ];

  // Hàm để thêm dữ liệu vào bảng
  function populateTable() {
    var tbody = document.querySelector("#bankTable tbody");
    tbody.innerHTML = ""; // Xóa nội dung cũ của tbody trước khi thêm mới

    banks.forEach(function(bank) {
      var rowClass = bank.status === "Đang hoạt động" ? "bank-active" : ""; // Kiểm tra trạng thái của ngân hàng

      var row = `
        <tr class="${rowClass}">
          <td>${bank.stt}</td>
          <td><img src="${bank.logo}" alt="Logo ngân hàng" class="bank-logo"></td>
          <td>${bank.recipient}</td>
          <td>${bank.accountNumber}</td>
          <td>${bank.status}</td>
        </tr>
      `;
      tbody.innerHTML += row; // Thêm hàng vào tbody
    });
  }

  populateTable(); // Gọi hàm để đổ dữ liệu vào bảng khi tài liệu đã sẵn sàng
});





// Gán sự kiện click cho mỗi lựa chọn ngân hàng
var bankOptions = document.querySelectorAll(".bank-option");
bankOptions.forEach(function(option) {
  option.addEventListener("click", updateAccountStatus);
});

// Function to update account status
function updateAccountStatus() {
  var bankSelect = document.querySelector(".bank-option.active");
  if (bankSelect) {
    var bankAbbreviation = bankSelect.dataset.value;
    var statusContainer = document.getElementById("AccountStatus");
    var accountNumbers = {
      "vcb": "Đang hoạt động",
      "mb": "Đang hoạt động",
      "tcb": "Đang hoạt động",
      "tpb": "Không hoạt động",
      "icb": "Không hoạt động",
      "slhd": "Bảo trì"
    };
    var status = accountNumbers[bankAbbreviation] || "Đang cập nhật...";
    statusContainer.textContent = status;
    
    // Remove previous status classes
    statusContainer.classList.remove("active-status", "maintenance-status", "inactive-status");
    
    // Add new status class based on bank status
    if (status === "Đang hoạt động") {
      statusContainer.classList.add("active-status");
    } else if (status === "Bảo trì") {
      statusContainer.classList.add("maintenance-status");
    } else {
      statusContainer.classList.add("inactive-status");
    }
  }
}

// Trigger the updateAccountStatus function when hovering over a bank option
var bankOptions = document.querySelectorAll(".bank-option");
bankOptions.forEach(function(option) {
  option.addEventListener("mouseover", updateAccountStatus);
});
  function validateAmount() {
  var amountInput = document.getElementById("amount");
  var amount = parseFloat(amountInput.value);
  var amountError = document.getElementById("amountError");

  if (amount < 10000) {
    amountError.style.display = "block"; // Hiển thị thông báo lỗi nếu số tiền nhỏ hơn 10.000 VNĐ
    amountError.textContent = "Số tiền phải lớn hơn hoặc bằng 10.000 VNĐ";
    return false;
  } else {
    amountError.style.display = "none"; // Ẩn thông báo lỗi nếu số tiền hợp lệ
    return true;
  }
}

document.getElementById("generateQRCodeButton").addEventListener("click", function() {
  if (!validateAmount()) {
    return; // Dừng việc tạo mã nếu số tiền không hợp lệ
  }
  generateQRCode();
});
