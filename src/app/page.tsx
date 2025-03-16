import Image from "next/image";
import Link from "next/link";
import React from "react";
import { BiSolidHeart } from "react-icons/bi";
import { BackgroundGradient } from "@/components/ui/background-gradient";

export default function Home() {
  return (
    <main className="min-h-[calc(100vh)] relative overflow-hidden bg-black">
      {/* Background Section */}
      <div className="absolute inset-0">
        <Image
          src="/images/couple.jpg"
          alt="Happy couple background"
          fill
          priority
          className="object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black via-zinc-900/50 to-black" />
      </div>

      {/* Content Section */}
      <div className="relative h-full z-10">
        <div className="container mx-auto px-4 py-24">
          <div className="flex flex-col items-center text-center space-y-16 text-white">
            {/* Hero Section */}
            <BackgroundGradient containerClassName="w-fit px-6 py-2">
              <div className="flex items-center gap-4">
                <BiSolidHeart className="text-pink-300 w-14 h-14 filter drop-shadow-glow" />
                <h1 className="text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 drop-shadow-glow">
                  PairUp
                </h1>
              </div>
            </BackgroundGradient>

            <h2 className="text-4xl md:text-5xl font-light max-w-3xl leading-relaxed text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300">
              Find your perfect match in a world of
              <span className="font-medium text-purple-300">
                {" "}
                genuine connections
              </span>
            </h2>

            {/* Feature Cards */}
            <div className="grid md:grid-cols-3 gap-8 mt-12 w-full max-w-6xl px-4">
              {[
                {
                  title: "Match",
                  desc: "Find your perfect match with our intelligent matching system based on shared interests and values",
                },
                {
                  title: "Connect",
                  desc: "Build meaningful relationships through secure and private messaging",
                },
                {
                  title: "Discover",
                  desc: "Explore profiles and discover people who share your passions and lifestyle",
                },
              ].map((feature) => (
                <BackgroundGradient
                  key={feature.title}
                  containerClassName="h-full"
                >
                  <div
                    className="p-8 rounded-2xl bg-black/40 backdrop-blur-md h-full 
                                hover:bg-black/50 transition-colors duration-300"
                  >
                    <h3
                      className="text-2xl font-semibold mb-4 bg-clip-text text-transparent 
                                 bg-gradient-to-r from-pink-300 to-purple-300"
                    >
                      {feature.title}
                    </h3>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </BackgroundGradient>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 mt-12">
              <Link
                href="/auth/register"
                className="relative inline-flex h-16 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-12 py-1 text-lg font-medium text-white backdrop-blur-3xl hover:bg-slate-900 transition-colors">
                  Get Started
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
