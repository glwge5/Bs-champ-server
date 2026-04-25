const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

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

app.get('/api/data', function(req, res) {
    res.json(appData);
});

app.post('/api/data', function(req, res) {
    appData = req.body;
    appData.lastUpdate = new Date().toISOString();
    res.json({ success: true });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log('Server running on port ' + PORT);
});
