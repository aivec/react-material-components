import React from 'react';
import clsx from 'clsx';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import CloseIcon from '@mui/icons-material/Close';
import { amber } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Snackbar, { SnackbarCloseReason, SnackbarProps } from '@mui/material/Snackbar';
import SnackbarContent from '@mui/material/SnackbarContent';
import WarningIcon from '@mui/icons-material/Warning';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { Theme } from '@mui/system';

const iconMap = {
  info: InfoIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  success: CheckCircleIcon,
};

const variantIcon = {
  success: {
    icon: CheckCircleIcon,
    color: '#33da3a',
  },
  warning: {
    icon: WarningIcon,
    color: amber[300],
  },
  error: {
    icon: ErrorIcon,
    color: undefined,
  },
  info: {
    icon: InfoIcon,
    color: undefined,
  },
  theme: {
    icon: null,
    color: undefined,
  },
  default: {
    icon: null,
    color: undefined,
  },
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    success: {},
    error: {
      backgroundColor: theme.palette.error.dark,
    },
    theme: {
      backgroundColor: theme.palette.primary.main,
    },
    warning: {},
    info: {},
    default: {},
    icon: {
      fontSize: 20,
    },
    iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing(1),
    },
    message: {
      display: 'flex',
      alignItems: 'center',
    },
    margin: {
      margin: theme.spacing(1),
    },
  }),
);

const theme = createTheme();

export interface IconProps {
  /**
   * Specifies which type of icon to display.
   */
  icon: 'success' | 'warning' | 'error' | 'info';
  /**
   * Sets the icons color.
   */
  color?: string;
}

export interface CustomSnackbarProps extends SnackbarProps {
  /**
   * Specifies the type of snackbar to show.
   */
  type?: 'error' | 'info' | 'success' | 'warning' | 'theme' | 'default';
  /**
   * Sets the snackbar background color.
   *
   * Only applied if `type` is not specified (undefined).
   */
  backgroundColor?: string;
  /**
   * Sets the snackbar message text color.
   *
   * Only applied if `type` is not specified (undefined).
   */
  textColor?: string;
  /**
   * Sets the snackbar close icon button color.
   *
   * Only applied if `type` is not specified (undefined).
   */
  closeIconColor?: string;
  /**
   * Sets the icon displayed left of the snackbar message.
   *
   * Only applied if `type` is not specified (undefined).
   */
  icon?: IconProps;
}

/**
 * This component is an extension of material-ui's [Snackbar](https://material-ui.com/components/snackbars/)
 * with sensible defaults for common types of snackbar states, such as `warning`, `info`, `error`, and `success`.
 *
 * Besides the `type` property and a few other addons, this component takes the same props as material-ui's implementation.
 */
function CustomSnackbar({
  onClose = (): void => {},
  anchorOrigin = {
    vertical: 'bottom',
    horizontal: 'center',
  },
  autoHideDuration = 6000,
  message,
  type,
  textColor,
  closeIconColor,
  backgroundColor,
  icon,
  ...other
}: CustomSnackbarProps): JSX.Element {
  const classes = useStyles({});

  const handleClose = (event: React.SyntheticEvent<any>, reason: SnackbarCloseReason): void => {
    if (reason === 'clickaway') {
      return;
    }

    onClose(event, reason);
  };

  const handleIconClick = (event: React.SyntheticEvent<any>): void => {
    onClose(event, 'clickaway');
  };

  let CustomSnackbarContent;
  let Icon = null;
  let IconHtml = null;
  if (type) {
    Icon = variantIcon[type].icon;
    if (Icon) {
      if (variantIcon[type].color) {
        IconHtml = (
          <Icon
            className={clsx(classes.icon, classes.iconVariant)}
            style={{ color: variantIcon[type].color }}
          />
        );
      } else {
        IconHtml = <Icon className={clsx(classes.icon, classes.iconVariant)} />;
      }
    }
    CustomSnackbarContent = (
      <SnackbarContent
        className={clsx(classes[type], classes.margin)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            {IconHtml}
            {message}
          </span>
        }
        action={
          <IconButton key="close" aria-label="close" color="inherit" onClick={handleIconClick}>
            <CloseIcon className={classes.icon} />
          </IconButton>
        }
      />
    );
  } else if (backgroundColor || icon) {
    if (icon) {
      Icon = iconMap[icon.icon];
      const style = icon.color ? { color: icon.color } : undefined;
      IconHtml = <Icon className={clsx(classes.icon, classes.iconVariant)} style={style} />;
    }
    const contentStyle: { backgroundColor?: string; color?: string } = {};
    if (backgroundColor) {
      contentStyle.backgroundColor = backgroundColor;
    }
    if (textColor) {
      contentStyle.color = textColor;
    }
    const closeIconStyle = closeIconColor ? { color: closeIconColor } : undefined;
    CustomSnackbarContent = (
      <SnackbarContent
        className={clsx(classes.margin)}
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className={classes.message}>
            {IconHtml}
            {message}
          </span>
        }
        action={
          <IconButton key="close" aria-label="close" color="inherit" onClick={handleIconClick}>
            <CloseIcon className={classes.icon} style={closeIconStyle} />
          </IconButton>
        }
        style={contentStyle}
      />
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        anchorOrigin={anchorOrigin}
        autoHideDuration={autoHideDuration}
        onClose={handleClose}
        message={message}
        /* eslint-disable-next-line */
        {...other}
      >
        {CustomSnackbarContent}
      </Snackbar>
    </ThemeProvider>
  );
}

export default CustomSnackbar;
