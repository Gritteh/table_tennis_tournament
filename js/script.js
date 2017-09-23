$(document).ready(function() {

    // Targetting elements needed 
    let nameInput = $(".form__input");
    let playerForm = $(".players__form");
    let playersTable = $(".players__table");
    
    // Declaring arrays used to hold/ manipulate names and elements
    let playersArray = [];
    let playersHtmlArray = [];
    let buttonArray = [];
    let deleteSelectorArray = [];


    // Find width of screen for formatting players
    let wind = $(window);
    let screenWidth = wind.width();

    // Format an array of elements into a formatted array of elements
    const formatAll = array => array.map((box, i) => {
        if (screenWidth > 626) {
            box.css({
                "left": (i % 4) * 25 + 2.5 + "%",
                "top": Math.floor(i/4) * 50 + "px"
            });
        } else {
            box.css({
                "left": (i % 2) * 50 + 2.5 + "%",
                "top": Math.floor(i/2) * 50 + "px"
            });
        }
    });

    // Give each button element in an array good class names for targetting
    const giveAllButtonsClass = buttonArray => buttonArray.map((button, i) => button.addClass("del_button_" + i));

    // Create jQuery selectors for use with buttons
    const createDeleteSelector = className => $(className);

    // When delete button clicked, delete the relevant button in all arrays
    let onClickFunction = (index) => {
        buttonArray.splice(index, 1);
        playersHtmlArray.splice(index, 1);
        playersArray.splice(index, 1);
        deleteSelectorArray.splice(index, 1);

        // Re-render grid function
        renderGrid();
    };

    // Variables to store which section of the web page it is
    let firstRound = true;
    let secondRound = false;
    
    // Expanding players container to respond to height of objects inside 
    let playersMainContainer = $(".players");
    // Takes user's screen width and the number of players currently added
    const givePlayersTableHeight = (screenWidth, playerNumber) => {
        // Only if we are in the first (enter Players) section
        if (firstRound) {
            // Calculating height of container - two different values for if it's displaying 4x* grid / 2x* grid
            let height = screenWidth > 626 ? Math.ceil(playerNumber/4) * 50 + 150 : Math.ceil(playerNumber/2) * 50 + 150;
            // Change CSS height to this height
            playersMainContainer.css("height", height + "px");
            playersTable.css("height", height + "px");
        }
    };

    // Elipsis on end of name if too long 
    const elipsisPlayers = name => name.length > 14 ? name.substr(0, 14) + "..." : name;

    // Adding players
    playerForm.submit(function(e) {
        // Prevent page from refreshing
        e.preventDefault();

        if (!nameInput.val() == "") {
            // Get the name
            let newName = nameInput.val();

            // Add name to an array
            playersArray.push(newName);
            // Reset the Input text
            nameInput.val("");

            // buttonArray's length acting as index of new player
            let buttonArrayLength = buttonArray.length;

            // HTML elements for player
            let container = $("<div/>").addClass("new-player");
            let name = $("<p/>").addClass("new-player__name");

            // Creates delete button, and adds on click event
            let button = $("<button/>")
                .addClass("new-player__remove fa fa-times")
                .text("")
                .on("click", () => onClickFunction(buttonArrayLength));

            // Adds button to an array
            buttonArray.push(button);

            // Make the <p> element's text the new player's name
            name.text(elipsisPlayers(newName));

            // A new array of buttons but with sequential class names
            let finalButtonArray = giveAllButtonsClass(buttonArray);

            // Find the current button in that array
            let currentButton = finalButtonArray[buttonArrayLength];

            // Creating array of jQuery delete button selectors using their class names
            deleteSelectorArray.push(createDeleteSelector(currentButton.attr("class")));

            // Append the elements in the right structure
            container.append(name).append(currentButton);

            // Push the full HTML into an array
            playersHtmlArray.push(container);

            // Format all elements into a grid
            formatAll(playersHtmlArray);

            // Find the newest element to add
            let newestName = playersHtmlArray[playersHtmlArray.length - 1];

            // Append onto players table
            playersTable.append(newestName);

            // Format the container to adapt to content
            givePlayersTableHeight(screenWidth, playersArray.length);
        }

        // If there are 2+ players, activate the done button, otherwise, disable it
        playersArray.length > 1 ? doneButton.attr("disabled", false) : doneButton.attr("disabled", true);

    });

    // Re-render the grid of players, for after an element is deleted
    const renderGrid = () => {
        
        // Remove all HTML elements inside the container
        playersTable.children().remove();

        // Reset arrays to start fresh
        buttonArray = [];
        deleteSelectorArray = [];
        playersHtmlArray = [];

        // Map the players array into elements
        playersArray.map((player, i) => {

            // Array length acting as index for button
            let buttonArrayLength = buttonArray.length;
            // Creating the HTML elements
            let container = $("<div/>").addClass("new-player");
            let name = $("<p/>").addClass("new-player__name");
            let button = $("<button/>")
                .addClass("new-player__remove fa fa-times")
                .text("")
                .on("click", () => onClickFunction(buttonArrayLength));

            // Pushing button onto array
            buttonArray.push(button);

            // Setting name as element text
            name.text(elipsisPlayers(playersArray[i]));

            // Giving buttons targetable class names
            let finalButtonArray = giveAllButtonsClass(buttonArray);

            let currentButton = finalButtonArray[buttonArrayLength];

            // Creating array of jQuery delete selectors
            deleteSelectorArray.push(createDeleteSelector(currentButton.attr("class")));

            // Make HTML structure
            container.append(name).append(currentButton);

            // Push it onto an array
            playersHtmlArray.push(container);

            // Format the array
            formatAll(playersHtmlArray);

            // Find newest element
            let newestName = playersHtmlArray[playersHtmlArray.length - 1];

            // Add it to the HTML
            playersTable.append(newestName);

            // If there are 2+ players, activate the done button
            playersArray.length > 1 ? doneButton.attr("disabled", false) : doneButton.attr("disabled", true);
        });

    };

    // When the window resizes, update screenWidth value, and re-render player list
    wind.resize( () => {
        // Update stored value of screen width for use elsewhere
        screenWidth = $(window).width();
        // Re-render player list
        renderGrid();
        // Update height of container
        givePlayersTableHeight(screenWidth, playersArray.length + 1);
    });



    // Done Button to make first section minimise
    let doneButton = $(".players__done");

    // Targetting elements I need to hide
    let group = $(".js_players__group");
    let playersContainer = $(".players");
    let titlePlayers = $(".players__title");
    let pageDividerOne = $(".js_page-divider-1");

    // Targetting tournament sections
    let tournamentContainer = $(".tournament");
    let tournamentLayout = $(".layout");
    let innerLayout = $(".layout__inner");

    // Targetting elements to show 
    let tournamentStart = $(".tournament__start");

    // Format Tournament section to respond to tournament tree height 
    const giveTournamentHeight = playerNumber => {
        if (secondRound) {
            let height = Math.ceil(playerNumber/2) * 80 + 160;
            tournamentContainer.css("height", height + "px");
            tournamentLayout.css("height", height - 140 + "px");
        }
    };
    

////// TOURNAMENT section //////


    // When done button is clicked, animate container shrinking, and hide elements
    doneButton.on("click", () => {
        // Hide player container
        playersContainer.animate({
            height: "0px",
            padding: "0px"
        }, 250);
        // Hide elements in this section
        group.css("display", "none");
        playersTable.css("display", "none");
        titlePlayers.css("display", "none");

        // Declare that we're now in the second section of the web page
        secondRound = true;
        // Give Tournament section a height
        giveTournamentHeight(playersArray.length);

        // Set delay for hiding of the top page divider, to make transition smoother
        setTimeout(function() {
            pageDividerOne.css("display", "none");
        }, 250);

        // Delay to allow animation to run before displaying elements
        setTimeout(function() {
            // Display elements in Tournament section
            tournamentLayout.css("visibility", "visible");
            tournamentStart.css("visibility", "visible");
        
        }, 150);
        

        // Create Round 1 (function that relies on multiple other functions below)
        createRoundOne();
        
        // Declare that we are no longer in first section
        firstRound = false;
    });

    // Array of players to be altered, so creating a copy to prevent reference error
    let playersLeftArray = playersArray.slice();
    
    // Length of the previous array. This will get updated and number put to use
    let playersLeftLength = playersLeftArray.length;

    // Number of total players
    let numberOfPlayers = playersArray.length;

    // Give a random name from array above and remove that name from array
    const giveMeRandomName = () => {
        // Find array length
        let arrayLength = playersLeftArray.length;
        // Use length to create random index
        let indexOfName = Math.floor(Math.random() * arrayLength);
        // Find random name from array
        let nameToGive = playersLeftArray[indexOfName];
        // Remove name used
        playersLeftArray.splice(indexOfName, 1);
        // Update number of names left to use
        playersLeftLength = playersLeftArray.length;
        // Return the name
        return nameToGive;
    };

    // Declare array to collect match-ups 
    let matchUpArray = [];

    // Create HTML pair group, give true if pair, give false if buy-in, 
    // Second argument is if it should collect match ups for final stage
    const createHTMLPair = (isPair, collectMatchUps) => {
        // If we want to create a pair
        if (isPair) {
            // Create two names to assign
            let nameOne = giveMeRandomName();
            let nameTwo = giveMeRandomName();
            
            // Create HTML pairs and give player elements the names
            let groupContainer = $("<div/>")
                .addClass("pair-container");
            let playerOne = $("<p/>")
                .addClass("pair-p1")
                .text(nameOne);
            let playerTwo = $("<p/>")
                .addClass("pair-p2")
                .text(nameTwo);
            // Group elements together ready to add to HTML
            groupContainer.append(playerOne).append(playerTwo);
            
            // If this function is being used to create the first round display, collect the match ups to display in Winners section
            let playerOneText = playerOne.text();
            let playerTwoText = playerTwo.text();
            if (collectMatchUps) {
                // Push onto array for match ups
                matchUpArray.push(playerOneText);
                matchUpArray.push(playerTwoText);
            }
            // Return the group of HTML elements
            return groupContainer;

        } else {
            // Otherwise, create a single (buy-in) element
            let name = giveMeRandomName();

            // Collect match ups if true
            if (collectMatchUps) {
                matchUpArray.push(name);
            }

            // Create buy-in elements
            let container = $("<div/>")
                .addClass("buyin-container");
            let player = $("<p/>")
                .addClass("single-p")
                .text(name);
            container.append(player);

            // Return HTML element
            return container;
        }
    };


    // Create round one for tournament tree 
    const createRoundOne = () => {
        // Give array the full finished array of players
        playersLeftArray = playersArray.slice();
        // Give variable the number of total players
        numberOfPlayers = playersArray.length;
        // Give variable the number of players' names left to use
        playersLeftLength = playersLeftArray.length;

        // Create container for round one
        let roundOneContainer = $("<div/>").addClass("round-one");
        // While there are still players left to add
        while (playersLeftLength > 0) {
            // Append HTML pair to R1 container and collect match-up names
            roundOneContainer.append(createHTMLPair(playersLeftLength >= 2, true))
        }
        // Append round one onto HTML
        innerLayout.append(roundOneContainer);

        // Find number of players in next round using function below
        let numberOfPlayersRoundTwo = giveNextTotal(numberOfPlayers);

        // Create round two onwards (no names needed)
        createRoundTwoPlus(2, numberOfPlayersRoundTwo, 8);
    };

    // Give next round's number of names, using the previous round's number
    const giveNextTotal = lastTotalPlayers => {
        // If more than one player...
        if (lastTotalPlayers > 1) {
            // Calculate next round's number
            return lastTotalPlayers % 2 === 0 ? lastTotalPlayers / 2 : ((lastTotalPlayers - 1) / 2) + 1;
        } else {
            return 0;
        }
    };

    // Function to create winner (last part of tournament tree)
    const createWinner = () => {
        let groupContainer = $("<div/>")
            .addClass("winner-container");
        let player = $("<p/>")
            .addClass("single-winner")
            .text(giveMeRandomName());
        // Return HTML elements
        return groupContainer.append(player);
    };
    
    // Set up variable to convert numbers into words for round class names
    let numberToWord = ["zero", "one", "two", "three", "four", "five", "six", "seven"];
    // Function to create round 2 onwards. takes round number, no. of players, and the last round's "top" CSS value as arguments
    const createRoundTwoPlus = (round, players, lastTopValue) => {
        // Find number of players in the round after this
        numberOfPlayersNextRound = giveNextTotal(players);

        // Container to append, with class name of respective round
        let roundContainer = $("<div/>").addClass("round-" + numberToWord[round]);
        // Number of elements to make
        numberOfElements = players;

        // If there is more than one 
        if (players > 1) {
            // Do this loop while there are still elements to add
            while (numberOfElements > 0) {
                // Create pair elements and/or buy-in element
                roundContainer.append(createHTMLPair(numberOfElements >= 2, false));
                // Reduce number by number of elements made
                numberOfElements -= 2;
            }
        } else {
            // Create single winner if there is 1 player
            roundContainer.append(createWinner());
        }
        // Add to HTML
        innerLayout.prepend(roundContainer);

        /// Working co-ordinates out
        // Find height of current and last round
        let lastRoundHeight = $(".round-" + numberToWord[round - 1]).height();
        let currentRoundHeight = $(".round-" + numberToWord[round]).height();

        // Use last top value and round height values to find the "top" CSS value for this round
        let topValue = lastTopValue + (+lastRoundHeight - +currentRoundHeight) / 2;

        roundContainer.css("top", topValue + "px");

        // If there are any players in the next round, call the function again
        if (numberOfPlayersNextRound > 0) {
            createRoundTwoPlus(round + 1, numberOfPlayersNextRound, topValue);
        }
    };


////// WINNERS SECTION //////

    // Target elements
    let startButton = $(".tournament__start");

    let winnersSection = $(".winners");

    // Full reset button
    let newTournament = $(".winners__reset");
    
    // Block to contain the last section's generated elements
    let pvpBlock = $(".pvp__block");

    // Variables used just to hide 
    let tournamentTitle = $(".tournament__title");
    let secondPageDivider = $(".js_page-divider-2");

    // When start button is clicked
    startButton.on("click", () => {

        // Make button visible
        newTournament.css("visibility", "visible");

        // Hide elements in tournament section
        tournamentTitle.css("display", "none");
        startButton.css("display", "none");
        tournamentLayout.css("display", "none");
        // Hide tournament section with animation
        tournamentContainer.animate({
            height: "0px"
        }, 250);

        // Set delay before displaying the Player V Player block, and hiding the second page divider
        setTimeout(() => {
            secondPageDivider.css("display", "none");
            // Append HTML for round
            pvpBlock.append(createRoundHtml(matchUpArray, 1));
            // Add bat image to current round
            addBat();
        }, 250);
    });

    // Array of single player elements
    let arrayOfPs = [];
    // Array of "VS" elements
    let arrayOfVersus = [];

    // Number for which round we're on
    let roundNumber = 1;

    // Create a group of HTML for any round 
    const createRoundHtml = (arrayOfPlayers, roundNumber) => {
        // Reset arrays to start new
        arrayOfPs = [];
        arrayOfVersus = [];

        // Copy of array of players that we can alter
        let tempArray = arrayOfPlayers.slice();

        // Creating HTML elements
        // Container with relevant class
        let container = $("<div/>")
            .addClass("round-" + roundNumber);
        // Round Title element
        let roundTitle = $("<div/>")
            .addClass("round__title")
            .text("Round " + roundNumber);
        
        // Add title to container
        container.append(roundTitle);
        
        // While there are more than 1 players to add
        while (tempArray.length > 1) {
            // Keep pairings and get names
            let nameOne = tempArray[0];
            let nameTwo = tempArray[1];

            // Create "VS" text element and player elements
            let versus = $("<div/>")
                .addClass("round__vs")
                .text("VS");
            let playerOne = $("<p/>")
                .addClass("pair__name_1")
                .text(nameOne);
            let playerTwo = $("<p/>")
                .addClass("pair__name_2")
                .text(nameTwo);

            // Push player elements onto array for formatting
            arrayOfPs.push(playerOne);
            arrayOfPs.push(playerTwo);
            // Push "VS" elements onto array for formatting
            arrayOfVersus.push(versus);

            // Join HTML together ready to add
            container.append(playerOne).append(playerTwo).append(versus);

            // Remove names used from array
            tempArray.splice(0, 2);
        }

        // If there is 1 player left
        if (tempArray.length === 1) {
            // Create single buy-in element (with gold, "winner", styling)
            let player = $("<p/>")
                .addClass("pair__single winner__gold")
                .text(tempArray[0]);

            // Push player element onto array
            arrayOfPs.push(player);
            // Join HTML together
            container.append(player);
            // Remove name used
            tempArray.splice(0, 1);
        }

        // Index of last element in array
        let lastIndex = arrayOfPlayers.length - 1;
        // Use this index to find height value to give to container
        let heightValue = Math.floor(lastIndex / 2) * 95 + 180 + "px";

        container.css("height", heightValue);

        // Format "VS" elements
        formatAllVersus(arrayOfVersus);
        // Format player elements
        formatAllPvP(arrayOfPs);
        // Give player elements click function
        givePlayersClick(arrayOfPs);

        // Return container group to append to HTML
        return container;
    };

    // Positioning PvP section 
    // Position players in 2x* grid
    const formatAllPvP = arrayOfElements => {
        // Find number of elements
        let arrayLength = arrayOfElements.length;

        // Map elements to format each using index
        arrayOfElements.map((box, i) => {
            // Find top value
            let topValue = Math.floor(i/2) * 25 + 30 + "px";
            // If it is a buyin
            if (i === arrayLength - 1 && arrayLength % 2 !== 0) {
                // Give different left value to center
                box.css({
                    left: (100 - 35) / 2 + "%",
                    top: topValue
                });
            } else {
                // Otherwise, give normal formatting
                box.css({
                    top: topValue,
                    left: Math.ceil(i%2) * 15 + 8 + "%"
                });
            }
        });
    };

    // Format array of "VS" elements
    const formatAllVersus = arrayOfElements => {
        // Map array of elements to format each one using index
        arrayOfElements.map((box, i) => {
            let topValue = i * 25 + 30 + "px";
            box.css({
                top: topValue,
                left: -21 + "%"
            });
        });
    };

    // Give player elements click functions
    const givePlayersClick = arrayOfElements => {

        let arrayLength = arrayOfElements.length;
        // Map player elements to give them click functions
        arrayOfElements.map((box, i) => {
            // Value storing whether element should be on the left or right
            let leftOrRight = i%2;

            // If element ISN'T a buy-in, give it a click function
            if (!(i === arrayLength - 1 && arrayLength % 2 !== 0)) {
                // If element should be on the left
                if (leftOrRight === 0) {
                    // Give click function
                    box.on("click", () => {
                        // If element's parent has the class for the CURRENT round
                        if (box.parent().hasClass("round-" + roundNumber)) {
                            // Then it should be able to add gold colour class, and remove that class from the right element
                            if (!box.hasClass("winner__gold")) {
                                box.addClass("winner__gold")
                                    .next().removeClass("winner__gold");
                                // Check if next round should be generated
                                checkForRoundFinish(arrayOfElements, box);
                            }
                        }
                       
                    });

                } else {
                    box.on("click", () => {
                        // If element's parent has class for CURRENT round
                        if (box.parent().hasClass("round-" + roundNumber)) {
                            // Then it can add gold class, and remove left player's gold class
                            if (!box.hasClass("winner__gold")) {
                                box.addClass("winner__gold")
                                    .prev().removeClass("winner__gold");
                                // Check if round finished
                                checkForRoundFinish(arrayOfElements, box);
                            }
                        }
                    });
                }
            }
        });
    };

    // Takes array and gives array back, in a random order
    const randomiseMatchUps = (arrayOfNames) => {
        // Copy of array of names so we can edit safely
        let tempArray = arrayOfNames.slice();
        // New array to be given
        let newArray = [];
        // While there are names to be used
        while (tempArray.length > 0) {
            // Find random index
            let randomNumber = Math.floor(Math.random() * tempArray.length);
            // Push random name onto new array
            newArray.push(tempArray[randomNumber]);
            // Remove that name from old array
            tempArray.splice(randomNumber, 1);
        }
        // Return the new, randomised array
        return newArray;
    };

    // Array to carry the names for next round
    let arrayOfNamesNextRound = [];
    // Function that is called on click of "element", it checks if the next round should be generated
    const checkForRoundFinish = (arrayOfElements, element) => {
        // Reset array to start new
        arrayOfNamesNextRound = [];
        // Number of players this round
        let numberOfCurrent = arrayOfElements.length;
        // Calculate number of winners needed for round to be finished
        let numberOfWinnersNeeded = numberOfCurrent % 2 === 0 ? numberOfCurrent / 2 : (numberOfCurrent - 1) / 2 + 1;
        // Loop through array of elements
        for (let i = 0; i < numberOfCurrent; i++) {
            // If element has the winner class
            if (arrayOfElements[i].hasClass("winner__gold")) {
                // Push that element's text onto array
                arrayOfNamesNextRound.push(arrayOfElements[i].text());
            } 
        }
        // If n number of winners are needed, and n names are added to the array, then round is finished
        if (arrayOfNamesNextRound.length === numberOfWinnersNeeded) {
            // Next round
            // Increase round number by 1
            roundNumber++;
            // Generate and append the new round
            pvpBlock.append(createRoundHtml(randomiseMatchUps(arrayOfNamesNextRound), roundNumber));
            // Add the Table tennis bat to the current round
            addBat();
        }
    };
    
    // Function to add/ remove bat image for labelling current round
    const addBat = () => {
        // Target current and last round element
        let currentRound = $(".round-" + roundNumber);
        let lastRound = $(".round-" + (roundNumber - 1));
        // Create bat element
        let batElement = $("<img/>")
            .attr("src", "./images/tt-bat.png")
            .addClass("round__bat");
        // Add the bat element to the current round
        currentRound.prepend(batElement);
        // Add the active class to the current round's title to prevent styling error
        currentRound.find(".round__title").addClass("title__active");
        // If it is the 2nd round onwards
        if (roundNumber > 1) {
            // Remove bat from last round
            lastRound.find("img").remove();
            // Remove active class from last round title
            lastRound.find(".round__title").removeClass("title__active");
        }
    };

    // Refresh page on click
    newTournament.on("click", () => {
        window.location.reload();
    });

});
