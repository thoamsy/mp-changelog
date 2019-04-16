import React, { useEffect, useState } from 'react';
import TrelloCard from './TrelloCard';
import { indexBy, convertCustomFieldItems } from './utils';

const trelloAPI = 'https://trello.com/b/FuVtXQQ5/零售小程序版本记录.json';
const indexById = indexBy('id');

const fetchTrelloInformation = () => {
  return fetch(trelloAPI, {
    mode: 'cors'
  }).then(res => res.ok && res.json());
};

const App = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    async function adaptApi() {
      const trelloFromCache = localStorage.getItem('trello');
      const trelloCards =
        JSON.parse(trelloFromCache) || (await fetchTrelloInformation());
      const { cards, customFields, labelNames } = trelloCards;
      setCards(cards);
      const customFieldsMap = indexById(customFields);
      cards.forEach(
        card =>
          (card.fields = convertCustomFieldItems(
            card.customFieldItems,
            customFieldsMap
          ))
      );
      console.log(customFieldsMap);
      !trelloFromCache &&
        localStorage.setItem('trello', JSON.stringify(trelloCards));
    }

    adaptApi();
  }, []);
  return (
    <main className="container">
      {cards.map(card => (
        <TrelloCard {...card} key={card.id} />
      ))}
    </main>
  );
};

export default App;
