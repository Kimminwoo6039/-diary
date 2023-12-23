import React, {useContext, useEffect, useReducer, useRef} from "react";


import "./App.css"
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Home from "./pages/Home"
import New from "./pages/New";
import Edit from "./pages/Edit";
import Diary from "./pages/Diary";


const reducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case 'INIT': {
            return action.data;
        }
        case 'CREATE': {
            newState = [action.data, ...state];
            break
        }
        case 'REMOVE': {
            newState = state.filter((it) => it.id !== action.targetId);
            break;
        }
        case 'EDIT': {
            newState = state.map((it) => it.id === action.data.id ? {...action.data} : it);
            break;
        }
        default:
            return state;
    }

    localStorage.setItem('diary',JSON.stringify(newState));
    return newState;
}

export const DiaryStateContext = React.createContext();
export const DiaryDispatchCOntext = React.createContext();

const dummyData = [
    {
    id : 1,
    emotion:1,
    content:"오늘의 일기1번",
    date:1703315845850
    },
    {
        id : 2,
        emotion:2,
        content:"오늘의 일기2번",
        date:1703315845851
    },
    {
        id : 3,
        emotion:3,
        content:"오늘의 일기3번",
        date:1703315845852
    },
    {
        id : 4,
        emotion:4,
        content:"오늘의 일기4번",
        date:1703315845853
    },
    {
        id : 5,
        emotion:5,
        content:"오늘의 일기5번",
        date:1703315845854
    },
]

function App() {

    // Session 6
    const [data, disptch] = useReducer(reducer, []);


    useEffect(() => {
        const localData = localStorage.getItem('diary');
        if (localData) {
            const diaryList = JSON.parse(localData).sort((a,b) => parseInt(b.id) - parseInt(a.id));
            dataId.current = parseInt(diaryList[0].id +1);


            console.log(diaryList);
            console.log(dataId);

            disptch({type:"INIT",data : diaryList});
        }
    }, []);

    console.log(new Date().getTime());

    const dataId = useRef(0);

    // CREATE
    const onCreate = (date, content, emotion) => {
        disptch({
            type: "CREATE", data: {
                id: dataId.current,
                date: new Date(date).getTime(),
                content,
                emotion
            }
        })
        dataId.current += 1;
    }
    // REMOVE
    const onRemove = (targetId) => {
        disptch({type: "REMOVE", targetId});
    }
    // EDIT
    const onEdit = (targetId, date, content, emotion) => {
        disptch({
            type: "EDIT",
            data: {
                id : targetId,
                date : new Date(date).getTime(),
                content,
                emotion,
            }
        })
    }

    return (
        <DiaryStateContext.Provider value={data}>
            <DiaryDispatchCOntext.Provider DiaryDispatchCOntext
            value={{
            onCreate,
            onEdit,
            onRemove,
            }}
            >
        <BrowserRouter>
            <div className="App">
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/new' element={<New/>}/>
                    <Route path='/edit/:id' element={<Edit/>}/>
                    <Route path='diary/:id' element={<Diary/>}/> diary/:id
                </Routes>
            </div>
        </BrowserRouter>
            </DiaryDispatchCOntext.Provider>
        </DiaryStateContext.Provider>
    );
}

export default App;