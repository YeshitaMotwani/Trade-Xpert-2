import React from "react";
import {render,screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import Hero from "../landing_page/home/Hero";

describe("Hero component",()=>{
    test("Renders Hero image",()=>{
        render(<Hero></Hero>);
        const heroImage=screen.getByAltText("Hero Image");
        expect(heroImage).toBeInTheDocument();
        expect(heroImage).toHaveAttribute("src","media/images/homeHero.png");
    });
});

// describe("Signup button",()=>{
//     test("Renders signup button",()=>{
//         render(<Hero></Hero>);
//         const signupButton=screen.getByRole("button",{name:"/signup now/i"});
//         expect(signupButton).toBeInTheDocument();
//         expect(signupButton).toHaveClass("btn-primary");
//     });
// });