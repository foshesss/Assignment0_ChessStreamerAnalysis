# Find a Similar Song to your Favorite
## Introduction
Have you ever sat in your seat and thought, "wow, I love this song. I wonder if there's anything else that's like this?" If you're nodding your head, you're not alone. I also think the same thing when I'm listening to music.

Music can be so hard to come by and once you hear a sound that you love, you want more of it. The goal of this blog is to take a pre-defined dataset of songs and find similar songs based on their musical characteristics.

## Source of the data
This data was collected through Kaggle.com. The link to the dataset can be found here: https://www.kaggle.com/datasets/mrmorj/dataset-of-songs-in-spotify?select=genres_v2.csv

This data contains a bunch of information about musical characteristics of songs. Some example columns being 'acoustiness' and 'instrumentalness'.

## Cleaning the data
Because the data used in this post was found on Kaggle, it is necessary to clean it. It's important to understand that our similarity will be found using euclidean distance, so we want to eliminate all non-numeric entries. On top of that, we want to remove NaN values (rows containing empty cells). 

To accomplish this, we'll use this code:
```py
# retrieve and clean df
songs_df = pd.read_csv("spotify-songs.csv", low_memory=False)
songs_df.index = songs_df["id"] # set index to a song's unique id
songs_df.drop(["analysis_url", "uri", "track_href", "type", "title", "Unnamed: 0", "id", "genre"], axis=1, inplace=True) # remove unused/non-numeric columns
songs_df.dropna(subset=["song_name"], inplace=True) # remove all rows with NaN song_names
songs_df = songs_df[~songs_df.index.duplicated(keep="first")] # remove duplicate entries
```

## Normalizing each column
After cleaning the data, in order to find euclidean distance, it's necessary to normalize each column. Doing this ensures that each feature is equally represented. With that in mind, scaling a column up or down would change it's overall importance. For this example, however, I chose to represent every feature equally.

In order to accomplish this, we'll use this formula:
$$
\frac{songs\_df[col] - \min}{\max - \min}
$$
which directly translates to this code:
```py
for col in normalized_songs_df.columns:
    min, max = normalized_songs_df[col].min(), normalized_songs_df[col].max()
    normalized_songs_df[col] = (songs_df[col] - min)/(max - min)
```

[col], in the equation, represents a characteristic that is being used in the analysis.


