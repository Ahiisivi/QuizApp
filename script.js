document.addEventListener("DOMContentLoaded", () => {
    const quizForm = document.getElementById("quiz");
    const submitButton = document.getElementById("submit-quiz");
    const results = document.getElementById("results");
  
    fetch("questions.json")
      .then(response => response.json()) // Converts the response to a JavaScript object
      .then(questions => {
        questions.forEach((q, index) => {
          const questionsDiv = document.createElement("div"); // Creates a div element for the question
          questionsDiv.classList.add("question"); // Adds a CSS class
          questionsDiv.innerHTML = `
            <p>${index + 1}. ${q.question}</p>
            ${q.options.map(option => `
              <label> 
                <input type="radio" name="question${index}" value="${option}">
                ${option}
              </label><br>
            `).join("")}
          `; // Creates radio buttons for the options
          quizForm.appendChild(questionsDiv); // Appends the question to the form
        });
  
        // Move submit button to the end of the form
        quizForm.appendChild(submitButton);
        quizForm.appendChild(results);
        
        submitButton.addEventListener("click", (event) => {
          event.preventDefault(); // Prevents the form from refreshing
  
          let score = 0;
          let empty = false;
  
          questions.forEach((q, index) => {
            const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
            if (!selectedOption) {
              empty = true;
              return;
            }
            if (selectedOption.value === q.answer) {
              score += 1;
            }
          });
  
          if (empty) {
            results.innerHTML = "Please answer all questions";
          } else {
            results.innerHTML = `You scored ${score} out of ${questions.length}`;
          }
        });
      })
      .catch(error => console.error("Error fetching questions", error));
  });
  