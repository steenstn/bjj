import React from 'react';
import { Menu } from 'semantic-ui-react';

function MenuTop(props) {
  const { handleClick } = props;

  return (
    <Menu color="blue" borderless inverted fixed="top" widths={3}>
      <Menu.Item
        header
        icon={{ name: 'user circle', size: 'large' }}
        onClick={() => handleClick('Profile')}
      />
      <Menu.Item
        header
        icon={{ name: 'calendar alternate outline', size: 'large' }}
        onClick={() => handleClick('Planned Training Sessions')}
      />
      <Menu.Item
        header
        icon={{ name: 'clock outline', size: 'large' }}
        onClick={() => handleClick('Past Training Sessions')}
      />
    </Menu>
  );
}

export default MenuTop;
