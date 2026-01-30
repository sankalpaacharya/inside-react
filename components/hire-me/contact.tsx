import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
    NewTwitterIcon,
    LinkedinIcon,
    GithubIcon,
    Mail01Icon,
} from "@hugeicons/core-free-icons";

const socialLinks = [
    {
        name: "Email",
        href: "mailto:sankalpaacharya01@gmail.com",
        icon: Mail01Icon,
    },
    {
        name: "X (Twitter)",
        href: "https://x.com/sankalpa_02",
        icon: NewTwitterIcon,
    },
    {
        name: "LinkedIn",
        href: "https://linkedin.com/in/sankalpa02",
        icon: LinkedinIcon,
    },
    {
        name: "GitHub",
        href: "https://github.com/sankalpaacharya",
        icon: GithubIcon,
    },
];

export function Contact() {
    return (
        <section className="space-y-4">
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider border-b border-border/40 pb-2">
                Contact me
            </h2>
            <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                    <a
                        key={social.name}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.name}
                        className="w-10 h-10 rounded-lg border border-border/40 bg-muted/10 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/20 transition-all"
                    >
                        <HugeiconsIcon icon={social.icon} size={18} />
                    </a>
                ))}
            </div>
        </section>
    );
}
