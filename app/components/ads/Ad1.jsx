import { useEffect } from "react";

const AdBanner = () => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            // console.log("Adsbygoogle push");
        } catch (err) {
            // console.log("some error occured loading ads,", err);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            // data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}
            data-ad-client="ca-pub-3979558884312761"
            data-ad-slot="1234567890"
            data-full-width-responsive="true"
        ></ins>
    );
};
export default AdBanner;
