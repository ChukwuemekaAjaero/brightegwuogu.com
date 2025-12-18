# Splash Screen Implementation Documentation

## Overview

This document describes the splash screen implementation for the root page that ensures all critical media (images and videos) are loaded before displaying the main content. This provides a smoother user experience by preventing content shifts and loading delays when users navigate to other pages.

## Architecture

The implementation consists of four main components:

1. **Media Preloader Hook** (`src/hooks/useMediaPreloader.ts`)
2. **Splash Screen Component** (`src/components/lib/SplashScreen.tsx`)
3. **Media Assets Configuration** (`src/lib/mediaAssets.ts`)
4. **Root Page Integration** (`src/app/page.tsx`)

---

## Components

### 1. Media Preloader Hook

**File:** `src/hooks/useMediaPreloader.ts`

**Purpose:** Preloads images and videos in parallel, tracks loading progress, and provides loading state.

**Features:**

- Parallel loading of all media assets for faster completion
- Real-time progress tracking (0-100%)
- Graceful error handling (continues even if some assets fail)
- Supports both images and videos

**Usage:**

```tsx
import { useMediaPreloader } from '@/hooks/useMediaPreloader';
import { criticalMediaAssets } from '@/lib/mediaAssets';

const { loading, progress, loadedCount, total } = useMediaPreloader(criticalMediaAssets);
```

**Return Values:**

- `loading`: Boolean indicating if media is still loading
- `progress`: Number (0-100) representing loading percentage
- `loadedCount`: Number of assets that have completed loading
- `total`: Total number of assets to load

**How it works:**

1. Creates Image objects for images and Video elements for videos
2. Sets up event listeners for `onload`/`canplay` events
3. Tracks completion count and updates progress
4. Sets loading to false when all assets are loaded (with a 300ms delay for smooth transition)

---

### 2. Splash Screen Component

**File:** `src/components/lib/SplashScreen.tsx`

**Purpose:** Displays a full-screen loading overlay with branding and progress indicator.

**Features:**

- Full-screen overlay with black background
- "Bright Egwuogu" branding text using `modernizFont`
- Animated progress bar showing loading percentage
- Progress percentage text display
- Smooth fade-in/fade-out transitions

**Props:**

- `progress`: Number (0-100) - Current loading progress
- `isVisible`: Boolean - Controls visibility of the splash screen

**Customization:**
You can customize the splash screen by editing:

- Text content and styling
- Progress bar colors and size
- Layout and spacing
- Animation timing

---

### 3. Media Assets Configuration

**File:** `src/lib/mediaAssets.ts`

**Purpose:** Centralized configuration of which media assets to preload.

**Exports:**

#### `criticalMediaAssets`

Essential media that users will see first (14 items):

- Hero images (heroImage.jpg, aboutMeImage.jpg)
- Music section images (NoOtherGod.jpg, JoyUnspeakable.jpg, NeverLost.jpg, MusicAboutMe.jpg)
- Critical videos (NoOtherGodHeroVideo.mp4, SermonsHeroVideo.mp4, MinistryAboutMe.mp4, ZealOfTheLordReel.mp4)
- First few gallery images (galleryP1.jpg, galleryL1.jpg, galleryP2.jpg, galleryL2.jpg)

#### `allMediaAssets`

All media assets including additional gallery images and Instagram reels (24 items total).

**Adding/Removing Assets:**
Simply add or remove items from the arrays:

```tsx
{ src: '/path/to/asset.jpg', type: 'image' as const }
{ src: '/path/to/asset.mp4', type: 'video' as const }
```

**Note:** Assets must be in the `public` directory and paths should start with `/`.

---

### 4. Root Page Integration

**File:** `src/app/page.tsx`

**Implementation:**

```tsx
import { useMediaPreloader } from '@/hooks/useMediaPreloader';
import { criticalMediaAssets } from '@/lib/mediaAssets';
import SplashScreen from '@/components/lib/SplashScreen';

export default function RootPage() {
    const { loading, progress } = useMediaPreloader(criticalMediaAssets);

    return (
        <>
            <SplashScreen progress={progress} isVisible={loading} />
            <div className={`... ${loading ? 'opacity-0' : 'opacity-100'}`}>{/* Main content */}</div>
        </>
    );
}
```

**How it works:**

1. Hook preloads all critical media assets
2. Splash screen displays while `loading` is true
3. Main content is hidden (opacity-0) during loading
4. Once loading completes, splash screen disappears and content fades in

---

## Customization Guide

### Change Which Assets to Preload

**Option 1: Use all assets instead of critical**

