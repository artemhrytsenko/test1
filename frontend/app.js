fetch('/api/users')
    .then(response => response.json())
    .then(data => {
        const userList = document.getElementById('user-list');
        data.forEach(user => {
            const li = document.createElement('li');
            li.textContent = `${user.id}: ${user.name}`;
            userList.appendChild(li);
        });
    });
