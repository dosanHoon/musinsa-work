import React, { useState, useEffect, useRef, FC } from "react";
import loadingSpinner from "assets/ccommon_loading_spinner.png";

interface Props {
  fetchData: () => Promise<void>;
  children: React.ReactNode;
}

const InfiniteScroll: FC<Props> = ({ fetchData, children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const loader = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoading(true);
          fetchData().then((newItems) => {
            setIsLoading(false);
          });
        }
      },
      { threshold: 1 }
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [loader, setIsLoading, fetchData]);

  return (
    <div>
      {children}
      <div ref={loader}>
        {isLoading && <img src={loadingSpinner} alt="loading" />}
      </div>
    </div>
  );
};

export default InfiniteScroll;
