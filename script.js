// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.


      $(document).ready(function() {
        const textAreas = $('.textarea');
        const buttons = $('.button');
        const textareaValue = textAreas.val();
      
      
        const container = $("#container");
        let today = dayjs();
        let todayCalendar = dayjs().hour();
        let businessHours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17,];
        let saveBtn = $('<button>');
       
        $(document).ready(function() {
        function displayTime() {
          $('#currentDay').text(dayjs().format('dddd MMMM/DD/YYYY HH:mm:ss'));
        }
        displayTime();
        setInterval(displayTime, 1000);
      });

        function timeChecker() {
          for (let i = 0; i < businessHours.length; i++) {
            let americanHours = `${businessHours[i]} a.m.`;
            if (businessHours[i] > 11) {
              americanHours = `${businessHours[i]} p.m.`;
              if (businessHours[i] > 12) americanHours = `${businessHours[i] - 12 } p.m.`;
            }
      
            let mainDiv = $('<div>');
            let hourDiv = $('<div>');
            let textArea = $('<textarea>');
            let saveBtn = $('<button>');
            let icon = $('<i>');
      
            /** generating parent div */
            mainDiv.attr('id', `hour-${i}`);
            mainDiv.addClass('row time-block');
      
            /**creating hour div with bootstrap classes */
            hourDiv.addClass('col-2 col-md-1 hour text-center py-3');
            hourDiv.text(americanHours);
            /**Creating Textdiv with bootstrap classes */
            textArea.addClass('col-8 col-md-10 description text-dark');
            textArea.attr('rows', 3);
      
            if (todayCalendar > businessHours[i]) textArea.addClass('past');
            if (todayCalendar < businessHours[i]) textArea.addClass('future');
            if (todayCalendar === businessHours[i]) textArea.addClass('present');
      
            saveBtn.addClass('btn saveBtn col-2 col-md-1');
            saveBtn.attr('aria-label', 'save');
      
            icon.addClass('fas fa-save');
            icon.attr('aria-hidden', true);
      
            saveBtn.append(icon);
      
            mainDiv.append(hourDiv, textArea, saveBtn);
      
            container.append(mainDiv);
          }
        }
      
        timeChecker();
      });

      $(document).ready(function() {
        $('.saveBtn').on('click', function() {
          let index = $(this).parent().attr('id').split('-')[1];
          let textareaValue = $(this).siblings('.description').val();
          localStorage.setItem(`textareaValue-${index}`, textareaValue);
      function appendSavedData () {
          const savedData = localStorage.getItem(`textareaValue-${index}`);
          const targetElement = $('.description'); // Replace 'targetElement' with the ID or selector of the element where you want to append the data
          targetElement.innerHTML += savedData;
      };
      window.addEventListener('load', appendSavedData);
    });

});






// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to apply the past, present, or future class to each time
// block by comparing the id to the current hour. HINTS: How can the id
// attribute of each time-block be used to conditionally add or remove the
// past, present, and future classes? How can Day.js be used to get the
// current hour in 24-hour time?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?
//
// TODO: Add code to display the current date in the header of the page.
