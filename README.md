# Table Tennis Tournament

This is the first webpage I've made that I worked hard to polish, and I'm happy with the result. You can add as many players as you like, and generate a tournament tree from those players. Then, when you click start, you can begin selecting winners for each game.

--- 

## Technologies Used
HTML, SASS, Bootstrap, JavaScript & jQuery; Git for version management.


## SASS
Using this preprocessor seemed like an obvious choice. With nesting, I could easily separate the 3 main sections of this webpage, nesting the many elements they contained, to create a file that is much easier to read, navigate and edit. Mixins were extremely useful for reducing clutter if multiple elements had similar styling, and variables were great for managing hex codes for colours.

## Bootstrap
As I would be spending a lot of time positioning the elements that would be created by Javascript, I decided to use Bootstrap on some of the other elements to make things faster. It made making these parts responsive to screen size extremely easy. I only made use of the column and row grid system in bootstrap.

## Javascript & jQuery
I decided to use this instead of React & Redux, as I have spent a lot more time with Javascript & jQuery, and I enjoy using them the most. However, state management is nowhere near as easy to do. With this project not requiring much state, I still felt that Javascript & jQuery was the right choice for me.

This project involved a large amount of generating HTML and populating that HTML with text. jQuery makes this a lot easier and shorter to do. From the beginning, I wanted to be able to handle any amount of players, and my content to react to this, so all the HTML I generate/ manipulate needed to rely on the user's input. To do this, there are many functions that pass arguments to one another, but initially the data just comes from the names the user inputs.

I discovered something I didn't know before whilst doing this project - reference errors. I had a few days where I had no idea why my array of players was getting erased. I console logged different places until I found where it was being deleted, and it still didn't make sense to me! After doing research, I learned about reference errors and how they take up the same memory, and that all that needs to be done is something like array.slice() to create a copy that doesn't interfere with the first. 

The tournament tree was probably the biggest challenge I faced in this project. Centering each round of the tree horizontally was particularly tough. After drawing two lines on a page representing the height of two round elements, and staring at it for a long time, I realised the difference in heights / 2 would give the second round's top value. When I'd completed most of the tree, I realised I was repeating a similar function over and over to create separate rounds. The differences between them were 3 things, and so I made those 3 things arguments passed in to one, recursive function, making my code drastically smaller, and in turn, able to handle any amount of players.

To be able to handle any amount of players, I had to decide what to do in the case of an odd amount of players in a round. I decided to give a random player a "buy-in" which means they're automatically into the next round. I represented these players with a consistent gold colour.s