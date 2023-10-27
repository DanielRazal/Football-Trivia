const express = require('express');
const route = express.Router();
const axios = require('axios');
require('dotenv').config();

const leagues_api = process.env.LEAGUES_API;


route.get('/', async (req, res) => {
    const url = leagues_api;
    console.log(url)
    try {
        const response = await axios.get(url);

        const leagueData = [];

        response.data.data.forEach(league => {
            const leagueInfo = {
                id: league.id,
                name: league.name,
                logos: league.logos
            };

            leagueData.push(leagueInfo);
        });

        const selectedIndices = [5, 9, 16, 7, 6];

        const selectedLeagues = selectedIndices.map(index => leagueData[index]);

        res.send(selectedLeagues);

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while fetching data.');
    }
});

module.exports = route;
