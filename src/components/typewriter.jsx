import React, { useState, useEffect, useRef } from 'react';
const Typewriter = ({ textVal, onSendData, setHeight }) => {
  // const [displayText, setDisplayText] = useState('');
  const displayText = useRef('');
  let index = 0
  // useEffect(() => {
  //   if (textVal && textVal.length > 0) {
  //     const interval = setInterval(() => {
  //       if (index < textVal.length) {
  //         setDisplayText((prevText) => {
  //           console.log(prevText + textVal.charAt(index))
  //           return prevText + textVal.charAt(index)
  //         })
  //         // setIndex(prevIndex => prevIndex + 1);
  //         if (setHeight) {
  //           setHeight()
  //         }
  //         index += 1
  //       } else {
  //         if (textVal.length !== 0 && index === textVal.length) {
  //           if (onSendData) {
  //             onSendData()
  //           }
  //           if (setHeight) {
  //             setHeight()
  //           }
  //         }
  //         clearInterval(interval);
  //       }
  //     }, 10); // 调整这个时间间隔来控制打字速度

  //     return () => clearInterval(interval);
  //   }
  // }, [textVal])
  useEffect(() => {
    const animateTyping = () => {
      if (index < textVal.length) {
        index++;
        displayText.current = textVal.substring(0, index)
        if (setHeight) {
          setHeight()
        }
        requestAnimationFrame(animateTyping);
      } else {
        if (textVal.length !== 0 && index === textVal.length) {
          if (onSendData) {
            onSendData()
          }
          if (setHeight) {
            setHeight()
          }
        }
        cancelAnimationFrame(requestAnimationFrame(animateTyping));
      }
    };
    requestAnimationFrame(animateTyping);
    return () => {
      // 清理动画帧请求，当组件卸载时停止动画
      cancelAnimationFrame(requestAnimationFrame(animateTyping));
    };
  }, [textVal]);
  // useEffect(() => {
  //   function typeWriter () {
  //     if (index < textVal.length) {
  //       // setDisplayText(prevText => prevText + (textVal[index] ? textVal[index] : ''));
  //       // setDisplayText((prevText) => {
  //       //   if (textVal[index] !== undefined) {
  //       //     return prevText + textVal[index]
  //       //   } else {
  //       //     return prevText
  //       //   }
  //       // })
  //       displayText.current = textVal.substring(0, index)
  //       index++;
  //       setTimeout(typeWriter, 10); // 调整这个时间间隔来控制打字速度
  //       if (setHeight) {
  //         setHeight()
  //       }
  //     } else {
  //       if (textVal.length !== 0 && index === textVal.length) {
  //         if (onSendData) {
  //           onSendData()
  //         }
  //         if (setHeight) {
  //           setHeight()
  //         }
  //       }
  //     }
  //   }
  //   if (textVal && textVal.length > 0) {
  //     typeWriter();
  //   }
  // }, [textVal])
  return (
    <>
      {/* <span>{index}</span> */}
      <span>{displayText.current}</span>
    </>
  )
}
export default Typewriter