"use client";

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, EffectFade, Autoplay } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import Image from "next/image";
import { StarFilled, LeftOutlined, RightOutlined } from "@ant-design/icons";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";

const reviews = [
    {
        id: "1",
        name: "John Doe",
        position: "Creative Director, Artify",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop",
        stars: 5,
        thumb: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
        reviewContent: "MailOne has completely transformed our transactional email workflow. The delivery rates are phenomenal, and the integration was seamless. It's the most reliable service we've used in years."
    },
    {
        id: "2",
        name: "Seb Chandler",
        position: "Seb Chandler Photography",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
        stars: 5,
        thumb: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=150&auto=format&fit=crop",
        reviewContent: "As a photographer, I need my client notifications to be instant and beautiful. MailOne provides the perfect balance of speed and customization. I couldn't be happier with the results."
    },
    {
        id: "3",
        name: "Michael Smith",
        position: "CEO, TechStart",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop",
        stars: 5,
        thumb: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
        reviewContent: "Scale was our biggest challenge. MailOne handled our growth from 1k to 1M emails per day without breaking a sweat. Their analytics dashboard is a game-changer for our marketing team."
    },
    {
        id: "4",
        name: "Sarah Wilson",
        position: "Freelance Editor",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
        stars: 5,
        thumb: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
        reviewContent: "The simplicity of MailOne is what sold me. I was able to set up my first automated campaign in minutes. Their support team is also incredibly responsive whenever I have questions."
    },
    {
        id: "5",
        name: "David Lee",
        position: "Studio Manager",
        image: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=800&auto=format&fit=crop",
        stars: 5,
        thumb: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=150&auto=format&fit=crop",
        reviewContent: "I've tried every major email provider, and none compare to MailOne's focus on developer experience. The API is clean, well-documented, and robust. It just works exactly how you expect it to."
    },
];

const ReviewsSection = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="unique-review-section flex items-center justify-center p-4 py-24 relative overflow-hidden bg-slate-950/50">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/5 blur-[120px] rounded-full translate-x-1/2 translate-y-1/2" />

            <style dangerouslySetInnerHTML={{
                __html: `
                .unique-review-section .swiper-slide-thumb-active .thumb-avatar {
                    border-color: #3b82f6 !important;
                    transform: scale(1.1);
                    opacity: 1 !important;
                    box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
                }
                .testimonial-gradient {
                    background: linear-gradient(
                        to top,
                        rgba(15, 23, 42, 0.9) 0%,
                        rgba(15, 23, 42, 0) 100%
                    );
                }
            `}} />

            <div className="w-full max-w-7xl relative z-10 flex flex-col md:flex-row gap-16 items-end">
                {/* Left Side: Main Swiper */}
                <div className="w-full md:w-1/2 flex flex-col gap-8">
                    <div className="mainSwiper w-full rounded-[2.5rem] overflow-hidden border border-slate-700/50 shadow-2xl aspect-square md:aspect-2/2 bg-slate-800 relative group">
                        <Swiper
                            spaceBetween={20}
                            effect={"fade"}
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            modules={[Navigation, Thumbs, EffectFade, Autoplay]}
                            autoplay={{ delay: 5000, disableOnInteraction: false }}
                            className="h-full w-full"
                            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                            navigation={{
                                nextEl: ".next-btn-trigger",
                                prevEl: ".prev-btn-trigger",
                            }}
                        >
                            {reviews.map((review) => (
                                <SwiperSlide key={review.id} className="relative">
                                    <Image
                                        src={review.image}
                                        alt={review.name}
                                        width={800}
                                        height={600}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                    <div className="testimonial-gradient absolute bottom-0 left-0 right-0 p-10 text-white">
                                        <div className="flex text-amber-400 mb-4 gap-1">
                                            {[...Array(review.stars)].map((_, i) => (
                                                <StarFilled key={i} className="text-lg" />
                                            ))}
                                        </div>
                                        <h3 className="text-3xl font-bold text-blue-400 mb-1">{review.name}</h3>
                                        <p className="text-lg font-medium text-slate-300 opacity-90">{review.position}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    <div className="flex items-center justify-between w-full px-4">
                        <button className="prev-btn-trigger w-14 h-14 rounded-full border border-slate-700 text-slate-400 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 hover:bg-blue-500/10 transition-all duration-300 group">
                            <LeftOutlined style={{ fontSize: '20px' }} className="group-hover:-translate-x-1 transition-transform" />
                        </button>

                        <div className="text-lg font-semibold text-slate-500 tracking-widest">
                            <span className="text-blue-500">{activeIndex + 1}</span> <span className="mx-2 text-slate-700">/</span> {reviews.length}
                        </div>

                        <button className="next-btn-trigger w-14 h-14 rounded-full border border-slate-700 text-slate-400 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 hover:bg-blue-500/10 transition-all duration-300 group">
                            <RightOutlined style={{ fontSize: '20px' }} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Right Side: Content & Thumbs */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-8">
                    <div className="space-y-6">
                        <div className="w-12 h-1 bg-blue-500 rounded-full" />

                        {/* Dynamic Content */}
                        <div className="relative">
                            <span className="absolute -top-10 -left-6 text-8xl text-blue-500/10 font-serif select-none">&quot;</span>
                            <h2 className="text-justify text-lg md:text-xl font-bold text-white leading-[1.3] min-h-[160px] transition-all duration-500">
                                {reviews[activeIndex].reviewContent}
                            </h2>
                        </div>
                    </div>

                    <div className="w-full md:pt-8 border-t border-slate-800">
                        <p className="text-slate-500 font-medium mb-6 uppercase tracking-[0.2em] text-sm">Trusted by Industry Leaders</p>
                        <Swiper
                            onSwiper={setThumbsSwiper}
                            spaceBetween={20}
                            slidesPerView={"auto"}
                            watchSlidesProgress={true}
                            modules={[Thumbs]}
                            className="thumbsSwiper py-4"
                        >
                            {reviews.map((review) => (
                                <SwiperSlide key={review.id} className="w-auto! cursor-pointer">
                                    <div className="relative group/thumb">
                                        <Image
                                            src={review.thumb}
                                            alt={review.name}
                                            width={64}
                                            height={64}
                                            className="thumb-avatar w-16 h-16 rounded-full object-cover opacity-40 hover:opacity-100 transition-all duration-300 border-2 border-transparent grayscale hover:grayscale-0"
                                        />
                                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs py-1 px-3 rounded opacity-0 group-hover/thumb:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-slate-700">
                                            {review.name}
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ReviewsSection;