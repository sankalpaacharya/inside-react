"use client";

import { cn } from "@/lib/utils";
import { MockTweet } from "./mock-tweet";

export interface TweetData {
  name: string;
  username: string;
  avatar?: string;
  content: string;
  date?: string;
}

interface TweetGroupProps {
  tweets: TweetData[];
  className?: string;
}

export const TweetGroup = ({ tweets, className }: TweetGroupProps) => {
  return (
    <div className={cn("my-12 columns-1 gap-6 sm:columns-2", className)}>
      {tweets.map((tweet, index) => (
        <div key={index} className="mb-6 break-inside-avoid">
          <MockTweet
            name={tweet.name}
            username={tweet.username}
            avatar={tweet.avatar}
            content={tweet.content}
            date={tweet.date}
            className="w-full"
          />
        </div>
      ))}
    </div>
  );
};
