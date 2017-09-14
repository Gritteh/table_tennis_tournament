$(document).ready(function() {
    let nameInput = $(".form__input");
    let playerForm = $(".players__form");

    let playersArray = [];
    let playersTable = $(".players__table");
    let playersHtmlArray = [];

    let buttonArray = [];
    let deleteSelectorArray = [];

    // Format all added players into 4 x * grid
    const formatAll = array => {
        return array.map((box, i) => {
            box.css({
                "left": (i % 4) * 25 + 4 + "%",
                "top": Math.floor(i/4) * 50 + "px"
            });
        })
    };

    // function to assign classes so I can remove
    const giveAllButtonsClass = buttonArray => buttonArray.map((button, i) => button.addClass("del_button_" + i));


    // function to create new jQuery objects of delete buttons
    const createDeleteSelector = className => $(className);
///


    // function for on button click
    let onClickFunction = (i) => {
        buttonArray.splice(i, 1);
        playersHtmlArray.splice(i, 1);
        playersArray.splice(i, 1);
        deleteSelectorArray.splice(i, 1);
        renderGrid();
        console.log('clicked');
    };
    // adding players
    playerForm.submit(function(e) {
        e.preventDefault();
        if (!nameInput.val() == "") {
            let newName = nameInput.val();
            playersArray.push(newName);
            nameInput.val("");
            // console.log(playersArray);
            // playersHtmlArray = mapArrayToGraph(playersArray);
            let buttonArrayLength = buttonArray.length;
            let container = $("<div/>").addClass("new-player");
            let name = $("<p/>").addClass("new-player__name");
            let button = $("<button/>").addClass("new-player__remove fa fa-times").text("").on("click", () => onClickFunction(buttonArrayLength));
            buttonArray.push(button);
            name.text(newName);
            let finalButtonArray = giveAllButtonsClass(buttonArray);
            //[button, button, button]
            let currentButton = finalButtonArray[buttonArrayLength];
            // creating array of jQuery delete selectors
            deleteSelectorArray.push(createDeleteSelector(currentButton.attr("class")));
///
            //
            container.append(name).append(currentButton);

            // let formattedContainer = formatNewBox(container);
            playersHtmlArray.push(container);
            formatAll(playersHtmlArray);
            let newestName = playersHtmlArray[playersHtmlArray.length - 1];
            playersTable.append(newestName);
            console.log(playersHtmlArray);

        }
    });


    // render grid function for after deleting
    const renderGrid = () => {
        playersTable.children().remove();
        buttonArray = [];
        deleteSelectorArray = [];
        playersHtmlArray = [];
        playersArray.map((player, i) => {
            let buttonArrayLength = buttonArray.length;
            let container = $("<div/>").addClass("new-player");
            let name = $("<p/>").addClass("new-player__name");
            let button = $("<button/>").addClass("new-player__remove fa fa-times").text("").on("click", () => onClickFunction(buttonArrayLength));
            buttonArray.push(button);
            name.text(playersArray[i]);
            let finalButtonArray = giveAllButtonsClass(buttonArray);
            //[button, button, button]
            let currentButton = finalButtonArray[buttonArrayLength];
            // creating array of jQuery delete selectors
            deleteSelectorArray.push(createDeleteSelector(currentButton.attr("class")));
            //
            container.append(name).append(currentButton);
            playersHtmlArray.push(container);
            formatAll(playersHtmlArray);
            let newestName = playersHtmlArray[playersHtmlArray.length - 1];
            playersTable.append(newestName);
        });
    }






});
