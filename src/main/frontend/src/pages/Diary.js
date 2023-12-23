import {useNavigate, useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {DiaryDispatchCOntext, DiaryStateContext} from "../App";
import MyHeader from "../components/MyHeader";
import {getStringDate} from "../utils/date";
import MyButton from "../components/MyButton";
import {emotionList} from "../utils/emotion";

const Diary = () => {

    const {id} = useParams(); // 전달받아서 모아서 객체
    const diaryList = useContext(DiaryStateContext);
    const [data,setData] = useState();
    const navigator = useNavigate();

    useEffect(() => {
        if (diaryList.length >= 1) {
            const targetDiary = diaryList.find(
                (it) => parseInt(it.id) === parseInt(id)
            );


            if (targetDiary) {
                // 일기가 존재할때
                setData(targetDiary);
            } else {
                // 일기가 없을때
                alert("없는 일기입니다.");
                navigator('/',{replace:true});
            }
        }
    }, [id,diaryList]);

    if (!data) {
        return <div className="DiaryPage">로딩중입니다...</div>
    } else {

        const curEmotionData = emotionList.find(
            (it) => parseInt(it.emotion_id) === parseInt(data.emotion)
        );

        return (
        <div className="DiaryPage">
            <MyHeader headText={`${getStringDate(new Date(data.date))} 기록`}
            leftChild={<MyButton text={"< 뒤로가기"} onClick={()=>{navigator(-1)}} />}
            rightChild={<MyButton text={"수정하기"} type={"positive"} onClick={()=> {navigator(`/edit/${data.id}`)}} />}
            />
            <article>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className={["diary_img_wrapper",`diary_img_wrapper_${data.emotion}`].join(" ")}>
                        <img src={curEmotionData.emotion_img}  />
                        <div className="emotion_descript">
                            {curEmotionData.emotion_descript}
                        </div>
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className="diary_content_wrapper">
                        <p>{data.content}</p>
                    </div>
                </section>
            </article>

        </div>
        );
    }

    return (
        <div>
            <h1>Diary</h1>
            <p>이곳은 일기 상세 페이지 입니다.</p>
        </div>
    );


}

export default Diary;