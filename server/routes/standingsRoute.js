const express = require('express');
const route = express.Router();
const axios = require('axios');

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

        res.send(teamInfo);

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching data.');
    }
});

module.exports = route;
