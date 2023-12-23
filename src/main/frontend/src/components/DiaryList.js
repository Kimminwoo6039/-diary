import React, {useEffect, useState} from "react";
import MyButton from "./MyButton";
import {useNavigate} from "react-router-dom";
import DiaryItem from "./DiaryItem";


/// TODO : 검색 조건 옵션
const sortOptionList = [
    {value: "latest" , name : "최신순"},
    {value: "oldest" , name : "오래된 순"},
]

/// TODO : 감정 필터 옵션
const fileterOptionList = [
    {value:"all",name:"전부다"},
    {value:"good",name:"좋은 감정만"},
    {value:"bad",name:"안 좋은 감정만"},
]


/// TODO : 컨트롤러 메뉴  오래된순,최신순
const ControlMenu = React.memo(({ value,onChange,optionList }) => {
    return <select className="ControlMenu"  value={value} onChange={(e)=>onChange(e.target.value)}>
        {optionList.map((it,idx) => <option key={idx} value={it.value}>{it.name}</option>)}
    </select>
});


/// TODO: 메인 내용
const DiaryList = ({diaryList}) => {

    const navigate = useNavigate();

    // 정렬
    const [sortType,setSortType] = useState("latest");
    const [filter,setFilter] = useState("all");

    const getProcessedDiaryList = () => {

        /// TODO : 감정들 필터링
        const filterCallBack = (item) => {
            if (filter === "good") {
                return parseInt(item.emotion) <= 3;
            } else {
                return parseInt(item.emotion) > 3;
            }
        }

        /// TODO : 정렬
        const compare = (a,b) => {
            if (sortType === 'latest') {
                return parseInt(b.date) - parseInt(a.date);
            } else {
                return parseInt(a.date) - parseInt(b.date);
            }
        }

        // JSON.stringify(diaryList) => 문자  , json.parse 배열 변환해줌
        const copyList = JSON.parse(JSON.stringify(diaryList));

        /// TODO : 감정 필터링 걸림
        const filteredList = filter === "all" ? copyList : copyList.filter((it)=> filterCallBack(it));

        const sortList = filteredList.sort(compare);
        return sortList;
    };
    
  return (
      <div className="DiaryList">
          <div className="menu_wrapper">
              <div className="left_col">
                  <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
                  <ControlMenu value={filter} onChange={setFilter} optionList={fileterOptionList} />
              </div>
              <div className="right_col">
                  <MyButton type={"positive"} text={"새 일기 쓰기"} onClick={()=> navigate("/new")}/>
              </div>
          </div>
          {getProcessedDiaryList().map((it)=> (
             <DiaryItem key={it.id} {...it} />
          ))}
      </div>
  )
}


DiaryList.defaultProps = {
 defaultProps : [],
}

export  default  DiaryList;