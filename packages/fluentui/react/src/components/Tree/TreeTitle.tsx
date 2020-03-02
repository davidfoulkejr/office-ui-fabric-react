import { Accessibility, treeTitleBehavior, TreeTitleBehaviorProps } from '@fluentui/accessibility';
import { getElementType, getUnhandledProps, useAccessibility, useStyles, useTelemetry } from '@fluentui/react-bindings';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
// @ts-ignore
import { ThemeContext } from 'react-fela';

import {
  childrenExist,
  createShorthandFactory,
  commonPropTypes,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  rtlTextContainer
} from '../../utils';
import { ComponentEventHandler, FluentComponentStaticProps, ProviderContextPrepared, WithAsProp, withSafeTypeForAs } from '../../types';

export interface TreeTitleProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<TreeTitleBehaviorProps>;

  /** Whether or not the title has a subtree. */
  hasSubtree?: boolean;

  /** The index of the title among its siblings. Count starts at 1. */
  index?: number;

  /** Level of the tree/subtree that contains this title. */
  level?: number;

  /**
   * Called on click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<TreeTitleProps>;

  /** Whether or not the subtree of the title is in the open state. */
  expanded?: boolean;

  /** Size of the tree containing this title without any children. */
  treeSize?: number;
}

export type TreeTitleStylesProps = never;

const TreeTitle: React.FC<WithAsProp<TreeTitleProps>> & FluentComponentStaticProps<TreeTitleProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(TreeTitle.displayName, context.telemetry);
  setStart();

  const { accessibility, children, className, content, design, hasSubtree, level, index, styles, treeSize, variables } = props;

  const getA11Props = useAccessibility(accessibility, {
    debugName: TreeTitle.displayName,
    actionHandlers: {
      performClick: e => {
        e.preventDefault();
        handleClick(e);
      }
    },
    mapPropsToBehavior: () => ({
      hasSubtree,
      level,
      index,
      treeSize
    }),
    rtl: context.rtl
  });
  const { classes } = useStyles<TreeTitleStylesProps>(TreeTitle.displayName, {
    className: TreeTitle.className,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables
    }),
    rtl: context.rtl
  });

  const ElementType = getElementType(props);
  const unhandledProps = getUnhandledProps(TreeTitle.handledProps, props);

  const handleClick = e => {
    _.invoke(props, 'onClick', e, props);
  };

  const element = (
    <ElementType
      {...getA11Props('root', {
        className: classes.root,
        onClick: handleClick,
        ...rtlTextContainer.getAttributes({ forElements: [children, content] }),
        ...unhandledProps
      })}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  );
  setEnd();

  return element;
};

TreeTitle.className = 'ui-tree__title';
TreeTitle.displayName = 'TreeTitle';

TreeTitle.propTypes = {
  ...commonPropTypes.createCommon(),
  hasSubtree: PropTypes.bool,
  index: PropTypes.number,
  level: PropTypes.number,
  onClick: PropTypes.func,
  expanded: PropTypes.bool,
  treeSize: PropTypes.number
};
TreeTitle.defaultProps = {
  as: 'a',
  accessibility: treeTitleBehavior
};
TreeTitle.handledProps = Object.keys(TreeTitle.propTypes) as any;

TreeTitle.create = createShorthandFactory({
  Component: TreeTitle,
  mappedProp: 'content'
});

/**
 * A TreeTitle renders a title of TreeItem.
 */
export default withSafeTypeForAs<typeof TreeTitle, TreeTitleProps, 'a'>(TreeTitle);
