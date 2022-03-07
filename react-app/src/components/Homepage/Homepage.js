import React from "react";
import ImageCarousel from "./Carousel";
import './Homepage.css'

const Homepage = () => {
    return (
        <div className="homepage_body">
            <ImageCarousel />

            <div className="home_content_text_container">
                <div className="text_box">
                    <h2>STEP-BY-STEP</h2>
                    <p>We make it easy to learn how to make anything, one step at a time. From the stovetop to the workshop, you are sure to be inspired by the awesome projects that are shared everyday.</p>
                </div>

                <div className="text_box">
                    <h2>MADE BY YOU</h2>
                    <p>Cheatsheets are created by you. No matter who you are, we all have secret skills to share. Come join our community of curious makers, innovators, teachers, and life long learners who love to share what they make.</p>
                </div>

                <div className="text_box">
                    <h2>A HAPPY PLACE</h2>
                    <p>Making things makes people happy. We can't prove it, but we know it to be true. Find your happy place, and join one of the friendliest online communities anywhere.</p>
                </div>
            </div>

            <hr className="seperator"/>

            <div id="explore_container">
                <h2>Explore Cheatsheets</h2>
                <div className="cheatsheets_container">
                    <div className="cheatsheet_box">some project</div>
                    <div className="cheatsheet_box">some project</div>
                    <div className="cheatsheet_box">some project</div>
                    <div className="cheatsheet_box">some project</div>
                    <div className="cheatsheet_box">some project</div>
                    <div className="cheatsheet_box">some project</div>
                    <div className="cheatsheet_box">some project</div>
                    <div className="cheatsheet_box">some project</div>
                    <div className="cheatsheet_box">some project</div>
                    <div className="cheatsheet_box">some project</div>
                </div>
            </div>
        </div>
    )
}

export default Homepage
