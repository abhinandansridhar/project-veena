fetch('https://api.github.com/repos/YOUR_USERNAME/project-veena/contents')
  .then(res => res.json())
  .then(files => {
    const list = document.getElementById('log-list');
    const streakSpan = document.getElementById('current-streak');

    const dayFiles = files
      .filter(file => file.name.match(/^day-(\d+)\.md$/))
      .map(file => ({
        name: file.name,
        day: parseInt(file.name.match(/^day-(\d+)\.md$/)[1]),
        url: file.html_url
      }))
      .sort((a, b) => a.day - b.day);

    // Render the ritual logs
    dayFiles.forEach(file => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = file.url;
      link.textContent = file.name.replace('.md', '');
      li.appendChild(link);
      list.appendChild(li);
    });

    // Calculate current streak
    let streak = 1;
    for (let i = dayFiles.length - 1; i > 0; i--) {
      if (dayFiles[i].day - dayFiles[i - 1].day === 1) {
        streak++;
      } else {
        break;
      }
    }

    // Update the counter on the page
    streakSpan.textContent = streak;
  });
