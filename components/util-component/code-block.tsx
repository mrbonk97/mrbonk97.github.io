import hljs from "highlight.js";
import "highlight.js/styles/atom-one-dark.css";

interface Props {
  code: string;
}

export function CodeBlock({ code }: Props) {
  const result = hljs.highlightAuto(code);

  return (
    <pre className="mt-4">
      <code
        className={`hljs language-${result.language ?? "plaintext"} rounded`}
        dangerouslySetInnerHTML={{ __html: result.value }}
      />
    </pre>
  );
}
