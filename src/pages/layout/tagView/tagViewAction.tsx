import type { FC } from 'react';
import { SettingOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { LocaleFormatter } from '@/locales';
import { removeAllTag, removeOtherTag, removeTag } from '@/stores/tags-view.store';

const TagsViewAction: FC = () => {
  const { activeTagId } = useSelector(state => state.tagsView);
  const dispatch = useDispatch();

  return (
    <Dropdown
      menu={{
        items: [
          {
            key: '0',
            onClick: () => dispatch(removeTag(activeTagId)),
            label: <LocaleFormatter id="closeCurrent" />,
          },
          {
            key: '1',
            onClick: () => dispatch(removeOtherTag()),
            label: <LocaleFormatter id="closeOther" />,
          },
          {
            key: '2',
            onClick: () => dispatch(removeAllTag()),
            label: <LocaleFormatter id="closeAll" />,
          },
          {
            key: '3',
            type: 'divider',
          }
        ],
      }}
    >
      <span id="pageTabs-actions">
        <SettingOutlined className="tagsView-extra" />
      </span>
    </Dropdown>
  );
};

export default TagsViewAction;
