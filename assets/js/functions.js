var name = ''; 

$(function () {

    $('.toast').toast({
        delay: 5000
    })

    var socket = io();

    $('#guest-name').submit(function(e) {
        e.preventDefault();
        name = $('#name').val(); 
        socket.emit('new member', name);
        $('#name').val('');
        $('.chat').removeClass("hidden"); 
        $('#guest-name').addClass("hidden"); 
        return false;
    });

    $('#send-message').submit(function(e) {
        e.preventDefault();
        var date = new Date();
        var hour = date.getHours();
        var minutes = date.getMinutes();
        var message = hour + ":" + minutes + " - " + name + " - " + $('#message').val();
        socket.emit('chat message', message);
        $('#message').val('');
        return false;
    });

    socket.on('new member', function(guest){
        if(name == guest) {
            $(".toast-body").text('Bem vindo ' + name)
        } else {
            $(".toast-body").text(guest + " juntou-se à conversa")
        }
        $('.toast').toast('show')
    });

    socket.on('chat message', function(msg){
        $(".toast-body").text('Nova mensagem');
        $('.toast').toast('show'); 
        $('#messages').append($('<li>').text(msg));
        $('#messages').scrollTop($('#messages').prop('scrollHeight'));
    });
});