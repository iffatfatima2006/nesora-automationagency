"use client";

import { motion } from "framer-motion";
import React from "react";
import { useEffect } from "react";

// Load Google Fonts that match official brand typefaces
const GOOGLE_FONTS_URL = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Lato:wght@700;900&family=Montserrat:wght@500;600;700;800&family=Open+Sans:wght@400;600;700&family=Poppins:wght@500;600;700;800&family=Roboto:wght@400;500;700&family=DM+Sans:wght@400;500;700&display=swap";

function FontLoader() {
  useEffect(() => {
    const existing = document.querySelector(`link[href="${GOOGLE_FONTS_URL}"]`);
    if (!existing) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = GOOGLE_FONTS_URL;
      document.head.appendChild(link);
    }
  }, []);
  return null;
}

// All-white brand SVG logos
const logos: Record<string, React.ReactNode> = {
  Google: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  ),
  Microsoft: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <rect x="1" y="1" width="10" height="10" />
      <rect x="13" y="1" width="10" height="10" />
      <rect x="1" y="13" width="10" height="10" />
      <rect x="13" y="13" width="10" height="10" />
    </svg>
  ),
  Amazon: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705a.66.66 0 0 1-.753.077c-1.06-.878-1.25-1.287-1.829-2.126-1.748 1.783-2.986 2.317-5.249 2.317C6.786 18.063 5 16.572 5 13.898c0-2.085 1.13-3.508 2.74-4.203 1.395-.614 3.347-.724 4.838-.893v-.333c0-.614.047-1.34-.313-1.87-.314-.47-.916-.665-1.448-.665-1.197 0-2.255.615-2.52 1.888a.534.534 0 0 1-.468.46l-2.626-.284a.457.457 0 0 1-.382-.535C5.401 4.454 8.057 3.5 10.438 3.5c1.213 0 2.798.323 3.752 1.242 1.214 1.13 1.098 2.637 1.098 4.28v3.878c0 1.166.483 1.678.937 2.307.16.224.195.493-.01.66-.514.43-1.429 1.229-1.932 1.677l-.14-.26z" />
      <path d="M20.906 18.398c-1.775 1.31-4.352 2.602-6.571 2.602-3.11 0-5.91-1.15-8.028-3.064-.166-.15-.018-.355.182-.238 2.286 1.33 5.115 2.13 8.034 2.13 1.97 0 4.136-.408 6.13-1.252.3-.13.553.197.253.422z" />
    </svg>
  ),
  Meta: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M6.915 4.03c-1.968 0-3.293 1.09-4.244 2.865C1.711 8.534 1 10.953 1 12.5c0 2.387.904 4 2.846 4 1.058 0 2.025-.56 3.156-2.05.83-1.094 1.66-2.527 2.378-3.851l.673-1.24c.878-1.62 1.878-3.434 3.14-4.726C14.396 3.473 15.7 3 17.09 3c1.886 0 3.393.88 4.41 2.455C22.47 6.942 23 8.88 23 11c0 2.28-.586 4.223-1.72 5.655C20.12 18.1 18.567 19 16.7 19c-1.476 0-2.783-.72-3.836-1.678-.666-.604-1.286-1.332-1.864-2.18l1.1-1.8c.528.845 1.065 1.526 1.625 2.05.79.74 1.66 1.208 2.647 1.208 1.205 0 2.1-.538 2.742-1.478C19.782 14.122 20.2 12.7 20.2 11c0-1.584-.378-2.934-1.048-3.915C18.533 6.1 17.623 5.5 16.5 5.5c-1.07 0-1.87.45-2.717 1.367-.71.768-1.38 1.794-2.164 3.066l-.603 1.084c-.986 1.773-1.97 3.37-3.184 4.547C6.69 16.694 5.4 17.2 3.96 17.2 2.6 17.2 1.476 16.6.73 15.54.233 14.87 0 13.815 0 12.5c0-1.83.738-4.47 1.81-6.335C3.038 4.227 4.78 3 6.915 3v1.03z" />
    </svg>
  ),
  Apple: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  ),
  Netflix: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24h-4.715zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95l-4.715-.001zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22l-4.715-13.332z" />
    </svg>
  ),
  Spotify: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  ),
  Stripe: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-7.076-2.19L3.338 21.8C5.067 22.899 8.125 24 11.501 24c2.588 0 4.758-.657 6.265-1.9 1.636-1.345 2.477-3.316 2.477-5.688 0-4.187-2.686-5.902-6.267-7.262z" />
    </svg>
  ),
  Slack: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" />
      <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" />
      <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.27 0a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.163 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" />
      <path d="M15.163 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.163 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.27a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.315A2.528 2.528 0 0 1 24 15.163a2.528 2.528 0 0 1-2.522 2.523h-6.315z" />
    </svg>
  ),
  Shopify: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.125-.192-.209-.192s-1.73-.124-1.73-.124-1.148-1.13-1.271-1.252c-.124-.124-.366-.087-.459-.058l-.634.196C15.191 2.14 14.543.96 13.142.96c-.058 0-.116.002-.174.005C12.637.397 12.182.191 11.783.191c-2.926 0-4.326 3.655-4.763 5.514-.96.297-1.64.507-1.723.533-.537.168-.553.185-.623.69C4.618 7.349 3 19.456 3 19.456l11.071 1.953 1.266 2.57zM12.168 4.614v.182c-.652.2-1.359.42-2.07.64.398-1.528 1.147-2.27 1.8-2.548.177.443.27 1.017.27 1.726zm-1.216-2.58c.118 0 .237.037.355.112-.858.404-1.783 1.42-2.172 3.45l-1.636.505c.455-1.55 1.535-4.067 3.453-4.067zm.615 11.237s-.69-.37-1.534-.37c-1.243 0-1.304.78-1.304.978 0 1.071 2.796 1.482 2.796 3.996 0 1.976-1.254 3.249-2.948 3.249-2.032 0-3.07-1.264-3.07-1.264l.543-1.797s1.07.916 1.97.916c.59 0 .832-.464.832-.803 0-1.401-2.295-1.463-2.295-3.762 0-1.936 1.389-3.809 4.19-3.809 1.077 0 1.607.309 1.607.309l-.787 2.357z" />
    </svg>
  ),
  Tesla: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M12 5.362l2.475-3.026s4.245.09 8.471 2.054c-1.082 1.636-3.231 2.438-3.231 2.438-.146-1.439-1.154-1.79-4.354-1.79L12 24 8.619 5.038c-3.18 0-4.188.351-4.335 1.79 0 0-2.148-.802-3.23-2.438C5.28 2.426 9.525 2.336 9.525 2.336L12 5.362zM12 .453c2.94-.074 7.256.387 10.883 2.101.344-.573.58-1.132.706-1.482C19.917.09 15.148 0 12 0 8.852 0 4.083.09.411 1.072c.126.35.362.909.706 1.482C4.744.84 9.06.379 12 .453z" />
    </svg>
  ),
  Uber: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M0 7.97v4.958c0 1.867 1.302 3.101 3 3.101.826 0 1.562-.316 2.094-.87v.736H6.27V7.97H5.094v4.784c0 1.27-.892 2.152-2.02 2.152-1.133 0-1.893-.882-1.893-2.152V7.97H0zm8.97 0v7.925h1.174v-.734c.532.554 1.268.868 2.094.868 1.698 0 3-1.232 3-3.1 0-1.867-1.302-3.1-3-3.1-.826 0-1.562.315-2.094.87V7.97H8.97zm6.452 1.853v6.072h1.174v-3.49c0-1.272.857-2.153 1.99-2.153.32 0 .637.06.918.18l.393-1.108a2.533 2.533 0 0 0-1.003-.202c-.758 0-1.437.376-1.9.974v-.841l-1.572.568zm7.408-.134c-1.768 0-3.101 1.293-3.101 3.1 0 1.87 1.333 3.1 3.168 3.1.903 0 1.735-.327 2.39-.944l-.625-.776c-.473.428-1.09.668-1.698.668-.992 0-1.834-.602-2.026-1.593h4.666a4.705 4.705 0 0 0 .025-.455c0-1.807-1.168-3.1-2.8-3.1zm-6.378.134c1.128 0 1.894.882 1.894 2.152 0 1.27-.766 2.152-1.894 2.152-1.128 0-2.02-.882-2.02-2.152 0-1.27.892-2.152 2.02-2.152zm6.345-.004c.947 0 1.603.601 1.72 1.46H20.77c.162-.86.858-1.46 1.759-1.46z" />
    </svg>
  ),
  Airbnb: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M12.001 18.275c-1.353-1.697-2.148-3.398-2.45-4.606-.297-1.218-.148-2.083.297-2.573.394-.44.935-.614 1.476-.614.54 0 1.082.173 1.476.614.445.49.594 1.355.297 2.573-.301 1.208-1.097 2.91-2.45 4.606h.354zm7.453-1.097c-.292 1.81-1.803 3.263-3.615 3.56-.908.148-1.836-.025-2.684-.514a8.4 8.4 0 0 1-.8-.54c1.7-2.027 2.684-4.014 3.067-5.505.395-1.551.197-2.856-.544-3.686-.592-.661-1.44-1.023-2.377-1.023s-1.786.362-2.378 1.023c-.741.83-.939 2.135-.544 3.686.383 1.491 1.366 3.478 3.067 5.505a8.4 8.4 0 0 1-.8.54c-.848.49-1.776.662-2.684.514-1.812-.297-3.323-1.75-3.615-3.56-.148-.908.025-1.836.514-2.684.395-.692 2.665-4.903 4.86-8.734.395-.689.769-1.34 1.1-1.92.189-.333.363-.642.52-.919a.75.75 0 0 1 .66-.396c.27 0 .522.15.66.396.157.277.331.586.52.92.331.579.705 1.23 1.1 1.919 2.195 3.831 4.465 8.042 4.86 8.734.49.848.662 1.776.514 2.684h.099z" />
    </svg>
  ),
  Dropbox: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M6 1.807L0 5.629l6 3.822 6-3.822L6 1.807zM18 1.807l-6 3.822 6 3.822 6-3.822-6-3.822zM0 13.274l6 3.822 6-3.822-6-3.822-6 3.822zM18 9.452l-6 3.822 6 3.822 6-3.822-6-3.822zM6 18.616l6 3.822 6-3.822-6-3.822-6 3.822z" />
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" />
      <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" />
      <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" />
      <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" />
      <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" />
    </svg>
  ),
  Notion: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L18.39 2.33c-.42-.327-.98-.7-2.055-.607L3.572 2.84c-.467.047-.56.28-.374.466l1.261 1.902zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.84-.046.934-.56.934-1.166V6.354c0-.606-.233-.933-.746-.886l-15.177.887c-.56.047-.748.327-.748.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952l1.448.327s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.139c-.093-.514.28-.886.747-.933l3.222-.186zM2.332 1.166L16.15.075c1.682-.14 2.1.093 2.802.607l3.876 2.754c.466.326.606.467.606 1.026v17.351c0 1.073-.42 1.726-1.868 1.82L5.727 24.54c-1.075.047-1.588-.093-2.148-.793L1.073 20.54c-.607-.84-.84-1.493-.84-2.24V2.752c0-.933.42-1.726 1.4-1.866l.7.28z" fillRule="evenodd" />
    </svg>
  ),
  Discord: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
    </svg>
  ),
  Vercel: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M12 1L24 22H0L12 1z" />
    </svg>
  ),
  OpenAI: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071.005l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872v.024zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071-.006l4.83 2.788a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.658zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66v.018zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681l-.004 6.722zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" />
    </svg>
  ),
  Datadog: (
    <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
      <path d="M17.748 12.43l-1.652-.903-.124-.076-1.373-.197-1.102-.642-.327.192-.09.462-.162.134-.35-.135-.317-.1-.254.043c-.075.083-.166.16-.258.238l-.163.2-.137-.138-.285-.023-.296.31-1.244-.08.098.542.333.123-.082.284-.26-.08-.463.25-.195.43.316.12.065.207-.375.356-.12.36.236-.058.247.245-.3.413.43.34.624-.3.26.228.387-.124.24.206.49-.122.188-.25.463-.037.32-.27.25.054.26-.248.163.128.32-.107.175.053.118-.125-.024-.4.297-.06.208-.277.096-.3-.262-.155-.06-.2-.363-.38-.06-.256.246-.213.253.126.187-.033L17 12.77l.75-.34z" />
    </svg>
  ),
};

