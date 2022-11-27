function dom(selector) {
  return document.querySelector(selector);
}

function Staff(id, name, email, password, workday, salary, regency, worktime) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.password = password;
  this.workday = workday;
  this.salary = salary;
  this.regency = regency;
  this.worktime = worktime;
}

Staff.prototype.getSalary = function () {
  switch (this.regency) {
    case "Sếp":
      return this.salary * 3;
    case "Trưởng phòng":
      return this.salary * 2;
    case "Nhân viên":
      return this.salary;
  }
};

Staff.prototype.getRank = function () {
  if (this.worktime >= 192) {
    return "Nhân Viên Xuất Sắc";
  }
  if (this.worktime >= 176) {
    return "Nhân Viên Giỏi";
  }
  if (this.worktime >= 160) {
    return "Nhân Viên Khá";
  }
  if (this.worktime < 160) {
    return "Nhân Viên Trung Bình";
  }
};

let staffs = [];

init();
// =========
function init() {
  staffs = JSON.parse(localStorage.getItem("staff")) || [];

  staffs = staffs.map((staff) => {
    return new Staff(
      staff.id,
      staff.name,
      staff.email,
      staff.password,
      staff.workday,
      staff.salary,
      staff.regency,
      staff.worktime
    );
  });

  display(staffs);
}

function addStaff() {
  let id = dom("#tknv").value;
  let name = dom("#name").value;
  let email = dom("#email").value;
  let password = dom("#password").value;
  let workday = dom("#datepicker").value;
  let salary = +dom("#luongCB").value;
  let regency = dom("#chucvu").value;
  let worktime = +dom("#gioLam").value;

  let isValid = validateForm();

  if (!isValid) {
    return;
  }

  let staff = new Staff(
    id,
    name,
    email,
    password,
    workday,
    salary,
    regency,
    worktime
  );

  staffs.push(staff);
  localStorage.setItem("staff", JSON.stringify(staffs));

  display(staffs);

  resetForm();
}

function deleteStaff(staffId) {
  staffs = staffs.filter((staff) => {
    return staff.id !== staffId;
  });

  localStorage.setItem("staff", JSON.stringify(staffs));

  display(staffs);
}

function selectStaff(staffId) {
  let staff = staffs.find((staff) => {
    return staff.id === staffId;
  });

  if (!staffs) {
    return;
  }

  dom("#tknv").value = staff.id;
  dom("#name").value = staff.name;
  dom("#email").value = staff.email;
  dom("#password").value = staff.password;
  dom("#datepicker").value = staff.workday;
  dom("#luongCB").value = staff.salary;
  dom("#chucvu").value = staff.regency;
  dom("#gioLam").value = staff.worktime;

  dom("#tknv").disabled = true;
  dom("#btnThemNV").disabled = true;
}

function searchStaff() {
  let searchValue = dom("#searchName").value;

  searchValue = searchValue.toLowerCase();

  let newStaff = staffs.filter((staff) => {
    let rank = staff.getRank().toLowerCase();

    return rank.includes(searchValue);
  });

  display(newStaff);
}

function updateStaff() {
  let id = dom("#tknv").value;
  let name = dom("#name").value;
  let email = dom("#email").value;
  let password = dom("#password").value;
  let workday = dom("#datepicker").value;
  let salary = +dom("#luongCB").value;
  let regency = dom("#chucvu").value;
  let worktime = +dom("#gioLam").value;

  let staff = new Staff(
    id,
    name,
    email,
    password,
    workday,
    salary,
    regency,
    worktime
  );

  let index = staffs.findIndex((item) => {
    return (item.id === staff.id);
  });

  staffs[index] = staff;

  localStorage.setItem("staff", JSON.stringify(staffs));

  display(staffs);
}
// =========
function display(staffs) {
  let html = staffs.reduce((result, staff) => {
    return (
      result +
      `
        <tr>
            <td>${staff.id}</td>        
            <td>${staff.name}</td>        
            <td>${staff.email}</td>        
            <td>${staff.workday}</td>        
            <td>${staff.regency}</td>        
            <td>${staff.getSalary()}</td>        
            <td>${staff.getRank()}</td>        
            <td>
                <button 
                class="btn btn-success"
                onclick="selectStaff('${staff.id}')">
                    Edit
                </button>
                <button 
                class="btn btn-danger"
                onclick="deleteStaff('${staff.id}')">
                    Delete
                </button>
            </td>        
        </tr>
        `
    );
  }, "");

  dom("#tableDanhSach").innerHTML = html;
}

