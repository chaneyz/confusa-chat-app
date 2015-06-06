$(document).ready(function () {

	$('#my-button').on('click', onButtonClick);

	function onButtonClick(e) {
		e.preventDefault();
		var myMessage = {
			name: $('#usrname').val(),
			message: $('#chat').val(), 
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

	function getChatrooms() {
		$.get(
			'https://confusa.herokuapp.com/confusa/top_rooms',
			onChatrooms,
			'json'
		);
	}

	function onChatrooms(chatroomList) {
		var htmlString = '';
		for(var i=0; i<chatroomList.length; i++) {
			var chatrooms = chatroomList[i];
			htmlString += '<div>'+'<h4>'+chatrooms+'</h4>'+'</div>';
			console.log(chatrooms);
		}

		$('#chat-rooms').html(htmlString)
	}

	function onLeaderboard(leaderboardList) {
		var htmlString = '';
		for(var i=0; i<leaderboardList.length; i++) {
			var leaderboard = leaderboardList[i];
			htmlString += '<div>'+'<h4>'+leaderboard+'</h4>'+'</div>';
			console.log(leaderboard);
		}

		$('#leader').html(htmlString)
	}		

		setTimeout("$('#chat-messages').scrollTop($('#chat-messages').prop('scrollHeight'))", 200);

	function onMessagesReceived(messageList) {
		var htmlString = '';
		for(var i=0; i<messageList.length; i++) {
			var message = messageList[i];
			if(message.hasOwnProperty('name') && message.hasOwnProperty('message') && message.hasOwnProperty('created_at')) {
				htmlString += '<div>'+message.created_at+': '+'<strong>'+message.name+'</strong>'+' - '+message.message+'</div>';
			}

			console.log(message);
		}	

		$('#chat-messages').html(htmlString);
		setTimeout("$('#chat-messages').scrollTop($('#chat-messages').prop('scrollHeight'))", 200);
	}

	setInterval(getMessages, 100);
	setInterval(getLeaderboard, 6000);
	setInterval(getChatrooms, 6000);

	getMessages();
	

});