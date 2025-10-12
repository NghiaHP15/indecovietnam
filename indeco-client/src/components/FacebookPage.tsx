'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    FB: {
      XFBML: {
        parse: () => void;
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      init?: (...args: any[]) => void;
    };
  }
}

export default function FacebookPage() {
  useEffect(() => {
    // Nếu SDK chưa được load thì load
    if (!window.FB) {
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v19.0';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.onload = () => {
        window.FB?.XFBML?.parse();
      };
      document.body.appendChild(script);
    } else {
      // Nếu đã có FB, thì parse lại để render plugin
      window.FB.XFBML.parse();
    }
  }, []);

  return (
    <>
      <div id="fb-root"></div>
      <div
        className="fb-page"
        data-href="https://www.facebook.com/profile.php?id=61576607768367"
        data-tabs="timeline"
        data-width="300"
        data-height="70"
        data-small-header="false"
        data-adapt-container-width="true"
        data-hide-cover="false"
        data-show-facepile="true"
      >
        <blockquote
          cite="https://www.facebook.com/profile.php?id=61576607768367"
          className="fb-xfbml-parse-ignore"
        >
          <a href="https://www.facebook.com/profile.php?id=61576607768367">INDECO VIETNAM</a>
        </blockquote>
      </div>
    </>
  );
}
