import './index.scss'
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import mobileProfilePicture from '@/assets/image/mobileProfilePicture.png'
import homeLine4Bg from '@/assets/image/homeLine4Bg.png'
import card01 from '@/assets/image/card01.png'
import card02 from '@/assets/image/card02.png'
import card03 from '@/assets/image/card03.png'
import card04 from '@/assets/image/card04.png'
import arrowRight from '@/assets/image/arrowRight.png'
import microsoft from '@/assets/image/microsoft.png'
import figma from '@/assets/image/figma.png'
import unilever from '@/assets/image/unilever.png'
import shopify from '@/assets/image/shopify.png'
import tiktok from '@/assets/image/tiktok.png'
import tencent from '@/assets/image/tencent.png'
import f from '@/assets/image/f.png'
import people1 from '@/assets/image/people1.png'
import people2 from '@/assets/image/people2.png'
import people3 from '@/assets/image/people3.png'
import profilePicture1 from '@/assets/image/profilePicture1.png'
import profilePicture2 from '@/assets/image/profilePicture2.png'
import profilePicture3 from '@/assets/image/profilePicture3.png'
import profilePicture4 from '@/assets/image/profilePicture4.png'
import profilePicture5 from '@/assets/image/profilePicture5.png'
import profilePicture6 from '@/assets/image/profilePicture6.png'
import goTop1 from '@/assets/image/goTop1.png'
import goTop2 from '@/assets/image/goTop2.png'
import { Spin, message, Anchor } from "antd";
import { logUpLoad } from '@/api/common.js'
const Home = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState('1');
  const [line5Options, setline5Options] = useState([
    {
      id: '1',
      imgUrl: 'https://content.altexsoft.com/media/2020/11/word-image-4.png',
      title: 'BugSentry',
      price: '$ 5K',
      priceRight: 'MRR estimation',
      contentText: "BugSentry is a real-time error monitoring platform designed specifically for small-scale indie game developers. It provides instant notifications and in-depth analytics on application errors, crashes, and performance bottlenecks. By integrating directly into the game engine, BugSentry delivers actionable insights, allowing developers to quickly identify and resolve issues that could affect user experience. Unlike generic error monitoring tools, BugSentry focuses on the unique needs of indie developers with limited resources, offering an affordable yet robust solution tailored to their specific challenges."
    },
    {
      id: '2',
      imgUrl: 'https://www.howardtravel.com/images/adventure_montage.jpg',
      title: 'Adventuro',
      price: '$ 15K',
      priceRight: 'MRR estimation',
      contentText: "Adventuro is a specialized adventure travel booking platform designed for thrill-seekers and extreme sport enthusiasts. Unlike traditional travel booking platforms, Adventuro focuses exclusively on unique, high-adrenaline experiences such as heli-skiing, cave diving, and base jumping. The platform provides detailed guides, expert reviews, and safety information for each activity, ensuring that users have all the information they need to embark on their next adventure. Additionally, Adventuro offers a community feature where users can share their experiences, tips, and photos, fostering a sense of camaraderie and inspiration among adventure travelers."
    },
    {
      id: '3',
      imgUrl: 'https://imagery.hoteltonight.com/mobile_web/download-app/phones-v1.png?w=720&hdpr=2&fit=crop&cs=tinysrgb&auto=format',
      title: 'LastMinStays',
      price: '$ 20K',
      priceRight: 'MRR estimation',
      contentText: "LastMinStays is an innovative mobile app that targets spontaneous travelers who need to book last-minute hotel accommodations. The app offers real-time inventory from hotels that have unsold rooms and provides users with instant booking options at discounted rates. The platform leverages AI to match user preferences with available deals, ensuring a personalized experience. Additionally, LastMinStays offers a seamless and secure payment process integrated with multiple payment gateways and loyalty programs. Users can also access reviews and ratings from fellow last-minute bookers to make informed decisions quickly."
    },
    {
      id: '4',
      imgUrl: 'https://digitalasset.intuit.com/IMAGE/A140h1Xf4/BudgetPage_ZoneB_Img-1.svg',
      title: 'Budgify',
      price: '$ 10K',
      priceRight: 'MRR estimation',
      contentText: "Budgify is an AI-powered expense tracking and budgeting tool specifically designed for freelance digital nomads. These individuals often juggle multiple currencies, fluctuating incomes, and unpredictable expenses. Budgify automatically categorizes and converts expenses in real-time, provides detailed financial reports, and offers personalized budgeting advice based on historical spending patterns. It also features integration with global payment platforms and banks. A standout feature is its community-driven expense sharing, allowing users to get insights and tips from fellow nomads. With an intuitive interface, Budgify makes it easy to visualize financial health and set realistic financial goals, ensuring digital nomads can focus on their work and adventures without financial stress."
    },
    {
      id: '5',
      imgUrl: 'https://360familyoffice.us/wp-content/uploads/2020/04/how-to-pick-a-financial-advisor.jpg',
      title: 'FinSage',
      price: '$ 30K',
      priceRight: 'MRR estimation',
      contentText: "FinSage is an automated personal finance advisor designed specifically for freelancers and gig economy workers. Leveraging advanced algorithms and AI, FinSage provides tailored financial advice, real-time budget tracking, tax optimization, and investment recommendations. Unlike traditional finance apps, it takes into account the irregular income streams, varied expenses, and specific financial goals of gig workers. With a user-friendly interface, FinSage simplifies complex financial planning, empowering users to make informed decisions, save money, and achieve financial stability. Integrated with popular payment platforms, FinSage ensures effortless income tracking and expense management, making it an indispensable tool for modern freelancers."
    },
    {
      id: '6',
      imgUrl: 'https://res.cloudinary.com/sagacity/image/upload/c_crop,h_2270,w_2456,x_0,y_400/c_limit,dpr_auto,f_auto,fl_lossy,q_80,w_1080/0618-backpacking-gear-guide-with-numbers_ljlamn.jpg',
      title: 'TrailBlaze',
      price: '$ 10K',
      priceRight: 'MRR estimation',
      contentText: "TrailBlaze is a niche dropshipping business specializing in ultralight backpacking and thru-hiking gear for the growing community of minimalist adventurers. Unlike traditional gear shops, TrailBlaze focuses on providing high-quality, lightweight equipment that outdoor enthusiasts need for long-distance hikes, ensuring durability and comfort. With a curated selection of items from reputable suppliers, TrailBlaze offers products like ultralight tents, sleeping bags, portable cooking systems, and minimalist hiking accessories. The business also features a comprehensive online resource center, complete with packing lists, gear reviews, and trail guides, fostering a supportive community for ultralight backpacking enthusiasts."
    },
  ]);
  const [line8Options, setLine8Options] = useState([
    {
      id: '1',
      imgUrl: microsoft,
    },
    {
      id: '2',
      imgUrl: figma,
    },
    {
      id: '3',
      imgUrl: unilever,
    },
    {
      id: '4',
      imgUrl: shopify,
    },
  ]);
  const [line9Options, setLine9Options] = useState([
    {
      id: '5',
      imgUrl: tiktok,
    },
    {
      id: '6',
      imgUrl: tencent,
    },
    {
      id: '7',
      imgUrl: f,
    },
  ]);
  const [line10Options, setLine10Options] = useState([
    {
      text: 'SaaS',
      isActive: true,
      value: 'SaaS'
    },
    {
      text: 'Web3 and crypto',
      isActive: false,
      value: 'Web3AndCrypto'
    },
    {
      text: 'Developer Tools',
      isActive: false,
      value: 'DeveloperTools'
    },
    {
      text: 'Fintech',
      isActive: false,
      value: 'Fintech'
    },
    {
      text: 'EdTech',
      isActive: false,
      value: 'EdTech'
    },
    {
      text: 'HealthTech',
      isActive: false,
      value: 'HealthTech'
    },
    {
      text: 'Legal Tech',
      isActive: false,
      value: 'LegalTech'
    },
    {
      text: 'Marketplace',
      isActive: false,
      value: 'Marketplace'
    },
    {
      text: 'Dropshipping',
      isActive: false,
      value: 'Dropshipping'
    },
    {
      text: 'DTC Brand',
      isActive: false,
      value: 'DTCBrand'
    },
    {
      text: 'Content Marketing',
      isActive: false,
      value: 'ContentMarketing'
    },
    {
      text: 'SEO',
      isActive: false,
      value: 'SEO'
    },
    {
      text: 'Social Media Management',
      isActive: false,
      value: 'SocialMediaManagement'
    },
    {
      text: 'Podcasting',
      isActive: false,
      value: 'Podcasting'
    },
    {
      text: 'Travel and booking',
      isActive: false,
      value: 'TravelAndBooking'
    },
    {
      text: 'Online Courses',
      isActive: false,
      value: 'OnlineCourses'
    },
    {
      text: 'Fitness',
      isActive: false,
      value: 'Fitness'
    },
    {
      text: 'Mental Health',
      isActive: false,
      value: 'MentalHealth'
    },
    {
      text: 'Wearable',
      isActive: false,
      value: 'Wearable'
    },
    {
      text: 'Nutrition and Diet',
      isActive: false,
      value: 'NutritionAndDiet'
    },
    {
      text: 'Food',
      isActive: false,
      value: 'Food'
    },
    {
      text: 'Pet care',
      isActive: false,
      value: 'PetCare'
    },
    {
      text: 'Consulting',
      isActive: false,
      value: 'Consulting'
    },
    {
      text: 'HR and Recruitment',
      isActive: false,
      value: 'HRAndRecruitment'
    },
    {
      text: 'Sales and growth',
      isActive: false,
      value: 'SalesAndGrowth'
    },
  ])
  const [goTopIsShow, setGoTopIsShow] = useState(false)
  const toggleActive = (val) => {
    setIsActive(val)
    // logUpLoad('anchorPoint')
    const dom = document.querySelector(`#part-${val}`)
    dom.scrollIntoView({ block: 'center', behavior: "smooth" })
  }
  const toggleActiveLine10 = (val) => {
    const oldData = JSON.parse(JSON.stringify(line10Options))
    const newData = oldData.map(item => {
      if (item.text === val) {
        item.isActive = !item.isActive
      }
      return item
    })
    if (newData.filter(item => item.isActive).length > 5) {
      return messageApi.open({
        type: 'warning',
        content: 'Select up to five items!',
      });
    }
    // if (newData.filter(item => item.isActive).length === 0) {
    //   return messageApi.open({
    //     type: 'warning',
    //     content: 'Select at least one option!',
    //   });
    // }
    // logUpLoad('checkItem')
    setLine10Options(newData)
  }
  const toDetail = () => {
    logUpLoad('browse')
    const domains = line10Options.filter(item => item.isActive).map(item => { return item.text })
    navigate('/detail', {
      state: { domains },
    })
  }
  useEffect(() => {
    // document.getElementsByClassName('homeMobile')[0].addEventListener('scroll', function (e) {
    //   console.log('eeeee', e)
    // })
  }, [])
  return (
    <>
      {contextHolder}
      <div className="homeMobile">
        <div className="header">
          <div className="headerItem logo">
            <div className="left"></div>
            {/* <div className="right">logo</div> */}
          </div>
          <div className="headerItem userProfilePicture" onClick={() => logUpLoad('login')}>
            <img src={mobileProfilePicture} alt="" />
          </div>
        </div>
        <div className='line2'>
          <div className={isActive === '1' ? "line2Item isActive" : "line2Item"} onClick={() => toggleActive('1')}>Browse ideas</div>
          <div className={isActive === '2' ? "line2Item isActive" : "line2Item"} onClick={() => toggleActive('2')}>Steal ideas</div>
          <div className={isActive === '3' ? "line2Item isActive" : "line2Item"} onClick={() => toggleActive('3')}>Curate ideas</div>
        </div>
        <div className='line3'>
          Daily Spark
        </div>
        <div className='line4'>
          <div className='top'>Aggregate the best and brand-</div>
          <div className='middle'>new indie hacker ideas for your</div>
          <div className='imgLine'>
            <img src={homeLine4Bg} alt="" />
          </div>
          <div className='bottom'>inspiration</div>
        </div>
        <div className='line5'>
          {line5Options.map(item => (
            <div className='line5Item' key={item.id}>
              <div className='img'>
                <img src={item.imgUrl} alt="" />
              </div>
              <div className='title'>{item.title}</div>
              <div className='price'>
                <div className='priceVal'>{item.price}</div>
                &nbsp;
                <div className='priceRight'>{item.priceRight}</div>
              </div>
              <div className='contentText'>{item.contentText}</div>
              <div className='mask'></div>
            </div>
          ))}
        </div>
        <div id='part-1' className='line6' onClick={() => toDetail()}>
          <div className='text'>
            Start browsing <span>56k+ </span>ideas
          </div>
          <div className='right'>
            <img src={arrowRight} alt="" />
          </div>
        </div>
        <div className='line8'>
          {line8Options.map(item => (
            <div className='line8Item' key={item.id}>
              <img src={item.imgUrl} alt="" />
            </div>
          ))}
        </div>
        <div className='line9'>
          {line9Options.map(item => (
            <div className='line9Item' key={item.id}>
              <img src={item.imgUrl} alt="" />
            </div>
          ))}
        </div>
        <div className='line7'>Liked by people from</div>
        <div className='line10'>
          <div className='line10Header'>
            <div className='text'>
              Let me know your interests(1-5)
            </div>
            {/* <div className='right'>
              <div className='one'>
                <img src={profilePicture1} alt="" />
              </div>
              <div className='two'>
                <img src={profilePicture2} alt="" />
              </div>
              <div className='three'>
                <img src={profilePicture3} alt="" />
              </div>
            </div> */}
          </div>
          <div className='line10Content'>
            {line10Options.map(item =>
            (<div className={item.isActive ? 'line10ContentItem isActive' : 'line10ContentItem'} key={item.text} onClick={() => toggleActiveLine10(item.text)}>
              {item.text}
            </div>)
            )}
          </div>
          <div id='part-2' className='line10Bottom' onClick={() => toDetail()}>
            <div className='text'>
              Custmize idea feed for me
            </div>
            <div className='right'>
              <img src={arrowRight} alt="" />
            </div>
          </div>
        </div>
        <div className='line11'>
          <div className='left'>
            <div className='quotationMarkLeft'></div>
            <div className='text'>
              “There is no such thing as a new idea. It is impossible. We simple take a lot of old ideas and put them into a sort of mental kaleidoscple. ”
            </div>
            <div className='bottom'>Mark Twain</div>
          </div>
          <div className='right'>
            <img src={people1} alt="" />
          </div>
        </div>
        <div className='line12'>
          <div className='left'>
            <img src={people2} alt="" />
          </div>
          <div className='right'>
            <div className='quotationMarkRight'></div>
            <div className='text'>
              “Good artists copy, great artists steal. We have always been shameless about stealing great idras. ”
            </div>
            <div className='bottom'>Pablo Picasso</div>
          </div>
        </div>
        <div className='line13'>
          <div className='left'>
            <div className='quotationMarkLeft'></div>
            <div className='text'>
              “Ideas are like seeds. The more seeds you plant, the more likely it is that one of them will grow into something amazing. ”
            </div>
            <div className='bottom'>James Clear</div>
          </div>
          <div className='right'>
            <img src={people3} alt="" />
          </div>
        </div>
        <div id='part-3' className='line14' onClick={() => toDetail()}>
          <div className='text'>
            Feel free to steal ideas
          </div>
          <div className='right'>
            <img src={arrowRight} alt="" />
          </div>
        </div>
        {/* <div className={goTopIsShow ? 'goTop goTopIsShow' : 'goTop'}>
          <img src={goTop1} alt="" />
        </div> */}
      </div>
    </>
  )
}
export default Home