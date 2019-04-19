import React, { useMemo, useRef } from 'react';
import Card from 'antd/lib/card';
import Icon from 'antd/lib/icon';
import Typography from 'antd/lib/typography';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Tag from 'antd/lib/tag';
import Steps from 'antd/lib/steps';

import ChangeLogDrawer from './ChangeLogDrawer';

const TrelloCard = ({
  fields = [],
  showStep,
  process,
  name,
  desc,
  labels,
  toggleDetail,
  index,
  visible,
  onCloseDrawer
}) => {
  const tags = useMemo(
    () =>
      labels.map(label => (
        <Tag key={label.id} color={label.color}>
          {label.name}
        </Tag>
      )),
    [labels]
  );

  const actions = useMemo(
    () => [<Icon type="ellipsis" onClick={toggleDetail} />],
    [toggleDetail]
  );

  const steps = useMemo(
    () =>
      showStep && (
        <Steps current={process.length} size="small">
          <Steps.Step title="开发中" icon={<Icon type="tool" />} />
          <Steps.Step title="发布体验版" icon={<Icon type="coffee" />} />
          <Steps.Step
            title="发布稳定版"
            icon={<Icon type="rocket" rotate={30} />}
          />
        </Steps>
      ),
    [process.length, showStep]
  );

  const cardRef = useRef();

  return (
    <section tabIndex="0" className="trello-card" ref={cardRef}>
      <Card extra={tags} actions={actions} title={`版本号：${name}`}>
        {steps}
        <Row gutter={16}>
          {fields.map(field => (
            <Col span={24} key={field.id}>
              <Typography.Title level={4}>{field.name}</Typography.Title>
              <Typography.Paragraph>
                {typeof field.value === 'boolean' ? (
                  <p>
                    已发布 <Icon type="smile" twoToneColor />
                  </p>
                ) : (
                  field.value
                )}
              </Typography.Paragraph>
            </Col>
          ))}
        </Row>
      </Card>
      <ChangeLogDrawer
        changelog={desc}
        container={cardRef}
        visible={visible}
        onClose={onCloseDrawer}
      />
    </section>
  );
};

export default TrelloCard;
