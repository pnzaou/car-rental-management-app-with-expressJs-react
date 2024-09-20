import { useState, useMemo } from 'react';

const usePaginatedFilter = (data, filterField, itemsPerPage) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchItem, setSearchItem] = useState("");

    const filterData = useMemo(() => {
        if (!data) return [];
        return searchItem.length >= 2
            ? data.filter(item => item[filterField]?.toLowerCase().includes(searchItem.toLowerCase()))
            : data;
    }, [data, searchItem, filterField]);

    const totalPages = useMemo(() => Math.ceil(filterData.length / itemsPerPage), [filterData, itemsPerPage]);

    const paginatedData = useMemo(() => {
        const lastIndex = currentPage * itemsPerPage;
        const firstIndex = lastIndex - itemsPerPage;
        return filterData.slice(firstIndex, lastIndex);
    }, [filterData, currentPage, itemsPerPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return {
        searchItem,
        setSearchItem,
        currentPage,
        totalPages,
        paginatedData,
        handlePageChange,
        setCurrentPage
    };
};

export default usePaginatedFilter;
