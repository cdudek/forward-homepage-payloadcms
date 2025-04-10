# Mobile Menu Button Fix Attempts

## Problem Description

When swiping left in the ServicesTabBlock component, the mobile menu button (hamburger icon) is moving to the right, out of screen, then right, and then back to its original position. However, when swiping right, the menu doesn't move.

The mobile menu button is defined in `src/Header/Component.client.tsx` and has `fixed` positioning with `right-4 top-4 z-50` classes.

## Attempts Made

### Attempt 1: Increasing z-index

**What was tried**: Increased z-index from z-50 to z-[150]
**File modified**: src/Header/Component.client.tsx
**Result**: No change. The button still moves during left swipes.
**Reason for failure**: Z-index only affects stacking order, not how elements respond to gesture events.

### Attempt 2: Adding transform and reinforcing position

**What was tried**: Added `transform: 'translateZ(0)'` and reinforced `position: 'fixed'` with inline styles
**File modified**: src/Header/Component.client.tsx  
**Result**: No change. Button still moves during left swipes.
**Reason for failure**: The transformation properties don't isolate the element from gesture propagation.

### Attempt 3: React Portal approach

**What was tried**: Implemented a React Portal approach to physically separate the button from DOM tree
**File modified**: src/Header/Component.client.tsx
**Result**: No change. Button still moves during left swipes.
**Reason for failure**: Possibly the event propagation is happening at a more fundamental level than React's component tree.

### Attempt 4: Modifying ServicesTabBlock drag properties

**What was tried**: Added `dragPropagation={false}` and `dragControls={undefined}` to the motion.div elements
**File modified**: src/blocks/ServicesTabBlock/Component.tsx
**Result**: No change. Button still moves during left swipes.
**Reason for failure**: The drag properties don't seem to affect how the gestures propagate to other elements.

### Attempt 5: Change button to anchor element

**What was tried**: Changed the mobile menu button from a `<button>` element to an `<a>` element
**File modified**: src/Header/Component.client.tsx
**Result**: No change. Button still moves during left swipes.
**Reason for failure**: Changing the element type doesn't affect how it responds to global transformations.

### Attempt 6: Using TypeScript 'as any' for position fixed

**What was tried**: Set button style with `position: 'fixed' as any`
**File modified**: src/Header/Component.client.tsx
**Result**: No change. Button still moves during left swipes.
**Reason for failure**: Simply declaring position as fixed using TypeScript casting didn't prevent the transformation effects.

### Attempt 7: Explicit positioning and transform:none

**What was tried**: Added explicit right/top values and transform:none to override any inherited transforms
**File modified**: src/Header/Component.client.tsx
**Result**: No change. Button still moves during left swipes.
**Reason for failure**: Explicit coordinates and transform:none weren't sufficient to prevent the drag effects from propagating.

### Attempt 8: Comprehensive isolation wrapper

**What was tried**: Wrapped button in a div with multiple isolation techniques including will-change, transform-style, and isolation properties
**File modified**: src/Header/Component.client.tsx
**Result**: No change. Button still moves during left swipes.
**Reason for failure**: Even combined isolation techniques can't prevent Framer Motion's drag transforms from affecting the entire document.

### Attempt 9: Replace Framer Motion Drag with react-swipeable

**What was tried**: Completely removed Framer Motion's `drag` functionality and replaced it with react-swipeable handlers
**File modified**: src/blocks/ServicesTabBlock/Component.tsx
**Result**: [Awaiting test]
**Reasoning**: By removing the source of the problem (Framer Motion's drag), we avoid the transform-based approach that was affecting other elements. The react-swipeable library provides gesture detection without using transform properties that propagate up the DOM tree.

**Implementation Details**:

1. Added `useSwipeable` hooks for both tabs and content containers
2. Removed all `drag`, `dragConstraints`, `dragElastic`, and `onDragEnd` properties
3. Kept the same swipe behavior and direction handling
4. Used the same threshold and sensitivity settings

## Conclusion

After multiple attempts to isolate the menu button from the effects of Framer Motion's drag functionality, we determined that the best approach was to address the root cause by replacing the drag implementation entirely. By using react-swipeable, which doesn't apply transforms to the DOM tree during gesture detection, we can maintain the swipe functionality without affecting other fixed elements on the page.

## Observations

- Left swipe causes movement, right swipe doesn't
- The issue seems directional, suggesting a transform propagation issue
- Multiple isolation techniques have failed to resolve the issue
- The issue is likely related to how Framer Motion applies transforms during drag at a global document level
- A fundamental change to how swipe detection works may be the only solution