```tsx
// In src/app/page.tsx
import { allMediaAssets } from '@/lib/mediaAssets';

const { loading, progress } = useMediaPreloader(allMediaAssets);
```

**Option 2: Create custom asset list**

```tsx
// In src/lib/mediaAssets.ts
export const customMediaAssets = [
    { src: '/images/custom1.jpg', type: 'image' as const },
    { src: '/videos/custom1.mp4', type: 'video' as const }
];

// In src/app/page.tsx
import { customMediaAssets } from '@/lib/mediaAssets';
const { loading, progress } = useMediaPreloader(customMediaAssets);
```

### Customize Splash Screen Design

Edit `src/components/lib/SplashScreen.tsx`:

**Change branding text:**

```tsx
<h1 className={...}>
    Your Custom Text Here
</h1>
```

**Change progress bar color:**

```tsx
<div className="h-2 bg-blue-500 ..." /> // Change bg-white to bg-blue-500
```

**Add logo/image:**

```tsx
<Image src="/logo.png" alt="Logo" width={200} height={200} />
```

**Change layout:**
Modify the flex container classes and spacing as needed.

### Adjust Loading Behavior

**Change delay before showing content:**

```tsx
// In src/hooks/useMediaPreloader.ts
setTimeout(() => {
    setLoading(false);
}, 500); // Change 300 to 500 for longer delay
```

**Add minimum display time:**

```tsx
// In src/hooks/useMediaPreloader.ts
const startTime = Date.now();
const minDisplayTime = 2000; // 2 seconds

Promise.all(mediaItems.map(loadMedia)).then(() => {
    const elapsed = Date.now() - startTime;
    const remaining = Math.max(0, minDisplayTime - elapsed);
    setTimeout(() => {
        setLoading(false);
    }, remaining);
});
```

---

## Technical Details

### Image Loading

- Uses native `Image()` constructor
- Listens for `onload` event
- Handles errors gracefully (continues loading other assets)

### Video Loading

- Creates `<video>` element programmatically
- Sets `preload="auto"` attribute
- Listens for `canplay` event (video is ready to play)
- Calls `video.load()` to start loading
- Handles errors gracefully

### Progress Calculation

- Progress = (loadedCount / total) \* 100
- Updates in real-time as each asset loads
- Smooth progress bar animation via CSS transitions

### Performance Considerations

- **Parallel Loading**: All assets load simultaneously for faster completion
- **Error Handling**: Failed assets don't block the loading process
- **Memory Management**: Event listeners are cleaned up after loading
- **Smooth Transitions**: 300ms delay ensures smooth fade-in

---

## Troubleshooting

### Splash screen doesn't disappear

- Check browser console for errors
- Verify all asset paths are correct
- Ensure assets exist in the `public` directory
- Check network tab to see if assets are loading

### Progress bar stuck at certain percentage

- Some assets may be failing to load
- Check browser console for 404 errors
- Verify file paths match exactly (case-sensitive)

### Content appears before media is loaded

- Increase the delay in `useMediaPreloader.ts`
- Check that `loading` state is being used correctly
- Verify the hook is working by checking `loadedCount` and `total`

### Slow loading times

- Reduce the number of assets in `criticalMediaAssets`
- Optimize image/video file sizes
- Consider lazy loading non-critical assets
- Use CDN for media assets if possible

---

## Future Enhancements

Potential improvements you could add:

1. **Skip button**: Allow users to skip the splash screen after a minimum time
2. **Loading animations**: Add spinner or animated logo
3. **Background image**: Show a background image during loading
4. **Sound effects**: Add audio feedback when loading completes
5. **Caching**: Cache loaded assets to skip loading on subsequent visits
6. **Progressive loading**: Show content as it loads instead of all-or-nothing
7. **Network detection**: Adjust loading strategy based on connection speed
8. **Error messages**: Display specific error messages for failed assets

---

## File Structure

```
src/
├── app/
│   └── page.tsx                    # Root page with splash screen integration
├── components/
│   └── lib/
│       └── SplashScreen.tsx        # Splash screen UI component
├── hooks/
│   └── useMediaPreloader.ts        # Media preloading hook
└── lib/
    └── mediaAssets.ts              # Media assets configuration
```

---

## Summary

The splash screen implementation ensures a smooth user experience by:

1. ✅ Preloading all critical media before showing content
2. ✅ Providing visual feedback with progress bar
3. ✅ Preventing content shifts and loading delays
4. ✅ Being easily customizable and maintainable
5. ✅ Handling errors gracefully

The system is modular, well-documented, and ready for customization based on your specific needs.
