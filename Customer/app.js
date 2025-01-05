class Customer {
  customerId;
  name;
  phoneNum;
  email;

  constructor(customerId, name, phoneNum, email) {
    this.customerId = customerId;
    this.name = name;
    this.phoneNum = phoneNum;
    this.email = email;
  }
}

let customers = [];
let custCount = 0;

function addCustomer() {
  const customerId = document.getElementById("customerId").value;
  const name = document.getElementById("name").value;
  const phoneNum = document.getElementById("phoneNum").value;
  const email = document.getElementById("email").value;

  if (name.length == 0 || phoneNum.length == 0 || email.length == 0) {
    alert("TextField empty!!!");
  } else if (phoneNum.length != 10) {
    document.getElementById("phoneNum").value = "";
    alert("Inavlid Phone Number");
  } else {
    const customer = new Customer(customerId, name, phoneNum, email);
    customers.push(customer);
    custCount++;

    localStorage.setItem("customers", JSON.stringify(customers));

    console.log(customers);

    document.getElementById("name").value = "";
    document.getElementById("phoneNum").value = "";
    document.getElementById("email").value = "";

    alert("Customer added successfully");

    generateId();
  }
}

function generateId() {
  const id = "C0" + (custCount + 1).toString().padStart(2, "0");
  console.log(id);
  document.getElementById("customerId").value = id;
}
//me code eken karanne localStorage eke thiyena deta tika load karaganna eka
function loadCustomers() {
  const storedCustomers = localStorage.getItem("customers");
  if (storedCustomers) {
    //meken karanne deta array abject ekak widiyata convert kirima
    customers = JSON.parse(storedCustomers);
    custCount = customers.length;
  }
  generateId();
}

document.addEventListener("DOMContentLoaded", loadCustomers);

let foundElement = -1;

function searchCustomer(data) {
  const value = data;
  let found = false;

  document.getElementById("viewId").value = "";
  document.getElementById("viewName").value = "";
  document.getElementById("viewPhoneNum").value = "";
  document.getElementById("viewEmail").value = "";

  for (let index = 0; index < customers.length; index++) {
    let customer = customers[index];
    if (customer.name == value || customer.customerId == value) {
      document.getElementById("viewId").value = customer.customerId;
      document.getElementById("viewName").value = customer.name;
      document.getElementById("viewPhoneNum").value = customer.phoneNum;
      document.getElementById("viewEmail").value = customer.email;

      document.getElementById("search-input").value = "";

      console.log("Found");
      foundElement = index;
      console.log(foundElement);
      found = true;
    }
  }

  if (found) {
    alert("Customer Found!");
  } else {
    alert("Customer Not Found!");

    document.getElementById("viewId").value = "";
    document.getElementById("viewName").value = "";
    document.getElementById("viewPhoneNum").value = "";
    document.getElementById("viewEmail").value = "";

    document.getElementById("search-input").value = "";
  }
}

function searchCustomerval() {
    
  const data = document.getElementById("search-input").value;
  if (data) {
    searchCustomer(data);
  } else {
    alert("Please search for a Customer!");
  }
};

function deleteCustomer() {
  if (foundElement !== -1) {
    customers.splice(foundElement, 1);
    localStorage.setItem("customers", JSON.stringify(customers));

    foundElement = -1;
    document.getElementById("viewId").value = "";
    document.getElementById("viewName").value = "";
    document.getElementById("viewPhoneNum").value = "";
    document.getElementById("viewEmail").value = "";
    alert("Customer deleted successfully.");
  } else {
    alert("No customer selected to delete.");
  }
}
