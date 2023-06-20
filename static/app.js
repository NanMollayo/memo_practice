async function delMemo(event) {
  const id = event.target.dataset.id;
  const res = await fetch(`/memos/${id}`, {
    //delete 삭제 요청
    method: "DELETE",
  });
  readMemo();
}

async function editMemo(event) {
  //console.log(event.target.dataset.id);
  const id = event.target.dataset.id;
  const editInput = prompt("수정할 값 입력");
  const res = await fetch(`/memos/${id}`, {
    //put 덮어쓰기 요청
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id,
      content: editInput,
    }),
  });
  readMemo();
}

function displayMemo(memos) {
  const ul = document.querySelector("#memo_ul");
  const li = document.createElement("li");
  const edtbtn = document.createElement("button");
  const delbtn = document.createElement("button");

  edtbtn.innerText = "수정하기";
  edtbtn.addEventListener("click", editMemo);
  edtbtn.dataset.id = memos.id; //버튼과 해당 메모의 아이디를 일치시킴

  delbtn.innerText = "삭제";
  delbtn.addEventListener("click", delMemo);
  delbtn.dataset.id = memos.id;

  //li.innerText = `[id:${memos.id}]${memos.content}`;
  li.innerText = memos.content;
  ul.appendChild(li);
  li.appendChild(edtbtn);
  li.appendChild(delbtn);
}

async function readMemo() {
  const res = await fetch("/memos"); //get. 서버에서 받아오는 요청
  const jsonRes = await res.json();
  //console.log(jsonRes);
  const ul = document.querySelector("#memo_ul");
  ul.innerText = "";
  jsonRes.forEach(displayMemo);
}

//readMemo();

async function creatMemo(value) {
  const res = await fetch("/memos", {
    //post 서버에 올리는 요청
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: new Date(), //메모별 아이디는 만들어진 시간을 기준으로 생성
      content: value,
    }),
  });
  const jsonRes = await res.json();
  readMemo();
  //console.log(value);
}

function handleSubmit(event) {
  event.preventDefault();
  const input = document.querySelector("#memo_input");
  //console.log(input.value);
  creatMemo(input.value);
  input.value = "";
}

const form = document.querySelector("#memo_form");
form.addEventListener("submit", handleSubmit);
readMemo();
