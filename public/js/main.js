/**
 * Created by janghunlee on 2017. 12. 28..
 */

var board = {
    "1":0,
    "2":0,
    "3":0,
    "4":0,
    "5":0,
    "6":0,
    "7":0,
    "8":0,
    "9":0,
    "10":0,
    "11":0,
    "12":0,
    "13":0,
    "14":0,
    "15":0,
    "16":0,
};

var score = 0;

var game_Status = true;

function init_Game() {
    var game_board = '<div class="game-bar">';

    var first_Random_loc = Math.floor(Math.random()*16)+1;
    var second_Random_loc = Math.floor(Math.random()*16)+1;

    for(;;){
        if(first_Random_loc == second_Random_loc){
            second_Random_loc = Math.random()%16;
        }
        else{
            break;
        }
    }

    board[first_Random_loc] = 1;
    board[second_Random_loc] = 1;

    for(var i = 1; i<17; i++){
        if(i == first_Random_loc || i==second_Random_loc){
            game_board += "<div class=\"game"+i+"\" id='c2'>"+2;

            game_board += "</div>"
        }

        else{
            game_board += "<div class=\"null\">";

            game_board += "</div>"
        }

        if(i%4 == 0){
            game_board += '</div><div class="game-bar">';
        }
    }

    game_board += '</div>'
    $(".game").html(game_board)
}

function print_Board() {
    if(game_Status == true){
        var game_board = '<div class="game-bar">';

        for(var i = 1; i<17; i++){
            if(board[i] == 0){
                game_board += "<div class=\"null data"+i+"\"></div>"
            }
            else{
                game_board += "<div class=\"data"+i+"\" id=\"c"+Math.pow(2,board[i])+"\">"+Math.pow(2,board[i])+"</div>"
            }
            if(i%4 == 0){
                game_board += "</div><div class=\"game-bar\">"
            }
        }

        game_board += '</div>'
        console.log("Stop - print");
        $('.game').html(game_board);
    }
}

function make_Random() {
    console.log("Start - random")
    if(game_Status == true){
        var checkNull = 0;

        for(var m = 1; m<17; m++){
            if(board[m] == 0){
                checkNull++;
            }
        }

        if(checkNull != 0) {
            var randomAddLocation1 = Math.floor(Math.random() * checkNull) + 1;
            var randomAddLocation2 = Math.floor(Math.random() * checkNull) + 1;

            if (checkNull == 1) {

                for (var m = 1; m < 17; m++) {
                    if (board[m] == 0) {
                        randomAddLocation1 = m
                    }
                }
            }
            else if(checkNull == 2){
                var num = 1;
                for (var m = 1; m < 17; m++) {
                    if (board[m] == 0) {
                        if(num == 1){
                            randomAddLocation1 = m;
                        }
                        else{
                            randomAddLocation2 = m;
                        }
                    }
                }
            }
            else {
                for (;;) {
                    if (randomAddLocation1 == randomAddLocation2) {
                        randomAddLocation2 = Math.floor(Math.random() * checkNull) + 1;
                    }
                    else {
                        break;
                    }
                }

                var num = 0;
                for (var m = 1; m < 17; m++) {
                    if (board[m] == 0) {
                        num += 1;
                        if (randomAddLocation1 == num) {
                            randomAddLocation1 = m;
                        }
                        else if (randomAddLocation2 == num) {
                            randomAddLocation2 = m;
                        }
                    }
                }
            }
            board[randomAddLocation1] = 1;
            board[randomAddLocation2] = 1;

            $(".data"+randomAddLocation1).removeClass('null');
            $(".data"+randomAddLocation1).attr('id','c'+Math.pow(2,board[randomAddLocation1]));
            $(".data"+randomAddLocation1).text(Math.pow(2,board[randomAddLocation1]));

            $(".data"+randomAddLocation2).removeClass('null');
            $(".data"+randomAddLocation2).attr('id','c'+Math.pow(2,board[randomAddLocation1]));
            $(".data"+randomAddLocation2).text(Math.pow(2,board[randomAddLocation2]));
        }
    }
    console.log("Stop - random")
}

