//일정 데이터가 들어 있는 배열 선언
// const idx = 0;
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

//할 일 추가 이벤트
const $addButton = document.getElementById('add');
    // console.log($addButton); 
$addButton.addEventListener('click',addTodoList);
function addTodoList() {
    //input태그 입력값가져오기    
    const $todoText = document.getElementById('todo-text').value;
    console.log($todoText);

    
    const $todoList = document.querySelector('ul.todo-list');
    //복제해서 input태그 입력값으로 수정 후 todoList에 추가
    const $clone = document.querySelector('.todo-list-item').cloneNode(true);
    // $clone.textContent = $todoText;
    console.log($clone);
    $clone.querySelector('.text').textContent = $todoText;
    // console.log($todoList.children.length);
    $clone.dataset.id = $todoList.children.length+1;

    $todoList.appendChild($clone);
}

//할 일 완료(체크박스) 이벤트
//체크박스 체크되어있으면 done클래스 추가 아니면 제거
const $inputCheckbox = document.querySelector('input[type=checkbox');
$inputCheckbox.addEventListener('change',changeDone);
const $checkbox = document.querySelector('.checkbox');
function changeDone() {
    // console.log('change');
    $checkbox.classList.toggle('done')
}

//할 일 수정 이벤트 (수정 모드 진입, 수정 완료)
const $modify = document.querySelector('.modify');
$modify.addEventListener('click', modify);

function modify() {
    console.log('update');
    const $text = document.querySelector('.text');
    $text.innerHTML = '<input type="text">'; 
}

//할 일 삭제 이벤트
const $remove = document.querySelector('.remove');
$remove.addEventListener('click',remove);
function remove() {
    const $todoList = document.querySelector('ul.todo-list');
    $todoList.removeChild($remove.parentNode);
    // console.log($remove.parentNode);
}

//메인 역할을 하는 즉시 실행 함수
(function() {

    //할 일 추가 이벤트
    
    //할 일 완료(체크박스) 이벤트

    //할 일 삭제 이벤트

    //할 일 수정 이벤트 (수정 모드 진입, 수정 완료)

}());