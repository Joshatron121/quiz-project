$(function(){
	var questionCount = 0;
	var currentQuiz = {};

	var Quiz = {
		questionsArray: [
			{
				question: 'Where was the original Stargate discovered on Earth?',
				answersArray: ['New Brunswick', 'Antarctica', 'The Bottom of the Ocean', 'Egypt']
			},
			{
				question: 'What was the name of the first Goa’uld a team from Earth has to deal with?',
				answersArray: ['Apophis', 'Ra', 'Ba\'al', 'Anubis']
			},
			{
				question: 'What was the name of the first planet visited by a team of explorers from Earth?',
				answersArray: ['Chulak', 'Abydos', 'Tollana', 'Dakara', 'Earth']
			},
			{
				question: 'What is the name of the team member who was originally the First Prime of Apophis?',
				answersArray: ['Jack O\'Neill', 'Samantha Carter', 'Daniel Jackson', 'Teal\'c']
			},
			{
				question: 'What was the name of Earth’s first battlecruiser, also known as the X-303?',
				answersArray: ['Deadalus','Odyssey','Prometheus','Apollo']
			},
			{
				question: 'How many Stargate TV Shows have there been?',
				answersArray: ['1', '2', '3', '4']
			},
			{
				question: 'Where was the second Stargate on Earth found?',
				answersArray: ['New Brunswick', 'Antarctica', 'The Bottom of the Ocean', 'Egypt']
			},
			{
				question: 'In the episode “Window of Opportunity”, while stuck in a time loop, what did Jack O’Neill resign his command to do?',
				answersArray: ['Golf into the open wormhole of a Stargate', 'Punch Maybourne', 'Kiss Samantha Carter', 'Learn to juggle with Teal\'c']
			},
			{
				question: 'Daniel Jackson was the only SG-1 team member to do what?',
				answersArray: ['Die', 'Ascend', 'Dance with Teal\'c', 'Be resusciatated']
			},
			{
				question: 'What is the name of the good Goa’uld symbiotes that oppose the oppression of the System Lords?',
				answersArray: ['Tokra', 'Tau\'ri', 'Tollan', 'The Wraith']
			},
			{
				question: 'Who runs Stargate Command through most seasons of Stargate SG-1?',
				answersArray: ['George Hammond', 'Senator Kinsey', 'Jack O\'Neill', 'Hank Landry']
			}
		],
		lettersArray: ['a. ', 'b. ', 'c. ', 'd. ', 'e. ', 'f. ', 'g. ', 'h. ', 'i. ', 'j. ', 'k. ', 'l. ', 'm. ', 'n. ', 'o. ', 'p. ', 'q. ', 'r. ', 's. ', 't. ', 'u. ', 'v. ', 'w. ', 'x. ', 'y. ', 'z. '],
		correctAnswersArray: [3, 1, 1, 3, 2, 2, 1, 2, 1, 0, ],
		totalCorrect: 0,
	};

	$('button#start-quiz').click(function(){
		// initialize new quiz
		$('section.start-screen').hide();
		$('section.question-screen').show();
		quizInitialization()
	});

	$('button#start-over').click(function(){
		// initialize new quiz
		$('section.totals-screen').hide();
		$('section.question-screen').show();
		quizInitialization()
	});

	$('button#next-question').click(function() {
		if(questionCount == currentQuiz.questionsArray.length) {
			$('button#next-question').text('Next Question');
			$('section.results-screen p').text('');
			$('ul.question-list').children().remove();
			$('section.results-screen').hide();
			$('section.totals-screen').show();
			$('section.totals-screen h2').text('You got ' + currentQuiz.totalCorrect + ' out of ' + currentQuiz.questionsArray.length + ' correct! Great job!')
		} else {
			$('section.results-screen p').text('');
			$('ul.question-list').children().remove();
			$('section.results-screen').hide();
			$('section.question-screen').show();
			buildQuestion(questionCount);
		}
	})

	$('ul').on('click', 'li', function(){
		if($(this).hasClass('answer-' + (currentQuiz.correctAnswersArray[questionCount] + 1))) {
			storeAnswer(true);
		} else {
			storeAnswer(false);
		}
	})


	var quizInitialization = function(){
		questionCount = 0;
		currentQuiz = Object.create(Quiz);
		buildQuestion(questionCount)
		// for (var i = 0; i < currentQuiz.questionsArray.length; i++ ) {
		// 	buildQuestion(i, currentQuiz);
		// }
	}

	var buildQuestion = function(questionNum) {
		var storedQuestionObject = currentQuiz.questionsArray[questionNum];
		$('.question-number').text((questionNum + 1) + ' of ' + currentQuiz.questionsArray.length);
		$('ul.question-list').append('<li>' + (questionNum + 1) + '. ' + storedQuestionObject.question + '</li>');
		for(var i = 0; i < storedQuestionObject.answersArray.length; i++) {
			$('ul.question-list').append('<li class="answer-' + (i + 1) + '">' + currentQuiz.lettersArray[i] + storedQuestionObject.answersArray[i] + '</li>');
		};
	}

	var storeAnswer = function(answerChoice){
		if(answerChoice == true) {
			buildResults('You got it!', true);
			currentQuiz.totalCorrect++
		} else {
			buildResults('Sorry, not quite. The correct answer was:', false)
		}
		questionCount++;
	}

	var buildResults = function(result, success) {
		$('.question-screen').hide();
		$('.results-screen').show();
		if(success == true) {
			$('.results-screen h2').text(result);
		} else {
			$('.results-screen h2').text(result);
			$('.results-screen p').text(currentQuiz.lettersArray[currentQuiz.correctAnswersArray[questionCount]] + currentQuiz.questionsArray[questionCount].answersArray[currentQuiz.correctAnswersArray[questionCount]])
		}
		if(questionCount == currentQuiz.questionsArray.length-1){
			$('button#next-question').text('View Results');
		}
	}
});