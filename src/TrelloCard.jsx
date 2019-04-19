import React, { useMemo } from 'react';
import Card from 'antd/lib/card';
import Icon from 'antd/lib/icon';
import Typography from 'antd/lib/typography';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Tag from 'antd/lib/tag';

const TrelloCard = ({
  fields = [],
  name,
  desc,
  labels,
  toggleDetail,
  index
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
    () => [<Icon type="bulb" onClick={() => toggleDetail(index)} />],
    [index, toggleDetail]
  );

  return (
    <section tabIndex="0" className="trello-card">
      <Card extra={tags} actions={actions} title={`版本号：${name}`}>
        <Row gutter={16}>
          {fields.map(field => (
            <Col span={12} key={field.id}>
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
    </section>
  );
};

export default TrelloCard;