function check_Place() {
    var check_Board = 0;
    for(var i = 1; i< 17; i++){
        if(i < 13 && i%4 == 0){
            if(board[i] == board[i+4] && board[i] != 0){
                check_Board++;
            }
        }
        else if(i < 13 && i%4 != 0){
            if(board[i] == board[i+4] || board[i] == board[i+1] && board[i] != 0){
                check_Board++;
            }
        }
        else if(i > 13 && i%4 != 0 && board[i] != 0){
            if(board[i] == board[i+1]){
                check_Board++;
            }
        }

        if(board[i] == 0){
            check_Board++;
        }
    }
    console.log(board);
    console.log(check_Board);
    if(check_Board == 0){
        game_Status == false;
        game_Finish();
    }
}

function key_Event(e) {
    console.log("start - keyEvent");
    if(e == 40){
        var value = [13,14,15,16];

        for(var i = 0; i<4; i++){
            var val1 = value[i] - 12;
            var val2 = value[i] - 8;
            var val3 = value[i] - 4;
            var val4 = value[i] - 0;

            if(board[val4] == 0 && board[val3] != 0) {
                board[val4] = board[val3];
                board[val3] = 0;
            }

            if(board[val4] == 0 && board[val3] == 0 && board[val2] != 0) {
                board[val4] = board[val2];
                board[val2] = 0;
            }

            if(board[val4] == 0 && board[val3] == 0 && board[val2] == 0 && board[val1] != 0) {

                board[val4] = board[val1];
                board[val1] = 0;
            }

            if(board[val4] != 0 && board[val3] == board[val4]) {
                board[val4] = board[val3] + 1;
                board[val3] = 0;

                score += Math.pow(2,board[val4]);
            }

            if(board[val4] != 0 && board[val3] == 0 && board[val2] == board[val4]) {
                board[val4] = board[val2] + 1;
                board[val2] = 0;

                score += Math.pow(2,board[val4]);
            }

            if(board[val4] != 0 && board[val3] == 0 && board[val2] == 0 && board[val1] == board[val4]) {
                board[val4] = board[val1] + 1;
                board[val1] = 0;

                score += Math.pow(2,board[val4]);
            }




            if(board[val3] == 0 && board[val2] != 0) {
                board[val3] = board[val2];
                board[val2] = 0;
            }

            if(board[val3] == 0 && board[val2] == 0 && board[val1] != 0) {
                board[val3] = board[val1];
                board[val1] = 0;
            }

            if(board[val3] == board[val2] && board[val3] != 0) {
                board[val3] = board[val2] + 1;
                board[val2] = 0;

                score += Math.pow(2,board[val3]);
            }

            if(board[val3] != 0 && board[val2] == 0 && board[val1] == board[val3]) {
                board[val3] = board[val1] + 1;
                board[val1] = 0;

                score += Math.pow(2,board[val3]);
            }

            if(board[val2] == 0 && board[val1] != 0) {
                board[val2] = board[val1];
                board[val1] = 0;
            }

            if(board[val2] != 0 && board[val2] == board[val1]) {
                board[val2] = board[val1] + 1;
                board[val1] = 0;

                score += Math.pow(2,board[val2]);
            }
        }
    }
    else if(e == 38){
        var value = [1,2,3,4];

        for(var i = 0; i<4; i++){
            var val1 = value[i] + 12;
            var val2 = value[i] + 8;
            var val3 = value[i] + 4;
            var val4 = value[i] + 0;

            if(board[val4] == 0 && board[val3] != 0) {
                board[val4] = board[val3];
                board[val3] = 0;
            }

            if(board[val4] == 0 && board[val3] == 0 && board[val2] != 0) {
                board[val4] = board[val2];
                board[val2] = 0;
            }

            if(board[val4] == 0 && board[val3] == 0 && board[val2] == 0 && board[val1] != 0) {

                board[val4] = board[val1];
                board[val1] = 0;
            }

            if(board[val4] != 0 && board[val3] == board[val4]) {
                board[val4] = board[val3] + 1;
                board[val3] = 0;

                score += Math.pow(2,board[val4]);
            }

            if(board[val4] != 0 && board[val3] == 0 && board[val2] == board[val4]) {
                board[val4] = board[val2] + 1;
                board[val2] = 0;

                score += Math.pow(2,board[val4]);
            }

            if(board[val4] != 0 && board[val3] == 0 && board[val2] == 0 && board[val1] == board[val4]) {
                board[val4] = board[val1] + 1;
                board[val1] = 0;

                score += Math.pow(2,board[val4]);
            }



            if(board[val3] == 0 && board[val2] != 0) {
                board[val3] = board[val2];
                board[val2] = 0;
            }

            if(board[val3] == 0 && board[val2] == 0 && board[val1] != 0) {
                board[val3] = board[val1];
                board[val1] = 0;
            }

            if(board[val3] == board[val2] && board[val3] != 0) {
                board[val3] = board[val2] + 1;
                board[val2] = 0;

                score += Math.pow(2,board[val2]);
            }

            if(board[val3] != 0 && board[val2] == 0 && board[val1] == board[val3]) {
                board[val3] = board[val1] + 1;
                board[val1] = 0;

                score += Math.pow(2,board[val2]);
            }

            if(board[val2] == 0 && board[val1] != 0) {
                board[val2] = board[val1];
                board[val1] = 0;
            }

            if(board[val2] != 0 && board[val2] == board[val1]) {
                board[val2] = board[val1] + 1;
                board[val1] = 0;

                score += Math.pow(2,board[val1]);
            }
        }
    }
    else if(e == 39){
        var value = [4,8,12,16];

        for(var i = 0; i<4; i++){
            var val1 = value[i] - 3;
            var val2 = value[i] - 2;
            var val3 = value[i] - 1;
            var val4 = value[i] - 0;

            if(board[val4] == 0 && board[val3] != 0) {
                board[val4] = board[val3];
                board[val3] = 0;
            }

            if(board[val4] == 0 && board[val3] == 0 && board[val2] != 0) {
                board[val4] = board[val2];
                board[val2] = 0;
            }

            if(board[val4] == 0 && board[val3] == 0 && board[val2] == 0 && board[val1] != 0) {

                board[val4] = board[val1];
                board[val1] = 0;
            }

            if(board[val4] != 0 && board[val3] == board[val4]) {
                board[val4] = board[val3] + 1;
                board[val3] = 0;

                score += Math.pow(2,board[val4]);
            }

            if(board[val4] != 0 && board[val3] == 0 && board[val2] == board[val4]) {
                board[val4] = board[val2] + 1;
                board[val2] = 0;

                score += Math.pow(2,board[val4]);
            }

            if(board[val4] != 0 && board[val3] == 0 && board[val2] == 0 && board[val1] == board[val4]) {
                board[val4] = board[val1] + 1;
                board[val1] = 0;

                score += Math.pow(2,board[val4]);
            }




            if(board[val3] == 0 && board[val2] != 0) {
                board[val3] = board[val2];
                board[val2] = 0;
            }

            if(board[val3] == 0 && board[val2] == 0 && board[val1] != 0) {
                board[val3] = board[val1];
                board[val1] = 0;
            }

            if(board[val3] == board[val2] && board[val3] != 0) {
                board[val3] = board[val2] + 1;
                board[val2] = 0;

                score += Math.pow(2,board[val3]);
            }

            if(board[val3] != 0 && board[val2] == 0 && board[val1] == board[val3]) {
                board[val3] = board[val1] + 1;
                board[val1] = 0;

                score += Math.pow(2,board[val3]);
            }


            if(board[val2] == 0 && board[val1] != 0) {
                board[val2] = board[val1];
                board[val1] = 0;
            }

            if(board[val2] != 0 && board[val2] == board[val1]) {
                board[val2] = board[val1] + 1;
                board[val1] = 0;

                score += Math.pow(2,board[val2]);
            }

        }
    }
    else if(e == 37){
        var value = [1,5,9,13];

        for(var i = 0; i<4; i++){
            var val1 = value[i] + 3;
            var val2 = value[i] + 2;
            var val3 = value[i] + 1;
            var val4 = value[i] + 0;

            if(board[val4] == 0 && board[val3] != 0) {
                board[val4] = board[val3];
                board[val3] = 0;
            }

            if(board[val4] == 0 && board[val3] == 0 && board[val2] != 0) {
                board[val4] = board[val2];
                board[val2] = 0;
            }

            if(board[val4] == 0 && board[val3] == 0 && board[val2] == 0 && board[val1] != 0) {

                board[val4] = board[val1];
                board[val1] = 0;
            }



            if(board[val4] != 0 && board[val3] == board[val4]) {
                board[val4] = board[val3] + 1;
                board[val3] = 0;

                score += Math.pow(2,board[val4]);
            }

            if(board[val4] != 0 && board[val3] == 0 && board[val2] == board[val4]){
                board[val4] = board[val2] + 1;
                board[val2] = 0;

                score += Math.pow(2,board[val4]);
            }

            if(board[val4] != 0 && board[val3] == 0 && board[val2] == 0 && board[val1] == board[val4]){
                board[val4] = board[val1] + 1;
                board[val1] = 0;

                score += Math.pow(2,board[val4]);
            }

            if(board[val3] == 0 && board[val2] != 0){
                board[val3] = board[val2];
                board[val2] = 0;
            }

            if(board[val3] == 0 && board[val2] == 0 && board[val1] != 0){
                board[val3] = board[val1];
                board[val1] = 0;

            }

            if(board[val3] == board[val2] && board[val3] != 0) {
                board[val3] = board[val2] + 1;
                board[val2] = 0;

                score += Math.pow(2,board[val3]);
            }

            if(board[val3] != 0 && board[val2] == 0 && board[val1] == board[val3]) {
                board[val3] = board[val1] + 1;
                board[val1] = 0;

                score += Math.pow(2,board[val3]);
            }



            if(board[val2] == 0 && board[val1] != 0) {
                board[val2] = board[val1];
                board[val1] = 0;
            }


            if(board[val2] != 0 && board[val2] == board[val1]) {
                board[val2] = board[val1] + 1;
                board[val1] = 0;

                score += Math.pow(2,board[val2]);
            }
        }
    }

    print_Board();
    console.log("Stop - keyEvent");
}

