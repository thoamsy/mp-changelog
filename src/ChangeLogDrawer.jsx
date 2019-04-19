import React, { useMemo } from 'react';

import Drawer from 'antd/lib/drawer';

import Markdown from 'markdown-it';

const md = new Markdown();

const ChangeLogDrawer = ({ changelog, visible, onClose }) => {
  const changelogWithParse = useMemo(() => md.render(changelog), [changelog]);
  return (
    <Drawer
      width={500}
      title="更新日志"
      placement="right"
      maskClosable
      closable={false}
      onClose={onClose}
      visible={visible}
    >
      <section
        className="content"
        dangerouslySetInnerHTML={{ __html: changelogWithParse }}
      />
    </Drawer>
  );
};
export default ChangeLogDrawer;
