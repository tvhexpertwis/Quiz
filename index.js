$(document).ready(() => {
    count = 0;
    let score = 0;
    let qnum = 1;
    const quiz = [{
            question: "What is the world record bench press by male?",
            answers: ["A. 1075 lbs", "B. 1050 lbs", "C. 825 lbs", "D. 950 lbs"],
            correct: 1,
            corrected: "A. 1075 pounds by Ryan Kelly"
        },
        {
            question: "What is the world record squat by male",
            answers: ["A. 750 lbs", "B. 1,010 lbs", "C. 895 lbs", "D. 1,157 lbs"],
            correct: 1,
            corrected: "D. 1,157 lbs by Vlad Alhazov"
        },
        {
            question: "What is the world record bench press by female?",
            answers: ["A. 550 lbs", "B. 350 lbs", "C. 600.8 lbs", "D. 290 lbs"],
            correct: 1,
            corrected: "C. 600.8 lbs by Becca Swanson"
        },
        {
            question: "What is the world record squat by female?",
            answers: ["1. 550 lbs", "2. 603 lbs", "3. 490 lbs", "4. 415 lbs"],
            correct: 1,
            corrected: "B. 603 lbs by Natalie Hanson"
        },
        {
            question: "What is the world record amount of pullups in 24 hours?",
            answers: ["A. 7,900", "B. 4,321", "C. 915", "D. 2,223"],
            correct: 1,
            corrected: "B. 4,321 by Mark Jordan"


        },
        {
          question: "What is the world record for the most non-stop push ups?",
          answers: ["A. 10,507,", "B. 407","C. 10,001", "D. 15,007"]
          ,
          correct: 1,
          corrected: "A. 10,507 by Minoru Yoshida"
        },
        {
          question: "What is the world record for plank holding?",
          answers: ["A. 8 hours and 1 minute", "B. 17 hours and 2 minutes","C. 5 hours and 31 minutes", "D. 2 hours and 55 minutes"]
          ,
          correct:1,
          corrected: "A. 8 hours and 1 minute by Mao Weidong"
        },
        {
          question: "What is the world record deadlift by male?",
        answers: ["A. 1,102 lbs", "B. 950 lbs", "C. 875 lbs", "D. 800 lbs" ]
        ,
        correct:1,
        corrected:"A. 1,102 lbs by Eddie Hall"
        },
        {
          question: "What is the world record deadlift by female?",
          answers: ["A. 694 lbs","B.600 lbs", "C. 515 lbs", "D. 913 lbs"]
          ,
          correct: 1,
          corrected:"A. 694 lbs by Becca Swanson"
        },
  


    ];


    function startQuiz() {
        $('.questionCount').text("Question number " + qnum + ":");
        $('.question').text(quiz[count].question);
        hideButton('next');
        showButton('check');
        hideButton('finalScore');
        hideButton('beginAgain');
    }

    function renderAnswers() {
        quiz[count].answers.forEach((answer, index) => {
            $('.answers').append('<li>' + '<input type="radio" name="answer" value="' + index + '" />' + answer + '</li>');
        });
        hideButton('next');
        showButton('check');
        hideButton('finalScore');
        hideButton('beginAgain');
    }

    function validateAnswer() {
        let numberOfInputsChecked = $("input[name='answer']:checked").length;
        if (numberOfInputsChecked === 0) {
            return false;
        } else {
            return true;
        }
    }

    function hideAllButtons() {
        hideButton('next');
        hideButton('check');
        hideButton('finalScore');
        hideButton('beginAgain');
        hideButton('start');
    }
    
    function clearAllTexts() {
        $('.instructions').text("");
        $('.welcomeMessage').text("");
        $('.questionCount').text("");
        $('.question').text("");
        $('.answers').text("");
        $('.result').text("");
        $('.scoreCount').text("");
        $('.correctedAnswer').text("");
        $('.finalMessage').text("");
        $('.conclusion').text("");
    }

    function hideButton(buttonId) {
        let jqueryId = '#' + buttonId;
        $(jqueryId).css('display', 'none');
    }

    function showButton(buttonId) {
        let jqueryId = '#' + buttonId;
        $(jqueryId).css('display', 'block');
    }

    function updateScoreAndCount() {
        $(".score").html(score);
        $(".count").html(count);
        $(".qnum").html(count);
    }

    function checkQuestion() {
        qnum++;
        $('.questionCount').text("");
        hideButton('check');
        showButton('next');
        hideButton('finalScore');
        hideButton('beginAgain');
        let correctedAnswer = quiz[count].corrected;
        let correctAnswer = quiz[count].correct;
        let selectedAnswer = $("input[name='answer']:checked").val();

        if (correctAnswer == selectedAnswer) {
            count++;
            score++;
            $('.result').text("You are correct!");
            $('.scoreCount').text("Your score is " + score + " out of " + count);
        } else {
            count++;
            score = score;
            $('.result').text("Incorrect");
            $('.correctedAnswer').text('The corrrect answer is: ' + correctedAnswer);
            $('.scoreCount').text("Your score is " + score + " out of " + count);
        }
    }

    function goToNextQuestion() {

        if (count == 9) {
            goToFinal();
        } else {
  
            $('.questionCount').text("Question number " + qnum + ":");
            $('.question').text(quiz[count].question);
            $('.answers').text("");
            $('.correctedAnswer').text("");
            $('.scoreCount').text("");
            $('.result').text("");
            updateScoreAndCount();
        }
    }

    function goToFinal() {
        $('questionCount').text("");
        $('.question').text("");
        $('.answers').text("");
        $('.result').text("");
        $('.correctedAnswer').text("");
        $('.scoreCount').text("");
        hideButton('next');
        hideButton('check');
        showButton('finalScore');
        hideButton('beginAgain');

        $('.finalMessage').text("Congratulations! You have finished the exam!");
        $('.conclusion').text("Click below to see your score");
    }


    hideAllButtons();
    showButton('start');
    $('.welcomeMessage').text("Fitness Record Quiz");
    $('.instructions').text("Press 'Start Quiz' when you are ready to begin");

    $('#start').on('click', ((event) => {
        startQuiz();
        renderAnswers();
        hideButton('start');
        $('.welcomeMessage').text("");
        $('.instructions').text("");
    }));

    $('#check').on('click', ((event) => {

        let validAnswer = validateAnswer();
        if (validAnswer === true) {
            checkQuestion();
        } else {
            alert("Please choose an answer");
        }
    }));

    $('#next').on('click', ((event) => {
        updateScoreAndCount();
        goToNextQuestion();
        renderAnswers();
    }));

    $('#finalScore').on('click', ((event) => {

        clearAllTexts();
        hideButton('finalScore');
        hideButton('next');

        if (score < 2) {
            $('.questionCount').text("");
            $('.scoreCount').text("Your score is " + score + " out of " + count);
            $('.finalResult').text("Your score is low. You should try again.");
            showButton('beginAgain');
        } else if (score > 8) {
            $('.questionCount').text("");
            $('.scoreCount').text("Your score is " + score + " out of " + count);
            $('.finalResult').text("Great job! You aced the quiz!");
        } else {
            $('.finalResult').text("Not bad, but could use improvement. You may try again.");
            showButton('beginAgain');
        }
    }));

    $('#beginAgain').click((event) => {
        count = 0;
        score = 0;
        qnum = 1;

        startQuiz();
        renderAnswers();

        $('.scoreCount').text("");
        $('.finalMessage').text("");
        $('.finalResult').text("");
    });

    $('form').submit((event) => {
        event.preventDefault();
    });
});