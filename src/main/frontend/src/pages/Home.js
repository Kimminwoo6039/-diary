import {useContext, useEffect, useState} from "react";
import {DiaryStateContext} from "../App";


import MyHeader from "../components/MyHeader";
import MyButton from "../components/MyButton";
import DiaryList from "../components/DiaryList";
const Home = () => {

    // dummy 데이터 전달 가져옴
    const diaryList = useContext(DiaryStateContext);
    console.log(diaryList);
    
    // 날짜가 이동하면 diaryList 현재 월의 일기만 뽑아냄
    const [data,setData] = useState([]);

    // 현재시간으로 상태 값 가져오기
    const [curDate,setCurDate] = useState(new Date());

    // 해당 년도 및 월
    const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`

    useEffect(() => {
        if (diaryList.length >= 1) {
            const firstDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth(),
                1
            ).getTime();


            const lastDay = new Date(
                curDate.getFullYear(),
                curDate.getMonth() + 1,
                0,
                23,
                59,
                59
            ).getTime();

            setData(diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay));
        }
    }, [diaryList,curDate]);

    // 1월씩 증가
    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1 , curDate.getDate() ))
    }

    // 1월씩 감소
    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1 , curDate.getDate() ))
    }

    useEffect(() => {
        console.log(data);
    }, [data]);
  return (
      <div>
        <MyHeader headText={headText}
        leftChild={<MyButton text={"<"} onClick={decreaseMonth} />}
        rightChild={<MyButton text={">"} onClick={increaseMonth}/>}
        />
          <DiaryList diaryList={data} />
      </div>
  );
}

export default Home;