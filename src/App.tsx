import { createUseStyles } from "react-jss";
import { ChatBot } from "./ChatBot";

let styles = createUseStyles({
  app: {
    height:"100%",
  }
})

function App() {
  const classes = styles();
  return (
    <div className={classes.app}>
      <ChatBot></ChatBot>
    </div>
  );
}


export default App;
