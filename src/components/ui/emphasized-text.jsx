import { Fragment } from "react";
import { parseEmphasis } from "@/lib/utils";

/** Renders `"plain *emphasised* plain"` with the emphasised words in the accent serif. */
export function EmphasizedText({ text }) {
  return parseEmphasis(text).map((segment, index) =>
    segment.emphasis ? (
      <em key={index} className="pr-[0.04em] font-serif text-[1.08em] font-normal italic tracking-[-0.01em] text-accent">
        {segment.text}
      </em>
    ) : (
      <Fragment key={index}>{segment.text}</Fragment>
    ),
  );
}
