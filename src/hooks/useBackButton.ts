import { useEffect, useRef } from 'react';

/**
 * Integrates React state-based views and modals with the mobile device's physical Back Button.
 * By pushing a temporary state to the browser history, the WebView will navigate backwards 
 * seamlessly instead of abruptly exiting the app.
 * 
 * @param isOpen Whether the view or modal is currently active
 * @param onBack Function to call to close the view when the hardware back button is pressed
 * @param stateId A unique string identifier for this view (e.g., 'player', 'artist-view')
 */
export const useBackButton = (isOpen: boolean, onBack: () => void, stateId: string) => {
  const onBackRef = useRef(onBack);

  // Keep the latest callback ref without triggering re-runs
  useEffect(() => {
    onBackRef.current = onBack;
  }, [onBack]);

  useEffect(() => {
    if (!isOpen) return;

    // Push a dummy state to the browser history stack
    window.history.pushState({ backId: stateId }, '');

    const handlePopState = () => {
      // Physical back button was pressed -> state was popped natively
      onBackRef.current();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      
      // If the component unmounts via a UI action (not the back button),
      // clean up the history stack so we don't leave orphaned states.
      if (window.history.state?.backId === stateId) {
        window.history.back();
      }
    };
  }, [isOpen, stateId]);
};