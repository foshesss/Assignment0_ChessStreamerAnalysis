## Introduction
This blog is an exploratory analysis of recognized chess streamers on chess.com. Using the analysis conducted in this blog, an upcoming chess streamer that would like to be recognized by chess.com might be able to align themself to reach a specific rating.

This project is interesting to me because I got into chess due to streamers on Twitch. Before conducting this research, I had no idea how many chess.com-recognized streamers there were and I also had no idea what the average rating of those streamers was.

## Let's collect our data
Chess.com makes pulling streamer usernames incredibly easy-- there is an endpoint just for it, "/streamers". Using the Python 'requests' library, we can retrieve that information like this:

```py
import requests

# pull all chess.com usernames of chess streamers
response = requests.get("https://api.chess.com/pub/streamers").json()
```
```json
// response format:
{
    "streamers":[
        {
            "username": "string",
            "avatar": "URL",
            "twitch_url": "Twitch.tv URL",
            "url":"member url's"
        }
    ]
}
```

However, there is a problem. This data does not include anything about a streamer's current chess rating. To tackle this, we are going to have to pull each individual streamer's chess rating. Because we have every username of every streamer, we can use the "/pub/player/{username}/stats" endpoint to pull each streamer's chess rating.

```py
rows = []

# loop through every streamer
for streamer in response["streamers"]:
    username = streamer.get("username")
    streamer_info = requests.get(f"https://api.chess.com/pub/player/{username}/stats").json()
    
    ratings = {
        "username": username
    }
    
    # add in each rating for each type of game
    for key in ["chess_rapid", "chess_bullet", "chess_blitz"]:
        if streamer_info.get(key) == None: continue
        ratings[key] = streamer_info[key]["last"]["rating"]

    # add streamer to rows
    rows.append(ratings)

# create streamers dataframe w/ rows
streamer_df = pd.DataFrame(rows)
```

After pulling each streamer's rating, we create a dataframe with them, where columns are "username", "chess_rapid", "chess_bullet", and "chess_blitz". One problem that I ran into was that some streamers had never played some types of chess games. If that happened, that value was skipped for that streamer.

## Visualizing the data



## How is this data useful?
For anybody that has ever wanted to be a recognized chess.com content creator, the findings in this blog can be incredibly useful.

## Insights


## Pitfalls
It's nearly impossible to write a piece of code without some trouble. One problem that I ran into was incomplete stats profiles-- some players have missing values, either due to inactivity or never having played a specific type of game. 

If a player has never played "chess_blitz", this problem could occur. To counter this, I had to handle the edge case in my code:
```py
# loop through every game type
for key in ["chess_rapid", "chess_bullet", "chess_blitz"]:
    # if a streamer's info doesn't contain that game, continue
    if streamer_info.get(key) == None: continue
    ratings[key] = streamer_info[key]["last"]["rating"]
```

## What's missing?
There are a ton of outside factors that could make chess.com more inclined to add somebody as a recognized streamer. Some of these factors could include whether somebody is family-friendly, is a brand risk, average viewers, and how frequently they play chess on stream. While chess rating could play a part, it is likely not a deciding factor by any means.


https://github.com/foshesss/INST414_Assignments/tree/master/assignment1

