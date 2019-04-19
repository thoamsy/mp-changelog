import React, { useMemo, useState, useCallback } from 'react';
import Card from 'antd/lib/card';
import Icon from 'antd/lib/icon';
import Typography from 'antd/lib/typography';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Tag from 'antd/lib/tag';
import Drawer from 'antd/lib/drawer';

import Markdown from 'markdown-it';

const md = new Markdown();

const TrelloCard = ({ fields = [], name, desc, labels }) => {
  const tags = useMemo(
    () =>
      labels.map(label => (
        <Tag key={label.id} color={label.color}>
          {label.name}
        </Tag>
      )),
    [labels]
  );
  const [visible, setVisible] = useState(false);
  const descWithParse = useMemo(() => md.render(desc), [desc]);

  const toggleDetail = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  const actions = useMemo(() => [<Icon type="bulb" onClick={toggleDetail} />], [
    toggleDetail
  ]);

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
      <Drawer
        width={500}
        placement="right"
        maskClosable
        onClose={toggleDetail}
        destroyOnClose
        visible={visible}
      >
        <section
          className="content"
          dangerouslySetInnerHTML={{ __html: descWithParse }}
        />
      </Drawer>
    </section>
  );
};

export default TrelloCard;
