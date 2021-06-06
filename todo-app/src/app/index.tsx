import { Routing } from "pages";
import { withProviders } from "./providers";
import './index.scss';

const App = () => {
  return (
    <div>
      <header>Todo App</header>
      <Routing />
    </div>
  );
}

export default withProviders(App);
