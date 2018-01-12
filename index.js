var GITHUB_TOKEN = process.env["GITHUB_TOKEN"];

const https = require('https');

var options = {
    //'https://api.github.com/orgs/nciocpl/teams';
    protocol: 'https:',
    hostname: 'api.github.com',
    path: '/orgs/nciocpl/teams',
    method: 'GET',
    headers: {
        'User-Agent': 'Repo Dumper',
        'Authorization': `token ${GITHUB_TOKEN}`
    }
};


https.get(options, (res) => {

    //console.log('statusCode:', res.statusCode);
    //console.log('headers:', res.headers);

    res.on('data', (d) => {
        process.stdout.write(d);
    });

}).on('error', (e) => {
    console.error(e);
});
