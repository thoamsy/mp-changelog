import React, { useMemo, useRef } from 'react';
import Icon from 'antd/lib/icon';
import Markdown from 'markdown-it';
import Steps from 'antd/lib/steps';
import Divider from 'antd/lib/divider';

const md = new Markdown();

const TrelloCard = ({ version, showStep, process, name, desc, labels }) => {
  const steps = useMemo(
    () =>
      showStep && (
        <>
          <Steps current={process.length} size="small">
            <Steps.Step title="开发中" icon={<Icon type="tool" />} />
            <Steps.Step title="发布体验版" icon={<Icon type="coffee" />} />
            <Steps.Step
              title="发布稳定版"
              icon={<Icon type="rocket" rotate={30} />}
            />
          </Steps>
          <Divider />
        </>
      ),
    [process.length, showStep],
  );

  const cardRef = useRef();
  const changelogWithParse = useMemo(() => md.render(desc), [desc]);

  return (
    <section tabIndex="0" ref={cardRef}>
      {steps}
      {version ? (
        <>
          <h2 className="title is-5">{version.name}</h2>
          <h3 className="subtitle is-6">
            {typeof version.value === 'boolean' ? '已发布' : version.value}
          </h3>
        </>
      ) : (
        <h2 className="title is-4">状态待更新</h2>
      )}
      <Divider />
      <section
        className="content"
        dangerouslySetInnerHTML={{ __html: changelogWithParse }}
      />
    </section>
  );
};

export default TrelloCard;
