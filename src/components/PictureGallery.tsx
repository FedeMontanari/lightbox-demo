"use client";

import { UnsplashResponse } from "@/types/unsplash";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const pictureSizes = {
  regular: {
    height: 1920,
    width: 1080,
  },
  small: {
    width: 400,
    height: 200,
  },
  thumb: {
    width: 200,
    height: 100,
  },
};

export default function PictureGallery({
  pictures,
}: {
  pictures: UnsplashResponse[];
}) {
  const [showModal, setShowModal] = useState(false);
  const [currentPic, setCurrentPic] = useState<UnsplashResponse>();
  const [index, setIndex] = useState<number>(-1);
  const [loading, setLoading] = useState(false);

  function modalNavigation(
    e?: KeyboardEvent,
    key?: "ArrowRight" | "ArrowLeft"
  ) {
    if (key === "ArrowLeft" || (e?.key === "ArrowLeft" && index > 0)) {
      setIndex(index - 1);
      setLoading(true);
    }
    if (
      key === "ArrowRight" ||
      (e?.key === "ArrowRight" && index + 1 < pictures.length)
    ) {
      setIndex(index + 1);
      setLoading(true);
    }
  }

  useEffect(() => {
    if (showModal) document.addEventListener("keydown", modalNavigation);
    return () => {
      document.removeEventListener("keydown", modalNavigation);
    };
  });

  useEffect(() => {
    setCurrentPic(pictures[index]);
  }, [index]);
  return (
    <>
      {pictures.map((pic, i) => {
        return (
          <div
            key={pic.id}
            className="border rounded-md flex flex-col items-center justify-center hover:scale-105 hover:cursor-zoom-in"
            onClick={() => {
              setShowModal(true);
              setCurrentPic(pic);
              setIndex(i);
            }}
          >
            <Image
              alt={pic.alt_description}
              src={pic.urls.thumb}
              width={pictureSizes.thumb.width}
              height={pictureSizes.thumb.height}
              className="p-3"
            />
            <span className="border-t p-3">
              {pic.user.name}
              <Image
                src={pic.user.profile_image.small}
                alt="User profile picture"
                className="rounded-full inline ml-2"
                width={32}
                height={32}
              />
            </span>
          </div>
        );
      })}

      <div
        className={`fixed flex-col top-0 left-0 h-screen w-screen items-center justify-center max-h-screen max-w-screen bg-black/70 py-2 md:px-6 ${
          showModal ? "flex" : "hidden"
        }`}
      >
        <button className="fixed left-8 top-6 z-40 text-lg font-bold text-white bg-black/70 p-2 rounded">
          <Link
            href={currentPic?.urls.full || ""}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className=""
            >
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
          </Link>
        </button>
        <button
          className="fixed right-8 top-6 z-40 text-xl font-bold text-white bg-black/70 p-2 rounded"
          onClick={() => setShowModal(false)}
        >
          X
        </button>
        <button
          className="fixed left-5 z-40 text-xl font-bold text-white bg-black p-2 rounded disabled:invisible"
          onClick={() => modalNavigation(undefined, "ArrowLeft")}
          disabled={index == 0}
        >
          &lt;
        </button>
        <button
          className="fixed right-5 z-40 text-xl font-bold text-white bg-black p-2 rounded disabled:invisible"
          onClick={() => modalNavigation(undefined, "ArrowRight")}
          disabled={index + 1 == pictures.length}
        >
          &gt;
        </button>
        <Image
          src={currentPic?.urls.full || ""}
          width={currentPic?.width}
          height={currentPic?.height}
          alt={currentPic?.alt_description || "Fullscreen picture"}
          className={`${
            loading ? "blur-sm" : ""
          } object-cover max-w-full max-h-full`}
          onLoad={() => setLoading(false)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`animate-spin fixed z-40 ${
            loading ? "visible" : "invisible"
          }`}
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <div className="fixed bottom-0 bg-black/70 w-full text-center">
          <p>{currentPic?.alt_description}</p>
          <p>
            Author - {currentPic?.user.name}
            <Image
              alt="Author profile picture"
              src={currentPic?.user.profile_image.small || ""}
              height={32}
              width={32}
              className="inline rounded-full ml-2"
            />
          </p>
        </div>
      </div>
    </>
  );
}
