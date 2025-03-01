const puzzleBoard = document.querySelector("#puzzle");
const solveButton = document.querySelector("#solve-button");
const solutionDisplay = document.querySelector("#solution");
const squares = 81;
let submission = [];

// Create input elements for the puzzle board
for (let i = 0; i < squares; i++) {
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "number");
    inputElement.setAttribute("min", 1);
    inputElement.setAttribute("max", 9);

    // Add odd-section class to input elements that belong to a certain section
    if (
        ((i % 9 === 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
        ((i % 9 === 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 === 3 || i % 9 == 4 || i % 9 == 5) && i < 27 && i < 53) ||
        ((i % 9 === 0 || i % 9 == 1 || i % 9 == 2) && i < 53) ||
        ((i % 9 === 6 || i % 9 == 7 || i % 9 == 8) && i < 53)
    ) {
        inputElement.classList.add("odd-section");
    }

    puzzleBoard.appendChild(inputElement);
}

// Function to join input values into a submission array
const joinValues = () => {
    const inputs = document.querySelectorAll("input");
    submission.length = 0; // Clear previous values
    inputs.forEach((input) => {
        if (input.value) {
            submission.push(parseInt(input.value)); // Push number
        } else {
            submission.push(0); // Push 0 for empty cells
        }
    });
    console.log(submission);
};

// Function to populate input values based on the solution
const populateValues = (isSolvable, solution) => {
    const inputs = document.querySelectorAll("input");
    if (isSolvable && solution) {
        inputs.forEach((input, i) => {
            input.value = solution[i];
        });
        solutionDisplay.innerHTML = "This is the answer";
    } else {
        solutionDisplay.innerHTML = "This is not solvable";
    }
};

// Function to send a POST request to the server to solve the puzzle
const solve = () => {
    joinValues();
    const data = { numbers: submission }; // Send as array, not string
    console.log("data", data);
    fetch("https://sudoko-solver-yf4d.onrender.com/solve", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(data), // Send JSON string
    })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            populateValues(true, data.solution);
        })
        .catch((error) => {
            console.error("Error:", error);
            solutionDisplay.innerHTML = "Error solving the puzzle.";
        });
};

solveButton.addEventListener("click", solve);
