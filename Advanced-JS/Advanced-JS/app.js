/*
///////////////////////////////////////////////////////////////
//Function constructor
///////////////////////////////////////////////////////////////
*/
var Person = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
}

//Inheritence
Person.prototype.calculateAge = function () {
    console.log(2018 - this.yearOfBirth);
}

var vishal = new Person('Vishal', 1982, 'IT Professional');
var abc = new Person('ABC', 1992, 'Athelete');
var xyz = new Person('XYZ', 2002, 'Student');
vishal.calculateAge();
abc.calculateAge();
xyz.calculateAge();

Person.prototype.lastName = "Kumar";
console.log(vishal.lastName);
console.log(abc.lastName);
console.log(xyz.lastName);


/*
///////////////////////////////////////////////////////////////
//Object.create
///////////////////////////////////////////////////////////////
*/
var personProto = {
    calculateAge: function () {
        console.log(2018 - this.yearOfBirth);
    }
};

var person = Object.create(personProto);
person.name = 'John';
person.yearOfBirth = 1990;
person.job = 'teacher';

var newPerson = Object.create(personProto,
    {
        name: { value: 'Jane' },
        yearOfBirth: { value: 1989 },
        job: { value: 'designer' }
    });


/*
///////////////////////////////////////////////////////////////
//Primitives vs Objects
///////////////////////////////////////////////////////////////
*/
//Primitives
var a = 23;
var b = a;
a = 46;
console.log(a); //output: 46
console.log(b); //output: 23

//Objects
var obj1 = {
    name: 'John',
    age: 26
};

var obj2 = obj1;
obj1.age = 30;
console.log(obj1.age); //output: 30
console.log(obj2.age); //output: 46

//Functions
var age = 27;
var obj = {
    name: 'Jonas',
    city: 'Lisbon'
};

function change(a, b) {
    a = 30;
    b.city = 'San Francisco';
}

change(age, obj);

console.log(age); //output: 27
console.log(obj.city); //output: 'San Francisco'

/*
///////////////////////////////////////////////////////////////
//Passing functions as arguments
///////////////////////////////////////////////////////////////
*/
var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }

    return arrRes;
}

function calculateAge(el) {
    return 2018 - el;
}

function isFullAge(el) {
    return el >= 18;
}

function maxHeartRate(el) {
    if (el >= 18 && el <= 81) {
        return Math.round(206.9 - (0.67 * el));
    }
    else {
        return -1;
    }
}

var ages = arrayCalc(years, calculateAge);
var fullAges = arrayCalc(ages, isFullAge);
var rates = arrayCalc(ages, maxHeartRate);
console.log(ages);
console.log(fullAges);
console.log(rates);

/*
///////////////////////////////////////////////////////////////
//Functions returning functions
///////////////////////////////////////////////////////////////
*/
function interviewQuestion(job) {
    if (job === 'designer') {
        return function (name) {
            console.log(name + ', can you please explain what UX design is?');
        }
    }
    else if (job === 'teacher') {
        return function (name) {
            console.log('what subject do you teach, ' + name+'?');
        }
    }
    else {
        return function (name) {
            console.log('Hello, '+name + ', what do you do?');
        }
    }
}

var teacherQuestion = interviewQuestion('teacher');
teacherQuestion('john');

var designerQuestion = interviewQuestion('designer');
designerQuestion('john');
designerQuestion('jane');
designerQuestion('mark');

interviewQuestion('teacher')('mark');

/*
///////////////////////////////////////////////////////////////
//IIFE
///////////////////////////////////////////////////////////////
*/
function game() {
    var score = Math.random() * 10;
    console.log(score >= 5);
}

game();

