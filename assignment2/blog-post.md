## Introduction
This blog post is an analysis of Minecraft items. The goal of this blog is to visualize and identify the most important items that a player can find in Minecraft. Item importance is somewhat arbitrary, but for this example, any item that is used in the recipe of other items makes it very important. If an item is only used in one or two recipes, it is deemed as not very important.

Given this graph, new players could identify which items are the most important (or items that they need to craft in order to reach a goal). In addition, this graph will act as a quick visualizer to show relationships between items.

## Let's collect our data
To collect data, I was originally going to use a website, http://minecraftsavant.weebly.com/crafting-recipes.html, and scrape information about items and crafting recipes with BeautifulSoup. However, that website was not made for webscraping at all. The HTML was broken in a lot of places, in the sense that the creator would add random tags that would mess with any sort of pattern that might be used for scraping.

Because of the issues with webscraping, I went to GitHub to find minecraft data about each item. I stumbled across a repository ( https://github.com/JayHales/Minecraft-Crafting-Web/tree/master/minecraft-data ) that had everything I needed, so I cloned it, moved the 'recipes' and 'tags' folder into my repo, and then iterated through every .json file to construct the graph.

I created my graph using an adjacency list, where each key of a dictionary is the node and the list value are all of it's neighbors.

Nodes are defined as items in the game and edges are defined as items that are used in the recipes of other items. For example, oak wood will turn into wood planks, so they'd have an edge between them. 

## Visualizations
To visualize the graph, I used networkX and then exported a graph .gexf file, which I would then use Gephi to visualize.

I'd like to explore three nodes that have a seemingly very high importance. The first is 'Sticks'.

Sticks are a foundational item in Minecraft. They are the ticket to a lot of decoration items and tools, which allow users to progress through the game. 

*image*

The next node that I'd like to explore is 'Iron Ingot', which is also used for tools, but many other utility in the game. The Iron Ingot is useful for creating methods of transportation, crafting stations for further progression, automation, and tools. 

*image*

The final node that I'd like to explore is 'Planks', generalizing to all planks. The reason for the generalization is that all planks make the same items-- they just have their own variants. For example, an oak plank might make and oak fence, where a birch plank would make a birch fence.T his type of item is useful for creating decorating blocks, and progresses into the most important node, sticks. In addition, this item is useful for creating storage blocks.

*image*

## Insights
Immediately, it was noticeable that sticks and wood variants have the most utility. Sticks are useful because they make tools and are also the product of every wood variant. Wood variants craft all of their wood-variant items (doors, trap doors, fences, etc).

Given knowledge of the game, this makes sense. The first thing players are told to do is "punch a tree to get some wood", and that unlocks so many options. Tools and other household items use sticks/wood the most, so without even looking at the graph, somebody could've guessed that these items had the most relationships.

## Pitfalls
The toughest part of this project was collecting the data. Originally, web scraping seemed like a really unique method of gathering data, but finding a site that fit was incredibly difficult. It was a stroke of luck to find the Minecraft item data on GitHub, which allowed for this project to be possible.

Ended up using a bunch of json files found on GitHub, which was also another obstacle. All of the .json files didn't have a universal style, so there were a ton of edge cases that I had to tackle to parse them. Here's an example of the logical tree to parse one recipe:


## Limitations of analysis
The biases of this analysis include the developers-- they make executive decisions on which items are added to the game. It's likely that they add more crafting recipes for early game players, rather than late game players-- this is because late game players have a lot more options for crafting and aren't limited ot just a few blocks.


https://github.com/foshesss/INST414_Assignments/tree/master/assignment2

