// Retrieve the list of issues from local storage, or create an empty array if it doesn't exist yet
let issues = JSON.parse(localStorage.getItem('issues')) || [];

// Retrieve the HTML elements we need to interact with
const newIssueForm = document.getElementById('new-issue-form');
const issueList = document.getElementById('issue-list');

// Add an event listener to the form to handle submission
newIssueForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Get the values of the form fields
  const name = event.target.elements.name.value;
  const description = event.target.elements.description.value;
  const assignee = event.target.elements.assignee.value;
  const difficulty = event.target.elements.difficulty.value;
  // Addthe new issue to the list of issues
  const newIssue = { name, description, assignee, difficulty, status: 'open' };
  issues.push(newIssue);
  // Save the updated list of issues to local storage
  localStorage.setItem('issues', JSON.stringify(issues));
  // Reset the form fields
  event.target.reset();
  // Update the issue list on the screen
  updateIssueList();
});

// Function to update the issue list on the screen
function updateIssueList() {
  issueList.innerHTML = '';
  for (let i = 0; i < issues.length; i++) {
    const issue = issues[i];
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <div>
          <span>Issue: ${issue.name}</span>
          <span class="difficulty difficulty-${issue.difficulty}">${issue.difficulty}</span>
        </div>
        <div class="description">Description:<br/> ${issue.description}</div>
        <div class="assignee">Assignee to:<br/> ${issue.assignee}</div>
      </div>
      <div>
        <button class="done-button" data-index="${i}">Done</button>
        <button class="cancel-button" data-index="${i}">Cancel</button>
      </div>
    `;
    if (issue.status === 'done') {
      li.classList.add('done');
    } else if (issue.status === 'cancelled') {
      li.classList.add('cancelled');
    }
    issueList.appendChild(li);
  }
}

// Add event listeners to the done and cancel buttons to update the status of the issue and the color of the badge
issueList.addEventListener('click', (event) => {
  if (event.target.classList.contains('done-button')) {
    const index = event.target.dataset.index;
    issues[index].status = 'done';
    localStorage.setItem('issues', JSON.stringify(issues));
    updateIssueList();
  } else if (event.target.classList.contains('cancel-button')) {
    const index = event.target.dataset.index;
    // Remove the cancelled issue from the list of issues
    issues.splice(index, 1);
    localStorage.setItem('issues', JSON.stringify(issues));
    updateIssueList();
  }
});

// Call the updateIssueList function to display the initial list of issues
updateIssueList();