function resetForm() {
  dom("#tknv").value = "";
  dom("#name").value = "";
  dom("#email").value = "";
  dom("#password").value = "";
  dom("#datepicker").value = "";
  dom("#luongCB").value = "";
  dom("#chucvu").value = "";
  dom("#gioLam").value = "";

  dom("#tknv").disabled = false;
  dom("#btnThemNV").disabled = false;
}

// Validation
function validateId() {
  let id = dom("#tknv").value;
  let spanEl = dom("#tbTKNV");
  spanEl.style.display = "block";

  if (!id) {
    spanEl.innerHTML = "Không để trống";
    return false;
  }

  if (id.length < 4 || id.length > 6) {
    spanEl.innerHTML = "Tài khoản tối đa 4-6 kí tự";
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

function validateName() {
  let name = dom("#name").value;
  let spanEl = dom("#tbTen");
  spanEl.style.display = "block";

  if (!name) {
    spanEl.innerHTML = "Không để trống";
    return false;
  }

  let regex =
    /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s\W|_]+$/;
  if (!regex.test(name)) {
    spanEl.innerHTML = "Tên Không đúng định dạng";
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

function validateEmail() {
  let email = dom("#email").value;
  let spanEl = dom("#tbEmail");
  spanEl.style.display = "block";

  if (!email) {
    spanEl.innerHTML = "Không để trống";
    return false;
  }

  let regex = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!regex.test(email)) {
    spanEl.innerHTML = "Email không đúng định dạng";
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

function validatePassword() {
  let password = dom("#password").value;
  let spanEl = dom("#tbMatKhau");
  spanEl.style.display = "block";

  if (!password) {
    spanEl.innerHTML = "Không để trống";
    return false;
  }

  if (password.length < 6 || password.length > 10) {
    spanEl.innerHTML = "Mật khẩu từ 6-10 kí tự";
    return false;
  }

  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/;
  if (!regex.test(password)) {
    spanEl.innerHTML = "Password không đúng định dạng";
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

function validateWorkday() {
  let workday = dom("#datepicker").value;
  let spanEl = dom("#tbNgay");
  spanEl.style.display = "block";

  if (!workday) {
    spanEl.innerHTML = "Không để trống";
    return false;
  }

  let regex =
    /^(?:(0[1-9]|1[012])[\/.](0[1-9]|[12][0-9]|3[01])[\/.](19|20)[0-9]{2})$/;
  if (!regex.test(workday)) {
    spanEl.innerHTML = "Không đúng định dạng";
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

function validateSalary() {
  let salary = dom("#luongCB").value;
  let spanEl = dom("#tbLuongCB");
  spanEl.style.display = "block";

  if (!salary) {
    spanEl.innerHTML = "Không để trống";
    return false;
  }

  if (salary < 1000000 || salary > 20000000) {
    spanEl.innerHTML = "Lương cơ bản từ 1.000.000 đến 20.000.000";
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

function validateRegency() {
  let regency = dom("#chucvu").value;
  let spanEl = dom("#tbChucVu");
  spanEl.style.display = "block";

  if (!regency) {
    spanEl.innerHTML = "Không để trống";
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

function validateWorktime() {
  let worktime = +dom("#gioLam").value;
  let spanEl = dom("#tbGiolam");
  spanEl.style.display = "block";

  if (!worktime) {
    spanEl.innerHTML = "Không để trống";
    return false;
  }

  if (worktime < 80 || worktime > 200) {
    spanEl.innerHTML = "Giờ làm trong khoảng 80 - 200";
    return false;
  }

  spanEl.innerHTML = "";
  return true;
}

function validateForm() {
  let isValid = true;

  isValid =
    validateId() &
    validateName() &
    validateEmail() &
    validatePassword() &
    validateWorkday() &
    validateSalary() &
    validateRegency() &
    validateWorktime();

  if (!isValid) {
    alert("Form không đúng");
    return false;
  }
  return true;
}
