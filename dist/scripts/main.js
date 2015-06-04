$(document).ready(function () {

	$('#my-button').on('click', onButtonClick);

	function onButtonClick(e) {
		var myMessage = {
			name: $('#usrname').val(),
			message: $('#chat').val()
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
	}

	setInterval(getMessages, 500);

	getMessages();
	

});