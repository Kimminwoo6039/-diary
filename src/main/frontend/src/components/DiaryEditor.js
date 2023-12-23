import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useRef, useState} from "react";

import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import EmotionItem from "./EmotionItem";
import {DiaryDispatchCOntext} from "../App";
import {getStringDate} from "../utils/date";
import {emotionList} from "../utils/emotion";


const DiaryEditor = ({isEdit,originData}) => {
    const contentRef = useRef();
    const [content, setContent] = useState("");
    /// TODO : 이모션 감정 함수
    const [emotion, setEmotion] = useState(3);
    const [date, setDate] = useState(getStringDate(new Date()));

    const {onCreate,onEdit,onRemove} = useContext(DiaryDispatchCOntext)
    const handleclickEmote = (emotion) => {
        setEmotion(emotion);
    }

    const handelSubmit = () => {
        if (content.length <1) {
            contentRef.current.focus();
            return;
        }

        if (window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")) {
            if (!isEdit) {
                onCreate(date,content,emotion);
            } else {
                onEdit(originData.id,date,content,emotion);
            }
        }

        navigator('/',{replace:true}) /*작성페이지로 못가게*/
    }

    const handelRemove = () => {
        if (window.confirm("정말 삭제하시껫습니까 ?")) {
            onRemove(originData.id);
            navigator("/",{replace:true});
        }
    }

    const navigator = useNavigate();

    /// TODO : 에디터 eDIT 수정에서만 적용
    useEffect(() => {
        if (isEdit) {
            setDate(getStringDate(new Date(originData.date)))
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    }, [isEdit,originData]);

    return (
        <div className="DiaryEditor">
            <MyHeader headText={isEdit ? "일기 수정하기" : "새 일기쓰기"}
                      leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigator(-1)}/>}
                      rightChild={isEdit && (
                          <MyButton text={"삭제하기"} type={"negative"} onClick={handelRemove}/>
                      )}
            />
            <div>
                <section>
                    <h4>오늘은 언제인가요 ?</h4>
                    <div className="input_box">
                        <input className="input_date" type="date" value={date}
                               onChange={(e) => setDate(e.target.value)}/>
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className="input_box emotion_list_wrapper">
                        {emotionList.map((it) => (
                            <EmotionItem key={it.emotion_id} {...it} onClick={handleclickEmote}
                                         isSelected={it.emotion_id === emotion}/>
                        ))}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box text_wrapper">
                        <textarea ref={contentRef}
                                  placeholder={"오늘은어땟나요?"}
                                  value={content}
                                  onChange={(e) => setContent(e.target.value)}/>
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton text={"취소하기"} onClick={()=>navigator(-1)} />
                        <MyButton text={"작성완료"} type={"positive"} onClick={handelSubmit}/>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default DiaryEditor;