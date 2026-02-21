"use client";

import React from "react";
import { GitHubCalendar } from "react-github-calendar";

const GithubStats = () => {
    return (
        <div className="w-full h-full flex-1 flex flex-col items-center justify-center p-4">
            <h2 className="text-3xl font-bold text-white mb-6">My Github Activity</h2>
            <GitHubCalendar
                username="prakhar362"
                blockSize={12}
                blockMargin={4}
                colorScheme="dark"
                fontSize={12}
                theme={{
                    light: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                    dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
                }}
                showColorLegend={false}
                showTotalCount={false}
            />
        </div>
    );
};

export default GithubStats;
