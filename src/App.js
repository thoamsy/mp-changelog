import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useMemo
} from 'react';
import Timeline from 'antd/lib/timeline';
import Icon from 'antd/lib/icon';
import Popover from 'antd/lib/popover';
import Tooltip from 'antd/lib/tooltip';
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

const clockIcon = due => (
  <Popover content={new Date(due).toLocaleDateString()} title="预计发布时间">
    <Icon spin type="clock-circle-o" theme="twoTone" style={{ fontSize: 18 }} />
  </Popover>
);

const rocketIcon = (
  <Tooltip title="已发布">
    <Icon type="rocket" rotate={30} theme="twoTone" style={{ fontSize: 18 }} />
  </Tooltip>
);

const App = () => {
  const [cards, setCards] = useState([]);
  const [visible, setVisible] = useState([]);
  useEffect(() => {
    async function adaptApi() {
      const trelloFromCache = localStorage.getItem('trello');
      const trelloCards =
        JSON.parse(trelloFromCache) || (await fetchTrelloInformation());
      const { cards, customFields } = trelloCards;
      const customFieldsMap = indexById(customFields);

      cards.forEach(
        card =>
          (card.fields = convertCustomFieldItems(
            card.customFieldItems,
            customFieldsMap
          ))
      );
      setCards(cards.slice(0, -1)); // 最后一张比较特殊，不需要
      setVisible(Array.from({ length: cards.length }, () => false));
      !trelloFromCache &&
        localStorage.setItem('trello', JSON.stringify(trelloCards));
    }

    adaptApi();
  }, []);

  const toggleDetail = useCallback(index => {
    setVisible(state => state.map((s, i) => (i === index ? !s : s)));
    // setChangelog(cards[index].desc);
  }, []);

  const onClose = useCallback(
    index =>
      setVisible(state => state.map((s, i) => (i === index ? false : s)), []),
    []
  );

  const section = useRef();
  useVimShortcut(section, {
    listLength: cards.length,
    selector: '.trello-card',
    onEnter: toggleDetail
  });

  return (
    <main className="section">
      <section ref={section} className="container card-container">
        <Timeline>
          {cards.map((card, index) => (
            <Timeline.Item
              color="green"
              key={card.id}
              dot={
                !card.due || card.dueComplete ? rocketIcon : clockIcon(card.due)
              }
            >
              <TrelloCard
                name={card.name}
                desc={card.desc}
                fields={card.fields}
                labels={card.labels}
                due={card.due}
                dueComplete={card.dueComplete}
                visible={visible[index]}
                toggleDetail={() => toggleDetail(index)}
                onCloseDrawer={() => onClose(index)}
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