(function () {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();

(function (goodluck) {
    var score = Math.random() * 10;
    console.log(score >= 5 - goodluck);
})(5);




/*
///////////////////////////////////////////////////////////////
//CLOSURES: An inner function always has access to the variables & parameters of its outer function, even after the outer function has returned.
///////////////////////////////////////////////////////////////
*/
function retirement(retirementAge) {
    var a = " years left until retirement.";
    return function (yearOfBirth) {
        var age = 2018 - yearOfBirth;
        console.log(retirementAge - age + a);
    }
}

var retirementIndia = retirement(60);
retirementIndia(1982);

//OR

retirement(60)(1982);

/*
///////////////////////////////////////////////////////////////
//CLOSURES: Functions returning functions
///////////////////////////////////////////////////////////////
*/
function interviewQuestion(job) {
    return function (name) {
            if (job === 'designer')
                console.log(name + ', can you please explain what UX design is?');
            else if (job === 'teacher') 
                console.log('what subject do you teach, ' + name + '?');
            else 
                console.log('Hello, ' + name + ', what do you do?');
        }
}

interviewQuestion('designer')('Vishal');

/*
///////////////////////////////////////////////////////////////
//Bind, call and apply
///////////////////////////////////////////////////////////////
*/
var john = {
    name: 'john',
    age: 26,
    job: 'teacher',
    presentation: function (style, timeOfDay) {
        if (style === 'formal')
            console.log('Good ' + timeOfDay + ', Ladies and gentlemen! I\'m ' + this.name + ', I\'m ' + this.job + ', and I\'m ' + this.age + ' years old.');
        else if (style === 'friendly') {
            console.log('Hey! What\'s up? I\'m ' + this.name + ', I\'m ' + this.job + ', and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay);
        }
    }
};

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer',
};

john.presentation('formal', 'morning');

john.presentation.call(emily, 'friendly', 'afternoon');

//john.presentation.apply(emily, ['friendly', 'afternoon']);

var johnFriendly = john.presentation.bind(john, 'friendly');
johnFriendly('morning');
johnFriendly('night');

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('afternoon');


/*
///////////////////////////////////////////////////////////////
//Bind, call and apply: Passing functions as arguments
///////////////////////////////////////////////////////////////
*/
var years = [1990, 1965, 1937, 2005, 1998];

function arrayCalc(arr, fn) {
    var arrRes = [];
    for (var i = 0; i < arr.length; i++) {
        arrRes.push(fn(arr[i]));
    }

    return arrRes;
}

function calculateAge(el) {
    return 2018 - el;
}

function isFullAge(limit, el) {
    return el >= limit;
}

var ages = arrayCalc(years, calculateAge);
var fullJapan = arrayCalc(ages, isFullAge.bind(this, 20));
console.log(ages);
console.log(fullJapan);

/*
///////////////////////////////////////////////////////////////
//Coding challenge:

--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a. question itself
b. the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c. correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on task 4.

6. Check if the answer is correct and print to the console whether the answer is correct or not (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private & doesn't interfere with the other programmers code(Hint: we learned a special technique to do exactly that).
///////////////////////////////////////////////////////////////
*/

(function () {


function Question(question, answers, correctAnswer) {
    this.question = question;
    this.answers = answers;
    this.correctAnswer = correctAnswer;
}

var q1 = new Question("Is JavaScript the coolest programming language in the world?", ['Yes', 'No'], 0);
var q2 = new Question("What is the name of this course\'s teacher?", ['John', 'Michael', 'Jonas'], 2);
var q3 = new Question("What does best describe coding?", ['Boring', 'Hard', 'Tedious', 'Fun'], 3);

var questions = [q1, q2, q3];

var number = Math.floor(Math.random() * questions.length);

Question.prototype.displayQuestion =
function()
{
    console.log(this.question);

    for (var i = 0; i < this.answers.length; i++) {
        console.log(i + ": " + this.answers[i]);
    }
}

Question.prototype.checkAnswer =
    function (ans) {
        if (ans == this.correctAnswer)
            console.log('Correct answer!');
        else
            console.log('Wrong answer. Try again :)');
    }

questions[number].displayQuestion();

var answer = parseInt(prompt('Please select the correct answer.'));

questions[number].checkAnswer(answer);
})();

/*
--- Expert level ---
8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result).
9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.
10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).
11. Display the score in the console. Use another method for this. 
///////////////////////////////////////////////////////////////
*/
(function () {


    function Question(question, answers, correctAnswer) {
        this.question = question;
        this.answers = answers;
        this.correctAnswer = correctAnswer;
    }

    Question.prototype.displayQuestion =
        function () {
            console.log(this.question);

            for (var i = 0; i < this.answers.length; i++) {
                console.log(i + ": " + this.answers[i]);
            }
        }

    Question.prototype.checkAnswer =
        function (ans, callback) {
            var sc;
            if (ans == this.correctAnswer) {
                console.log('Correct answer!');
                sc = callback(true);
            }
            else {
                console.log('Wrong answer. Try again :)');
                sc = callback(false);
            }

            this.displayScore(sc);
        }

    Question.prototype.displayScore =
        function (score) {
            console.log('Your current score is: ' + score);
            console.log('--------------------------------');
        }
    var q1 = new Question("Is JavaScript the coolest programming language in the world?", ['Yes', 'No'], 0);
    var q2 = new Question("What is the name of this course\'s teacher?", ['John', 'Michael', 'Jonas'], 2);
    var q3 = new Question("What does best describe coding?", ['Boring', 'Hard', 'Tedious', 'Fun'], 3);

    var questions = [q1, q2, q3];

    function score() {
        var sc = 0;
        return function (correct) {
            if (correct) {
                sc++;
            }
            return sc;
        }
    }

    var keepScore = score();

    function nextQuestion() {      

        var number = Math.floor(Math.random() * questions.length);

        questions[number].displayQuestion();

        var answer = prompt('Please select the correct answer.');        

        if (answer !== 'exit') {
            questions[number].checkAnswer(parseInt(answer), keepScore);
            nextQuestion();
        }
    }

    nextQuestion();
})();
