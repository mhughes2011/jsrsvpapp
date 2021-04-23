let form = document.getElementById('registrar');
let input = form.querySelector('input');
let ul = document.getElementById('invitedList');

form.addEventListener('submit', (e) => {
  e.preventDefault(); //This prevents the page from reloading when the submit button is clicked
  let text = input.value;//This is the value of the input box in the form.
  input.value = '';//This resets the input field to a blank string to let the person know the submit btn has been clicked.
  let li = document.createElement('li');//Creates a list item
  li.textContent = text;//Sets the li text to the value of the input box.
  let label = document.createElement('label');//Creates a label for the confirmed checkbox.
  label.textContent = 'Confirmed';//Sets the text in the checkbox label to confirmed.
  let checkbox = document.createElement('input');//This creates the confirmed checkbox.
  checkbox.type = 'checkbox';//This sets the input type to checkbox.
  label.appendChild(checkbox);//This adds the checkbox to the label element.
  li.appendChild(label);//This appends the label (and checkbox) to the li
  ul.appendChild(li);//This adds the li to the blank ul.
});

//This is listening for the change of the confirmed checkbox and adding the classname to the element.  This involves event bubbling.  The event listener is on the ul because if the ul is triggered the child elements will be triggered as well.
ul.addEventListener('change', (e) => {
  let checkbox = event.target;//This grabs the target of the event (the confirmed checkbox)
  let checked = checkbox.checked;//This stores the value of the checked confirmed box.
  let listItem = checkbox.parentNode.parentNode;//This is grabbing the grandparent of the checkbox, which is the list item itself.
  
  if(checked) {
    listItem.className = 'responded';
  }else {
    listItem.className = '';
  }
});