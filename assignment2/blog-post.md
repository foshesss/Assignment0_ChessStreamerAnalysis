## Introduction
This blog post is an analysis of Minecraft items. The goal of this blog is to visualize and identify the most important items that a player can find in Minecraft. Item importance is somewhat arbitrary, but for this example, any item that is used in the recipe of other items makes it very important. If an item is only used in one or two recipes, it is deemed as not very important.

## Let's collect our data
To collect data, I originally used a website and I was going to scrape information with BeautifulSoup. However, that website was not made for webscraping at all. The HTML was broken in a lot of places, in the sense that the creator would add random tags that would mess with any sort of pattern that might be used for scraping.

Because of the issues with webscraping, I went to GitHub to find minecraft data about each item. I stumbled across a repository that had everything I needed, so I cloned it, moved the 'recipes' and 'tags' folder into my repo, and then iterated through every JSON file to construct the graph.

I created my graph using an adjacency list, where each key of a dictionary is the node and the list value are all of it's neighbors.

## Visualizations
To visualize the graph, I used networkX and then exported a graph .gexf file, which I would then use Gephi to visualize.

## Insights
Immediately, it was noticeable that sticks and wood variants have the most utility. Sticks are useful because they make tools and are also the product of every wood variant. Wood variants craft all of their wood-variant items (doors, trap doors, fences, etc).

## Pitfalls
The toughest part of this project was collecting the data. Originally, web scraping seemed like a really unique method of gathering data, but finding a site that fit was incredibly difficult. It was a stroke of luck to find the Minecraft item data on GitHub, which allowed for this project to be possible.

## Limitations of analysis


## What's missing?

https://github.com/foshesss/INST414_Assignments/tree/master/assignment2

