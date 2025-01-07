import { FC } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import rehypeRaw from "rehype-raw";

interface MarkdownProps {
  content: string;
}

const Markdown: FC<MarkdownProps> = ({ content }) => {
  const renderers: Components = {
    h1: ({ children }) => <h1 className="text-xl font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="font-bold">{children}</h2>,
    h3: ({ children }) => (
      <h3 className="font-bold text-gray-800">{children}</h3>
    ),
    p: ({ children }) => <p className="text-base">{children}</p>,
    ul: ({ children }) => (
      <ul className="list-disc space-y-1 pl-6">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal space-y-1 pl-6">{children}</ol>
    ),
    li: ({ children }) => (
      <li className="text-base text-gray-700">{children}</li>
    ),
  };

  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} components={renderers}>
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;
