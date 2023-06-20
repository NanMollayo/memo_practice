from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.staticfiles import StaticFiles


class Memo(BaseModel):
    id: str
    content: str


memos = []

app = FastAPI()


@app.post("/memos")
def creat_memo(memo: Memo):
    memos.append(memo)
    return "메모추가됨"


@app.get("/memos")
def get_memo():
    return memos


@app.put("/memos/{memo_id}")
def put_memo(req_memo: Memo):
    for m in memos:  # 배열에 있는 요소마다 실행함
        if m.id == req_memo.id:  # 배열의 id와 요청받은 버튼의 id가 같으면
            m.content = req_memo.content  # 콘텐츠를 덮어씌운다
            return "수정성공"
    return "수정오류"  # 이상한 id를 받은 경우


@app.delete("/memos/{memo_id}")
def del_memo(memo_id):
    for index, m in enumerate(memos):  # for문에서 인덱스와 내용물 모두 뽑아주는 구문 enumerate
        if m.id == memo_id:  # 메모스 안의 id와 동일하면
            memos.pop(index)  # 해당 인덱스를 삭제
            return "삭제성공"
    return "삭제오류"


app.mount("/", StaticFiles(directory="static", html=True), name="static")
