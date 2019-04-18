import React from 'react';
import Card from 'antd/lib/card';
import Icon from 'antd/lib/icon';
import Typography from 'antd/lib/typography';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

const TrelloCard = ({ fields = [], name, desc }) => {
  return (
    <section tabIndex="0" className="trello-card">
      <Card actions={[<Icon type="bulb" />]} title={`版本号：${name}`}>
        {/* <Card.Meta title={name} /> */}
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
