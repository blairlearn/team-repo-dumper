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

    let teamData = '';
    
    res.on('data', (d) => {
        teamData += d;
    });

    res.on('end', () =>{
        teams = JSON.parse(teamData);
        teams.forEach(team => {
            process.stdout.write(team.id + "\t" + team.name + "\n");
        });

    })

}).on('error', (e) => {
    console.error(e);
});
