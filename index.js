const name = document.querySelector("#name");
const id = document.querySelector("#studentid");
const email = document.querySelector("#emailid");
const contact = document.querySelector("#contact");
const button = document.querySelector("#add");
const list = document.querySelector("#list");

button.addEventListener("click", addToList);

window.addEventListener("load", loadFromLocalStorage);

function addToList(event) {
    event.preventDefault();

    if (!validateInputs()) {
        return;
    }

    const row = document.createElement("tr");
    row.style.border = "2px solid white";
    row.style.margin = "10px";
    row.style.color = "white";
    row.style.fontWeight = "700";
    row.style.textAlign = "center";
    row.style.borderSpacing = "0 10px";

    const new_name = document.createElement("td");
    const new_id = document.createElement("td");
    const new_email = document.createElement("td");
    const new_contact = document.createElement("td");

    new_name.innerText = name.value;
    new_id.innerText = id.value;
    new_email.innerText = email.value;
    new_contact.innerText = contact.value;

    new_name.style.padding = "10px 0";
    new_id.style.padding = "10px 0";
    new_email.style.padding = "10px 0";
    new_contact.style.padding = "10px 0";

    row.appendChild(new_name);
    row.appendChild(new_id);
    row.appendChild(new_email);
    row.appendChild(new_contact);

    const delbutton = document.createElement("button");
    delbutton.innerHTML = '<i class="fa-solid fa-trash-arrow-up"></i>';
    delbutton.style.margin = "5px";
    delbutton.style.padding = "5px";

    const editbutton = document.createElement("button");
    editbutton.innerHTML = '<i class="fa-solid fa-pen"></i>';
    editbutton.style.margin = "5px";
    editbutton.style.padding = "5px";

    row.appendChild(editbutton);
    row.appendChild(delbutton);

    list.appendChild(row);

    delbutton.addEventListener("click", removeFromList);
    editbutton.addEventListener("click", editFromList);

    saveToLocalStorage();

    name.value = "";
    id.value = "";
    email.value = "";
    contact.value = "";

    function removeFromList() {
        row.remove();
        saveToLocalStorage();
    }

    function editFromList() {
        name.value = new_name.innerText;
        id.value = new_id.innerText;
        email.value = new_email.innerText;
        contact.value = new_contact.innerText;

        row.remove();
        saveToLocalStorage();
    }
}

function validateInputs() {
    const namePattern = /^[A-Za-z\s]+$/;
    const idPattern = /^[0-9]+$/;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const contactPattern = /^[0-9]+$/;

    if (!namePattern.test(name.value)) {
        alert("Please enter a valid name (letters and spaces only).");
        return false;
    }
    if (!idPattern.test(id.value)) {
        alert("Please enter a valid student ID (numbers only).");
        return false;
    }
    if (!emailPattern.test(email.value)) {
        alert("Please enter a valid email address.");
        return false;
    }
    if (!contactPattern.test(contact.value)) {
        alert("Please enter a valid contact number (numbers only).");
        return false;
    }
    return true;
}

function saveToLocalStorage() {
    const rows = Array.from(list.querySelectorAll("tr"));
    const data = rows.map(row => {
        const cells = row.querySelectorAll("td");
        return {
            name: cells[0].innerText,
            id: cells[1].innerText,
            email: cells[2].innerText,
            contact: cells[3].innerText
        };
    });
    localStorage.setItem("studentList", JSON.stringify(data));
}

function loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem("studentList")) || [];
    data.forEach(item => {
        const row = document.createElement("tr");
        row.style.border = "2px solid white";
        row.style.margin = "10px";
        row.style.borderRadius = "8px";
        row.style.color = "white";
        row.style.fontWeight = "700";
        row.style.textAlign = "center";
        row.style.borderSpacing = "0 10px";

        const new_name = document.createElement("td");
        const new_id = document.createElement("td");
        const new_email = document.createElement("td");
        const new_contact = document.createElement("td");

        new_name.innerText = item.name;
        new_id.innerText = item.id;
        new_email.innerText = item.email;
        new_contact.innerText = item.contact;

        new_name.style.padding = "10px 0";
        new_id.style.padding = "10px 0";
        new_email.style.padding = "10px 0";
        new_contact.style.padding = "10px 0";

        row.appendChild(new_name);
        row.appendChild(new_id);
        row.appendChild(new_email);
        row.appendChild(new_contact);

        const delbutton = document.createElement("button");
        delbutton.innerHTML = '<i class="fa-solid fa-trash-arrow-up"></i>';
        delbutton.style.margin = "5px";
        delbutton.style.padding = "5px";

        const editbutton = document.createElement("button");
        editbutton.innerHTML = '<i class="fa-solid fa-pen"></i>';
        editbutton.style.margin = "5px";
        editbutton.style.padding = "5px";

        row.appendChild(editbutton);
        row.appendChild(delbutton);

        list.appendChild(row);

        delbutton.addEventListener("click", removeFromList);
        editbutton.addEventListener("click", editFromList);

        function removeFromList() {
            row.remove();
            saveToLocalStorage();
        }

        function editFromList() {
            name.value = new_name.innerText;
            id.value = new_id.innerText;
            email.value = new_email.innerText;
            contact.value = new_contact.innerText;

            row.remove();
            saveToLocalStorage();
        }
    });
}