function game_Finish() {
    $('.pop-up').css({
        "display":"flex"
    });

    $(".pop-up-result").css({
        "display":"none"
    });

    $(".user-score").text(score+" 점");
}

$(document).ready(function () {
    $(".pop-up").css({
        "display":"none"
    })
    init_Game();
});

$(document).keydown(function (event) {
    var keyCode =event.keyCode;

    if(keyCode == 40 || keyCode == 39 || keyCode == 38 || keyCode == 37){
        key_Event(keyCode);
        make_Random();

        check_Place();
    }
    console.log(game_Status);
});

$(".pop-up-btn").click(function () {
    var name = $(".nickname").val();
    if(name == ""){
        alert("이름을 입력해주세요")
    }
    else{
        $.ajax({
            method:"POST",
            url:"/game",
            data:{"name":name,"score":score},
            success:function (data) {
                $(".pop-up-box").css({"display":"none"});
                $(".pop-up-result").css({"display":"block"});

                $.ajax({
                    method:"GET",
                    url:"/game",
                    success:function (data) {
                        var input = "";
                        var rank_Number = 1;
                        for(var i = data.length - 1; i >=0; i--){
                            input += "<p>";
                            input += rank_Number+" 위 : "+ data[i]["name"] + " 님 " + data[i]["score"]+ "점";
                            input += "</p>";
                            rank_Number++;
                        }

                        $(".pop-up-result").append(input);
                    },
                    error:function (err) {
                        console.log(err);
                    }
                })
            },
            error:function (err) {
                console.log(err);
            }
        });
    }
});