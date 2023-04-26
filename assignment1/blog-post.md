*The song that I played as I wrote this blog is ‘Evergreen’, by Richy Mitch & The Coal Miners. It’s not particularly my favorite, but I recently started watching Vinland Saga and for some reason, it reminds me of that.*

## Introduction
This blog is an exploratory analysis of recognized chess streamers on chess.com. Using the analysis conducted in this blog, an upcoming chess streamer might be able to align themself or set a personal goal to reach a specific rating.

This project is interesting to me because I got into chess due to streamers. Before this, I had no idea how many chess.com-recognized streamers there were and I also had no idea what the average rating of those streamers was.

## Let's collect our data
Data collection with APIs is incredibly simple, with the help of Python's 'requests' library.


Using the 'requests' library, I can pull every chess streamer's username by touching the "/streamers" endpoint.

```py
import requests

# pull all chess.com streamers ratings
response = requests.get("https://api.chess.com/pub/streamers").json()
```


## How is this data useful?
For anybody that has ever wanted to be a recognized chess.com content creator, the findings in this blog can be incredibly useful.

## Pitfalls
It's nearly impossible to write a piece of code without some trouble. One problem that I ran into was incomplete stats profiles-- some players have missing values, either due to inactivity or never having played a specific type of game. 

An example could be a player loves playing "chess_rapid", but hates "chess_blitz". 



https://github.com/foshesss/INST414_Assignments/tree/master/assignment1

