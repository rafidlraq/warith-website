import { splitEmails } from "@/lib/ui";

/** Renders text and turns any e-mail address inside it into a mailto link. */
export default function Rich({ text }: { text: string }) {
    return (
        <>
            {splitEmails(text).map((part, index) =>
                part.email ? (
                    <a key={index} className="mail-link" href={`mailto:${part.value}`} dir="ltr">
                        {part.value}
                    </a>
                ) : (
                    <span key={index}>{part.value}</span>
                ),
            )}
        </>
    );
}