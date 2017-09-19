$(document).ready(function() {
    let nameInput = $(".form__input");
    let playerForm = $(".players__form");

    let playersArray = [];
    let playersTable = $(".players__table");
    let playersHtmlArray = [];

    let buttonArray = [];
    let deleteSelectorArray = [];

    // Format an array of elements into a formatted array of elements
    const formatAll = array => array.map((box, i) => {
            box.css({
                "left": (i % 4) * 25 + 2.5 + "%",
                "top": Math.floor(i/4) * 50 + "px"
            });
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


    // Done Button to make first section minimise
    let doneButton = $(".players__done");

    // Targetting elements I need to hide
    let group = $(".js_players__group");
    let playersContainer = $(".players");
    let titlePlayers = $(".players__title");
    let pageDividerOne = $(".js_page-divider-1");

    // Targetting tournament section for expanding
    let tournamentContainer = $(".tournament");

    // When done button is clicked, animate container shrinking and hide elements
    doneButton.on("click", () => {
        playersContainer.animate({
            height: "0px",
            padding: "0px"
        }, 250);
        group.css("display", "none");
        playersTable.css("display", "none");
        titlePlayers.css("display", "none");

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
        // createRoundTwo();
        // createRoundThree();
        // createRoundFour();
    });


    // "Go back" button
    let goBackTournament = $(".tournament__back");

    // When the "Go back" button is clicked, expand the "Enter Players" section and display child elements
    goBackTournament.on("click", () => {
        pageDividerOne.css("display", "");
        // Expand players container
        playersContainer.animate({
            height: "500px",
            padding: "20px 20px"
        }, 250);

        // Minimise tournament section
        tournamentContainer.animate({
            height: "80px",
            paadding: ""
        }, 250);

        // Delay the display of elements till after the animation is done
        setTimeout(function() {
            titlePlayers.css("display", "");
            group.css("display", "");
            playersTable.css("display", "");
        }, 250);

        // tournament Layout hide
        tournamentLayout.css("visibility", "hidden");



    });

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
        numberOfPlayersNextRound = giveNextTotal(players);
        let roundContainer = $("<div/>").addClass("round-" + numberToWord[round]);
        numberOfElements = players;
        if (players > 1) {
            while (numberOfElements > 0) {
                roundContainer.append(createHTMLPair(numberOfElements >= 2));
                numberOfElements -= 2;
            }
        } else {
            // create single winner
            roundContainer.append(createWinner());
        }
        innerLayout.prepend(roundContainer);

        // Working co-ordinates out
        let lastRoundHeight = $(".round-" + numberToWord[round - 1]).height();
        let currentRoundHeight = $(".round-" + numberToWord[round]).height();

        // use last top value, add to calculation
        let topValue = lastTopValue + (+lastRoundHeight - +currentRoundHeight) / 2;
        roundContainer.css("top", topValue + "px");

        if (numberOfPlayersNextRound > 0) {
            createRoundTwoPlus(round + 1, numberOfPlayersNextRound, topValue);
        }
    };




});