// Brand fonts using web-available equivalents of official typefaces
const brandFonts: Record<string, React.CSSProperties> = {
  Google: { fontFamily: "'Roboto', sans-serif", fontWeight: 400, letterSpacing: "-0.01em" },
  Microsoft: { fontFamily: "'Open Sans', sans-serif", fontWeight: 600, letterSpacing: "0.01em" },
  Amazon: { fontFamily: "'Montserrat', sans-serif", fontWeight: 700, letterSpacing: "-0.02em" },
  Meta: { fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "-0.03em" },
  Apple: { fontFamily: "'Inter', sans-serif", fontWeight: 500, letterSpacing: "0.01em" },
  Netflix: { fontFamily: "'Montserrat', sans-serif", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" as const },
  Spotify: { fontFamily: "'DM Sans', sans-serif", fontWeight: 700, letterSpacing: "-0.04em" },
  Stripe: { fontFamily: "'Inter', sans-serif", fontWeight: 600, letterSpacing: "-0.01em" },
  Slack: { fontFamily: "'Lato', sans-serif", fontWeight: 900, letterSpacing: "-0.01em" },
  Shopify: { fontFamily: "'Montserrat', sans-serif", fontWeight: 700, letterSpacing: "-0.02em" },
  Tesla: { fontFamily: "'Montserrat', sans-serif", fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase" as const },
  Uber: { fontFamily: "'Poppins', sans-serif", fontWeight: 700, letterSpacing: "-0.01em" },
  Airbnb: { fontFamily: "'Poppins', sans-serif", fontWeight: 800, letterSpacing: "-0.02em" },
  Dropbox: { fontFamily: "'Montserrat', sans-serif", fontWeight: 700, letterSpacing: "-0.01em" },
  Figma: { fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: "-0.02em" },
  Notion: { fontFamily: "'Inter', serif", fontWeight: 600, letterSpacing: "-0.01em" },
  Discord: { fontFamily: "'Poppins', sans-serif", fontWeight: 800, letterSpacing: "-0.01em" },
  Vercel: { fontFamily: "'Inter', sans-serif", fontWeight: 700, letterSpacing: "-0.04em" },
  OpenAI: { fontFamily: "'Inter', sans-serif", fontWeight: 400, letterSpacing: "-0.02em" },
  Datadog: { fontFamily: "'Montserrat', sans-serif", fontWeight: 700, letterSpacing: "-0.01em" },
};

const brandsRow1 = [
  "Google", "Microsoft", "Amazon", "Meta", "Apple",
  "Netflix", "Spotify", "Stripe", "Slack", "Shopify",
];

const brandsRow2 = [
  "Tesla", "Uber", "Airbnb", "Dropbox", "Figma",
  "Notion", "Discord", "Vercel", "OpenAI", "Datadog",
];

// Varied text sizes per brand for visual interest
const brandSizes: Record<string, string> = {
  Google: "text-2xl",
  Microsoft: "text-lg",
  Amazon: "text-3xl",
  Meta: "text-xl",
  Apple: "text-2xl",
  Netflix: "text-sm",
  Spotify: "text-2xl",
  Stripe: "text-xl",
  Slack: "text-lg",
  Shopify: "text-xl",
  Tesla: "text-sm",
  Uber: "text-3xl",
  Airbnb: "text-2xl",
  Dropbox: "text-lg",
  Figma: "text-2xl",
  Notion: "text-xl",
  Discord: "text-lg",
  Vercel: "text-2xl",
  OpenAI: "text-xl",
  Datadog: "text-lg",
};

function BrandItem({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-4 px-10 py-4 mx-5 shrink-0">
      <div className="flex items-center justify-center">
        {logos[name]}
      </div>
      <span
        className={`text-white ${brandSizes[name] || "text-xl"} whitespace-nowrap`}
        style={brandFonts[name] || { fontFamily: "Helvetica, Arial, sans-serif", fontWeight: 700 }}
      >
        {name}
      </span>
    </div>
  );
}

function InfiniteMarquee({
  brands,
  direction = "left",
  duration = 30,
}: {
  brands: string[];
  direction?: "left" | "right";
  duration?: number;
}) {
  const duplicated = [...brands, ...brands];
  const animationName = direction === "left" ? "marqueeLeft" : "marqueeRight";

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes marqueeLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes marqueeRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}} />
      <div className="relative overflow-hidden w-full">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, black, transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, black, transparent)" }} />
        <div
          className="flex w-max"
          style={{
            animation: `${animationName} ${duration}s linear infinite`,
          }}
        >
          {duplicated.map((name, i) => (
            <BrandItem key={`${name}-${i}`} name={name} />
          ))}
        </div>
      </div>
    </>
  );
}

