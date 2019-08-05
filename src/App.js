import React, { useEffect, useState } from 'react';
import Tag from 'antd/lib/tag';
import Collapse from 'antd/lib/collapse';
import Spin from 'antd/lib/spin';

import TrelloCard from './TrelloCard';
import { indexBy, convertCustomFieldItems } from './utils';

const trelloAPI = 'https://trello.com/b/FuVtXQQ5/零售小程序版本记录.json';
const indexById = indexBy('id');

const fetchTrelloInformation = () => {
  return fetch(trelloAPI, {
    mode: 'cors',
  }).then(res => res.ok && res.json());
};

const LIGHT = '';
const DARK = 'BLACK';

const App = () => {
  const [cards, setCards] = useState([]);
  const [visible, setVisible] = useState([]);
  const [tagColor, setColor] = useState(() =>
    window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT,
  );

  useEffect(() => {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = e => {
      e.matches ? setColor(DARK) : setColor(LIGHT);
    };
    darkMode.addListener(handler);
    return () => {
      darkMode.removeListener(handler);
    };
  }, []);

  useEffect(() => {
    async function adaptApi() {
      const trelloCards = await fetchTrelloInformation();
      const { cards, customFields } = trelloCards;
      const customFieldsMap = indexById(customFields);

      cards.forEach(card => {
        Object.assign(
          card,
          convertCustomFieldItems(card.customFieldItems, customFieldsMap),
        );
      });
      setCards(cards.slice(0, -1)); // 最后一张比较特殊，不需要
      setVisible(cards.map(card => card.id));
    }

    adaptApi();
  }, []);

  const onChangeCollapse = setVisible;

  return (
    <div className="section">
      <section className="container card-container">
        <h3 className="title" style={{ color: 'var(--title-color)' }}>
          零售小程序版本记录
        </h3>
        {cards.length ? (
          <main>
            <Collapse activeKey={visible} onChange={onChangeCollapse}>
              {cards.map((card, index) => (
                <Collapse.Panel
                  className="trello-card"
                  showArrow={false}
                  extra={card.labels.map(label => (
                    <Tag key={label.id} color={tagColor}>
                      {label.name}
                    </Tag>
                  ))}
                  key={card.id}
                  header={`版本号: ${card.name}`}
                >
                  <TrelloCard
                    name={card.name}
                    desc={card.desc}
                    version={card.fields[0]}
                    labels={card.labels}
                    due={card.due}
                    dueComplete={card.dueComplete}
                    process={card.process}
                    showStep={index === 0}
                  />
                </Collapse.Panel>
              ))}
            </Collapse>
          </main>
        ) : (
          <Spin size="large" />
        )}
      </section>
    </div>
  );
};

export default App;
