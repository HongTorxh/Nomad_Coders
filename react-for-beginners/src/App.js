// import { useState } from "react";

// function App() {
//   const [toDo, setToDo] = useState("");
//   const [toDos, setToDos] = useState([]);
//   const onChange = (event) => setToDo(event.target.value);
//   const onSubmit = (event) => {
//     event.preventDefault();
//     if (toDo === "") {
//       return;
//     }
//     setToDos((currentArray) => [toDo, ...currentArray]);
//     setToDo("");
//   };
//   return (
//     <div>
//       <h1>My To ToDos ({toDos.length})</h1>
//       <form onSubmit={onSubmit}>
//         <input
//           onChange={onChange}
//           value={toDo}
//           type="text"
//           placeholder="Write your to do..."
//         />
//         <button> Add To Do</button>
//       </form>
//       <hr />
//       <ul>
//         {toDos.map((item, index) => (
//           <li key={index}>{item}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";

function Converter({ coin }) {
  return (
    <div>
      <label htmlFor="km">Km : </label>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [index, setIndex] = useState("-1");
  const [selected, setSelected] = useState([]);
  function onSelect(event) {
    setIndex(event.target.value);
    if (event.target.value === "-1") {
      setSelected([]);
    } else {
      setSelected(coins[event.target.value]);
    }
  }
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! ({coins.length})</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (
        <select value={index} onChange={onSelect}>
          {coins.map((coin) => (
            <option value={coin.rank}>
              {coin.name} ({coin.symbol})
            </option>
          ))}
        </select>
      )}
      {selected === "-1" ? "Please Select Coin" : <Converter coin={selected} />}
    </div>
  );
}

export default App;
