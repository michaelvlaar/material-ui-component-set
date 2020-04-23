(() => ({
  name: 'BottomNavigationAction',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { BottomNavigationAction } = window.MaterialUI.Core;
    const { Icons } = window.MaterialUI;
    const { icon, text, linkTo } = options;
    const { showLabels } = parent;
    const { env } = B;
    const isDev = env === 'dev';

    const BottomNavigationActionComponent = (
      <B.Link endpoint={linkTo} className={classes.a}>
        <BottomNavigationAction
          className={classes.root}
          showLabel={showLabels}
          label={text}
          icon={icon !== 'None' ? React.createElement(Icons[icon]) : undefined}
        />
      </B.Link>
    );

    return isDev ? (
      <span>{BottomNavigationActionComponent}</span>
    ) : (
      BottomNavigationActionComponent
    );
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    return {
      a: {
        textDecoration: 'none',
      },
      root: {
        color: ({ options: { textColor } }) => [
          style.getColor(textColor),
          '!important',
        ],
      },
    };
  },
}))();
