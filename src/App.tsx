import Layout from "./components/Layout";
import List from "./components/List";
import SearchArea from "./components/SearchArea";
import { ProgressProvider } from "./context";

const App = () => {
  return (
    <>
      <ProgressProvider>
        <Layout>
          <SearchArea />
          <List />
        </Layout>
      </ProgressProvider>
    </>
  );
};

export default App;
