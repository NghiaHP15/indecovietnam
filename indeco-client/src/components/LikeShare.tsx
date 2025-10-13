"use client";
import React, { useEffect, useRef } from "react";

interface Props {
  url: string;
}

const LikeShare = ({ url }: Props) => {

    const likeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load SDK nếu chưa có
        if (!window.FB && !document.getElementById('facebook-jssdk')) {
        const script = document.createElement('script');
        script.id = 'facebook-jssdk';
        script.src = 'https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v19.0&appId=' + process.env.FACEBOOK_CLIENT_ID;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
        }

        const checkFB = setInterval(() => {
        if (window.FB && window.FB.XFBML) {
            window.FB.XFBML.parse();
            clearInterval(checkFB);
        }
        }, 300);

        return () => clearInterval(checkFB);
  }, []);
    
    return (
        <div ref={likeRef} className="flex items-center">
            <div className="fb-like"
                data-href={`https://indecovietnam.com/${url}`}
                data-width=""
                data-layout="button_count"
                data-action="like"
                data-size="small"
                data-share="true">
            </div>
        </div>
    );
    };

export default LikeShare;
