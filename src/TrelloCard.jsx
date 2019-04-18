import React from 'react';
import Card from 'antd/lib/card';
import Icon from 'antd/lib/icon';
import Statistic from 'antd/lib/statistic';
import Typography from 'antd/lib/typography';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

const TrelloCard = ({ fields = [], name, desc }) => {
  return (
    // <section className="section" tabIndex="0">
    //   <h1 className="title is-3">{name}</h1>
    //   {fields.map(field => (
    //     <h3 className="subtitle is-5" key={field.id}>
    //       {field.name}:{field.value}
    //     </h3>
    //   ))}
    //   <article className="message">
    //     <div className="message-body">{desc}</div>
    //   </article>
    // </section>
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
            {/* <Statistic title={field.name} value={field.value} key={field.id} /> */}
          </Col>
        ))}
      </Row>
    </Card>
  );
};

export default TrelloCard;
