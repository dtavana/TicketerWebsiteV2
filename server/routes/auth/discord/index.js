const fetch = require('node-fetch');
const btoa = require('btoa');
const router = require('express').Router();

const { CLIENT_ID, CLIENT_SECRET } = process.env;
const redirect = encodeURIComponent(`http://localhost:${process.env.PORT}/auth/discord/callback`);

router.get('/', (req, res) => {
  const authString = `https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&scope=identify%20guilds&response_type=code&redirect_uri=${redirect}`;
  res.redirect(authString);
});

router.get('/callback', async (req, res) => {
  const { code } = req.query;
  const creds = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
  const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${redirect}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${creds}`
      },
    });
  const json = await response.json();
  res.redirect(`dashboard/${json.access_token}`);
});

module.exports = router;

module.exports = router;
