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

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
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
        <select>
          {coins.map((coin) => (
            <option>
              {coin.name} ({coin.symbol}) : {coin.quotes.USD.price} USD
            </option>
          ))}
        </select>
      )}
      <input type="text" placeholder="Write here USD"></input>
      <input type="disabled"></input>
    </div>
  );
}

export default App;
