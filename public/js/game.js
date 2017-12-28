/**
 * Created by janghunlee on 2017. 12. 27..
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

function print_Board() {

    var checkNull = 0;

    for(var m = 1; m<17; m++){
        if(board[m] == 0){
            checkNull++;
        }
    }

    if(checkNull != 0){
        var first_Random_Add_loc = Math.floor(Math.random()*checkNull)+1;
        var second_Random_Add_loc = Math.floor(Math.random()*checkNull)+1;

        for(;;){
            if(first_Random_Add_loc == second_Random_Add_loc){
                second_Random_Add_loc = Math.floor(Math.random()*checkNull)+1;
            }
            else{
                break;
            }
        }

        if(checkNull == 1){

            for(var m = 1; m<17; m++){
                if(board[m] == 0){
                    first_Random_Add_loc = m
                }
            }
        }
        else{
            var sibal = 0;
            for(var m = 1; m<17; m++){
                if(board[m] == 0){
                    sibal += 1;
                    if(first_Random_Add_loc == sibal){
                        first_Random_Add_loc = m;
                    }
                    else if(second_Random_Add_loc == sibal){
                        second_Random_Add_loc = m;
                    }
                }
            }

        }
    }




    // for(;;){
    //     if(checkNull > 1){
    //         if(board[first_Random_Add_loc] != 0){
    //             first_Random_Add_loc = Math.floor(Math.random()*16)+1;
    //         }
    //         else if(board[second_Random_Add_loc] != 0){
    //             second_Random_Add_loc = Math.floor(Math.random()*16)+1;
    //         }
    //         else{
    //             break;
    //         }
    //     }
    //     else if(checkNull == 1){
    //         if(board[first_Random_Add_loc] != 0){
    //             first_Random_Add_loc = Math.floor(Math.random()*16)+1;
    //         }
    //         else{
    //             break;
    //         }
    //
    //     }
    // }

    var game_board = '<div class="game-bar">';

    if(checkNull > 1){
        for(var k = 1; k<17; k++){
            if(k == first_Random_Add_loc){
                game_board += '<div id=\"c'+Math.pow(2,1)+'\">'
                game_board += Math.pow(2,1);
                game_board += '</div>'

                board[first_Random_Add_loc] = 1;
            }
            else if(k == second_Random_Add_loc){
                game_board += '<div id=\"c'+Math.pow(2,1)+'\">'
                game_board += Math.pow(2,1);
                game_board += '</div>'

                board[second_Random_Add_loc] = 1;
            }
            else if(board[k] == 0){
                game_board += '<div class=\"null\"></div>';
            }
            else{
                game_board += '<div id=\"c'+Math.pow(2,board[k])+'\">'
                game_board += Math.pow(2,board[k]);
                game_board += '</div>'
            }

            if(k%4 == 0){
                game_board += '</div><div class="game-bar">';
            }
        }
    }
    else if(checkNull == 1){
        for(var k = 1; k<17; k++){
            if(k == first_Random_Add_loc){
                game_board += '<div id=\"c'+Math.pow(2,1)+'\">'
                game_board += Math.pow(2,1);
                game_board += '</div>'

                board[first_Random_Add_loc] = 1;
            }
            else if(board[k] == 0){
                game_board += '<div class=\"null\"></div>';
            }
            else{
                game_board += '<div id=\"c'+Math.pow(2,board[k])+'\">'
                game_board += Math.pow(2,board[k]);
                game_board += '</div>'
            }

            if(k%4 == 0){
                game_board += '</div><div class="game-bar">';
            }
        }
    }

    game_board += '</div>'

    $(".game").html(game_board);
}

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

    console.log("first : "+first_Random_loc+"   sec : "+second_Random_loc)
    
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

function key_Event(e) {
    console.log(e);

    if(e == 40){
        // 아래로
        var value = [1,2,3,4];

        var grab_Back_Place = false;

        for(var i = 0; i<4; i++){
            for(var j = 0; j<4; j++){
                if(j != 3){
                    var board_Input_Place = value[i] + (4*j);
                    var board_Next_Place = value[i] + (4*(j+1));


                    if(grab_Back_Place == true && board[board_Input_Place] == board[board_Next_Place] && board[board_Input_Place] != 0 && board[board_Next_Place] != 0 ){
                        var grab_Board_place = board_Input_Place - 4;
                        board[board_Next_Place] = board[board_Input_Place] + 1;
                        board[board_Input_Place] = board[grab_Board_place];

                        board[grab_Board_place] = 0;
                        grab_Back_Place = false;
                    }
                    else if(board[board_Input_Place] == board[board_Next_Place] && board[board_Input_Place] != 0 && board[board_Next_Place] != 0){
                        board[board_Next_Place] = board[board_Input_Place] + 1;
                        board[board_Input_Place] = 0;

                        if(j+2 < 4){
                            var board_Third_Place = value[i] + (4*(j+2));

                            if(board[board_Third_Place] == board[board_Next_Place]){
                                j++;
                                grab_Back_Place = true;
                            }
                        }

                    }
                    else if(board[board_Input_Place] != 0 && board[board_Next_Place] == 0){
                        board[board_Next_Place] = board[board_Input_Place];
                        board[board_Input_Place] = 0;
                    }
                    else if(board[board_Input_Place] != 0 && board[board_Next_Place] != 0){

                    }
                }
                else{
                    var first_Board_Value = value[i];
                    var second_Board_Value = value[i] + 4;
                    var third_Board_Value = value[i] + 8;
                    var forth_Board_Value = value[i] + 12;

                    if(board[second_Board_Value] == 0){
                        board[second_Board_Value] = board[first_Board_Value];
                        board[first_Board_Value] = 0;
                    }

                    if(board[third_Board_Value] == 0){
                        board[third_Board_Value] = board[second_Board_Value];
                        board[second_Board_Value] = board[first_Board_Value];
                        board[first_Board_Value] = 0;
                    }

                    if(board[forth_Board_Value] == 0){
                        board[forth_Board_Value] = board[third_Board_Value];
                        board[third_Board_Value] = board[second_Board_Value];
                        board[second_Board_Value] = board[first_Board_Value];
                        board[first_Board_Value] = 0;
                    }
                }

            }
        }

        print_Board();
    }
    else if(e == 38){
        // 위로

        var value = [13,14,15,16];

        console.log(board)

        var grab_Back_Place = false;

        for(var i = 0; i<4; i++){
            for(var j = 0; j<4; j++){
                if(j != 3){
                    var board_Input_Place = value[i] - (4*j);
                    var board_Next_Place = value[i] - (4*(j+1));

                    if(grab_Back_Place == true && board[board_Input_Place] == board[board_Next_Place] && board[board_Input_Place] != 0 && board[board_Next_Place] != 0 ) {
                        var grab_Board_place = board_Input_Place + 4;
                        board[board_Next_Place] = board[board_Input_Place] + 1;
                        board[board_Input_Place] = board[grab_Board_place];

                        board[grab_Board_place] = 0;
                        grab_Back_Place = false;
                    }
                    else if(board[board_Input_Place] == board[board_Next_Place] && board[board_Input_Place] != 0 && board[board_Next_Place] != 0){
                        board[board_Next_Place] = board[board_Input_Place] + 1;
                        board[board_Input_Place] = 0;

                        if(j+2 < 4){
                            var board_Third_Place = value[i] - (4*(j+2));

                            if(board[board_Third_Place] == board[board_Next_Place]){
                                j++;
                                grab_Back_Place = true;
                            }
                        }
                    }
                    else if(board[board_Input_Place] != 0 && board[board_Next_Place] == 0){
                        board[board_Next_Place] = board[board_Input_Place];
                        board[board_Input_Place] = 0;
                    }
                    else if(board[board_Input_Place] != 0 && board[board_Next_Place] != 0){

                    }
                }
                else{
                    var first_Board_Value = value[i];
                    var second_Board_Value = value[i] - 4;
                    var third_Board_Value = value[i] - 8;
                    var forth_Board_Value = value[i] - 12;

                    if(board[second_Board_Value] == 0){
                        board[second_Board_Value] = board[first_Board_Value];
                        board[first_Board_Value] = 0;
                    }

                    if(board[third_Board_Value] == 0){
                        board[third_Board_Value] = board[second_Board_Value];
                        board[second_Board_Value] = board[first_Board_Value];
                        board[first_Board_Value] = 0;
                    }

                    if(board[forth_Board_Value] == 0){
                        board[forth_Board_Value] = board[third_Board_Value];
                        board[third_Board_Value] = board[second_Board_Value];
                        board[second_Board_Value] = board[first_Board_Value];
                        board[first_Board_Value] = 0;
                    }
                }
            }
        }

        print_Board();
    }

    else if(e == 37){
        // 왼쪽

        var value = [4,8,12,16];

        var grab_Back_Place = false;

        for(var i = 0; i<4; i++){
            for(var j = 0; j<4; j++){
                if(j != 3){
                    var board_Input_Place = value[i] - j;
                    var board_Next_Place = value[i] - (j+1);

                    console.log("fr : "+board_Input_Place+"  sec : "+board_Next_Place);
                    if(grab_Back_Place == true && board[board_Input_Place] == board[board_Next_Place] && board[board_Input_Place] != 0 && board[board_Next_Place] != 0 ) {
                        var grab_Board_place = board_Input_Place + 1;
                        board[board_Next_Place] = board[board_Input_Place] + 1;
                        board[board_Input_Place] = board[grab_Board_place];

                        board[grab_Board_place] = 0;
                        grab_Back_Place = false;
                    }
                    else if(board[board_Input_Place] == board[board_Next_Place] && board[board_Input_Place] != 0 && board[board_Next_Place] != 0){
                        board[board_Next_Place] = board[board_Input_Place] + 1;
                        board[board_Input_Place] = 0;

                        if(j+2 < 4){
                            var board_Third_Place = value[i] - (j+2);

                            if(board[board_Third_Place] == board[board_Next_Place]){
                                j++;
                                grab_Back_Place = true;
                            }
                        }
                    }
                    else if(board[board_Input_Place] != 0 && board[board_Next_Place] == 0){
                        board[board_Next_Place] = board[board_Input_Place];
                        board[board_Input_Place] = 0;
                    }
                    else if(board[board_Input_Place] != 0 && board[board_Next_Place] != 0){

                    }
                }
                else{
                    var first_Board_Value = value[i];
                    var second_Board_Value = value[i] - 1;
                    var third_Board_Value = value[i] - 2;
                    var forth_Board_Value = value[i] - 3;

                    if(board[second_Board_Value] == 0){
                        board[second_Board_Value] = board[first_Board_Value];
                        board[first_Board_Value] = 0;
                    }

                    if(board[third_Board_Value] == 0){
                        board[third_Board_Value] = board[second_Board_Value];
                        board[second_Board_Value] = board[first_Board_Value];
                        board[first_Board_Value] = 0;
                    }

                    if(board[forth_Board_Value] == 0){
                        board[forth_Board_Value] = board[third_Board_Value];
                        board[third_Board_Value] = board[second_Board_Value];
                        board[second_Board_Value] = board[first_Board_Value];
                        board[first_Board_Value] = 0;
                    }
                }
            }
        }

        print_Board();
    }

    else if(e == 39){
        // 오른쪽

        var value = [1,5,9,13];

        var grab_Back_Place = false;


        for(var i = 0; i<4; i++){
            for(var j = 0; j<4; j++){
                if(j != 3){
                    var board_Input_Place = value[i] + j;
                    var board_Next_Place = value[i] + (j+1);

                    if(grab_Back_Place == true && board[board_Input_Place] == board[board_Next_Place] && board[board_Input_Place] != 0 && board[board_Next_Place] != 0 ) {
                        var grab_Board_place = board_Input_Place - 1;
                        board[board_Next_Place] = board[board_Input_Place] + 1;
                        board[board_Input_Place] = board[grab_Board_place];

                        board[grab_Board_place] = 0;
                        grab_Back_Place = false;
                    }
                    else if(board[board_Input_Place] == board[board_Next_Place] && board[board_Input_Place] != 0 && board[board_Next_Place] != 0){
                        board[board_Next_Place] = board[board_Input_Place] + 1;
                        board[board_Input_Place] = 0;

                        if(j+2 < 4){
                            var board_Third_Place = value[i] + (j+2);

                            if(board[board_Third_Place] == board[board_Next_Place]){
                                j++;
                                grab_Back_Place = true;
                            }
                        }
                    }
                    else if(board[board_Input_Place] != 0 && board[board_Next_Place] == 0){
                        board[board_Next_Place] = board[board_Input_Place];
                        board[board_Input_Place] = 0;
                    }
                    else if(board[board_Input_Place] != 0 && board[board_Next_Place] != 0){

                    }
                }
                else{
                    var first_Board_Value = value[i];
                    var second_Board_Value = value[i] + 1;
                    var third_Board_Value = value[i] + 2;
                    var forth_Board_Value = value[i] + 3;

                    if(board[second_Board_Value] == 0){
                        board[second_Board_Value] = board[first_Board_Value];
                        board[first_Board_Value] = 0;
                    }

                    if(board[third_Board_Value] == 0){
                        board[third_Board_Value] = board[second_Board_Value];
                        board[second_Board_Value] = board[first_Board_Value];
                        board[first_Board_Value] = 0;
                    }

                    if(board[forth_Board_Value] == 0){
                        board[forth_Board_Value] = board[third_Board_Value];
                        board[third_Board_Value] = board[second_Board_Value];
                        board[second_Board_Value] = board[first_Board_Value];
                        board[first_Board_Value] = 0;
                    }
                }
            }
        }

        print_Board();
    }
    console.log(board);
}

$(document).ready(function () {
    init_Game();
});

$(document).keydown(function (event) {
    var keyCode = event.keyCode;
    key_Event(keyCode);
});