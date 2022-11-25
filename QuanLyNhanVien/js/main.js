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
    case "Nhân Viên":
      return this.salary;
  }
};

Staff.prototype.getRank = function () {
  if (this.worktime >= 192) {
    return "Nhân viên xuất sắc";
  }
  if (this.worktime >= 176) {
    return "Nhân viên giỏi";
  }
  if (this.worktime >= 160) {
    return "Nhân viên khá";
  }
  return "Nhân viên trung bình";
};

let staffList = [];

init();

// ========================================================================================
function init() {
  staffList = JSON.parse(localStorage.getItem("staff")) || [];

  staffList = staffList.map((staff) => {
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

  display(staffList);
}

function addStaff() {
  let id = dom("#tknv").value;
  let name = dom("#name").value;
  let email = dom("#email").value;
  let password = dom("#password").value;
  let workday = dom("#datepicker").value;
  let salary = dom("#luongCB").value;
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

  staffList.push(staff);
  localStorage.setItem("staff", JSON.stringify(staffList));

  display(staffList);

  resetForm();
}

function deleteStaff(staffId) {
  staffList = staffList.filter((staff) => {
    return staff.id !== staffId;
  });

  localStorage.setItem("staff", JSON.stringify(staffList));

  display(staffList);
}

function selectStaff(staffId) {
  let staff = staffList.find((staff) => {
    return staff.id === staffId;
  });

  if (!staff) {
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

function updateStaff() {
  let id = dom("#tknv").value;
  let name = dom("#name").value;
  let email = dom("#email").value;
  let password = dom("#password").value;
  let workday = dom("#datepicker").value;
  let salary = dom("#luongCB").value;
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

  let index = staffList.findIndex((item) => {
    return item.id === staff.id;
  });

  staffList[index] = staff;

  localStorage.setItem("staff", JSON.stringify(staffList));

  display(staffList);
}

function searchStaff() {
  let searchValue = dom("#searchName").value;

  searchValue = searchValue.toLowerCase();

  let newStaff = staffList.filter((staff) => {
    let rank = staff.getRank().toLowerCase();

    return rank.includes(searchValue);
  });

  display(newStaff);
}

// ========================================================================================

function display(staffList) {
  let html = staffList.reduce((result, staff) => {
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
            <button class="btn btn-success" onclick = "selectStaff('${
              staff.id
            }')">
                Edit
            </button>
            <button class="btn btn-danger" onclick = "deleteStaff('${
              staff.id
            }')">
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
