const MyButton = ({text,type,onClick}) => {

    // positive 나 negative 아니면 강제로 default 타입으로 넣어줌
    const btnType = ['positive','negative'].includes(type)? type:'default';

  return (
      // class 이름을 추가생성해준다.
      <button className={["MyButton",`MyButton_${btnType}`].join(" ")} onClick={onClick}>
          {text}
      </button>
  )
}

// default 값이 type 이 default
MyButton.defaultProps = {
    type: "default",
};

export default MyButton;