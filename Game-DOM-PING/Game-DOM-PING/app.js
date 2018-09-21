/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

/*
3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good opportunity to use google to figure this out : )
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

//Declare variables...
var scores, roundScore, activePlayer, isGameInProgress;
init();

function init()
{
    //Initialize variables
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    isGameInProgress = true;
    
    //When game starts, dice should be set to none.
    /*
    The getElementById() method returns the element that has the ID attribute with the specified value.
    This method is one of the most common methods in the HTML DOM, and is used almost every time we want to manipulate, or get information from an element on the document.
    Returns - null, if no elements with the specified ID exists.
    An ID should be unique within a page. However, if more than one element with the specified ID exists, the getElementById method returns the 1st element.
    */

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    
    document.getElementById('score-0').textContent = '0'; //Initializing Player 1 score by Zero.
    document.getElementById('score-1').textContent = '0'; //Initializing Player 2 score by Zero.
    document.getElementById('current-0').textContent = '0'; //Initializing Player 1 - current score by Zero.
    document.getElementById('current-1').textContent = '0'; //Initializing Player 2 - current score by Zero.
    document.getElementById('name-0').textContent = 'Player 1'; //Setting 1st Player name
    document.getElementById('name-1').textContent = 'Player 2'; //Setting 2nd Player name

    /*
    The querySelector() method returns the first element that matches a specified CSS selector(s) in the document.
    Note: The querySelector() method only returns the first element that matches the specified selectors. To return all the matches, use the querySelectorAll() method instead.
    If the selector matches an ID in document that is used several times (Note that an "id" should be unique within a page and should not be used more than once), it returns the first matching element.
    */

    /*
    The classList property returns the class name(s) of an element, as a DOMTokenList object.
    This property is useful to add, remove and toggle CSS classes on an element.
    The classList property is read-only, however, we can modify it by using the add() and remove() methods.

    Method: add(class1, class2, ...) - Adds one or more class names to an element. If the specified class already exists, the class will not be added.
    Method: remove(class1, class2, ...) - Removes one or more class names from an element. Note: Removing a class that does not exist, does NOT throw an error.
    Method: toggle(class, true|false) - Toggles between a class name for an element. 
        -The first parameter removes the specified class from an element, and returns false.
        -If the class does not exist, it is added to the element, and the return value is true.
        -The optional second parameter is a Boolean value that forces the class to be added or removed, regardless of whether or not it already existed. For example:
        -Remove a class: element.classList.toggle("classToRemove", false);
        -Add a class: element.classList.toggle("classToAdd", true);
    */
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}

document.querySelector('.btn-roll').addEventListener('click', function ()
{
    if (isGameInProgress)
    {
        //Generating random numbers for two dices.
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //Displaying the result
        /*
        The display property sets or returns the element's display type.
        Elements in HTML are mostly "inline" or "block" elements: An inline element has floating content on its left and right side. A block element fills the entire line, and nothing can be displayed on its left or right side.
        The display property also allows the author to show or hide an element. It is similar to the visibility property. However, if you set display:none, it hides the entire element, while visibility:hidden means that the contents of the element will be invisible, but the element stays in its original position and size.
        Tip: If an element is a block element, its display type can also be changed with the float property.
        */
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';

        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        //Updating round score, if the rolled number is not 1
        if (dice1 !== 1 && dice2 !== 1) {
            //Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else
        {
            //Next Player
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function ()
{
    if (isGameInProgress)
    {
        //Add CURRENT score to GLOBAL score
        scores[activePlayer] += roundScore;

        //Updating UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        var input = document.querySelector('.final-score').nodeValue;
        var winningScore;

        //Undefined, 0, null or "" are COERCED to false. Anything else is COERCED to true.
        if (input)
            winningScore = input;
        else
            winningScore = 100; //Default value

        //Checking if a player has won the game.
        if (scores[activePlayer] >= winningScore)
        {
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');

            isGameInProgress = false;
        }
        else
            nextPlayer();
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer()
{
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById("current-0").textContent = '0';
    document.getElementById("current-1").textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}