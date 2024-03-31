
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
   


document.getElementById("showBankListButton").addEventListener("click", function() {
    // Tạo một đối tượng jsPDF
    var doc = new jsPDF();

    // Lấy nội dung của bảng
    var table = document.getElementById("bankTable");

    // Chuyển đổi bảng thành hình ảnh dạng PNG
    doc.autoTable({
        html: table,
        startY: 10
    });

    // Tạo tên file PDF
    var fileName = "Danh_sach_ngan_hang.pdf";

    // Tải xuống PDF
    doc.save(fileName);
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
option.addEventListener("mouseover", function() {
  document.querySelectorAll(".bank-option").forEach(function(el) {
    el.classList.remove("active");
  });
  this.classList.add("active");
  updateAccountNumber();
});
});



document.addEventListener("DOMContentLoaded", function() {
    // Mảng chứa thông tin của 6 ngân hàng
    var banks = [
      { stt: 1, name: "Ngân hàng VCB - Ngân hàng TMCP Ngoại Thương Việt Nam", recipient: "Sơn Lý Hồng Đức", accountNumber: "1234567890", status: "Đang hoạt động" },
      { stt: 2, name: "Ngân hàng MB - Ngân hàng TMCP Quân đội", recipient: "Sơn Lý Hồng Đức", accountNumber: "0987654321", status: "Đang hoạt động" },
      { stt: 3, name: "Ngân hàng TCB - Ngân hàng TMCP Kỹ thương Việt Nam", recipient: "Sơn Lý Hồng Đức", accountNumber: "1357924680", status: "Đang hoạt động" },
      { stt: 4, name: "TPB - Ngân hàng TMCP Tiên Phong", recipient: "Sơn Lý Hồng Đức", accountNumber: "2468013579", status: "Đang hoạt động" },
      { stt: 5, name: "ICB - Ngân hàng TMCP Công thương Việt Nam", recipient: "Sơn Lý Hồng Đức", accountNumber: "9876543210", status: "Đang hoạt động" },
      { stt: 6, name: "SLHD - Ngân hàng lớn nhất thế giới", recipient: "Sơn Lý Hồng Đức", accountNumber: "1231231231", status: "Đang hoạt động" }
    ];

    // Hàm để thêm dữ liệu vào bảng
    function populateTable() {
      var tbody = document.querySelector("#bankTable tbody");
      tbody.innerHTML = ""; // Xóa nội dung cũ của tbody trước khi thêm mới

      banks.forEach(function(bank) {
        var row = `
          <tr>
            <td>${bank.stt}</td>
            <td>${bank.name}</td>
            <td>${bank.recipient}</td>
            <td>${bank.accountNumber}</td>
            <td>${bank.status}</td>
          </tr>
        `;
        tbody.innerHTML += row; // Thêm hàng vào tbody
      });
    }

    populateTable(); // Gọi hàm để đổ dữ liệu vào bảng khi tài liệu đã sẵn sàng

    // Sự kiện click cho nút "Danh sách ngân hàng"
    document.getElementById("toggleBankListButton").addEventListener("click", function() {
        var bankTable = document.getElementById("bankTable");
        var isVisible = bankTable.style.display === "table";

        // Thay đổi trạng thái hiển thị của bảng
        bankTable.style.display = isVisible ? "none" : "table";

        // Thay đổi nội dung của nút
        this.textContent = isVisible ? "Danh sách ngân hàng" : "Ẩn";
    });
});
