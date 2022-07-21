//일정 데이터가 들어 있는 배열 선언
const todos = [
    {
        id: 1,
        text: '할 일 1',
        done: false //checkbox를 클릭해서 할 일을 마쳤는지의 여부
    },
    {
        id: 2,
        text: '할 일 2',
        done: false //checkbox를 클릭해서 할 일을 마쳤는지의 여부
    },
    {
        id: 3,
        text: '할 일 3',
        done: false //checkbox를 클릭해서 할 일을 마쳤는지의 여부
    }
];

/*추가될 할 일 객체의 id를 생성해 주는 함수 정의*/
function makeNewId() {
    if(todos.length > 0) { //객체가 존재
        return todos[todos.length-1].id + 1; //마지막요소의 id + 1
    } else { //객체가 없으면 첫번째
        return 1;
    }
}

/*화면에 표현할 .todo-list-item 노드를 생성하는 함수 정의*/
//innerHTML이나 태그생성이용해서 생성..
function makeNewToDoNode(newTodo) {
    const $li = document.createElement('li');
    const $label = document.createElement('label');
    const $divMod = document.createElement('div');
    const $divRem = document.createElement('div');

    //laber 태그 작업
    $label.classList.add('checkbox');
    const $check = document.createElement('input');
    $check.setAttribute('type','checkbox');
    const $span = document.createElement('span');
    $span.classList.add('text');
    $span.textContent = newTodo.text;
    $label.appendChild($check);
    $label.appendChild($span);

    /* innerHTML사용시
    $label.innerHTML = `<input type="checkbox">
    <span class="text"> ${newTodo.text} </span>`;
     */

    //수정 div태그 작업
    $divMod.classList.add('modify');
    const $modIcon = document.createElement('span');
    $modIcon.classList.add('lnr', 'lnr-undo');
    //클래스이름 두개이상 add할때 각각 지정! 한번에 공백 포함 두개 이상 설정하면 에러!!
    $divMod.appendChild($modIcon);

    //삭제 div태그 작업
    $divRem.classList.add('remove');
    const $remIcon = document.createElement('span');
    $remIcon.className = 'lnr lnr-cross-circle';
    //className으로 설정할때는 한번에 지정 가능
    $divRem.appendChild($remIcon);

    //li태그 작업
    $li.dataset.id = newTodo.id; //data-id 와 객체의 id 일치시키기
    $li.classList.add('todo-list-item');

    for(let $ele of [$label, $divMod, $divRem]) {
        $li.appendChild($ele);
    }

    //ul 태그를 지목해서 $li를 자식노드로 추가
    document.querySelector('.todo-list').appendChild($li);
}


/*할 일 추가 처리 함수 정의*/
function insertToDoData() {
    console.log('할일 추가 함수 호출');
    //사용자의 할일
    const $todoText = document.getElementById('todo-text');

    //입력값 검증 진행(입력값 없다면 추가 처리 진행 안함)
    //공백이 들어갈 가능성이 있기 때문에 공백을 제거하고 비교
    if($todoText.value.trim() === '') {
        $todoText.style.background = 'orangered';
        $todoText.setAttribute('palceholder','필수 입력사항입니다!');
        $todoText.value = '';
        return;
    } else {
        //제대로 입력이 되었다면 속성과 디자인을 초기화.
        $todoText.setAttribute('palceholder', '할 일을 입력하세요.');
        $todoText.style.background = '';
    }

    //1.todos 배열에 객체를 생성한 후 추가
    const newTodo = {
        id : makeNewId(), //id확인 함수
        text: $todoText.value,
        done: false
    };
    todos.push(newTodo);

    //2.추가된 데이터를 화면에 표현 (li태그를 추가)
    makeNewToDoNode(newTodo); //li추가 함수

    //3.입력 완료 후 input에 존재하는 문자열을 제거
    $todoText.value = '';
}

/*data-id 값으로 배열을 탐색하여 일치하는 객체가 들어있는 인덱스 반환하는 함수 정의*/
function findIndexByDataId(dataId) {
    for(let i=0; i<todos.length; i++) {
        if(dataId === todos[i].id) {
            return i; //index반환
        }
    }
}

/*할 일 완료 처리 수행 함수 정의*/
function changeCheckState($label) {

    //할 일 완료된 노드의 클래스 이름을 추가(디자인 변경하려고)
    //checked를 상황에 따라서 추가하거나 삭제할 수 있어야하기 때문에 toggle 함수로 처리.
    $label.classList.toggle('checked');

    //dataId를 기반으로 배열을 탐색하여
    //data-id와 일치하는 id프로퍼티를 가진 객체의 인덱스를 얻어올 예정.
    const dataId = +$label.parentNode.dataset.id;//'+'number타입으로 변경
    const index = findIndexByDataId(dataId); 
    //인덱스 탐색하는 함수는 다른 곳에서도 쓸거니까 함수로 따로 정의

    todos[index].done = !todos[index].done;
    //논리반전을 이용해 클릭할때마다 현재값에 반전값을 넣음(true/false가 바뀜)

    console.log(todos);
}

