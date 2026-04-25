const http = require('http');

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        res.end();
        return;
    }

    if (req.method === 'GET' && req.url === '/api/data') {
        const data = JSON.stringify(appData);
        res.statusCode = 200;
        res.end(data);
        return;
    }

    if (req.method === 'POST' && req.url === '/api/data') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                const newData = JSON.parse(body);
                appData = newData;
                appData.lastUpdate = new Date().toISOString();
                res.statusCode = 200;
                res.end(JSON.stringify({ success: true }));
            } catch(e) {
                res.statusCode = 400;
                res.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
        return;
    }

    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not found' }));
});

let appData = {
    users: [{
        id: 'admin_01',
        nickname: 'Creator',
        email: 'creator@bschamp.com',
        password: 'admin123',
        isAdmin: true,
        createdAt: new Date().toISOString()
    }],
    matches: [],
    lastUpdate: new Date().toISOString()
};

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
