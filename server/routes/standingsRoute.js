const express = require('express');
const route = express.Router();
const axios = require('axios');
const shuffleArray = require('../randomTeams/shuffleArray');

require('dotenv').config();

const standings_api = process.env.STANDINGS_API;

route.get('/:leagueId', async (req, res) => {

    const { leagueId } = req.params;
    const url = `${standings_api.replace('${leagueId}', leagueId)}`;
    try {
        const response = await axios.get(url);

        const standingData = response.data.data.standings;

        const teamInfo = standingData.map(standing => ({
            id: standing.team.id,
            name: standing.team.name,
            href: standing.team.logos[0].href
        }));

        // shuffleArray(teamInfo);

        res.send(teamInfo);

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching data.');
    }
});


// Define a variable to keep track of the current team index
let currentTeamIndex = 0;

route.get('/:leagueId/:teamName', async (req, res) => {
    const { leagueId, teamName } = req.params;

    try {
        const response = await axios.get(`${standings_api.replace('${leagueId}', leagueId)}`);
        const standingData = response.data.data.standings;

        // Find the current team in the standingData array
        const currentTeam = standingData[currentTeamIndex];

        if (currentTeam) {
            // Extract the specific properties
            const { id, name, logos } = currentTeam.team;
            const href = logos.length > 0 ? logos[0].href : null;

            const teamInfo = {
                id,
                name,
                href
            };

            console.log('Current Team Name:', currentTeam.team.name);
            console.log('Current Team Info:', teamInfo);

            if (currentTeam.team.name === teamName) {
                // If the provided teamName matches, progress to the next team
                res.status(200).json(teamInfo);

                // Progress to the next team (looping back to the first team if at the end)
                currentTeamIndex = (currentTeamIndex + 1) % standingData.length;

                if (currentTeamIndex < standingData.length) {
                    console.log('Next Team Name:', standingData[currentTeamIndex].team.name);
                } else {
                    console.log('No more teams in the list.');
                }
            } else {
                // If the provided teamName does not match, stay at the current team
                res.status(400).send('Team name is incorrect.');
            }
        } else {
            res.status(400).send('No teams found.');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching data.');
    }
});



module.exports = route;
