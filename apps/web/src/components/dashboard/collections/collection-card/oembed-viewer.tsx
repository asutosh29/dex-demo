import React, { useEffect, useRef } from "react";

interface OEmbedViewerProps {
  html: string;
  className?: string;
}

export const OEmbedViewer: React.FC<OEmbedViewerProps> = ({
  html,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !html) return;

    const container = containerRef.current;
    container.innerHTML = html;

    // Fix iframe dimensions (especially for YouTube)
    const iframes = container.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      iframe.style.maxWidth = "100%";
      iframe.style.width = "100%";
      iframe.style.height = "auto";
      iframe.style.aspectRatio = "16 / 9";
    });

    // Extract and execute script tags from oEmbed HTML
    const scripts = container.querySelectorAll("script");
    scripts.forEach((oldScript) => {
      const newScript = document.createElement("script");

      // Copy all attributes
      Array.from(oldScript.attributes).forEach((attr) => {
        newScript.setAttribute(attr.name, attr.value);
      });

      // Copy inline script content
      if (oldScript.textContent) {
        newScript.textContent = oldScript.textContent;
      }

      // Replace old script with new one to trigger execution
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });

    // Cleanup function to remove any global variables or event listeners
    return () => {
      container.innerHTML = "";
    };
  }, [html]);

  return (
    <div
      ref={containerRef}
      className={`oembed-viewer ${className}`}
      style={{
        width: "100%",
        height: "100%",
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    />
  );
};

export default OEmbedViewer;
