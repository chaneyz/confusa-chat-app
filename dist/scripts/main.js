$(document).ready(function () {

	$('#my-button').on('click', onButtonClick);
	$('#chat').on('keyup', onReturnPress);

	function onReturnPress(e) {
		e.preventDefault();
		if(e.keyCode == '13') {
			var myMessage = {
				name: $('#usrname').val(),
				message: $('#chat').val(),
				room: $('#chatrms').val()
			};
			// console.log($('#chatrms'));
			// console.log(myMessage);	
			$.post(
				'https://confusa.herokuapp.com/confusa',
				myMessage
			);
		$('#chat').val("");
		}
	}


	function onButtonClick(e) {
		e.preventDefault();
		var myMessage = {
			name: $('#usrname').val(),
			message: $('#chat').val(),
			room: $('#chatrms').val()
		};
		// console.log($('#chatrms'));
		// console.log(myMessage);
		$.post(
			'https://confusa.herokuapp.com/confusa',
			myMessage
		);
		$('#chat').val("");
	}
	

	function getMessages() {
		$.get(
			'https://confusa.herokuapp.com/confusa',
			{
				room: $('#chatrms').val()
			},
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

	function getTopChatRooms() {
		$.get(
			'https://confusa.herokuapp.com/confusa/top_rooms',
			onTopChatRooms,
			'json'
		);
	}

	function getChatRooms() {
		$.get(
			'https://confusa.herokuapp.com/confusa/all_rooms',
			onChatRooms,
			'json'
		);
	}

	function onChatRooms(chatRoomList) {
		var htmlString = '';
		for(var i=0; i<chatRoomList.length; i++) {
			var chatRooms = chatRoomList[i];
			htmlString += '<div>'+'<h4>'+chatRooms+'</h4>'+'</div>';
			// console.log(chatRooms);
		}
		$('#chat-rooms').html(htmlString)
	}

	function onTopChatRooms(TopChatRoomList) {
		var htmlString = '';
		for(var i=0; i<TopChatRoomList.length; i++) {
			var TopChatRooms = TopChatRoomList[i];
			htmlString += '<div>'+'<h4>'+TopChatRooms+'</h4>'+'</div>';
			// console.log(TopChatRooms);
		}
		$('#top-chat-rooms').html(htmlString)
	}

	function onLeaderboard(leaderboardList) {
		var htmlString = '';
		for(var i=0; i<leaderboardList.length; i++) {
			var leaderboard = leaderboardList[i];
			htmlString += '<div>'+'<h4>'+leaderboard.name+': '+leaderboard.total_messages+'</h4>'+'</div>';
			console.log(leaderboard);
		}
		$('#leader').html(htmlString)
	}		

	setTimeout("$('#chat-messages').scrollTop($('#chat-messages').prop('scrollHeight'))", 200);

	function onMessagesReceived(messageList) {
		var htmlString = '';
		// console.log(messageList);
		for(var i=0; i<messageList.length; i++) {
			var message = messageList[i];
			if(message.hasOwnProperty('name') && message.hasOwnProperty('message') && message.hasOwnProperty('created_at')) {
				htmlString += '<div>'+message.created_at+': '+'<strong>'+message.name+'</strong>'+' - '+message.message+'</div>';
			}
			console.log(message);
		}	
		$('#chat-messages').html(htmlString);
	}

	setInterval(getMessages, 100);
	setInterval(getLeaderboard, 6000);
	setInterval(getTopChatRooms, 6000);
	setInterval(getChatRooms, 6000);

	getMessages();
	
});