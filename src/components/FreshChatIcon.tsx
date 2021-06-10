import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Analytics from '../analytics/analytics';
import { CHAT } from '../analytics/chat/events';
import { getOpenOverlay } from '../app/store/overlay/overlay.selectors';
import { getIsMobileBreakpoint } from '../app/store/dimensions/dimensions.selectors';
import { Z_INDICIES } from '../ui/zIndicies';

declare global {
  interface Window {
    // TODO: Fix this the next time the file is edited.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fcWidget?: { init: (options: any) => void; open: () => void; on: (event: string, callback: () => void) => void };
  }
}

const initFreshchat = () => {
  if (window.fcWidget) {
    window.fcWidget.init({
      token: `${process.env.REACT_APP_FRESHCHAT_TOKEN}`,
      host: 'https://wchat.freshchat.com',
      config: {
        disableEvents: true,
        cssNames: {
          widget: 'fc_frame',
          open: 'fc_open',
          expanded: 'fc_expanded'
        },
        showFAQOnOpen: false,
        hideFAQ: false,
        agent: {
          hideName: false,
          hidePic: false,
          hideBio: true
        },
        headerProperty: {
          appName: 'Feather',
          appLogo:
            'https://static1.squarespace.com/static/59bd7df9b7411c839882e415/t/5c2e84cf032be47ea48baaf1/1546552545852/ffff.png?format=300w',
          backgroundColor: '#EBECF0',
          foregroundColor: '#4F4F4F',
          backgroundImage:
            'https://wchat.freshchat.com/assets/images/texture_background_1-bdc7191884a15871ed640bcb0635e7e7.png',
          fontName: 'Centra No2',
          fontUrl: 'https://cdn.livefeather.com/fonts/centra/CentraNo2-Bold.woff2',
          hideChatButton: true
        },
        content: {
          placeholders: {
            search_field: 'Search',
            reply_field: 'Reply',
            csat_reply: 'Add your comments here'
          },
          actions: {
            csat_yes: 'Yes',
            csat_no: 'No',
            push_notify_yes: 'Yes',
            push_notify_no: 'No',
            tab_faq: 'FAQ',
            tab_chat: 'Chat',
            csat_submit: 'Submit'
          },
          headers: {
            chat: 'Chat with Feather!',
            chat_help: 'Have a question? We are here to help.',
            faq: 'Frequently asked questions',
            faq_help: 'Browse common questions',
            faq_not_available: 'No Articles Found',
            faq_search_not_available: 'Nothing matches your search for {{query}}',
            faq_useful: 'Was this article helpful?',
            faq_thankyou: 'Thank you for your feedback',
            faq_message_us: 'Message Us',
            push_notification: "Don't miss out on any replies! Allow push notifications?",
            csat_question: 'Did we address your concerns?',
            csat_yes_question: 'How would you rate this interaction?',
            csat_no_question: 'Let us know how we could improve',
            csat_thankyou: 'Thanks for the response',
            csat_rate_here: 'Submit your rating here',
            channel_response: {
              offline: "Feather will be back soon. Leave us a message and we'll get back to you",
              online: {
                minutes: {
                  one: 'The team typically replies in a few minutes',
                  more: 'The team typically replies in a few minutes'
                },
                hours: {
                  one: 'The team typically replies in a few minutes',
                  more: 'The team typically replies in a few minutes'
                }
              }
            }
          }
        }
      }
    });
  }
};

const blackListedRoutes: string[] = ['/ofac-check', '/credit-check'];

const FreshChatIcon = () => {
  const freshchatRef = React.createRef<HTMLImageElement>();
  const currentlyOpenOverlay = useSelector(getOpenOverlay);
  const isMobileBreakpoint = useSelector(getIsMobileBreakpoint);
  const location = useLocation();

  const isVisible = !blackListedRoutes.includes(location.pathname);

  useEffect(() => {
    const freshchatWidget = document.createElement('script');

    freshchatWidget.id = 'freshchat-js-sdk';
    freshchatWidget.async = true;
    freshchatWidget.src = 'https://wchat.freshchat.com/js/widget.js';
    freshchatWidget.onload = initFreshchat;

    document.head.appendChild(freshchatWidget);
  }, []);

  const toggleFreshChatIcon = (visibility: 'visible' | 'hidden') => {
    if (freshchatRef.current) {
      freshchatRef.current.style.visibility = visibility;
    }
  };

  const handleOnClick = () => {
    // When the custom chat icon is clicked on,
    // the full display of chat options is displayed,
    // and the icon is removed from the screen.
    if (window.fcWidget) {
      window.fcWidget.open();
      // When the chat box is closed,
      // the custom icon will re-appear on screen.
      window.fcWidget.on('widget:closed', () => {
        // Make sure 'overflow: hidden' is not applied to
        // the body once the widget is closed
        document.body.classList.remove('fc-widget-open');

        toggleFreshChatIcon('visible');
      });
      toggleFreshChatIcon('hidden');
      Analytics.trackEvent(CHAT.OPEN);
    }
  };

  /**
   * Don't show the freshchat icon when...
   *   An overlay is currently open or the current route is blacklisted
   */
  const visibility = !currentlyOpenOverlay && isVisible ? 'visible' : 'hidden';

  return (
    <div
      style={{
        right: isMobileBreakpoint ? '0' : '12px',
        bottom: isMobileBreakpoint ? '0' : '4px',
        zIndex: Z_INDICIES.FRESH_CHAT_ICON,
        position: 'fixed',
        cursor: 'pointer',
        visibility
      }}
      role="button"
      tabIndex={0}
      onClick={handleOnClick}
    >
      <img
        alt="Chat With Us"
        ref={freshchatRef}
        src="https://cdn.livefeather.com/icons/feather/fresh_chat_icon.png"
        style={{
          width: '133px',
          height: '68px'
        }}
      />
    </div>
  );
};

export default FreshChatIcon;
