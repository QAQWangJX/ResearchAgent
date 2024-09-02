import defualtRouters from "./router/index";
import { useRoutes } from "react-router-dom";
import { memo, Suspense } from "react";
const App = memo(() => {
  const routers = defualtRouters;
  return (
    <>
      {/* <Suspense> */}
      {useRoutes(routers)}
      {/* </Suspense> */}
    </>
  );
});
App.displayName = 'MyApp';
export default App;
