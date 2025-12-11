import React, { useEffect, useState } from "react";

const GoogleSearch = ({ onSearchTermChange }) => {
    

    // useEffect(() => {
    //     const script = document.createElement('script');
    //     script.src = "https://cse.google.com/cse.js?cx=93f2eca1b89cb438c";
    //     script.async = true;
    //     script.onload = () => {
    //         const interval = setInterval(() => {
    //             const input = document.querySelector('input.gsc-input');
    //             if (input) {
    //                 input.placeholder = 'Web Search';
    //                 input.addEventListener('input', (e) => {
    //                     onSearchTermChange(e.target.value);
    //                 });
    //                 clearInterval(interval);
    //             }
    //         }, 100);
    //     };
    //     document.body.appendChild(script);
    //     return () => {
    //         document.body.removeChild(script);
    //     };
    // }, []);

    return (
        <>
            
            {/* {results.length > 0 && (
                <div className="search-results">
                    {results.map((item, index) => (
                        <div key={index}>
                            <h3><a href={item.link}>{item.title}</a></h3>
                            <p>{item.snippet}</p>
                        </div>
                    ))}
                </div>
            )} */}
            {/* <div className="Google_search_container">
                <div className="gcse-searchbox"></div>
            </div> */}
        </>
    )
}

export default GoogleSearch
