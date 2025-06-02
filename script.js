const username = 'abhinandansridhar'; // replace with your GitHub username
const repo = 'project-veena';
const apiBase = `https://api.github.com/repos/${username}/${repo}`;

async function getCommitDate(filePath) {
  const commitsUrl = `${apiBase}/commits?path=${filePath}`;
  const response = await fetch(commitsUrl);
  const commits = await response.json();
  if (commits.length > 0) {
    return new Date(commits[0].commit.author.date);
  }
  return null;
}

async function calculateStreak() {
  const contentsUrl = `${apiBase}/contents`;
  const response = await fetch(contentsUrl);
  const files = await response.json();

  const dayFiles = files.filter(file => /^day-\d+\.md$/.test(file.name));
  const dates = [];

  for (const file of dayFiles) {
    const commitDate = await getCommitDate(file.path);
    if (commitDate) {
      dates.push(commitDate);
    }
  }

  dates.sort((a, b) => a - b);

  let streak = 0;
  let currentStreak = 0;
  let today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = dates.length - 1; i >= 0; i--) {
    const date = dates[i];
    const diffTime = today - date;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (diffDays === 0) {
      currentStreak = 1;
    } else if (diffDays === 1 && currentStreak > 0) {
      currentStreak++;
    } else {
      break;
    }

    today = date;
  }

  document.getElementById('current-streak').textContent = currentStreak;
}

calculateStreak();
