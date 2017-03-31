document.addEventListener("DOMContentLoaded", function() {
  var newPollButton = document.querySelector(".newPoll");
  var form = document.querySelector("#newPollForm");
  var newOption = document.querySelector(".newOption");
  var options = document.querySelector(".newoptions");
  var removeButton = document.querySelector(".removeOption")

  newPollButton.addEventListener("click", function() {
    if (form.classList.contains("noDisplay")) {
      form.classList.remove("noDisplay");
    } else {
      form.classList.add("noDisplay");
    }
  })

  newOption.addEventListener("click", function() {
   
    var node = document.createElement("div");
    var input = document.createElement("input");
    var button = document.createElement("button");
    var buttonText = document.createTextNode("x");

    node.className = "newoption";
    input.type = "text";
    input.name = "pollOption";
    button.setAttribute("type", "button");
    button.setAttribute("class", "removeOption");
    button.addEventListener("click", function() {
      this.parentNode.remove();
    });

    options.appendChild(node).appendChild(input);
    node.appendChild(button).appendChild(buttonText);
  })

  removeButton.addEventListener("click", function() {
    this.parentNode.remove();
  })
})

  