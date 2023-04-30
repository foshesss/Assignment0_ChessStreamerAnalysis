## Introduction
This blog is an exploratory analysis of recognized chess streamers on chess.com. Using the analysis conducted in this blog, an upcoming chess streamer that would like to be recognized by chess.com might be able to align themself to reach a specific rating. This could increase their chances of being recognized on chess.com.

This project is interesting to me because I got into chess because of streamers on Twitch. Before conducting this research, I had no idea how many chess.com-recognized streamers there were and I also had no idea what the average rating of those streamers was.

In order to solve this problem, I will be using the chess.com API to pull all relevant information. This data will include every streamer's username and their ratings.

## Let's collect our data
Obviously, in order to analyze data about chess streamers, we're going to need to collect it. Chess.com makes pulling streamer usernames incredibly easy-- there is an endpoint just for it, "/streamers". Using the Python 'requests' library, we can retrieve that information like this:

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

However, there is a problem with this response. This data does not include anything about a streamer's current chess stats. To tackle this, we are going to have to pull each streamer's chess rating with their username and the "/pub/player/{username}/stats" endpoint.

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

After pulling this information, we create a dataframe with it, where columns are "username", "chess_rapid", "chess_bullet", and "chess_blitz". One problem that I ran into was that some streamers had never played some types of chess games. If that happened, that value was skipped for that streamer.

## Visualizations
Visualizing the data was simple with the Python 'matplotlib' library. I accomplished this by creating an array of game types-- ["chess_rapid", "chess_bullet", "chess_blitz"]. Then, I looped through this array and created an array within that loop-- this one would hold every streamer's rating for that game type. After collecting every streamer's rating, I'd add the game type array to a 'ratings' array. This would be used for plotting, and we'd know which game type is represented in the 'ratings' array due to the position in the array. For example, the first index in the ratings array would be an array of every chess streamer's rating in the "chess_rapid", and so on.

```py
import matplotlib.pyplot as plt
import math

ratings = []
game_types = ["chess_rapid", "chess_bullet", "chess_blitz"]

# plot box plots
for i in range(0, len(game_types)):
    game_type = game_types[i]
    ratings.append([])

    for row in streamer_df.iterrows():
        content = row[1]

        # skip if NaN
        rating = content[game_type]
        if math.isnan(rating): continue
        ratings[i].append(rating)


# ratings = [[], [], []]
# game_types = ["chess_rapid", "chess_bullet", "chess_blitz"]

plt.boxplot(ratings, labels=game_types)
plt.show()
```

The visualization shows that the average streamer falls somewhere around 2000 rated in all categories, and the range for player ratings was each game type was somewhere between 250 and 3000.

## Insights
Some further, more in depth insights can be made using the Python 'numpy' library. This library allows for more complex numerical analysis.
```py
def get_stats(data):
    return {
        "mean": np.mean(data),
        "std": np.std(data),
        "min_value": np.min(data),
        "max_value":  np.max(data),
        "q1": np.percentile(data, 25),
        "q2": np.percentile(data, 50),
        "q3": np.percentile(data, 75)
    }
```

This function allows us to pull more information about the min, max, and quartiles of each game type. This information showed that the minimum rating for streamers in each game type hovered around 115-150 and the maximum rating was somewhere between 2900 and 3200. It also showed the less than 25% of chess streamers are below 1500, which indicates that if somebody wants to be a recognized streamer, they should aim above that rating.

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

## Limitations of analysis
After glancing through the data, it seems that some accounts in there were alt accounts of pro players. Knowing this, the average streamer rating could be skewed a lot higher, as some pro players may have multiple accounts that are highly rated.

## What's missing?
There are a ton of outside factors that could make chess.com more inclined to add somebody as a recognized streamer. Some of these factors could include whether that person is family-friendly, is a brand risk, average viewers, and how frequently they play chess on stream. While chess rating could play a part, it is likely not a deciding factor by any means.

https://github.com/foshesss/INST414_Assignments/tree/master/assignment1

