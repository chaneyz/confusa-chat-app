$(document).ready(function () {

	$('#my-button').on('click', onButtonClick);

	function onButtonClick(e) {
		e.preventDefault();
		var myMessage = {
			name: $('#usrname').val(),
			message: $('#chat').val()
		};
		console.log(myMessage);
		
		$.post(
			'https://confusa.herokuapp.com/confusa',
			myMessage
		);

		setTimeout("$('#chat-messages').scrollTop($('#chat-messages').prop('scrollHeight'))", 500);
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

	setInterval(getMessages, 300);

	getMessages();
	

});