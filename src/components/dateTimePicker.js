(() => ({
  name: 'DateTimePicker',
  type: 'CONTENT_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const {
      label,
      defaultValue,
      required,
      disabled,
      error,
      placeholder,
      variant,
      inputvariant,
      type,
      dateFormat,
      timeFormat,
      dateTimeFormat,
      size,
      fullWidth,
      margin,
      helperText,
      actionInputId,
      disableToolbar,
      property,
      propertyLabelOverride,
      hideLabel,
      use24HourClockDateTime,
      use24HourClockTime,
    } = options;

    const {
      MuiPickersUtilsProvider,
      KeyboardTimePicker,
      KeyboardDatePicker,
      KeyboardDateTimePicker,
    } = window.MaterialUI.Pickers;
    const { DateFnsUtils } = window.MaterialUI;
    const DateFns = new DateFnsUtils();
    const { getActionInput, useText, getProperty, env } = B;
    const isDev = env === 'dev';
    const actionInput = getActionInput(actionInputId);
    const strDefaultValue = useText(defaultValue);
    const [selectedDate, setSelectedDate] = useState();
    const helper = useText(helperText);
    const placeholderText = useText(placeholder);
    const { label: propertyLabelText } = getProperty(property) || {};
    const propLabelOverride = useText(propertyLabelOverride);
    const propertyLabel = propLabelOverride || propertyLabelText;
    const labelText = property ? propertyLabel : useText(label);

    const isValidDate = date => date instanceof Date && !isNaN(date);

    const changeHandler = date => {
      setSelectedDate(date);
    };

    const setDefaultDate = (defaultFormat, givenFormat) => {
      if (!selectedDate) {
        const propDefaultParse = defaultFormat
          ? DateFns.parse(strDefaultValue, defaultFormat)
          : new Date(strDefaultValue);
        const formatDefaultParse = DateFns.parse(strDefaultValue, givenFormat);

        if (isValidDate(propDefaultParse)) {
          setSelectedDate(propDefaultParse);
        } else if (isValidDate(formatDefaultParse)) {
          setSelectedDate(formatDefaultParse);
        } else {
          setSelectedDate(DateFns.parse('00:00:00', 'HH:mm:ss'));
        }
      }
    };

    useEffect(() => {
      B.defineFunction('Clear', () => setSelectedDate(''));
    }, []);

    let DateTimeComponent;
    let format;
    let resultString;
    let use24HourClock = true;

    switch (type) {
      case 'date': {
        DateTimeComponent = KeyboardDatePicker;
        format = dateFormat || 'dd/MM/yyyy';

        setDefaultDate('yyyy-MM-dd', format);

        resultString = isValidDate(selectedDate)
          ? DateFns.format(selectedDate, 'yyyy-MM-dd')
          : null;
        break;
      }
      case 'datetime': {
        DateTimeComponent = KeyboardDateTimePicker;
        format = dateTimeFormat || 'dd/MM/yyyy HH:mm:ss';
        use24HourClock = use24HourClockDateTime;

        setDefaultDate(null, format);

        resultString = isValidDate(selectedDate)
          ? new Date(selectedDate).toISOString()
          : new Date().toISOString();
        break;
      }
      case 'time': {
        DateTimeComponent = KeyboardTimePicker;
        format = timeFormat || 'HH:mm:ss';
        use24HourClock = use24HourClockTime;

        setDefaultDate('HH:mm:ss', format);

        resultString = isValidDate(selectedDate)
          ? DateFns.format(selectedDate, 'HH:mm:ss')
          : null;
        break;
      }
      default:
    }

    const DateTimeCmp = (
      <DateTimeComponent
        value={selectedDate}
        size={size}
        classes={{ root: classes.formControl }}
        variant={variant}
        placeholder={placeholderText}
        fullWidth={fullWidth}
        onChange={changeHandler}
        inputVariant={inputvariant}
        InputProps={{
          inputProps: {
            tabIndex: isDev && -1,
          },
        }}
        KeyboardButtonProps={{
          tabIndex: isDev && -1,
        }}
        required={required}
        disabled={disabled}
        label={!hideLabel && labelText}
        error={error}
        margin={margin}
        helperText={helper}
        disableToolbar={disableToolbar}
        format={format}
        PopoverProps={{
          classes: {
            root: classes.popover,
          },
        }}
        DialogProps={{
          className: classes.dialog,
        }}
        ampm={!use24HourClock}
      />
    );

    return isDev ? (
      <div className={classes.root}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          {variant === 'static' ? (
            <div className={classes.static}>{DateTimeCmp}</div>
          ) : (
            DateTimeCmp
          )}
        </MuiPickersUtilsProvider>
      </div>
    ) : (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <input
          type="hidden"
          name={actionInput && actionInput.name}
          value={resultString}
        />
        {variant === 'static' ? (
          <div className={classes.static}>{DateTimeCmp}</div>
        ) : (
          DateTimeCmp
        )}
      </MuiPickersUtilsProvider>
    );
  })(),
  styles: B => t => {
    const style = new B.Styling(t);
    return {
      root: {
        display: ({ options: { fullWidth } }) =>
          fullWidth ? 'block' : 'inline-block',
        '& > *': {
          pointerEvents: 'none',
        },
      },
      dialog: {
        '& .MuiPickersToolbar-toolbar, & .MuiPickersDay-daySelected': {
          backgroundColor: ({ options: { backgroundColorPopup } }) => [
            style.getColor(backgroundColorPopup),
            '!important',
          ],
        },
        '& .MuiButton-textPrimary': {
          color: ({ options: { backgroundColorPopup } }) => [
            style.getColor(backgroundColorPopup),
            '!important',
          ],
        },
      },
      popover: {
        '& .MuiPickersToolbar-toolbar, & .MuiPickersDay-daySelected': {
          backgroundColor: ({ options: { backgroundColorPopup } }) => [
            style.getColor(backgroundColorPopup),
            '!important',
          ],
        },
      },
      formControl: {
        '& > label': {
          color: ({ options: { labelColor } }) => [
            style.getColor(labelColor),
            '!important',
          ],
          zIndex: ({ options: { variant } }) =>
            variant === 'standard' ? 1 : null,
          '&.Mui-focused': {
            color: ({ options: { borderFocusColor } }) => [
              style.getColor(borderFocusColor),
              '!important',
            ],
          },
          '&.Mui-error': {
            color: ({ options: { errorColor } }) => [
              style.getColor(errorColor),
              '!important',
            ],
          },
          '&.Mui-disabled': {
            pointerEvents: 'none',
            opacity: '0.7',
          },
        },
        '& > p': {
          color: ({ options: { helperColor } }) => [
            style.getColor(helperColor),
            '!important',
          ],
          '&.Mui-error': {
            color: ({ options: { errorColor } }) => [
              style.getColor(errorColor),
              '!important',
            ],
          },
        },
        '& .MuiInputBase-root': {
          color: ({ options: { textColor } }) => [
            style.getColor(textColor),
            '!important',
          ],
          backgroundColor: ({ options: { backgroundColor } }) => [
            style.getColor(backgroundColor),
            '!important',
          ],
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline, & .MuiFilledInput-underline, & .MuiInput-underline': {
              borderColor: ({ options: { borderHoverColor } }) => [
                style.getColor(borderHoverColor),
                '!important',
              ],
            },
          },
          '&.Mui-focused, &.Mui-focused:hover': {
            '& .MuiOutlinedInput-notchedOutline, & .MuiFilledInput-underline, & .MuiInput-underline': {
              borderColor: ({ options: { borderFocusColor } }) => [
                style.getColor(borderFocusColor),
                '!important',
              ],
            },
          },
          '& fieldset': {
            top: ({ options: { hideLabel } }) => (hideLabel ? 0 : null),
          },
          '& legend': {
            display: ({ options: { hideLabel } }) =>
              hideLabel ? ['none', '!important'] : null,
          },
          '& input': {
            '&::placeholder': {
              color: ({ options: { placeholderColor } }) => [
                style.getColor(placeholderColor),
                '!important',
              ],
            },
          },
          '&.Mui-disabled': {
            pointerEvents: 'none',
            opacity: '0.7',
          },
        },
        '& .MuiIconButton-root': {
          color: ({ options: { textColor } }) => [
            style.getColor(textColor),
            '!important',
          ],
        },
        '& .MuiOutlinedInput-notchedOutline, & .MuiFilledInput-underline, & .MuiInput-underline': {
          borderColor: ({ options: { borderColor } }) => [
            style.getColor(borderColor),
            '!important',
          ],
        },
        '& .MuiInput-underline, & .MuiFilledInput-underline': {
          '&::before, &::after': {
            borderColor: ({ options: { borderColor } }) => [
              style.getColor(borderColor),
              '!important',
            ],
          },
          '&:hover': {
            '&::before, &::after': {
              borderColor: ({ options: { borderHoverColor } }) => [
                style.getColor(borderHoverColor),
                '!important',
              ],
            },
          },
          '&.Mui-focused::before, &.Mui-focused::after, &.Mui-focused:hover::before, &.Mui-focused:hover::after': {
            borderColor: ({ options: { borderFocusColor } }) => [
              style.getColor(borderFocusColor),
              '!important',
            ],
          },
        },
        '& .MuiInputBase-root.Mui-error, & .MuiInputBase-root.Mui-error:hover, & .MuiInputBase-root.Mui-error.Mui-focused, & .MuiInputBase-root.Mui-error.Mui-focused:hover': {
          '& .MuiOutlinedInput-notchedOutline, & .MuiFilledInput-underline, & .MuiInput-underline': {
            borderColor: ({ options: { errorColor } }) => [
              style.getColor(errorColor),
              '!important',
            ],
          },
          '&.MuiInput-underline, &.MuiFilledInput-underline': {
            '&::before, &::after': {
              borderColor: ({ options: { errorColor } }) => [
                style.getColor(errorColor),
                '!important',
              ],
            },
            '&:hover': {
              '&::before, &::after': {
                borderColor: ({ options: { errorColor } }) => [
                  style.getColor(errorColor),
                  '!important',
                ],
              },
            },
            '&.Mui-focused::before, &.Mui-focused::after, &.Mui-focused:hover::before, &.Mui-focused:hover::after': {
              borderColor: ({ options: { errorColor } }) => [
                style.getColor(errorColor),
                '!important',
              ],
            },
          },
        },
      },
      static: {
        '& .MuiPickersStaticWrapper-staticWrapperRoot': {
          '& .MuiToolbar-root, & .MuiPickersDay-daySelected': {
            backgroundColor: ({ options: { backgroundColorPopup } }) => [
              style.getColor(backgroundColorPopup),
              '!important',
            ],
          },
        },
      },
    };
  },
}))();
