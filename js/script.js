
function getUsers() {

	parameters = {
		url: 'http://messenger.api.niamor.com/getUsers'
	};

	$.ajax(parameters).done(showUsers);

}

function showUsers(users) {

	$('#onlineUsers ul').html('');

	for( i = 0 ; i < users.length ; i++ ) {
		user = users[i];
		$('#onlineUsers ul').append('<li data-userid="'+user.id+'">'+user.username+'</li>');
	}

	$('[data-userid]').click(function() {
		console.log( $(this).attr('data-userid') );
	});

	setTimeout(getUsers, 5000);

}

getUsers();


