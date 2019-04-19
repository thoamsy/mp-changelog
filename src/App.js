import React, { useEffect, useState, useRef } from 'react';
import Timeline from 'antd/lib/timeline';
import Icon from 'antd/lib/icon';
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
      const customFieldsMap = indexById(customFields);

      cards.forEach(
        card =>
          (card.fields = convertCustomFieldItems(
            card.customFieldItems,
            customFieldsMap
          ))
      );
      setCards(cards.slice(0, -1)); // 最后一张比较特殊，不需要
      !trelloFromCache &&
        localStorage.setItem('trello', JSON.stringify(trelloCards));
    }

    adaptApi();
  }, []);

  const section = useRef();
  useVimShortcut(section, {
    listLength: cards.length,
    selector: '.trello-card'
  });

  return (
    <main className="section">
      <section ref={section} className="container" style={{ maxWidth: '60%' }}>
        <Timeline>
          {cards.map(card => (
            <Timeline.Item color="green" key={card.id}>
              <TrelloCard
                name={card.name}
                desc={card.desc}
                fields={card.fields}
                labels={card.labels}
              />
            </Timeline.Item>
          ))}
          {!!cards.length && (
            <Timeline.Item dot={<Icon type="frown" theme="twoTone" />}>
              消失在历史长河中的版本记录
            </Timeline.Item>
          )}
        </Timeline>
      </section>
    </main>
  );
};

export default App;
