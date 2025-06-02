fetch('https://api.github.com/repos/YOUR_USERNAME/project-veena/contents')
  .then(res => res.json())
  .then(files => {
    const list = document.getElementById('log-list');
    files
      .filter(file => file.name.match(/^day-\d+\.md$/))
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach(file => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = file.html_url;
        link.textContent = file.name.replace('.md', '');
        li.appendChild(link);
        list.appendChild(li);
      });
  });
