import styles from "./App.module.css";
import { useState, useEffect } from "react";

function Hello(){
  function byFn(){
    console.log("bye :(");
  }
  function hiFn(){
    console.log("created :)");
    return byFn;
  }
  useEffect(hiFn, []);
  return <h1>Hello</h1>;
}


function App() {
  const [counter, setValue] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [showing, setShowing] = useState(false);
  const onClick = () => setValue((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);
  const onClickShowing = () => setShowing((prev) => !prev);
  useEffect(() => {
    console.log("I run only once.");
  }, []);
  useEffect(() => {
    console.log("I run when 'keyword' changes.");
  }, [keyword]);
  useEffect(() => {
    console.log("I run when 'counter' changes.");
  }, [counter]);
  useEffect(() => {
    console.log("I run when keyword & counter changes.");
  }, [keyword, counter]);
  return (
    <div>
      <input 
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search here..." />
      <h1 className={styles.title}>
        {counter}
      </h1>
      <button onClick={onClick}>click me</button>
      <button onClick={onClickShowing}>{showing ? "Hide" : "Show"}</button>
      {showing ? <Hello /> : null}
    </div>
  );
}

export default App;
