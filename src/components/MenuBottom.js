import React from 'react';
import { Menu } from 'semantic-ui-react';

function MenuBottom(props) {
  const { handleClick } = props;
  return (
    <Menu fixed="bottom" inverted color="blue" size="small" widths={1}>
      <Menu.Item
        header
        fitted
        icon={{ name: 'plus', size: 'large' }}
        name="Add New Session"
        onClick={() => handleClick('New Session Form')}
      />
    </Menu>
  );
}

export default MenuBottom;
