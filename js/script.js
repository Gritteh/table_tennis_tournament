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

    // Targetting tournament section for expanding
    let tournamentContainer = $(".tournament");

    // Variable to store if it is first round or not
    let notFirstRound = false;
    
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
        tournamentContainer.animate({
            height: "800px",
        }, 250);

        // Set delay for hiding of the top page divider, to make transition smoother
        setTimeout(function() {
            pageDividerOne.css("display", "none");
        }, 250);

        // Delay for animation
        setTimeout(function() {
            //// Set up for tournament display stage
            tournamentLayout.css("visibility", "visible");
        }, 150);

        
        // Create Round 1
        createRoundOne();
        
        notFirstRound = true;
    });

    // Expanding players table to respond to height of objects inside 
    let playersMainContainer = $(".players");

    const givePlayersTableHeight = (screenWidth, playerNumber) => {
        if (!notFirstRound) {
            let height = screenWidth > 626 ? Math.ceil(playerNumber/4) * 50 + 150 : Math.ceil(playerNumber/2) * 50 + 150;
            playersMainContainer.css("height", height + "px");
            playersTable.css("height", height + "px");
        }
    };


    ////// TOURNAMENT section

    let tournamentLayout = $(".layout");
    let innerLayout = $(".layout__inner");

    // Array to be used to give random name of players that haven't already been used in that round
    let playersLeftArray = playersArray;
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

    // Create HTML pair group, give true if pair, give false if buy-in
    const createHTMLPair = isPair => {
        if (isPair) {
            // Create pair
            let groupContainer = $("<div/>")
                .addClass("pair-container");
            let playerOne = $("<p/>")
                .addClass("pair-p1")
                .text(giveMeRandomName());
            let playerTwo = $("<p/>")
                .addClass("pair-p2")
                .text(giveMeRandomName());
            groupContainer.append(playerOne).append(playerTwo);
            return groupContainer;

        } else {
            // Create single (buy-in)
            let container = $("<div/>")
                .addClass("buyin-container");
            let player = $("<p/>")
                .addClass("single-p")
                .text(giveMeRandomName());
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
        playersLeftArray = playersArray;
        // Give variable the number of players
        numberOfPlayers = playersArray.length;
        // Give variable the number of players' names left to use
        playersLeftLength = playersLeftArray.length;
        let roundOneContainer = $("<div/>").addClass("round-one");
        while (playersLeftLength > 0) {
            // if true, make pair
            // if false, make buy in
            roundOneContainer.append(createHTMLPair(playersLeftLength >= 2))
        }
        innerLayout.append(roundOneContainer);

        let numberOfPlayersRoundTwo = giveNextTotal(numberOfPlayers);
        createRoundTwoPlus(2, numberOfPlayersRoundTwo, -10);
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
                roundContainer.append(createHTMLPair(numberOfElements >= 2));
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




});