function ArrowLabel({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-start gap-4">
      <motion.span
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="text-white text-sm uppercase tracking-[0.35em] font-semibold"
        style={{ fontFamily: "Helvetica, 'Helvetica Neue', Arial, sans-serif" }}
      >
        {label}
      </motion.span>
      <motion.svg
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-100px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        width="20"
        height="44"
        viewBox="0 0 20 44"
        fill="none"
        className="text-white/60"
      >
        <path
          d="M10 0L10 40M10 40L2 30M10 40L18 30"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </div>
  );
}

export default function NameDrops() {
  return (
    <section className="relative z-10 bg-black -mt-[35vh]">
      <FontLoader />
      <div className="sticky top-0 min-h-screen flex flex-col justify-center bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
          {/* Top arrow with Name Drops label - left aligned */}
          <div className="mb-20">
            <ArrowLabel label="Name Drops" />
          </div>

          {/* Top banner - left to right */}
          <div className="w-full mb-12">
            <InfiniteMarquee brands={brandsRow1} direction="right" duration={25} />
          </div>

          {/* Bottom banner - right to left */}
          <div className="w-full mt-12 mb-20">
            <InfiniteMarquee brands={brandsRow2} direction="left" duration={28} />
          </div>

          {/* Bottom arrow with Testimonials label - left aligned */}
          <div className="mt-16">
            <ArrowLabel label="Testimonials" />
          </div>
        </div>
      </div>
    </section>
  );
}
