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
  };

  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} components={renderers}>
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;
