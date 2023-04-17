require('dotenv').config();

AUTH = process.env["AUTHORIZATION"]
CLIENT_TOKEN = process.env["CLIENT_TOKEN"]

const seen = new Set()

// get 'following' from users
const get_following = async (user, new_users) => {
    const response = await fetch(`https://spclient.wg.spotify.com/user-profile-view/v3/profile/${user}/followers?market=from_token`, {
        "headers": {
            "accept": "application/json",
            "accept-language": "en",
            "app-platform": "WebPlayer",
            "authorization": AUTH,
            "client-token": CLIENT_TOKEN,
            "sec-ch-ua": "\"Google Chrome\";v=\"111\", \"Not(A:Brand\";v=\"8\", \"Chromium\";v=\"111\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"Windows\"",
            "spotify-app-version": "1.2.10.278.g261ea664"
        },
        "referrer": "https://open.spotify.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
    });

    const content = await response.json();

    content.profiles.forEach(({uid}) => {
        const user_id = uid.split(":")[2];
        if (seen.has(user_id)) return

        // add to seen, prevents checking dupez
        new_users.push(user_id)
        seen.add(user_id)
    })
}


const get_six_degrees = (origin) => {
    let current_pool = []
    let next_pool = [origin]

    // loop through all six degrees
    for (let i = 0; i <= 6; i++) {
        current_pool = next_pool;
        next_pool = [];

        // check each user in current degree
        let next_user = current_pool.pop();
        while (next_user) {
            get_following(origin, next_pool)
            next_user = current_pool.pop()
        }

        // continue to next iteration once current_pool is empty
    }
}