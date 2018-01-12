const GITHUB_TOKEN = process.env["GITHUB_TOKEN"];
const https = require('https');

GetTeams();

function GetTeams() {
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
        res.on('end', () => {
            let teams = JSON.parse(teamData);
            teams.forEach(team => {
                DumpReposForTeam(team.id, team.name);
            });
        });
    }).on('error', (e) => {
        console.error(e);
    });
}

function DumpReposForTeam(teamid, teamName) {

    var options = {
        protocol: 'https:',
        hostname: 'api.github.com',
        path: `/teams/${teamid}/repos`,
        method: 'GET',
        headers: {
            'User-Agent': 'Repo Dumper',
            'Authorization': `token ${GITHUB_TOKEN}`
        }
    };

    let repoData = '';

    https.get(options, (res) => {
        let teamData = '';
        res.on('data', (d) => {
            repoData += d;
        });
        res.on('end', () => {

            process.stdout.write(`Repositories for '${teamName}':\n\n`);

            let repos = JSON.parse(repoData);
            repos.forEach(repo => {

                let accessLevel = '';
                if( repo["permissions"]["pull"]) accessLevel =  ' Read';
                if( repo["permissions"]["push"]) accessLevel =  'Write';
                if( repo["permissions"]["admin"]) accessLevel = 'Admin';

                process.stdout.write(`\t${accessLevel} - ${repo.name}\n`);
            });

            process.stdout.write('\n\n');
        });
    }).on('error', (e) => {
        console.error(e);
    });

}

