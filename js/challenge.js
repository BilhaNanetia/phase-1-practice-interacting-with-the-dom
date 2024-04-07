 document.addEventListener('DOMContentLoaded', function() {
    // To Get the DOM elements
    const counterDisplay = document.getElementById('counter');
    const minusButton = document.getElementById('minus');
    const plusButton = document.getElementById('plus');
    const heartButton = document.getElementById('heart');
    const pauseButton = document.getElementById('pause');
    const likesList = document.querySelector('.likes');
    const commentInput = document.getElementById('comment-input');
    const commentForm = document.getElementById('comment-form');
  
    let counterValue = parseInt(counterDisplay.textContent);
    let timerInterval;
    let isPaused = false;
  
     // Function to increment counter in every second
     function startCounter() {
      timerInterval = setInterval(function() {
        if (!isPaused) {
          counterValue++;
          counterDisplay.textContent = counterValue;
        }
      }, 1000);
    }
  
     // Start the counter when the page loads
     startCounter();
  
    // Event listener for the minus button
    minusButton.addEventListener('click', function() {
      counterValue--;
      counterDisplay.textContent = counterValue;
    });
  
    // Event listener for the plus button
    plusButton.addEventListener('click', function() {
      counterValue++;
      counterDisplay.textContent = counterValue;
    });
  
    // Event listener for the heart button
    heartButton.addEventListener('click', function() {
      const existingLike = document.querySelector(`[data-number="${counterValue}"]`);
      if (existingLike) {
        existingLike.dataset.likes++;
        existingLike.textContent = `${counterValue} has ${existingLike.dataset.likes} likes`;
      } else {
        const newLike = document.createElement('li');
        newLike.dataset.number = counterValue;
        newLike.dataset.likes = 1;
        newLike.textContent = `${counterValue} has 1 like`;
        likesList.appendChild(newLike);
      }
    });
  
    // Event listener for the pause button
    pauseButton.addEventListener('click', function() {
      if (isPaused) {
        // Resume the counter
        isPaused = false;
        startCounter();
        minusButton.disabled = false;
        plusButton.disabled = false;
        heartButton.disabled = false;
        pauseButton.textContent = 'pause';
      } else {
        // Pause the counter
        clearInterval(timerInterval);
        minusButton.disabled = true;
        plusButton.disabled = true;
        heartButton.disabled = true;
        pauseButton.textContent = 'resume';
        isPaused = true;
      }
    });
  
    // Event listener for comments and form submission
    commentForm.addEventListener('submit', function(event) {
      event.preventDefault();
      const comment = commentInput.value.trim();
      if (comment !== '') {
        const commentDiv = document.createElement('div');
        commentDiv.textContent = comment;
        document.getElementById('list').appendChild(commentDiv);
        commentInput.value = '';
      }
    });
  });