import React, { useMemo, useRef } from 'react';
import Icon from 'antd/lib/icon';
import Markdown from 'markdown-it';
import Typography from 'antd/lib/typography';
import Col from 'antd/lib/col';
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
        <Col span={24} key={version.id}>
          <Typography.Title level={4}>{version.name}</Typography.Title>
          <Typography.Paragraph>
            {typeof version.value === 'boolean' ? (
              <p>
                已发布 <Icon type="smile" twoToneColor />
              </p>
            ) : (
              <strong>{version.value}</strong>
            )}
          </Typography.Paragraph>
        </Col>
      ) : (
        <Col span={24}>
          <Typography.Paragraph>状态待更新</Typography.Paragraph>
        </Col>
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
