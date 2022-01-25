const { documentElement } = document;

export type Position = 'top' | 'right' | 'bottom' | 'left';

const hasPlaceAtTop = (
  tooltipDomRect: DOMRect,
  parentDomRect: DOMRect
): boolean => {
  return parentDomRect.top >= tooltipDomRect.height;
};

const hasPlaceAtLeft = (
  tooltipDomRect: DOMRect,
  parentDomRect: DOMRect
): boolean => {
  return parentDomRect.left >= tooltipDomRect.width;
};

const hasPlaceAtBottom = (
  tooltipDomRect: DOMRect,
  parentDomRect: DOMRect
): boolean => {
  const clientHeight = window.innerHeight || documentElement.clientHeight;

  return tooltipDomRect.height <= clientHeight - parentDomRect.bottom;
};

const hasPlaceAtRight = (
  tooltipDomRect: DOMRect,
  parentDomRect: DOMRect
): boolean => {
  const clientWidth = window.innerWidth || documentElement.clientWidth;

  return tooltipDomRect.width <= clientWidth - parentDomRect.right;
};

const isNotFittingOnTopButCanOnBottom = (
  tooltipDomRect: DOMRect,
  parentDomRect: DOMRect
): boolean => {
  return (
    !hasPlaceAtTop(tooltipDomRect, parentDomRect) &&
    hasPlaceAtBottom(tooltipDomRect, parentDomRect)
  );
};

const isNotFittingOnRightButCanOnLeft = (
  tooltipDomRect: DOMRect,
  parentDomRect: DOMRect
): boolean => {
  return (
    !hasPlaceAtRight(tooltipDomRect, parentDomRect) &&
    hasPlaceAtLeft(tooltipDomRect, parentDomRect)
  );
};

const isNotFittingOnBottomButCanOnTop = (
  tooltipDomRect: DOMRect,
  parentDomRect: DOMRect
): boolean => {
  return (
    !hasPlaceAtBottom(tooltipDomRect, parentDomRect) &&
    hasPlaceAtTop(tooltipDomRect, parentDomRect)
  );
};

const isNotFittingOnLeftButCanOnRight = (
  tooltipDomRect: DOMRect,
  parentDomRect: DOMRect
): boolean => {
  return (
    !hasPlaceAtLeft(tooltipDomRect, parentDomRect) &&
    hasPlaceAtRight(tooltipDomRect, parentDomRect)
  );
};

export const GetVisiblePosition = (
  tooltipDomRect: DOMRect,
  parentDomRect: DOMRect,
  position: Position
): Position => {
  switch (position) {
    case 'top':
      return isNotFittingOnTopButCanOnBottom(tooltipDomRect, parentDomRect)
        ? 'bottom'
        : 'top';
    case 'right':
      return isNotFittingOnRightButCanOnLeft(tooltipDomRect, parentDomRect)
        ? 'left'
        : 'right';
    case 'bottom':
      return isNotFittingOnBottomButCanOnTop(tooltipDomRect, parentDomRect)
        ? 'top'
        : 'bottom';
    case 'left':
      return isNotFittingOnLeftButCanOnRight(tooltipDomRect, parentDomRect)
        ? 'right'
        : 'left';
    default:
      return 'top';
  }
};