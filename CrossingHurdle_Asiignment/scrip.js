document.addEventListener("DOMContentLoaded", function() {
    const chatMessages = document.getElementById("chat-messages");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");
    const marketButton = document.getElementById("market-place");
    const floatingWindow = document.getElementById("floating-window");
    const floatingWindow2 = document.getElementById("sold-content");
    const floatingContent = document.getElementById("floating-content");
    const itemList = document.getElementById("item-list");
    const addItemForm = document.getElementById("add-item-form");

    let isAdminLoggedIn = false; // Flag to track admin login status

    marketButton.addEventListener("click", function() {
      // Show the floating window when "M" button is clicked
      floatingWindow.style.display = "block";
    });

    sendButton.addEventListener("click", function() {
      const message = messageInput.value.trim();
      if (message !== "") {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", "user-message");
        messageElement.textContent = message;

        // Check for admin login status before appending the message
        if (isAdminLoggedIn || message.toLowerCase() == "soldlist") {
          messageInput.value = "";
          const adminUserId = prompt("Enter admin user ID:");
          const adminPassword = prompt("Enter admin password:");

          // Check if admin credentials are correct
          if (adminUserId === "admin" && adminPassword === "password") {
            
            chatMessages.appendChild(messageElement);
            messageInput.value = "";
            alert("Sold list is visible now");
            floatingWindow2.style.display = "block";
          } else {
            alert("Invalid admin credentials..");
          }
        }
        if (isAdminLoggedIn || message.toLowerCase() !== "market") {
          chatMessages.appendChild(messageElement);
          messageInput.value = "";
        } 
        else {
          // Prompt for admin credentials
          const adminUserId = prompt("Enter admin user ID:");
          const adminPassword = prompt("Enter admin password:");

          // Check if admin credentials are correct
          if (adminUserId === "admin" && adminPassword === "password") {
            isAdminLoggedIn = true;
            marketButton.style.display = "inline-block"; // Show the "M" button
            chatMessages.appendChild(messageElement);
            messageInput.value = "";
            alert("You have successfully created the market place");
          } else {
            alert("Invalid admin credentials. Market button will not be shown.");
          }
        }
      }
    });

    // Add event listener for "Buy" buttons
    itemList.addEventListener("click", function(event) {
      if (event.target.tagName === "BUTTON" && event.target.textContent === "Buy") {
        const row = event.target.closest("tr");
        const quantityCell = row.querySelector("td:nth-child(3)");
        const quantity = parseInt(quantityCell.textContent);

        if (quantity > 1) {
          quantityCell.textContent = quantity - 1;
        } else {
          itemList.removeChild(row);
        }
      }
    });

    addItemForm.addEventListener("submit", function(event) {
      event.preventDefault();

      // Get values from form inputs
      const itemName = document.getElementById("item-name").value;
      const itemCost = document.getElementById("item-cost").value;
      const itemQuantity = document.getElementById("item-quantity").value;

      // Create a new row for the item
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
        <td>${itemName}</td>
        <td>${itemCost}</td>
        <td>${itemQuantity}</td>
        <td><button>Buy</button></td>
      `;

      // Append the new row to the table
      itemList.appendChild(newRow);

      // Clear form inputs
      addItemForm.reset();

      // Automatically remove the new row after one minute
      setTimeout(function() {
        itemList.removeChild(newRow);
      }, 60000); // 60000 milliseconds = 1 minute
    });
    itemList.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON" && event.target.textContent === "Buy") {
      const row = event.target.closest("tr");
      const itemNameCell = row.querySelector("td:nth-child(1)");
      const quantityCell = row.querySelector("td:nth-child(3)");
      const status = "Paid"; // Default status is Paid
      const quantity = parseInt(quantityCell.textContent);

      if (quantity > 1) {
        quantityCell.textContent = --quantity;
      } else {
        itemList.removeChild(row);
      }

      // Add sold item to the "Items Sold" table
      const soldList = document.getElementById("sold-list");
      const newRow = document.createElement("tr");
      const itemName = itemNameCell.textContent;
      const quantitySold = 1;
      const timestamp = new Date().toLocaleString();
      newRow.innerHTML = `
        <td>${itemName}</td>
        <td>${quantitySold}</td>
        <td>${timestamp}</td>
        <td>${status}</td>
      `;
      soldList.appendChild(newRow);
    }
  });
  });