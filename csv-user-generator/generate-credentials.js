const fs = require('fs');

function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

const credentials = [];
const usernames = new Set();

while (credentials.length < 100) {
    const username = 'user_' + generateRandomString(8);

    if (!usernames.has(username)) {
        usernames.add(username);
        const password = generateRandomString(12);
        credentials.push({ username, password });
    }
}

let csvContent = 'username,password\n';
credentials.forEach(cred => {
    csvContent += `${cred.username},${cred.password}\n`;
});

fs.writeFileSync('credentials.csv', csvContent);
console.log('credentials.csv created with unique pairs of username,password');
