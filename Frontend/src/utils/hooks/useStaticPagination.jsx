import { useEffect, useRef, useState } from "react";

const useStaticPagination = (data, trigger, sizeOfPage = 5) => {
  const [results, setResults] = useState([]);
  const currentPage = useRef(1);
  const pageSize = useRef(sizeOfPage);
  const totalPage = useRef(0);

  const hasNext = () => {
    return currentPage.current < totalPage.current;
  };

  const hasPrev = () => {
    return currentPage.current > 1;
  };

  const setTotalPage = () => {
    totalPage.current = Math.ceil(data?.length / pageSize.current);
  };

  const reset = () => {
    currentPage.current = 1;
    setTotalPage();
  };

  const onNext = () => {
    if (currentPage.current >= totalPage.current) {
      return;
    }

    currentPage.current = currentPage.current + 1;
    cfg();
  };

  const onPrev = () => {
    if (hasPrev()) {
      currentPage.current = currentPage.current - 1;
      cfg();
    }
  };

  const cfg = () => {
    const datas = [...data].map((value, id) => ({ value, id }));
    const startIndex = (currentPage.current - 1) * pageSize.current;
    const endIndex = startIndex + pageSize.current;
    const result = datas.slice(startIndex, endIndex);

    setResults(result);
  };

  useEffect(() => {
    reset();
    cfg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  return {
    results,
    hasPrev,
    hasNext,
    onPrev,
    onNext,
  };
};

export default useStaticPagination;
