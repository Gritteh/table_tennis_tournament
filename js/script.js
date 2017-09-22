$(document).ready(function() {
    let nameInput = $(".form__input");
    let playerForm = $(".players__form");

    let playersArray = [];
    let playersTable = $(".players__table");
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

    // Variables to store which round it is
    let firstRound = true;
    let secondRound = false;
    
    // Expanding players table to respond to height of objects inside 
    let playersMainContainer = $(".players");
    
    const givePlayersTableHeight = (screenWidth, playerNumber) => {
        if (firstRound) {
            let height = screenWidth > 626 ? Math.ceil(playerNumber/4) * 50 + 150 : Math.ceil(playerNumber/2) * 50 + 150;
            playersMainContainer.css("height", height + "px");
            playersTable.css("height", height + "px");
        }
    };

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
            name.text(newName);

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

            ///
            givePlayersTableHeight(screenWidth, playersArray.length);
        }

        // if there are 2+ players, activate the done button
        if (playersArray.length > 1) {
            doneButton.attr("disabled", false);
        }

    });

    // Re-render the grid, for after an element is deleted
    const renderGrid = () => {
        
        // Remove all HTML elements inside the container
        playersTable.children().remove();

        // Reset arrays to start fresh
        buttonArray = [];
        deleteSelectorArray = [];
        playersHtmlArray = [];

        // Map the players array into elements
        playersArray.map((player, i) => {

            // Array length acting as index
            let buttonArrayLength = buttonArray.length;

            let container = $("<div/>").addClass("new-player");
            let name = $("<p/>").addClass("new-player__name");
            let button = $("<button/>")
                .addClass("new-player__remove fa fa-times")
                .text("")
                .on("click", () => onClickFunction(buttonArrayLength));

            // Pushing button onto array
            buttonArray.push(button);

            // Setting name as element text
            name.text(playersArray[i]);

            // Giving buttons targetable class names
            let finalButtonArray = giveAllButtonsClass(buttonArray);

            let currentButton = finalButtonArray[buttonArrayLength];

            // creating array of jQuery delete selectors
            deleteSelectorArray.push(createDeleteSelector(currentButton.attr("class")));

            // Make HTML structure
            container.append(name).append(currentButton);

            // Push it onto an array
            playersHtmlArray.push(container);

            // Format the array
            formatAll(playersHtmlArray);

            // Find newest
            let newestName = playersHtmlArray[playersHtmlArray.length - 1];

            // Add it to the HTML
            playersTable.append(newestName);
        });

    };

    // When window resizes, update screenWidth value, and re-render player list
    wind.resize( () => {
        screenWidth = $(window).width();
        renderGrid();
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
    


    // When done button is clicked, animate container shrinking and hide elements
    doneButton.on("click", () => {
        playersContainer.animate({
            height: "0px",
            padding: "0px"
        }, 250);
        group.css("visibility", "hidden");
        playersTable.css("visibility", "hidden");
        titlePlayers.css("visibility", "hidden");

        // Expand Tournament section
        // tournamentContainer.animate({
        //     height: "140px",
        // }, 250);
        secondRound = true;
        giveTournamentHeight(playersArray.length);

        // Set delay for hiding of the top page divider, to make transition smoother
        setTimeout(function() {
            pageDividerOne.css("display", "none");
        }, 250);

        // Delay for animation
        setTimeout(function() {
            //// Set up for tournament display stage
            tournamentLayout.css("visibility", "visible");
            tournamentStart.css("visibility", "visible");
        
        }, 150);
        

        // Create Round 1
        createRoundOne();

        firstRound = false;
    });

    


    ////// TOURNAMENT section

    

    // Array to be used to give random name of players that haven't already been used in that round
    let playersLeftArray = playersArray.slice();
    
    let playersLeftLength = playersLeftArray.length;

    // Number of total players
    let numberOfPlayers = playersArray.length;

    // Give element a random name from array above and remove that name from array
    const giveMeRandomName = () => {
        let arrayLength = playersLeftArray.length;
        let indexOfName = Math.floor(Math.random() * arrayLength);
        let nameToGive = playersLeftArray[indexOfName];
        playersLeftArray.splice(indexOfName, 1);
        // update number of names left to use
        playersLeftLength = playersLeftArray.length;
        
        return nameToGive;
    };


    let matchUpArray = [];
    // Create HTML pair group, give true if pair, give false if buy-in, 
    // Second argument is if it should push names onto array, for final stage
    const createHTMLPair = (isPair, collectMatchUps) => {
        if (isPair) {
            // Create two names to assign
            let nameOne = giveMeRandomName();
            let nameTwo = giveMeRandomName();
            console.log(nameOne, nameTwo)
            
            
            // Create pair
            let groupContainer = $("<div/>")
                .addClass("pair-container");
            let playerOne = $("<p/>")
                .addClass("pair-p1")
                .text(nameOne);
            let playerTwo = $("<p/>")
                .addClass("pair-p2")
                .text(nameTwo);
            groupContainer.append(playerOne).append(playerTwo);
            
            
            // If this function is being used to create the first round display, collect the match ups to display in Winners section
            let playerOneText = playerOne.text();
            let playerTwoText = playerTwo.text();
            
            if (collectMatchUps) {
                // Push onto array for match ups
                matchUpArray.push(playerOneText);
                matchUpArray.push(playerTwoText);
            }

            return groupContainer;

        } else {
            let name = giveMeRandomName();

            if (collectMatchUps) {
                matchUpArray.push(name);
            }
            // Create single (buy-in)
            let container = $("<div/>")
                .addClass("buyin-container");
            let player = $("<p/>")
                .addClass("single-p")
                .text(name);
            container.append(player);
            return container;

        }
    };

    // Create Winner
    const createWinner = () => {
        let groupContainer = $("<div/>")
            .addClass("winner-container");
        let player = $("<p/>")
            .addClass("single-winner")
            .text(giveMeRandomName());
        return groupContainer.append(player);
    };

    // Create round one
    const createRoundOne = () => {
        // Give array the full finished array of players
        playersLeftArray = playersArray.slice();
        // Give variable the number of players
        numberOfPlayers = playersArray.length;
        // Give variable the number of players' names left to use
        playersLeftLength = playersLeftArray.length;
        let roundOneContainer = $("<div/>").addClass("round-one");
        while (playersLeftLength > 0) {
            // if true, make pair
            // if false, make buy in
            roundOneContainer.append(createHTMLPair(playersLeftLength >= 2, true))
        }
        innerLayout.append(roundOneContainer);
        console.log(roundOneContainer[0]);

        let numberOfPlayersRoundTwo = giveNextTotal(numberOfPlayers);
        createRoundTwoPlus(2, numberOfPlayersRoundTwo, 8);
    };
    

    // Give next round's number of names, using the previous round's number
    const giveNextTotal = lastTotalPlayers => {
        if (lastTotalPlayers > 1) {
            return lastTotalPlayers % 2 === 0 ?
                lastTotalPlayers / 2
            :
                ((lastTotalPlayers - 1) / 2) + 1;
        } else {
            return 0;
        }


    };
    
    // Set up variable to convert numbers into words for round class names
    let numberToWord = ["zero", "one", "two", "three", "four", "five", "six", "seven"];
    // Function to create round 2 onwards. takes round number, no. of players, and the last "top" CSS value as arguments
    const createRoundTwoPlus = (round, players, lastTopValue) => {
        // Find number of players in the round after this
        numberOfPlayersNextRound = giveNextTotal(players);

        // Container to append, with class name of respective round
        let roundContainer = $("<div/>").addClass("round-" + numberToWord[round]);
        numberOfElements = players;

        if (players > 1) {
            while (numberOfElements > 0) {
                // Create pair or buy-in of HTML
                roundContainer.append(createHTMLPair(numberOfElements >= 2, false));
                numberOfElements -= 2;
            }
        } else {
            // Create single winner if there is 1 players
            roundContainer.append(createWinner());
        }
        // Add to HTML
        innerLayout.prepend(roundContainer);

        // Working co-ordinates out
        let lastRoundHeight = $(".round-" + numberToWord[round - 1]).height();
        let currentRoundHeight = $(".round-" + numberToWord[round]).height();

        // Use last top value and round height values to find the "top" CSS value this round
        let topValue = lastTopValue + (+lastRoundHeight - +currentRoundHeight) / 2;
        roundContainer.css("top", topValue + "px");

        // If there are any players in the next round, call the function again
        if (numberOfPlayersNextRound > 0) {
            createRoundTwoPlus(round + 1, numberOfPlayersNextRound, topValue);
        }
    };


    ////// WINNERS SECTION //////


    let startButton = $(".tournament__start");

    let winnersSection = $(".winners");
    let newTournament = $(".winners__reset");
    
    let pvpBlock = $(".pvp__block");

    // Variables used just to hide 
    let tournamentTitle = $(".tournament__title");
    let secondPageDivider = $(".js_page-divider-2");


    startButton.on("click", () => {

        newTournament.css("visibility", "visible");

        tournamentTitle.css("display", "none");
        startButton.css("display", "none");
        tournamentLayout.css("display", "none");
        tournamentContainer.animate({
            height: "0px"
        }, 250);
        setTimeout(() => {
            secondPageDivider.css("display", "none");
        }, 250);

        pvpBlock.append(createRoundHtml(matchUpArray, 1));
     

    });

    // Array of single player elements
    let arrayOfPs = [];
    let numberOfCurrentPlayers = 0;
    let roundNumber = 1;
    // Create a group of HTML for a round 
    const createRoundHtml = (arrayOfPlayers, roundNumber) => {
        arrayOfPs = [];

        let tempArray = arrayOfPlayers.slice();

        let container = $("<div/>")
            .addClass("round-" + roundNumber);

        let roundTitle = $("<div/>")
            .addClass("round__title")
            .text("Round " + roundNumber);
        
        container.append(roundTitle);
        
        while (tempArray.length > 1) {
            // Keep pairings and get names
            let nameOne = tempArray[0];
            let nameTwo = tempArray[1];

            let playerOne = $("<p/>")
                .addClass("pair__name_1")
                .text(nameOne);
            let playerTwo = $("<p/>")
                .addClass("pair__name_2")
                .text(nameTwo);

            arrayOfPs.push(playerOne);
            arrayOfPs.push(playerTwo);
            
            container.append(playerOne).append(playerTwo);

            // Remove names used
            tempArray.splice(0, 2);
        }

        if (tempArray.length === 1) {

            let player = $("<p/>")
                .addClass("pair__single winner__gold")
                .text(tempArray[0]);

            arrayOfPs.push(player);

            container.append(player);

            tempArray.splice(0, 1);
        }

        let lastIndex = arrayOfPlayers.length - 1;
        let heightValue = Math.floor(lastIndex / 2) * 95 + 180 + "px";
        container.css("height", heightValue);

        formatAllPvP(arrayOfPs);
        givePlayersClick(arrayOfPs);
        
        numberOfCurrentPlayers = arrayOfPlayers.length;
        return container;
        
    };


    // Positioning PvP section 
    // Position players in 2x* grid
    const formatAllPvP = arrayOfElements => {
        let arrayLength = arrayOfElements.length;
        arrayOfElements.map((box, i) => {
            let topValue = Math.floor(i/2) * 25 + 30 + "px";
            // If it is a buyin
            if (i === arrayLength - 1 && arrayLength % 2 !== 0) {
                // giveBuyInFormat(box);
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

    // Give player elements click functions
    const givePlayersClick = arrayOfElements => {
        let arrayLength = arrayOfElements.length;
        arrayOfElements.map((box, i) => {
            let leftOrRight = i%2;
            box.data("player", i);
            if (i === arrayLength - 1 && arrayLength % 2 !== 0) {

            } else {
                if (leftOrRight === 0) {
                    box.on("click", () => {
                        if (!box.hasClass("winner__gold")) {
                            box.addClass("winner__gold")
                                .next().removeClass("winner__gold");
                            checkForRoundFinish(arrayOfElements);
                        }
                       
                    });
                } else {

                    box.on("click", () => {
                        if (!box.hasClass("winner__gold")) {
                            box.addClass("winner__gold")
                                .prev().removeClass("winner__gold");
                            checkForRoundFinish(arrayOfElements);
                        }
                            
                    });
                }
            }
                
            
            
        });
    };

    let arrayOfNamesNextRound = [];
    const checkForRoundFinish = arrayOfElements => {
        arrayOfNamesNextRound = [];
        // let currentRound = pvpBlock.children().last()[0];
        // console.log(currentRound.length);
        // for (let i = 0; i < numberOfCurrentPlayers; i++) {
        //     currentRound[i].hasClass("winner__gold") ? console.log("has class") : console.log("no class"); 
        // }
        let numberOfCurrent = arrayOfElements.length;
        let numberOfWinnersNeeded = numberOfCurrent % 2 === 0 ? numberOfCurrent / 2 : (numberOfCurrent - 1) / 2 + 1;
        for (let i = 0; i < numberOfCurrent; i++) {
            if (arrayOfElements[i].hasClass("winner__gold")) {
                arrayOfNamesNextRound.push(arrayOfElements[i].text());
            } 
        }
        if (arrayOfNamesNextRound.length === numberOfWinnersNeeded) {
            // NEXT ROUND 
            roundNumber++;
            pvpBlock.append(createRoundHtml(arrayOfNamesNextRound, roundNumber));
        }
    };
    

});
