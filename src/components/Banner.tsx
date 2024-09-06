import React,  { useState, useEffect } from "react";

/*
 * Banner: pulls an image url from api.nasa.gov and displays the site banner
 */
const Banner: React.FC = () => {
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const [copyright, setCopyright] = useState<string | null>(null);

    useEffect(() => {
        const fetchImg = async () => {
            try {
                const res = await fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY');

                if (!res.ok) {
                    throw new Error ("Failed to fetch background image");
                }

                const data = await res.json();

                setImgUrl(data.url);
                setCopyright(data.copyright);
            } catch (error) {
                console.error(error);
            }
        };

        fetchImg();
    }, []);

    if (!imgUrl) return <p>Banner Loading...</p>;

    return (
        <div className="banner" style={{ backgroundImage: imgUrl ? `url(${imgUrl})` : "none" }}>
            <h1>To Do List</h1>
            {copyright && (
                <p className="copyright">{copyright}©</p>
            )}
        </div>
    );
}

export default Banner;