/* 할 일 삭체 처리 함수 정의 */
function removeToDoData($deltarget) { // $deltarget == $li
    //애니메이션 적용을 위해 클래스 이름 추가(delMoving)
    $deltarget.classList.add('delMoving');

    //removeChild 진행 전에 애니메이션 발동 및 배열 
    //내부 객체 삭제가 진행 될 수 있도록 에니메이션 진행 시간만큼 지연.
    setTimeout(() => {
        document.querySelector('.todo-list').removeChild($deltarget);
    }, 1500); //1.5s 후에 ul의 자식(li)를 지워라

    //배열 내에 있는 객체도 삭제를 진행.
    const index = findIndexByDataId(+$deltarget.dataset.id);
    todos.splice(index,1); //index부터 1개 삭제.

    console.log(todos);
}

/* 수정 모드 진입 이벤트 함수 정의 */
function enterModifyMode($modSpan) {
    //수정 모드 진입 버튼을 교체(lnr-undo -> lnr-checkmark-circle)
    $modSpan.classList.replace('lnr-undo', 'lnr-checkmark-circle');

    //sapn.text를 input태그로 교체(삭제하고 추가)
    const $label = $modSpan.parentNode.previousElementSibling;
    //e.target의 부모의 이전 형제의 마지막자식
    const $textSpan = $label.lastElementChild;

    const $modInput = document.createElement('input');
    $modInput.setAttribute('type','text');
    $modInput.classList.add('mod-input');
    $modInput.setAttribute('value', $textSpan.textContent); //사용자가 원래 입력한 text

    $label.replaceChild($modInput, $textSpan);
    //modInput을 textSpan로 교체
}

/* 수정 완료 이벤트 처리 함수 정의 */
function modifyToDoData($modCompleteSpan) {
    //버튼을 원래대로 교체
    $modCompleteSpan.classList.replace('lnr-checkmark-circle','lnr-undo');

    //input태그를 다시 span.text로 변경
    const $label = $modCompleteSpan.parentNode.previousElementSibling;
    const $modInput = $label.lastElementChild;

    const $textSpan = document.createElement('span');
    $textSpan.textContent = $modInput.value;
    $textSpan.classList.add('text');

    $label.replaceChild($textSpan, $modInput);

    //객체에 수정된 정보 반영
    const index = findIndexByDataId(+$label.parentNode.dataset.id);
    todos[index].text = $textSpan.textContent;

    console.log(todos);
}


/*메인 역할을 하는 즉시 실행 함수*/
(function() {

    /*할 일 추가 이벤트*/
    //더하기 버튼 취득
    const $addBtn = document.getElementById('add');
    $addBtn.addEventListener('click', e => {

        //e.preventDefault();
        //index.html에서 form태그안에 button의 타입명시안하면 버튼의 고유기능(submit) 막아야함.

        insertToDoData(); //할일함수
    });


    /*할 일 완료(체크박스) 이벤트*/
    const $todoList = document.querySelector('ul.todo-list');//ul에 이벤트 걸어서 전파

    $todoList.addEventListener('change', e => {
        if(!e.target.matches('input[type=checkbox]')) {
            return; //checkbox에서만 발생할수있도록 
        }

        changeCheckState(e.target.parentNode); //label을 함수의 매개값으로 전달.
    });


    /*할 일 삭제 이벤트*/
    $todoList.addEventListener('click', e => { //ul에 이벤트 걸어서 전파
        if(!e.target.matches('.todo-list .remove span')) {
            return;
        }

        //삭제 함수
        removeToDoData(e.target.parentNode.parentNode); //div-li
    })


    /*할 일 수정 이벤트 (수정 모드 진입, 수정 완료)*/
    $todoList.addEventListener('click', e => { //ul에 이벤트 걸어서 전파
        if(e.target.matches('.todo-list .modify span.lnr-undo')) { //기본 수정 아이콘
            //수정 모드 진입
            enterModifyMode(e.target); //수정모드 함수
        } else if(e.target.matches('.todo-list .modify span.lnr-checkmark-circle')) {
            //수정 완료
            modifyToDoData(e.target); //수정모드에서 수정을 확정지으려는 함수.
        } else {
            return;
        }
    })
}());