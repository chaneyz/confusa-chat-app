$(document).ready(function () {

	$('#my-button').on('click', onButtonClick);

	function onButtonClick(e) {
		e.preventDefault();
		var myMessage = {
			name: $('#usrname').val(),
			message: $('#chat').val(),
			// star_messages: 
		};
		console.log(myMessage);
		
		$.post(
			'https://confusa.herokuapp.com/confusa',
			myMessage
		);
	}
	
	function getMessages() {
		$.get(
			'https://confusa.herokuapp.com/confusa',
			onMessagesReceived,
			'json'
		);
	}

	function getLeaderboard() {
		$.get(
			'https://confusa.herokuapp.com/confusa/leaderboard',
			onLeaderboard,
			'json'
		);
	}

	function onLeaderboard(leaderboardList) {
		var htmlString = '';
		// var ldrObj = {};
		for(var i=0; i<leaderboardList.length; i++) {
			var leaderboard = leaderboardList[i];
			htmlString += '<div>'+leaderboard+'</div>';
			console.log(leaderboard);
		}

		$('#leader').html(htmlString)
	}		

		setTimeout("$('#chat-messages').scrollTop($('#chat-messages').prop('scrollHeight'))", 200);

	function onMessagesReceived(messageList) {
		var htmlString = '';
		for(var i=0; i<messageList.length; i++) {
			var message = messageList[i];
			if(message.hasOwnProperty('name') && message.hasOwnProperty('message')) {
				htmlString += '<div>'+message.name+' - '+message.message+'</div>';
			}

			console.log(message);
		}	

		$('#chat-messages').html(htmlString);
		setTimeout("$('#chat-messages').scrollTop($('#chat-messages').prop('scrollHeight'))", 200);
	}

	setInterval(getMessages, 100);
	setInterval(getLeaderboard, 6000)

	getMessages();
	

});