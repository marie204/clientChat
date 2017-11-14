
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

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

var myUser;

function createUser() {

	parameters = {
		url: 'http://messenger.api.niamor.com/createUser'
	};

	$.ajax(parameters).done(useUser);

}

function useUser(user) {
	myUser = user;
	setCookie('userAuthKey', user.authKey, 365);
	$('#mask').hide();
	getMessages();
}

var userAuthKey;

function getUser() {
	userAuthKey = getCookie('userAuthKey');
	if ( userAuthKey != '' ) {
		parameters = {
			url: 'http://messenger.api.niamor.com/getUser',
			method: 'post',
			data: {
				authKey: userAuthKey
			}
		};
		$.ajax(parameters).done(function(user) {
			myUser = user;
			myUser.authKey = userAuthKey;
			$('#mask').hide();
			getMessages();
		});
	} else {
		createUser();
	}
}

getUser();

var lastId = 0;

function getMessages() {
	parameters = {
		url: 'http://messenger.api.niamor.com/getMessages',
		method: 'post',
		data: {
			authKey: myUser.authKey,
			lastId: lastId
		}
	};

	$.ajax(parameters).done(showMessages);
}

function showMessages(messages) {
	for (var i = 0 ; i < messages.length ; i++) {
		$('#chatMessages').append('<p>'+messages[i].from.username+': '+messages[i].text+'</p>');
		lastId = messages[i].id
	}
	setTimeout(getMessages, 1000);
}


