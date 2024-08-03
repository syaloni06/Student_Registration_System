// Select DOM elements
const name = document.querySelector("#name");
const id = document.querySelector("#studentid");
const email = document.querySelector("#emailid");
const contact = document.querySelector("#contact");
const button = document.querySelector("#add");
const list = document.querySelector("#list");

// Add event listener to the button to handle click events
button.addEventListener("click", addToList);

// Add event listener to the window load event to populate the list from local storage
window.addEventListener("load", loadFromLocalStorage);

// Function to handle adding a new entry to the list
function addToList(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Validate inputs before proceeding
    if (!validateInputs()) {
        return;
    }

    // Create a new table row
    const row = document.createElement("tr");

    // Styling the new row
    row.style.border = "2px solid white";
    row.style.margin = "10px";
    row.style.color = "white";
    row.style.fontWeight = "700";
    row.style.textAlign = "center";
    row.style.borderSpacing = "0 10px";

    // Create and populate new table cells
    const new_name = document.createElement("td");
    const new_id = document.createElement("td");
    const new_email = document.createElement("td");
    const new_contact = document.createElement("td");

    // Assigning the values
    new_name.innerText = name.value;
    new_id.innerText = id.value;
    new_email.innerText = email.value;
    new_contact.innerText = contact.value;

    // Styling the new cells
    new_name.style.padding = "10px 0";
    new_id.style.padding = "10px 0";
    new_email.style.padding = "10px 0";
    new_contact.style.padding = "10px 0";

    // Append cells to the row
    row.appendChild(new_name);
    row.appendChild(new_id);
    row.appendChild(new_email);
    row.appendChild(new_contact);

    // Create and style delete button
    const delbutton = document.createElement("button");
    delbutton.innerHTML = '<i class="fa-solid fa-trash-arrow-up"></i>';
    delbutton.style.margin = "5px";
    delbutton.style.padding = "5px";

    // Create and style edit button
    const editbutton = document.createElement("button");
    editbutton.innerHTML = '<i class="fa-solid fa-pen"></i>';
    editbutton.style.margin = "5px";
    editbutton.style.padding = "5px";

    // Append buttons to the row
    row.appendChild(editbutton);
    row.appendChild(delbutton);

    // Append the row to the list
    list.appendChild(row);

    // Add event listeners to buttons for remove and edit actions
    delbutton.addEventListener("click", removeFromList);
    editbutton.addEventListener("click", editFromList);

    // Save the updated list to local storage
    saveToLocalStorage();

    // Clear the input fields
    name.value = "";
    id.value = "";
    email.value = "";
    contact.value = "";

    // Function to remove a row from the list
    function removeFromList() {
        row.remove();
        saveToLocalStorage(); // Update local storage after removal
    }

    // Function to edit a row
    function editFromList() {

        // Populate input fields with the row's data
        name.value = new_name.innerText;
        id.value = new_id.innerText;
        email.value = new_email.innerText;
        contact.value = new_contact.innerText;

        // Remove the row and update local storage
        row.remove();
        saveToLocalStorage();
    }
}

// Function to validate input fields
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
    return true; // All inputs are valid
}

// Function to save the current list to local storage
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

// Function to load the list from local storage
function loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem("studentList")) || [];
    data.forEach(item => {

        // Create a new table row
        const row = document.createElement("tr");

        // Styling the new row
        row.style.border = "2px solid white";
        row.style.margin = "10px";
        row.style.borderRadius = "8px";
        row.style.color = "white";
        row.style.fontWeight = "700";
        row.style.textAlign = "center";
        row.style.borderSpacing = "0 10px";

        // Create and populate new table cells
        const new_name = document.createElement("td");
        const new_id = document.createElement("td");
        const new_email = document.createElement("td");
        const new_contact = document.createElement("td");

        // Assigning the values
        new_name.innerText = item.name;
        new_id.innerText = item.id;
        new_email.innerText = item.email;
        new_contact.innerText = item.contact;

        // Styling the new cells
        new_name.style.padding = "10px 0";
        new_id.style.padding = "10px 0";
        new_email.style.padding = "10px 0";
        new_contact.style.padding = "10px 0";

        // Append cells to the row
        row.appendChild(new_name);
        row.appendChild(new_id);
        row.appendChild(new_email);
        row.appendChild(new_contact);

        // Create and style delete button
        const delbutton = document.createElement("button");
        delbutton.innerHTML = '<i class="fa-solid fa-trash-arrow-up"></i>';
        delbutton.style.margin = "5px";
        delbutton.style.padding = "5px";

        // Create and style edit button
        const editbutton = document.createElement("button");
        editbutton.innerHTML = '<i class="fa-solid fa-pen"></i>';
        editbutton.style.margin = "5px";
        editbutton.style.padding = "5px";

        // Append buttons to the row
        row.appendChild(editbutton);
        row.appendChild(delbutton);

        // Append the row to the list
        list.appendChild(row);

        // Add event listeners to buttons for remove and edit actions
        delbutton.addEventListener("click", removeFromList);
        editbutton.addEventListener("click", editFromList);

        // Function to remove a row from the list
        function removeFromList() {
            row.remove();
            saveToLocalStorage(); // Update local storage after removal
        }

        // Function to edit a row
        function editFromList() {
            
            // Populate input fields with the row's data
            name.value = new_name.innerText;
            id.value = new_id.innerText;
            email.value = new_email.innerText;
            contact.value = new_contact.innerText;

            // Remove the row and update local storage
            row.remove();
            saveToLocalStorage();
        }
    });
}
