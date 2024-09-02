import { Spin, Result } from "antd";
import { SmileOutlined } from '@ant-design/icons';
const Home = () => {
  return (
    <>
      <Result
        status="404"
        icon={<SmileOutlined />}
        subTitle="当前测试版本，暂只支持PC端"
      />
    </>
  )
}
export default Home