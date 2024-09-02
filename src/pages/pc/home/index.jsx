import './index.scss'
import React, { useState, useEffect, useRef } from 'react';
import { json, useLocation, useNavigate, useParams } from "react-router-dom";
import logoIcon from '@/assets/image/logoIcon.png'
import * as echarts from 'echarts';
import { Spin, message } from "antd";
import { getPaperList, getDataSearch, getDataContinue, exportReport } from '@/api/common.js'
import Typewriter from '@/components/typewriter.jsx'
const Home = () => {
  const [parentBoxScroll, setParentBoxScroll] = useState(true);
  const parentBoxContainer = useRef()
  const chartRef_problem = useRef();
  const chartRef_method = useRef();
  const chartRef_experiment = useRef();
  const problemContentBoxContainer = useRef();
  const problemLineBoxContainer = useRef();
  const methodContentBoxContainer = useRef();
  const methodLineBoxContainer = useRef();
  const experimentContentBoxContainer = useRef();
  const experimentLineBoxContainer = useRef();
  const ideateContentBoxContainer = useRef();
  let animationFrame;
  let itemWidth;
  const pxTorem = (px) => {
    return (px / 192).toFixed(4) + 'rem'
  }
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [contentLine1Style, setContentLine1Style] = useState({
    height: pxTorem(26 + 45 + 26 + 22 + 60 - 25 + 200)
  });
  const [contentLine1TopStyle, setContentLine1TopStyle] = useState({
    height: 0
  });
  const [contentLine2Style, setContentLine2Style] = useState({
    height: pxTorem(26 + 45 + 26 + 22 + 60 - 25)
  });
  const [contentLine2TopStyle, setContentLine2TopStyle] = useState({
    height: 0
  });
  const [problemLineHeight, setProblemLineHeight] = useState(0)
  const [methodLineHeight, setMethodLineHeight] = useState(0)
  const [experimentLineHeight, setExperimentLineHeight] = useState(0)
  const [contentLine3Style, setContentLine3Style] = useState({
    height: pxTorem(26 + 45 + 26 + 22 + 60 - 25)
  });
  const [contentLine3TopStyle, setContentLine3TopStyle] = useState({
    height: 0
  });
  const [contentLine4Style, setContentLine4Style] = useState({
    height: pxTorem(26 + 45 + 26 + 22 + 60 - 25)
  });
  const [contentLine4TopStyle, setContentLine4TopStyle] = useState({
    height: 0
  });
  const [paperListData, setPaperListData] = useState([])
  const [parentBoxMouseIsMove, setParentBoxMouseIsMove] = useState(false)
  const [parentBoxMouseIsMovePoint, setParentBoxMouseIsMovePoint] = useState({
    x: 0,
    y: 0
  })
  const [temporaryTranslateX, setTemporaryTranslateX] = useState(0)
  const [myChart_problem, setMyChart_problem] = useState(null)
  const [myChart_method, setMyChart_method] = useState(null)
  const [myChart_experiment, setMyChart_experiment] = useState(null)
  const [data_problem, setData_problem] = useState({
    problemText: '',
    chartData: {

    },
    rationale: ''
  })
  const [bottomText_problem, setBottomText_problem] = useState('')
  const [problemIsComplete, setProblemIsComplete] = useState(false)
  const [loadComplete_problemText, setLoadComplete_problemText] = useState(false)
  const [loadComplete_problemRationale, setLoadComplete_problemRationale] = useState(false)
  const [data_method, setData_method] = useState({
    methodText: '',
    chartData: {

    },
    rationale: ''
  })
  const [methodIsComplete, setMethodIsComplete] = useState(false)
  const [loadComplete_methodText, setLoadComplete_methodText] = useState(false)
  const [loadComplete_methodRationale, setLoadComplete_methodRationale] = useState(false)
  const [data_experiment, setData_experiment] = useState({
    experimentText: '',
    chartData: {

    },
    rationale: ''
  })
  const [experimentIsComplete, setExperimentIsComplete] = useState(false)
  const [loadComplete_experimentText, setLoadComplete_experimentText] = useState(false)
  const [loadComplete_experimentRationale, setLoadComplete_experimentRationale] = useState(false)
  const [data_ideate, setData_ideate] = useState({
    problem: '',
    method: '',
    experiment: ''
  })
  const [ideateIsComplete, setIdeateIsComplete] = useState(false)
  const animate = () => {
    // if (parentBoxScroll) {
    animationFrame = requestAnimationFrame(animate);
    if (parentBoxContainer && parentBoxContainer.current) {
      if (document.getElementsByClassName('cardItemContentChildItem') && document.getElementsByClassName('cardItemContentChildItem')[0]) {
        itemWidth = document.defaultView.getComputedStyle(document.getElementsByClassName('cardItemContentChildItem')[0], null).width
      }
      if (parentBoxScroll) {
        let translate = document.defaultView.getComputedStyle(parentBoxContainer.current, null).translate
        if (translate) {
          parentBoxContainer.current.style.translate = translate.replace('px', '') * 1 - 1 + 'px'
        }
      }
    }
    if (problemContentBoxContainer && problemContentBoxContainer.current) {
      if (problemIsComplete) {
        let height = document.defaultView.getComputedStyle(problemContentBoxContainer.current, null).height.replaceAll('px', '')
        setContentLine2Style({
          height: height * 1 + problemLineHeight * 1 + 'px'
        })
      }
    }
    // }
  }
  useEffect(() => {
    const myChart_problem = echarts.init(chartRef_problem.current);
    setMyChart_problem(myChart_problem)
    const myChart_method = echarts.init(chartRef_method.current);
    setMyChart_method(myChart_method)
    const myChart_experiment = echarts.init(chartRef_experiment.current);
    setMyChart_experiment(myChart_experiment)
    if (problemLineBoxContainer) {
      let height = document.defaultView.getComputedStyle(problemLineBoxContainer.current, null).height.replaceAll('px', '')
      setProblemLineHeight(height)
    }
    if (methodLineBoxContainer) {
      let height = document.defaultView.getComputedStyle(methodLineBoxContainer.current, null).height.replaceAll('px', '')
      setMethodLineHeight(height)
    }
    if (experimentLineBoxContainer) {
      let height = document.defaultView.getComputedStyle(experimentLineBoxContainer.current, null).height.replaceAll('px', '')
      setExperimentLineHeight(height)
    }
    getPaperList().then(res => {
      let paperList = []
      res.forEach((item, index) => {
        paperList.push({
          id: index,
          text: item[0],
          paramsVal: item[1],
          bottom: 'From Arxiv',
          isChecked: false
        })
      })
      setPaperListData(paperList)
      // requestAnimationFrame(animate)
    })
    // // 窗口大小变化时重新绘制图表
    // window.addEventListener('resize', () => {
    //   myChart_problem.resize();
    // });

    // // 组件卸载时销毁图表
    // return () => {
    //   myChart_problem.dispose();
    //   window.removeEventListener('resize', () => {
    //     myChart_problem.resize();
    //   });
    // };
    return () => {
      // cancelAnimationFrame(requestAnimationFrame(animate));
      // clearInterval(setIntervalFn)
    };
  }, [])
  useEffect(() => {
    if (loadComplete_problemText && loadComplete_problemRationale) {
      setTimeout(() => {
        setBottomText_problem('针对此问题，提出创新解法')
      }, 200);
    }
  }, [loadComplete_problemText, loadComplete_problemRationale])
  const checkPaperItem = (id) => {
    const oldData = JSON.parse(JSON.stringify(paperListData))
    const newData = oldData.map(item => {
      return {
        ...item,
        isChecked: item.id === id
      }
    })
    setPaperListData(newData)
  }
  const getData_problem = async () => {
    const listData = paperListData.filter(item => item.isChecked)
    if (!listData || listData.length === 0) {
      return messageApi.open({
        type: 'warning',
        content: 'Select at least one option!',
      });
    }
    setData_problem({
      problemText: '',
      chartData: {

      },
      rationale: ''
    })
    setProblemIsComplete(false)
    setLoadComplete_problemText(false)
    setLoadComplete_problemRationale(false)
    setData_method({
      methodText: '',
      chartData: {

      },
      rationale: ''
    })
    setMethodIsComplete(false)
    setLoadComplete_methodText(false)
    setLoadComplete_methodRationale(false)
    setData_experiment({
      experimentText: '',
      chartData: {

      },
      rationale: ''
    })
    setExperimentIsComplete(false)
    setLoadComplete_experimentText(false)
    setLoadComplete_experimentRationale(false)
    setData_ideate({
      problem: '',
      method: '',
      experiment: ''
    })
    setIdeateIsComplete(false)
    const firstRes = await getDataSearch(listData[0].paramsVal)
    const problemRes = await getDataContinue('problem')
    let dataObj = {
      problemText: '',
      chartData: {

      },
      rationale: ''
    }
    // dataObj.problemText = problemRes.content.replaceAll('<p>', '').replaceAll('</p>', '')
    dataObj.problemText = problemRes.content.replace(/<[^>]*>/g, '')
    // dataObj.rationale = problemRes.rationale.replaceAll('<p>', '').replaceAll('</p>', '')
    dataObj.rationale = problemRes.rationale.replace(/<[^>]*>/g, '')
    // problemRes.gpt_feedback_rating.split('</p>\n<p>').forEach(item => {
    //   let newItem = item.replaceAll('<p>', '').split('.')[0].split(': ')
    //   dataObj.chartData[newItem[0]] = newItem[1]
    // })
    dataObj.chartData = problemRes.rating_scores
    let indicator = []
    let seriesData = []
    for (let key in dataObj.chartData) {
      indicator.push({
        name: key,
        max: 10
      })
      seriesData.push(dataObj.chartData[key] * 1)
    }
    const data = {
      indicator,
      series: [
        {
          name: '数据',
          type: 'radar',
          data: [
            {
              value: seriesData,
              name: 'problem',
              areaStyle: {
                color: 'rgba(50, 168, 82, 0.3)'
              }
            },
          ],
        },
      ],
    };

    // 设置图表选项
    const option = {
      backgroundColor: '#F5F5F5',
      title: {
        show: false,
        text: '雷达图示例',
      },
      radar: {
        indicator: data.indicator,
        radius: '60%'
      },
      series: data.series,
    };
    setData_problem(dataObj)
    if (myChart_problem) {
      myChart_problem.setOption(option);
    }
    setProblemIsComplete(true)
    setContentLine1TopStyle({
      height: pxTorem(26 + 45 + 26 + 22 + 60 - 25 + 200)
    })
  }
  const getData_method = async () => {
    setData_method({
      methodText: '',
      chartData: {

      },
      rationale: ''
    })
    setMethodIsComplete(false)
    setLoadComplete_methodText(false)
    setLoadComplete_methodRationale(false)
    setData_experiment({
      experimentText: '',
      chartData: {

      },
      rationale: ''
    })
    setExperimentIsComplete(false)
    setLoadComplete_experimentText(false)
    setLoadComplete_experimentRationale(false)
    setData_ideate({
      problem: '',
      method: '',
      experiment: ''
    })
    setIdeateIsComplete(false)
    const methodRes = await getDataContinue('method')
    let dataObj = {
      methodText: '',
      chartData: {

      },
      rationale: ''
    }
    // dataObj.methodText = methodRes.content.replaceAll('<p>', '').replaceAll('</p>', '')
    dataObj.methodText = methodRes.content.replace(/<[^>]*>/g, '')
    // dataObj.rationale = methodRes.rationale.replaceAll('<p>', '').replaceAll('</p>', '')
    dataObj.rationale = methodRes.rationale.replace(/<[^>]*>/g, '')
    // methodRes.gpt_feedback_rating.split('</p>\n<p>')[0].replaceAll('<p>', '').split('\n').forEach(item => {
    //   let newItem = item.split(': ')
    //   dataObj.chartData[newItem[0]] = newItem[1]
    // })
    dataObj.chartData = methodRes.rating_scores
    let indicator = []
    let seriesData = []
    for (let key in dataObj.chartData) {
      indicator.push({
        name: key,
        max: 10
      })
      seriesData.push(dataObj.chartData[key] * 1)
    }
    const data = {
      indicator,
      series: [
        {
          name: '数据',
          type: 'radar',
          data: [
            {
              value: seriesData,
              name: 'method',
              areaStyle: {
                color: 'rgba(50, 168, 82, 0.3)'
              }
            },
          ],
        },
      ],
    };

    // 设置图表选项
    const option = {
      backgroundColor: '#F5F5F5',
      title: {
        show: false,
        text: '雷达图示例',
      },
      radar: {
        indicator: data.indicator,
        radius: '60%'
      },
      series: data.series,
    };
    setData_method(dataObj)
    if (myChart_method) {
      myChart_method.setOption(option);
    }
    setMethodIsComplete(true);
    let height = document.defaultView.getComputedStyle(problemContentBoxContainer.current, null).height.replaceAll('px', '')
    setContentLine2TopStyle({
      height: height * 1 + problemLineHeight * 1 + 'px'
    })
  }
  const getData_experiment = async () => {
    setData_experiment({
      experimentText: '',
      chartData: {

      },
      rationale: ''
    })
    setExperimentIsComplete(false)
    setLoadComplete_experimentText(false)
    setLoadComplete_experimentRationale(false)
    setData_ideate({
      problem: '',
      method: '',
      experiment: ''
    })
    setIdeateIsComplete(false)
    const experimentRes = await getDataContinue('experiment')
    let dataObj = {
      experimentText: '',
      chartData: {

      },
      rationale: ''
    }
    // dataObj.experimentText = experimentRes.content.replaceAll('<p>', '').replaceAll('</p>', '')
    dataObj.experimentText = experimentRes.content.replace(/<[^>]*>/g, '')
    // dataObj.rationale = experimentRes.rationale.replaceAll('<p>', '').replaceAll('</p>', '')
    dataObj.rationale = experimentRes.rationale.replace(/<[^>]*>/g, '')
    // experimentRes.gpt_feedback_rating.split('</p>\n<p>').forEach(item => {
    //   let newItem = item.replaceAll('<p>', '').split('.')[0].split(': ')
    //   dataObj.chartData[newItem[0]] = newItem[1]
    // })
    dataObj.chartData = experimentRes.rating_scores
    let indicator = []
    let seriesData = []
    for (let key in dataObj.chartData) {
      indicator.push({
        name: key,
        max: 10
      })
      seriesData.push(dataObj.chartData[key] * 1)
    }
    const data = {
      indicator,
      series: [
        {
          name: '数据',
          type: 'radar',
          data: [
            {
              value: seriesData,
              name: 'experiment',
              areaStyle: {
                color: 'rgba(50, 168, 82, 0.3)'
              }
            },
          ],
        },
      ],
    };

    // 设置图表选项
    const option = {
      backgroundColor: '#F5F5F5',
      title: {
        show: false,
        text: '雷达图示例',
      },
      radar: {
        indicator: data.indicator,
        radius: '60%'
      },
      series: data.series,
    };
    setData_experiment(dataObj)
    if (myChart_experiment) {
      myChart_experiment.setOption(option);
    }
    setExperimentIsComplete(true)
    let height = document.defaultView.getComputedStyle(methodContentBoxContainer.current, null).height.replaceAll('px', '')
    setContentLine3TopStyle({
      height: height * 1 + methodLineHeight * 1 + 'px'
    })
  }
  const getData_ideate = async () => {
    setData_ideate({
      problem: '',
      method: '',
      experiment: ''
    })
    setIdeateIsComplete(false)
    const ideateRes = await getDataContinue('ideate')
    let dataObj = {
      problem: '',
      method: '',
      experiment: ''
    }
    dataObj.problem = ideateRes.problem
    // dataObj.problem = ideateRes.problem.replace(/<[^>]*>/g, '')
    dataObj.method = ideateRes.method
    dataObj.experiment = ideateRes.experiment
    setData_ideate(dataObj)
    setIdeateIsComplete(true)
    let height = document.defaultView.getComputedStyle(experimentContentBoxContainer.current, null).height.replaceAll('px', '')
    setContentLine4TopStyle({
      height: height * 1 + experimentLineHeight * 1 + 'px'
    })
  }
  const downloadReport = async () => {
    const reportRes = await exportReport()
    let element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(reportRes))
    element.setAttribute('download', 'research_agent_output')
    element.click()
  }
  const parentBoxMouseOver = () => {
    setParentBoxScroll(false)
    // cancelAnimationFrame(animationFrame)
  }
  const parentBoxMouseLeave = () => {
    setParentBoxScroll(true)
    // animate()
  }
  const parentBoxMouseDown = (e) => {
    setParentBoxScroll(false)
    // cancelAnimationFrame(animationFrame)
    setParentBoxMouseIsMove(true)
    setParentBoxMouseIsMovePoint({
      x: e.clientX,
      y: e.clientY
    })
    let translate = document.defaultView.getComputedStyle(parentBoxContainer.current, null).translate
    setTemporaryTranslateX(translate.replace('px', '') * 1)
  }
  const parentBoxMouseMove = (e) => {
    let distanceX = 0
    if (parentBoxMouseIsMove) {
      distanceX = e.clientX - parentBoxMouseIsMovePoint.x
      let translate = document.defaultView.getComputedStyle(parentBoxContainer.current, null).translate
      if (translate) {
        parentBoxContainer.current.style.translate = temporaryTranslateX + distanceX + 'px'
      }
    }
  }
  const parentBoxMouseUp = () => {
    setParentBoxMouseIsMove(false)
    setParentBoxMouseIsMovePoint({
      x: 0,
      y: 0
    })
  }
  const addHeight = () => {
    setParentBoxScroll(false)
    setContentLine1Style({
      height: pxTorem(200)
    })
    setContentLine1TopStyle({
      height: pxTorem(200)
    })

  }
  const setHeight_problem = () => {
    let height = document.defaultView.getComputedStyle(problemContentBoxContainer.current, null).height.replaceAll('px', '')
    setContentLine2Style({
      height: height * 1 + problemLineHeight * 1 + 'px'
    })
  }
  const setHeight_method = () => {
    let height = document.defaultView.getComputedStyle(methodContentBoxContainer.current, null).height.replaceAll('px', '')
    setContentLine3Style({
      height: height * 1 + methodLineHeight * 1 + 'px'
    })
  }
  const setHeight_experiment = () => {
    let height = document.defaultView.getComputedStyle(experimentContentBoxContainer.current, null).height.replaceAll('px', '')
    setContentLine4Style({
      height: height * 1 + experimentLineHeight * 1 + 'px'
    })
  }
  return (
    <>
      {/* <div onClick={addHeight}>增加高度</div> */}
      {contextHolder}
      <div className="homePC">
        <div className="header">
          <div className="headerItem logo">
            <div className="left">
              <img src={logoIcon} alt="" />
            </div>
          </div>
          <div className="headerItem isEnglish isActive">Research Agent</div>
          <div className="headerItem isEnglish">Business Agent</div>
          <div className="headerItem isEnglish">Large Innovation Model</div>
        </div>
        <div className='line2 isEnglish'>
          Research Agent
        </div>
        <div className='line3'>
          <div className='top'>
            AI 帮助科学家提升6倍学术科研效率
          </div>
          <div className='bottom'>
            <div className='left'>不仅能提出问题，更</div>
            <div className='middle'>
              <div className='text'>能生成解法</div>
              <div className='img'></div>
            </div>
            <div className='right'>并设计实验</div>
          </div>
        </div>
        <div className='content'>
          <div className='lineBox'>
            <div className='lineItem lineItem1'>
              <div className='circleNum isActive'>1</div>
              <div className='line' style={contentLine1Style}>
                <div className='lineBottom' style={contentLine1Style}></div>
                <div className='lineTop' style={contentLine1TopStyle}></div>
              </div>
            </div>
            <div className='lineItem lineItem2'>
              <div className={problemIsComplete ? "circleNum isActive" : "circleNum"}>2</div>
              <div className='line' ref={problemLineBoxContainer} style={contentLine2Style}>
                <div className='lineBottom' style={contentLine2Style}></div>
                <div className='lineTop' style={contentLine2TopStyle}></div>
              </div>
            </div>
            <div className='lineItem lineItem3'>
              <div className={methodIsComplete ? "circleNum isActive" : "circleNum"}>3</div>
              <div className='line' ref={methodLineBoxContainer} style={contentLine3Style}>
                <div className='lineBottom' style={contentLine3Style}></div>
                <div className='lineTop' style={contentLine3TopStyle}></div>
              </div>
            </div>
            <div className='lineItem lineItem4'>
              <div className={experimentIsComplete ? "circleNum isActive" : "circleNum"}>4</div>
              <div className='line' ref={experimentLineBoxContainer} style={contentLine4Style}>
                <div className='lineBottom' style={contentLine4Style}></div>
                <div className='lineTop' style={contentLine4TopStyle}></div>
              </div>
            </div>
            <div className='lineItem lineItem5'>
              <div className={ideateIsComplete ? "circleNum isActive" : "circleNum"}>5</div>
            </div>
          </div>
          <div className='contentBox'>
            <div className='cardItem cardItem1'>
              <div className='titleLine'>
                <div className='titleText'>了解前沿&nbsp;</div>
                <div className='titleContent'>- AI为您挖掘领域内最新学术成果，请选择你感兴趣的方向</div>
              </div>
              <div className='cardItemContent paperList'>
                <div className='parentBox' ref={parentBoxContainer} onMouseEnter={parentBoxMouseOver} onMouseLeave={parentBoxMouseLeave} onMouseDown={parentBoxMouseDown} onMouseMove={parentBoxMouseMove} onMouseUp={parentBoxMouseUp}>
                  {paperListData.map(item => (
                    <div className={item.isChecked ? 'cardItemContentChildItem isChecked' : 'cardItemContentChildItem'} key={item.id} onClick={() => checkPaperItem(item.id)}>
                      <div className='text isEnglish'>{item.text}</div>
                      <div className='bottom isEnglish'>{item.bottom}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className='cardItemBottom cardItemBottom1' onClick={getData_problem}>
                基于此成果，提出科研问题
              </div>
            </div>
            <div className='cardItem cardItem2'>
              <div className='titleLine'>
                <div className='titleText'>提出问题&nbsp;</div>
                <div className='titleContent'>- AI提出学术问题，以进一步推进学术前沿的发展</div>
              </div>
              <div className={problemIsComplete ? "cardItemContent cardItemContent2" : "cardItemContent cardItemContent2 incomplete"} ref={problemContentBoxContainer}>
                <div className='top'>
                  <div className='title isEnglish'>Problem</div>
                  <div className='text isEnglish'>
                    <Typewriter textVal={data_problem.problemText} onSendData={() => setLoadComplete_problemText(true)} setHeight={setHeight_problem} />
                  </div>
                </div>
                <div className='middle'>
                  <div className='left'></div>
                  <div className='center isEnglish'>Rationale</div>
                  <div className='right'>
                  </div>
                </div>
                <div className='bottom'>
                  <div className='chartBox' ref={chartRef_problem}>
                  </div>
                  <div className='rightText isEnglish'>
                    <Typewriter textVal={data_problem.rationale} onSendData={() => setLoadComplete_problemRationale(true)} setHeight={setHeight_problem} />
                  </div>
                </div>
              </div>
              <div className={(loadComplete_problemText && loadComplete_problemRationale) ? 'cardItemBottom cardItemBottom2 isShow' : 'cardItemBottom cardItemBottom2'} onClick={getData_method}>
                {/* <Typewriter textVal={bottomText_problem} /> */}
                <Typewriter textVal='针对此问题，提出创新解法' />
              </div>
              {/* {(loadComplete_problemText && loadComplete_problemRationale) && (<div className='cardItemBottom cardItemBottom2' onClick={getData_method}>
                <Typewriter textVal={bottomText_problem} />
              </div>)} */}
            </div>
            <div className='cardItem cardItem3'>
              <div className='titleLine'>
                <div className='titleText'>生成解法&nbsp;</div>
                <div className='titleContent'>- AI针对问题提出解法</div>
              </div>
              <div className={methodIsComplete ? "cardItemContent cardItemContent3" : "cardItemContent cardItemContent3 incomplete"} ref={methodContentBoxContainer}>
                <div className='top'>
                  <div className='title isEnglish'>Method</div>
                  <div className='text isEnglish'>
                    <Typewriter textVal={data_method.methodText} onSendData={() => setLoadComplete_methodText(true)} setHeight={setHeight_method} />
                  </div>
                </div>
                <div className='middle'>
                  <div className='left'></div>
                  <div className='center isEnglish'>Rationale</div>
                  <div className='right'>
                  </div>
                </div>
                <div className='bottom'>
                  <div className='chartBox' ref={chartRef_method}>
                  </div>
                  <div className='rightText isEnglish'>
                    <Typewriter textVal={data_method.rationale} onSendData={() => setLoadComplete_methodRationale(true)} setHeight={setHeight_method} />
                  </div>
                </div>
              </div>
              <div className={(loadComplete_methodText && loadComplete_methodRationale) ? 'cardItemBottom cardItemBottom3 isShow' : 'cardItemBottom cardItemBottom3'} onClick={getData_experiment}>
                <Typewriter textVal="针对此解法，设计实验" />
              </div>
              {/* {loadComplete_methodText && loadComplete_methodRationale && <div className='cardItemBottom cardItemBottom3' onClick={getData_experiment}>
                <Typewriter textVal="针对此解法，设计实验" />
              </div>} */}
            </div>
            <div className='cardItem cardItem4'>
              <div className='titleLine'>
                <div className='titleText'>设计实验&nbsp;</div>
                <div className='titleContent'>- AI设计实验，验证解法</div>
              </div>
              <div className={experimentIsComplete ? "cardItemContent cardItemContent4" : "cardItemContent cardItemContent4 incomplete"} ref={experimentContentBoxContainer}>
                <div className='top'>
                  <div className='title isEnglish'>Experiment</div>
                  <div className='text isEnglish'>
                    <Typewriter textVal={data_experiment.experimentText} onSendData={() => setLoadComplete_experimentText(true)} setHeight={setHeight_experiment} />
                  </div>
                </div>
                <div className='middle'>
                  <div className='left'></div>
                  <div className='center isEnglish'>Rationale</div>
                  <div className='right'>
                  </div>
                </div>
                <div className='bottom'>
                  <div className='chartBox' ref={chartRef_experiment}>
                  </div>
                  <div className='rightText isEnglish'>
                    <Typewriter textVal={data_experiment.rationale} onSendData={() => setLoadComplete_experimentRationale(true)} setHeight={setHeight_experiment} />
                  </div>
                </div>
              </div>
              <div className={(loadComplete_experimentText && loadComplete_experimentRationale) ? 'cardItemBottom cardItemBottom4 isShow' : 'cardItemBottom cardItemBottom4'} onClick={getData_ideate}>
                <Typewriter textVal="继续生成，学术短报告" />
              </div>
              {/* {loadComplete_experimentText && loadComplete_experimentRationale &&
                (<div className='cardItemBottom cardItemBottom4' onClick={getData_ideate}>
                  <Typewriter textVal="继续生成，学术短报告" />
                </div>)
              } */}
            </div>
            <div className='cardItem cardItem5'>
              <div className='titleLine'>
                <div className='titleText'>报告汇总&nbsp;</div>
                <div className='titleContent'>- 汇总上述内容，生成学术短报告</div>
              </div>
              <div className={ideateIsComplete ? "cardItemContent cardItemContent5" : "cardItemContent cardItemContent5 incomplete"} ref={ideateContentBoxContainer}>
                <div className='problem'>
                  <div className='title isEnglish'>Problem</div>
                  <div className='text isEnglish' dangerouslySetInnerHTML={{ __html: data_ideate.problem }}></div>
                </div>
                <div className='method'>
                  <div className='title isEnglish'>Method</div>
                  <div className='text isEnglish' dangerouslySetInnerHTML={{ __html: data_ideate.method }}></div>
                </div>
                <div className='experiment'>
                  <div className='title isEnglish'>Experiment</div>
                  <div className='text isEnglish' dangerouslySetInnerHTML={{ __html: data_ideate.experiment }}></div>
                </div>
              </div>
              <div className={ideateIsComplete ? 'cardItemBottom cardItemBottom5 isShow' : 'cardItemBottom cardItemBottom5'} onClick={downloadReport}>
                下载报告
              </div>
              {/* {ideateIsComplete && <div className='cardItemBottom cardItemBottom5' onClick={downloadReport}>
                下载报告
              </div>} */}
            </div>
          </div>
        </div>
        <div className='footerText'>
          <div className='leftLine'></div>
          <div className='text'>该网站为Nova创新大模型团队 内部测试用工具</div>
          <div className='rightLine'></div>
        </div>
      </div>
    </>
  )
}
export default Home
