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


// Hàm tải ảnh QR Code từ URL
function downloadQRCode() {
  // Tạo một đối tượng a (link) để tải ảnh QR Code
  var link = document.createElement('a');
  link.href = link; // Thay 'link' bằng biến chứa đường dẫn của ảnh QR Code
  // Gán thuộc tính download để tải ảnh xuống với tên là 'QR_Code.png'
  link.download = 'QR_Code.png';
  // Thêm đối tượng a vào trang nhưng ẩn đi
  document.body.appendChild(link);
  link.click();
  // Xóa đối tượng a sau khi đã sử dụng
  document.body.removeChild(link);
}

// Thêm nút "Mở ứng dụng" và "Huỷ" vào thông báo
Swal.fire({
  position: 'top',
  title: 'Quét QR Code',
  text: `Để thanh toán tới ${bankFullName}`,
  imageUrl: link, // Đường dẫn của ảnh QR code
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
  // Thêm nút "Tải ảnh" vào trong thông báo và gắn sự kiện click
  onRender: () => {
    $('.swal2-actions').prepend(
      '<button id="downloadQRCodeButton" class="swal2-confirm swal2-styled" aria-label="" aria-disabled="false" type="button" style="background-color: rgb(78, 115, 223); border-left-color: rgb(78, 115, 223); border-right-color: rgb(78, 115, 223);">Tải ảnh QR Code</button>'
    );
    // Gắn hàm downloadQRCode() vào sự kiện click của nút "Tải ảnh QR Code"
    $('#downloadQRCodeButton').on('click', downloadQRCode);
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
    { stt: 6, logo: "https://duccodedao.github.io/Images/logobank.png", recipient: "Sơn Lý Hồng Đức", accountNumber: "Chụt chụt chụt 😘", status: "Đang bảo trì" }
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
      "slhd": "Đang bảo trì"
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



// Lắng nghe sự kiện input trên ô nhập số tiền
document.getElementById("amount").addEventListener("input", function() {
  var amountInput = document.getElementById("amount");
  var amountValue = amountInput.value.trim(); // Lấy giá trị từ ô nhập số tiền và loại bỏ các khoảng trắng thừa
  var amount = parseFloat(amountValue); // Chuyển đổi giá trị thành số thực
  
  // Kiểm tra nếu giá trị nhập vào không phải là một số hợp lệ hoặc là một số âm
  if (isNaN(amount) || amount <= 0) {
    // Disable nút tạo mã QR
    document.getElementById("generateQRCodeButton").disabled = true;

    // Disable tất cả các nút tuỳ chọn
    document.querySelectorAll(".option").forEach(function(button) {
      button.disabled = true;
    });

    // Hiển thị thông báo lỗi
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Lỗi!',
      text: 'Số tiền phải là một số dương hợp lệ'
    });
  } else if (amount < 10000) { // Kiểm tra nếu số tiền nhỏ hơn 10.000 VNĐ
    // Disable nút tạo mã QR
    document.getElementById("generateQRCodeButton").disabled = true;

    // Disable tất cả các nút tuỳ chọn
    document.querySelectorAll(".option").forEach(function(button) {
      button.disabled = true;
    });

    // Hiển thị thông báo lỗi
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Lỗi!',
      text: 'Số tiền phải lớn hơn hoặc bằng 10.000 VNĐ'
    });
  } else {
    // Enable nút tạo mã QR
    document.getElementById("generateQRCodeButton").disabled = false;

    // Enable tất cả các nút tuỳ chọn
    document.querySelectorAll(".option").forEach(function(button) {
      button.disabled = false;
    });
  }
});





// Lắng nghe sự kiện click trên nút tạo mã QR
document.getElementById("generateQRCodeButton").addEventListener("click", function() {
  // Kiểm tra giá trị nhập vào từ ô số tiền
  if (!checkAmount()) {
    return; // Nếu giá trị không hợp lệ, dừng lại và không thực hiện hành động tiếp theo
  }

  // Tiến hành tạo mã QR
  generateQRCode();
});

// Lắng nghe sự kiện click trên các nút tuỳ chọn
document.querySelectorAll(".option").forEach(function(option) {
  option.addEventListener("click", function() {
    // Kiểm tra giá trị nhập vào từ ô số tiền
    if (!checkAmount()) {
      return; // Nếu giá trị không hợp lệ, dừng lại và không thực hiện hành động tiếp theo
    }

    // Tiến hành tạo mã QR
    generateQRCode();
  });
});

