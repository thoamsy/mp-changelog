import Icon from 'antd/lib/icon';
import Popover from 'antd/lib/popover';
import Spin from 'antd/lib/spin';
import Statistic from 'antd/lib/statistic';
import Timeline from 'antd/lib/timeline';
import Tooltip from 'antd/lib/tooltip';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import TrelloCard from './TrelloCard';
import useVimShortcut from './useVimShortcut';
import { convertCustomFieldItems, indexBy } from './utils';

const trelloAPI = 'https://trello.com/b/FuVtXQQ5/零售小程序版本记录.json';
const indexById = indexBy('id');

const fetchTrelloInformation = () => {
  return fetch(trelloAPI, {
    mode: 'cors',
  }).then(res => res.ok && res.json());
};

const clockIcon = due => {
  const deadline = new Date(due);
  return (
    <Popover
      content={
        <Statistic.Countdown
          title="还有"
          value={Number(deadline)}
          format="D 天 H 时"
        />
      }
      title={`预计 ${deadline.toLocaleDateString()} 发布`}
    >
      <Icon
        spin
        type="clock-circle-o"
        theme="twoTone"
        style={{ fontSize: 18 }}
      />
    </Popover>
  );
};

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
      setVisible(Array.from({ length: cards.length }, () => false));
    }

    adaptApi();
  }, []);

  const toggleDetail = useCallback(index => {
    setVisible(state => state.map((s, i) => (i === index ? !s : s)));
  }, []);

  const onClose = useCallback(
    index =>
      setVisible(state => state.map((s, i) => (i === index ? false : s)), []),
    [],
  );

  const section = useRef();
  const { getContainerProps, getFocusElementProps } = useVimShortcut(section, {
    listLength: cards.length,
    onEnter: toggleDetail,
    autoFocus: true,
  });

  return (
    <div className="section">
      <section
        ref={section}
        className="container card-container"
        {...getContainerProps()}
      >
        <h3 className="title">零售小程序版本记录</h3>
        {cards.length ? (
          <main>
            <Timeline>
              {cards.map((card, index) => (
                <Timeline.Item
                  color="green"
                  key={card.id}
                  dot={
                    !card.due || card.dueComplete
                      ? rocketIcon
                      : clockIcon(card.due)
                  }
                >
                  <TrelloCard
                    name={card.name}
                    desc={card.desc}
                    fields={card.fields}
                    labels={card.labels}
                    due={card.due}
                    getFocusElementProps={getFocusElementProps}
                    dueComplete={card.dueComplete}
                    process={card.process}
                    visible={visible[index]}
                    toggleDetail={() => toggleDetail(index)}
                    onCloseDrawer={() => onClose(index)}
                    showStep={index === 0}
                  />
                </Timeline.Item>
              ))}
              {!!cards.length && (
                <Timeline.Item dot={<Icon type="frown" theme="twoTone" />}>
                  消失在历史长河中的版本记录
                </Timeline.Item>
              )}
            </Timeline>
          </main>
        ) : (
          <Spin size="large" />
        )}
      </section>
    </div>
  );
};

export default App;
