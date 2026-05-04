"use client";

import React from "react";
import { GitHubCalendar } from "react-github-calendar";

const GithubStats = () => {
    return (
        <div className="w-full flex flex-col items-center justify-center gap-5 p-2">
            {/* Header */}
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-1 h-5 rounded-full bg-gradient-to-b from-[#CBACF9] to-[#7c3aed]" />
                    <h2 className="text-white font-semibold text-base tracking-wide">
                        GitHub Activity
                    </h2>
                </div>
                <a
                    href="https://github.com/prakhar362"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] uppercase tracking-[0.2em] text-[#CBACF9]/60 hover:text-[#CBACF9] transition-colors duration-300 font-mono"
                >
                    @prakhar362 ↗
                </a>
            </div>

            {/* Calendar */}
            <div className="w-full overflow-x-auto custom-scrollbar pb-1">
                <GitHubCalendar
                    username="prakhar362"
                    blockSize={13}
                    blockMargin={4}
                    blockRadius={3}
                    colorScheme="dark"
                    fontSize={11}
                    theme={{
                        // empty → darkest purple, filled → bright violet
                        dark: [
                            "#1a0a2e",   // level 0 — near-black purple (empty)
                            "#3b1f6b",   // level 1 — deep violet
                            "#6d28d9",   // level 2 — medium purple
                            "#9333ea",   // level 3 — vivid purple
                            "#CBACF9",   // level 4 — theme accent (max)
                        ],
                        light: [
                            "#1a0a2e",
                            "#3b1f6b",
                            "#6d28d9",
                            "#9333ea",
                            "#CBACF9",
                        ],
                    }}
                    showColorLegend={false}
                    showTotalCount={false}
                    style={{
                        color: "rgba(255,255,255,0.35)", // month/day labels
                    }}
                />
            </div>

            {/* Legend */}
            <div className="w-full flex items-center justify-end gap-2">
                <span className="text-white/25 text-[10px] font-mono">Less</span>
                {["#1a0a2e", "#3b1f6b", "#6d28d9", "#9333ea", "#CBACF9"].map((c) => (
                    <span
                        key={c}
                        className="w-3 h-3 rounded-sm inline-block"
                        style={{ backgroundColor: c }}
                    />
                ))}
                <span className="text-white/25 text-[10px] font-mono">More</span>
            </div>
        </div>
    );
};

export default GithubStats;
