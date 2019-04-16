import React, { useEffect, useState, useRef } from 'react';
import TrelloCard from './TrelloCard';
import { indexBy, convertCustomFieldItems } from './utils';
import useVimShortcut from './useVimShortcut';

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

  const section = useRef();
  useVimShortcut(section, cards.length);

  return (
    <main className="container">
      <section ref={section}>
        {cards.map(card => (
          <TrelloCard {...card} key={card.id} />
        ))}
      </section>
    </main>
  );
};

export default App;
