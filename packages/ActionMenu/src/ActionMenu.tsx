import * as React from 'react';
import cx from 'classnames';

import List, { OptionType, Option } from '@igloo-ui/list';
import Dropdown, { Position } from '@igloo-ui/dropdown';

import './action-menu.scss';

export enum Keys {
  Enter = 'Enter',
  Space = ' ',
  ArrowDown = 'ArrowDown',
  ArrowUp = 'ArrowUp',
  Escape = 'Escape',
  Tab = 'Tab',
  Home = 'Home',
  End = 'End',
}

export type FocusDirection = 'first' | 'last' | 'up' | 'down';

export type ActionMenuOption = Omit<Option, 'type'>;

export interface ActionMenuProps extends React.ComponentProps<'div'> {
  /** Add a specific class to the action menu */
  className?: string;
  /** Whether or not the action menu should close when an option is selected */
  closeOnSelect?: boolean | ((option: OptionType) => boolean);
  /** Add a data-test tag for automated tests */
  dataTest?: string;
  /** Whether or not the action menu should be open by default */
  isOpen?: boolean;
  /** Callback when the action menu is closed  */
  onMenuClose?: () => void;
  /** Callback when the action menu is opened  */
  onMenuOpen?: () => void;
  /** Callback when an option is selected */
  onOptionSelect?: (option: OptionType) => void;
  /** A list of options to display in the action menu */
  options: ActionMenuOption[];
  /** Position of the action menu */
  position?: Position;
  /** Render the reference element to be able to add the
   * reference props directly */
  renderReference: (
    props: React.HTMLProps<HTMLButtonElement>
  ) => React.ReactElement;
}

const ActionMenu: React.FunctionComponent<ActionMenuProps> = (
  props: ActionMenuProps
) => {
  const {
    className,
    closeOnSelect = true,
    dataTest,
    isOpen = false,
    onMenuClose,
    onMenuOpen,
    onOptionSelect,
    options,
    position = 'bottom-end',
    renderReference,
    ...rest
  } = props;

  const actionMenuOptions = options.map((option): OptionType => {
    return {
      ...option,
      type: 'list',
    };
  });

  const [showMenu, setShowMenu] = React.useState(isOpen);
  const [currentFocusedOption, setCurrentFocusedOption] =
    React.useState<OptionType>();

  const isOptionDisabled = (option: OptionType | undefined): boolean => {
    if (option?.type === 'list') {
      return option?.disabled ?? false;
    }
    return false;
  };

  const toggleMenu = (open: boolean): void => {
    setShowMenu(open);

    if (!open) {
      if (onMenuClose) {
        onMenuClose();
      }
    } else if (onMenuOpen) {
      onMenuOpen();
    }
  };

  const closeMenuOnSelect = (option: OptionType): boolean => {
    if (typeof closeOnSelect === 'function') {
      return closeOnSelect(option);
    }

    return closeOnSelect;
  };

  const selectOption = (option: OptionType): void => {
    if (onOptionSelect) {
      onOptionSelect(option);
    }

    if (closeMenuOnSelect(option)) {
      toggleMenu(false);
    }
  };

  const hoverOption = (option: OptionType): void => {
    setCurrentFocusedOption(option);
  };

  const focusOption = (direction: FocusDirection = 'first'): void => {
    const enabledOptions = actionMenuOptions.filter(
      (option) => !isOptionDisabled(option)
    );
    if (!enabledOptions.length) return;

    let currentFocusedIndex = -1;
    if (currentFocusedOption) {
      currentFocusedIndex = enabledOptions.findIndex(
        (enabledOption) => enabledOption.value === currentFocusedOption.value
      );
    }

    switch (direction) {
      case 'up':
        setCurrentFocusedOption(
          enabledOptions[
            currentFocusedIndex > 0
              ? currentFocusedIndex - 1
              : enabledOptions.length - 1
          ]
        );
        break;
      case 'down':
        setCurrentFocusedOption(
          enabledOptions[(currentFocusedIndex + 1) % enabledOptions.length]
        );
        break;
      case 'last':
        setCurrentFocusedOption(enabledOptions[enabledOptions.length - 1]);
        break;
      default:
        setCurrentFocusedOption(enabledOptions[0]);
        break;
    }
  };

  const handleOnKeyDown = (
    keyboardEvent: React.KeyboardEvent<HTMLButtonElement>
  ): void => {
    switch (keyboardEvent.key) {
      case Keys.Escape:
        if (showMenu) {
          toggleMenu(showMenu);
        }
        break;
      case Keys.Enter:
        keyboardEvent.preventDefault();
        keyboardEvent.stopPropagation();
        if (currentFocusedOption) {
          selectOption(currentFocusedOption);
        }
        if ((!currentFocusedOption && showMenu) || !showMenu) {
          toggleMenu(!showMenu);
        }
        break;
      case Keys.Space:
        if (!showMenu) {
          toggleMenu(true);
        }
        break;
      case Keys.ArrowUp:
        keyboardEvent.preventDefault();
        keyboardEvent.stopPropagation();

        focusOption('up');
        break;
      case Keys.ArrowDown:
        keyboardEvent.preventDefault();
        keyboardEvent.stopPropagation();
        focusOption('down');
        break;
      case Keys.Home:
        keyboardEvent.preventDefault();
        keyboardEvent.stopPropagation();

        focusOption('first');
        break;
      case Keys.End:
        keyboardEvent.preventDefault();
        keyboardEvent.stopPropagation();

        focusOption('last');
        break;
      case Keys.Tab:
        if (showMenu) {
          toggleMenu(showMenu);
        }

        break;
      default:
        break;
    }
  };

  const actionMenuClassname = cx('ids-action-menu', className);

  return (
    <div className={actionMenuClassname} data-test={dataTest} {...rest}>
      <Dropdown
        key="selectDropdown"
        role="menu"
        content={
          <List
            options={actionMenuOptions}
            onOptionFocus={hoverOption}
            onOptionChange={selectOption}
            focusedOption={currentFocusedOption}
          />
        }
        isOpen={showMenu}
        className="ids-action-menu__dropdown"
        position={position}
        onClose={() => toggleMenu(false)}
        renderReference={(refProps: React.HTMLProps<HTMLButtonElement>) => {
          return renderReference({
            onClick: () => toggleMenu(!showMenu),
            onKeyDown: handleOnKeyDown,
            className: 'ids-action-menu__trigger',
            ...refProps,
          });
        }}
      />
    </div>
  );
};

export default ActionMenu;