// Lắng nghe sự kiện input trên ô nhập số tiền
document.getElementById("amount").addEventListener("input", function() {
  var amountInput = document.getElementById("amount");
  var amount = parseFloat(amountInput.value);
  
  // Kiểm tra nếu số tiền nhỏ hơn 10.000 VNĐ
  if (amount < 10000) {
    // Hiển thị thông báo lỗi
    Swal.fire({
      position: 'top',
      icon: 'error',
      title: 'Lỗi!',
      text: 'Số tiền phải lớn hơn hoặc bằng 10.000 VNĐ'
    });
  }
});







document.addEventListener("DOMContentLoaded", function() {
  // Hiển thị thông báo
  Swal.fire({
    position: 'top',
    title: 'Xin chào!',
    text: 'Sơn Lý Hồng Đức chúc bạn một ngày tốt lành!',
    imageUrl: 'https://duccodedao.github.io/Images/20240330_1113021.gif', // Thay 'link_to_your_image.jpg' bằng đường dẫn đến hình ảnh của bạn
    imageHeight: 'auto', // Thiết lập chiều cao tự động cho hình ảnh
    showConfirmButton: false, // Ẩn nút xác nhận
    customClass: {
      popup: 'swal2-show-loading' // Thêm class để tạo hiệu ứng loading
    }
  });

  // Đóng thông báo sau khi hiệu ứng loading kết thúc
  setTimeout(function() {
    Swal.close(); // Đóng thông báo
  }, 3000); // Thời gian đóng thông báo sau 3 giây
});






// Hàm điền giá trị vào ô số tiền khi người dùng click vào gợi ý
function fillAmount(value) {
  document.getElementById("amount").value = value;
}




function focusAmountInput() {
  document.getElementById("amount").focus();
}





document.addEventListener("DOMContentLoaded", function() {
  // Lắng nghe sự kiện click trên các phần tử có class "bank-option"
  document.querySelectorAll(".bank-option").forEach(function(option) {
    option.addEventListener("click", function() {
      // Lấy tên ngân hàng đã chọn từ thuộc tính "data-value"
      var selectedBankName = option.dataset.bankName;
      
      // Cập nhật tên ngân hàng đã chọn vào phần tử có id là "selectedBankName"
      document.getElementById("selectedBankName").innerText = selectedBankName;
    });
  });
});

// Lắng nghe sự kiện click trên các phần tử có class "bank-option"
document.querySelectorAll(".bank-option").forEach(function(option) {
  option.addEventListener("click", function() {
    // Lấy tên ngân hàng đã chọn
    var selectedBankCode = option.getAttribute("data-value");
    var selectedBankName = '';

    // Dựa vào mã ngân hàng đã chọn, xác định tên của ngân hàng
    switch (selectedBankCode) {
      case 'vcb':
        selectedBankName = 'Vietcombank';
        break;
      case 'mb':
        selectedBankName = 'Military Bank';
        break;
      case 'tcb':
        selectedBankName = 'Techcombank';
        break;
      case 'tpb':
        selectedBankName = 'TPBank';
        break;
      case 'icb':
        selectedBankName = 'Industrial and Commercial Bank';
        break;
      case 'slhd':
        selectedBankName = 'SLHD Bank';
        break;
      default:
        selectedBankName = 'Unknown Bank';
        break;
    }

    // Cập nhật nội dung của phần tử div có id "selectedBankName"
    document.getElementById("selectedBankName").innerText = selectedBankName;
  });
});





document.addEventListener("DOMContentLoaded", function() {
  // Lắng nghe sự kiện click và mouseover trên các phần tử có class "bank-option"
  document.querySelectorAll(".bank-option").forEach(function(option) {
    option.addEventListener("click", function() {
      // Lấy tên ngân hàng đã chọn từ thuộc tính "data-bank-name"
      var selectedBankName = option.dataset.bankName;
      
      // Cập nhật tên ngân hàng đã chọn vào phần tử có id là "selectedBankName"
      document.getElementById("selectedBankName").innerText = selectedBankName;
    });

    option.addEventListener("mouseover", function() {
      // Lấy tên ngân hàng từ thuộc tính "data-bank-name" và cập nhật nó vào phần tử có id là "selectedBankName"
      var selectedBankName = option.dataset.bankName;
      document.getElementById("selectedBankName").innerText = selectedBankName;
    });
  });
});






