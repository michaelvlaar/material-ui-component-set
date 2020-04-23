(() => ({
  name: 'BottomNavigation',
  type: 'BODY_COMPONENT',
  allowedTypes: ['CONTENT_COMPONENT'],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { BottomNavigation, BottomNavigationAction } = window.MaterialUI.Core;
    const {
      Restore: RestoreIcon,
      Favorite: FavoriteIcon,
      Location: LocationCityIcon,
    } = window.MaterialUI.Icons;
    const { showLabel } = options;
    const { env, Children } = B;
    const isDev = env === 'dev';
    const [value, setValue] = useState(null);

    const BottomNavigationComponent = (
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        className={classes.root}
        showLabels
        className={[isDev ? '' : classes.absolute, classes.root].join(' ')}
      >
        <Children showLabels={showLabel}>{children}</Children>
      </BottomNavigation>
    );

    return isDev ? (
      <div className={classes.absolute}>{BottomNavigationComponent}</div>
    ) : (
      BottomNavigationComponent
    );
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    return {
      absolute: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
      },
      root: {
        backgroundColor: ({ options: { backgroundColor } }) => [
          style.getColor(backgroundColor),
          '!important',
        ],
      },
    };
  },
}))();
