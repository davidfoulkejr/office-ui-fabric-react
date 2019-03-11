/** @jsx withSlots */
import * as React from 'react';
import { withSlots, createComponent, getSlots } from '@uifabric/foundation';
import { ICardItemComponent, ICardItemProps, ICardItemSlots } from './CardItem.types';
import { CardItemStyles as styles } from './CardItem.styles';

const view: ICardItemComponent['view'] = props => {
  const { children } = props;
  if (React.Children.count(children) < 1) {
    return null;
  }

  const Slots = getSlots<ICardItemProps, ICardItemSlots>(props, {
    root: 'div'
  });

  return <Slots.root>{children}</Slots.root>;
};

export const CardItem: React.FunctionComponent<ICardItemProps> = createComponent({
  displayName: 'CardItem',
  styles,
  view
});

export default CardItem;
