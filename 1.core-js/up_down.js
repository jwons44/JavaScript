
//필요한 데이터: 랜덤숫자, 횟수카운트, 카운트다운, 최소값, 최대값

//최대범위를 저장할 변수
const MAX = 100;

//게임에 필요한 데이터 객체 생성
const gameDate = {
    secret_num : Math.floor(Math.random()*MAX) + 1,
    count : 0,
    countdown : 6,
    min : 1,
    max : MAX
};

//--------------------함수 정의부-----------

//사용자의 입력을 수행하는 함수
function inputNumber() {

    //객체에서 min과 max의 값을 뽑아서 메세지를 완성시켜줌.    
    
    //객체 디스트럭쳐링(ES6): 데이터 참조시에만 사용 가능
    //수정, 추가 시에는 사용 불가.
    // const min = gameDate.min;
    // const max = gameDate.max; 
    const {min,max} = gameDate; //두 줄 합친것.

    //사용자의 입력값을 객체에 추가
    gameDate.answer = +prompt(`숫자를 입력하세요! [${min} ~ ${max}]`);

    gameDate.count++;
    gameDate.countdown--;

    return checkNumber();
}

//사용자의 엽력값을 검증하는 함수
function checkNumber() {
    const {secret_num, count, answer, countdown} = gameDate;

    if(secret_num === answer) {
        alert('정답입니다.' + count + '번 만에 맞추셨군요!');
        checkCountDown(countdown); //게임 승패 확인
        return true; //프로그램 종료
    } else if(secret_num > answer){
        alert('UP!!!');
        gameDate.min = answer + 1; //사용자가 입력한 값보다 +1
    } else {
        alert('DOWN!!!');
        gameDate.max = answer - 1;//사용자가 입력한 값보다 -1
    }
    alertCountDown(countdown);

    return false; //false여야 게임이 계속 진행됨
}

//사용자의 카운트다운을 체크하여 승리여부를 알려주는 함수
function checkCountDown(countdown){
    if(countdown > 0) {
        alert('You Win :-D');
    } else {
        alert('You Lose ㅠ.ㅠ');
    }
}

//사용자의 남은 카운트다운을 알려주는 함수
function alertCountDown(countdown){
    if(countdown > 0){
        alert('정답 기회' + countdown + '번 남음');
    } else {
        alert('정답 기회 모두 소진! 문제를 계속 풀어주세요~');
    }
}




//핵심 실행부(main의 역할을 하는 함수)
//즉시 실행 함수로 선언하여 따로 호출하지 않아도 바로 실행될 수 있도록 작성.

(function(){
    alert('[UP & DOWN 게임 - 1 ~ 100 사이의 숫자를 맞춰보세요!]')
    while(!inputNumber()){ 
        //false가 리턴되면 게임 계속 진행
        //ture가 리턴되면 프로그램 종료
    }
}());