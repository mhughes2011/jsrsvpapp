let form = document.getElementById('registrar');
let input = form.querySelector('input');

let mainDiv = document.querySelector('.main');
let ul = document.getElementById('invitedList');

let div = document.createElement('div');
let filterLabel = document.createElement('label');
let filterCheckbox = document.createElement('input');

filterLabel.textContent = "Hide those who haven't responded";
filterCheckbox.type = 'checkbox';
div.appendChild(filterLabel);
div.appendChild(filterCheckbox);
mainDiv.insertBefore(div, ul);

filterCheckbox.addEventListener('change', (e) => {
  let isChecked = e.target.checked;//Grabs the checked property of a checkbox input and stores it as checked.  If it isn't checked the checked property is empty.
  let lis = ul.children;//This grabs all of the children of ul and stores them in an array
  if(isChecked) {
    for (let i=0; i<lis.length; i++) {//These for loops are looping through each child in the array
      let li = lis[i];
      if(li.className === 'responded') {
        li.style.display = '';//This means that the li element has the class name of repsonded and allow it to pick up it's previous style.
      } else {
        li.style.display = 'none';//This means the li element doens't have the class name of repsonded meaning the confirmed checkbox isn't checked.  It removes the child by making it disappear.
      }
    }
  } else {//This is the case when the filter checkbox isn't checked and you want to display all of the attendees whether they've confirmed or not
    for (let i=0; i<lis.length; i++) {
      let li = lis[i];
      li.style.display = '';
    }
  }
});

function createLI(text) {
  let li = document.createElement('li');//Creates a list item
  let span = document.createElement('span');//This creates the span for the text.  The span is needed to manipulate the text easier for editing purposes.  Without the span elements it's more difficult to edit the text.
  span.textContent = text;//Sets the span text to the value of the input box.
  li.appendChild(span);//Adds the span element to the li
  let label = document.createElement('label');//Creates a label for the confirmed checkbox.
  label.textContent = 'Confirmed';//Sets the text in the checkbox label to confirmed.
  let checkbox = document.createElement('input');//This creates the confirmed checkbox.
  checkbox.type = 'checkbox';//This sets the input type to checkbox.
  label.appendChild(checkbox);//This adds the checkbox to the label element.
  li.appendChild(label);//This appends the label (and checkbox) to the li
  
  let editButton = document.createElement('button');//This creates the edit btn.
  editButton.textContent = 'edit';//This sets the btn's text to edit.
  li.appendChild(editButton);//This adds an edit btn to each list item.
  
  let removeButton = document.createElement('button');//This creates the remove btn.
  removeButton.textContent = 'remove';//This sets the btn's text to remove.
  li.appendChild(removeButton);//This adds a remove btn to each list item.
  
  return li;
}

form.addEventListener('submit', (e) => {
  e.preventDefault(); //This prevents the page from reloading when the submit button is clicked
  let text = input.value;//This is the value of the input box in the form.
  input.value = '';//This resets the input field to a blank string to let the person know the submit btn has been clicked.
  let li = createLI(text);//This calls the createLI function to actually make the li element.  The li element is returned here.  This makes the code easier to read.
  ul.appendChild(li);//This adds the li to the blank ul.
});

//This is listening for the change of the confirmed checkbox and adding the classname to the element.  This involves event bubbling.  The event listener is on the ul because if the child elements are triggered, the event bubbles up to the parent elements in this case the ul.
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

ul.addEventListener('click', (e) => {
  //This if statement makes sure that the event is only triggered when you click a button.
  if(e.target.tagName === 'BUTTON') {
    let button = e.target;
    let li = button.parentNode;//This targets the parent node of the remove btn that is clicked, which is the li that you want to delete.
    let ul = li.parentNode;//This grabs the ul that the list item that wants to be deleted is in.
    
    if(button.textContent === 'remove') {//This targets the remove button only.
      ul.removeChild(li);
    } else if(button.textContent === 'edit') {
      let span = li.firstElementChild;//Grabs the existing span element
      let input = document.createElement('input');//Creates a new input field
      input.type = 'text';//Sets the input type to text
      input.value = span.textContent;//This keeps the value of the existing span element and puts it into the new input element as if they're editing it instead of starting with a blank input field.
      li.insertBefore(input, span);//Inserts the input field before the span
      li.removeChild(span);//Removes the span element leaving only the new input field
      button.textContent = 'save';//Changes the button text to save.
    } else if (button.textContent === 'save') {
      let input = li.firstElementChild;//Grabs the existing input element
      let span = document.createElement('span');//Creates a new span element
      span.textContent = input.value;//Places the text value of the input into the span
      li.insertBefore(span, input);//Inserts the span element before the input element
      li.removeChild(input);//Removes the input child.
      button.textContent = 'edit';//Changes the button text to edit
    }
  }
});
                    
                    
                    
                    
                    
                    
                    
                    
